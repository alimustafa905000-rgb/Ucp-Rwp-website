import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { magazinesService } from "../services";

export default function Magazines() {
  const [data, setData] = useState(null);
  const [editingMagazineId, setEditingMagazineId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const serviceData = magazinesService.get() || {};
    const fullData = {
      hero: serviceData.hero || {
        icon: "📖",
        eyebrow: "Explore",
        title: "Horizon: Campus",
        highlight: "Edition",
        description: "Our official university magazine — stories, research and campus life.",
      },
      magazines: serviceData.magazines || [],
      topicsList: serviceData.topicsList || [],
    };
    // Derive topics from existing magazines if not provided
    if (fullData.topicsList.length === 0 && fullData.magazines.length > 0) {
      const allTopics = new Set();
      fullData.magazines.forEach((m) => (m.topics || []).forEach((t) => allTopics.add(t)));
      fullData.topicsList = Array.from(allTopics);
    }
    setData(fullData);
  }, []);

  if (!data) return <div>Loading...</div>;

  // ---------- Styling ----------
  // Fixed: text color for light/dark mode
  const input =
    "w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700";
  const label = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  // ---------- Helpers ----------
  const updateHero = (field, value) => {
    setData((s) => ({
      ...s,
      hero: { ...s.hero, [field]: value },
    }));
  };

  const addMagazine = (newMag) => {
    setData((s) => ({
      ...s,
      magazines: [
        ...s.magazines,
        {
          id: Date.now(),
          title: newMag.title || "",
          issue: newMag.issue || "",
          coverImage: newMag.coverImage || "",
          pdfUrl: newMag.pdfUrl || "",
          description: newMag.description || "",
          topics: newMag.topics || [],
          date: newMag.date || new Date().toISOString().split("T")[0],
          status: newMag.status || "draft",
          downloads: 0,
        },
      ],
    }));
    setShowAddForm(false);
    toast.success("Magazine added");
  };

  const updateMagazine = (id, field, value) => {
    setData((s) => ({
      ...s,
      magazines: s.magazines.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  const deleteMagazine = (id) => {
    if (!window.confirm("Delete this magazine?")) return;
    setData((s) => ({
      ...s,
      magazines: s.magazines.filter((m) => m.id !== id),
    }));
    toast.success("Magazine deleted");
  };

  const handleCoverUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateMagazine(id, "coverImage", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePdfUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateMagazine(id, "pdfUrl", url);
    toast.success("PDF uploaded (temporary preview)");
  };

  // ---------- Topics Management ----------
  const addTopic = (topic) => {
    const trimmed = topic.trim();
    if (!trimmed) return toast.error("Topic cannot be empty");
    if (data.topicsList.includes(trimmed)) return toast.error("Topic already exists");
    setData((s) => ({
      ...s,
      topicsList: [...(s.topicsList || []), trimmed],
    }));
    toast.success("Topic added");
  };

  const removeTopic = (topic) => {
    setData((s) => ({
      ...s,
      topicsList: (s.topicsList || []).filter((t) => t !== topic),
    }));
    toast.success("Topic removed");
  };

  // ---------- Sidebar management ----------
  const moveMagazine = (id, direction) => {
    const idx = data.magazines.findIndex((m) => m.id === id);
    if (idx === -1) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= data.magazines.length) return;
    const newMags = [...data.magazines];
    [newMags[idx], newMags[newIdx]] = [newMags[newIdx], newMags[idx]];
    setData((s) => ({ ...s, magazines: newMags }));
  };

  const togglePin = (id) => {
    setData((s) => ({
      ...s,
      magazines: s.magazines.map((m) =>
        m.id === id ? { ...m, pinned: !m.pinned } : m
      ),
    }));
  };

  const toggleHide = (id) => {
    setData((s) => ({
      ...s,
      magazines: s.magazines.map((m) =>
        m.id === id ? { ...m, hidden: !m.hidden } : m
      ),
    }));
  };

  // ---------- Statistics ----------
  const totalMagazines = data.magazines.length;
  const publishedIssues = data.magazines.filter((m) => m.status === "published").length;
  const draftIssues = data.magazines.filter((m) => m.status === "draft").length;
  const totalDownloads = data.magazines.reduce((sum, m) => sum + (m.downloads || 0), 0);

  // ---------- Render ----------
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Magazine Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage hero section, magazines, topics, and sidebar.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{totalMagazines}</p>
          <p className="text-sm text-slate-500">Total Magazines</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{publishedIssues}</p>
          <p className="text-sm text-slate-500">Published Issues</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{draftIssues}</p>
          <p className="text-sm text-slate-500">Draft Issues</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{totalDownloads}</p>
          <p className="text-sm text-slate-500">Total Downloads</p>
        </div>
      </div>

      {/* Hero Section */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Hero Section</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className={label}>Icon</label>
              <input
                className={input}
                placeholder="Icon emoji"
                value={data.hero.icon}
                onChange={(e) => updateHero("icon", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Eyebrow</label>
              <input
                className={input}
                placeholder="Eyebrow text"
                value={data.hero.eyebrow}
                onChange={(e) => updateHero("eyebrow", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Title</label>
              <input
                className={input}
                placeholder="Main title"
                value={data.hero.title}
                onChange={(e) => updateHero("title", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Highlight</label>
              <input
                className={input}
                placeholder="Highlight text"
                value={data.hero.highlight}
                onChange={(e) => updateHero("highlight", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={label}>Description</label>
              <input
                className={input}
                placeholder="Description"
                value={data.hero.description}
                onChange={(e) => updateHero("description", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Topics Management */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Topics Management</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex gap-2">
            <input
              className={input}
              placeholder="Add new topic"
              id="newTopic"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTopic(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const inp = document.getElementById("newTopic");
                addTopic(inp.value);
                inp.value = "";
              }}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white dark:bg-slate-200 dark:text-slate-800"
            >
              + Add
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(data.topicsList || []).map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-sm dark:bg-slate-700"
              >
                {topic}
                <button
                  onClick={() => removeTopic(topic)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
            {(data.topicsList || []).length === 0 && (
              <span className="text-sm text-slate-400">No topics yet</span>
            )}
          </div>
        </div>
      </section>

      {/* Magazines Management */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Magazines</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Magazine
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 dark:bg-slate-900 dark:border dark:border-slate-700">
              <h3 className="mb-4 text-lg font-semibold">Add New Magazine</h3>
              <AddMagazineForm
                onSave={addMagazine}
                onCancel={() => setShowAddForm(false)}
                topicsList={data.topicsList || []}
                inputClass={input}
                labelClass={label}
              />
            </div>
          </div>
        )}

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left">Cover</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Issue</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.magazines.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-400">
                    No magazines yet.
                  </td>
                </tr>
              ) : (
                data.magazines.map((mag) => (
                  <tr key={mag.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-2">
                      {mag.coverImage ? (
                        <img
                          src={mag.coverImage}
                          alt={mag.title}
                          className="h-12 w-10 object-cover rounded"
                        />
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2 font-medium">{mag.title}</td>
                    <td className="px-4 py-2">{mag.issue}</td>
                    <td className="px-4 py-2">{mag.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                          mag.status === "published"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/25"
                        }`}
                      >
                        {mag.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() =>
                          setEditingMagazineId(editingMagazineId === mag.id ? null : mag.id)
                        }
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        {editingMagazineId === mag.id ? "Close" : "Edit"}
                      </button>
                      <button
                        onClick={() => deleteMagazine(mag.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {editingMagazineId && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 font-semibold">Edit Magazine</h3>
            <EditMagazineForm
              magazine={data.magazines.find((m) => m.id === editingMagazineId)}
              onUpdate={updateMagazine}
              onCancel={() => setEditingMagazineId(null)}
              onCoverUpload={handleCoverUpload}
              onPdfUpload={handlePdfUpload}
              topicsList={data.topicsList || []}
              inputClass={input}
              labelClass={label}
            />
          </div>
        )}
      </section>

      {/* Sidebar Management */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Sidebar Management</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 text-sm text-slate-500">
            Reorder, pin, or hide magazines from the sidebar.
          </p>
          <div className="space-y-2">
            {data.magazines.map((mag, idx) => (
              <div
                key={mag.id}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  mag.hidden ? "opacity-40" : ""
                } ${mag.pinned ? "border-indigo-500 bg-indigo-50/10" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{mag.title}</span>
                  {mag.pinned && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                      Pinned
                    </span>
                  )}
                  {mag.hidden && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveMagazine(mag.id, -1)}
                    disabled={idx === 0}
                    className="text-sm disabled:opacity-30"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveMagazine(mag.id, 1)}
                    disabled={idx === data.magazines.length - 1}
                    className="text-sm disabled:opacity-30"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => togglePin(mag.id)}
                    className={`text-sm ${mag.pinned ? "text-indigo-500" : "text-slate-400"}`}
                    title={mag.pinned ? "Unpin" : "Pin"}
                  >
                    📌
                  </button>
                  <button
                    onClick={() => toggleHide(mag.id)}
                    className="text-sm text-slate-400"
                    title={mag.hidden ? "Show" : "Hide"}
                  >
                    {mag.hidden ? "👁" : "🚫"}
                  </button>
                </div>
              </div>
            ))}
            {data.magazines.length === 0 && (
              <p className="text-center text-sm text-slate-400">No magazines to manage.</p>
            )}
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            magazinesService.update(data);
            toast.success("All changes saved");
          }}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}

// ---------- Sub-components (with fixed text color) ----------
function AddMagazineForm({ onSave, onCancel, topicsList, inputClass, labelClass }) {
  const [form, setForm] = useState({
    title: "",
    issue: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    status: "draft",
    topics: [],
    coverImage: "",
    pdfUrl: "",
  });

  const handleChange = (field, value) => setForm({ ...form, [field]: value });
  const handleTopicToggle = (topic) => {
    const topics = form.topics.includes(topic)
      ? form.topics.filter((t) => t !== topic)
      : [...form.topics, topic];
    handleChange("topics", topics);
  };

  const handleFile = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => handleChange(field, ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="Issue"
          value={form.issue}
          onChange={(e) => handleChange("issue", e.target.value)}
        />
        <textarea
          className={`${inputClass} md:col-span-2`}
          placeholder="Description"
          rows={2}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <input
          type="date"
          className={inputClass}
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
        <select
          className={inputClass}
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <div className="md:col-span-2">
          <label className={labelClass}>Topics</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {topicsList.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicToggle(topic)}
                className={`rounded-full px-3 py-1 text-sm ${
                  form.topics.includes(topic)
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              >
                {topic}
              </button>
            ))}
            {topicsList.length === 0 && (
              <span className="text-sm text-slate-400">No topics available</span>
            )}
          </div>
        </div>
        <div>
          <label className={labelClass}>Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleFile("coverImage", e)} />
        </div>
        <div>
          <label className={labelClass}>PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                handleChange("pdfUrl", url);
              }
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white dark:bg-slate-200 dark:text-slate-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function EditMagazineForm({
  magazine,
  onUpdate,
  onCancel,
  onCoverUpload,
  onPdfUpload,
  topicsList,
  inputClass,
  labelClass,
}) {
  const [form, setForm] = useState({ ...magazine });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    onUpdate(magazine.id, field, value);
  };

  const handleTopicToggle = (topic) => {
    const topics = form.topics.includes(topic)
      ? form.topics.filter((t) => t !== topic)
      : [...form.topics, topic];
    handleChange("topics", topics);
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <input
        className={inputClass}
        placeholder="Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Issue"
        value={form.issue}
        onChange={(e) => handleChange("issue", e.target.value)}
      />
      <textarea
        className={`${inputClass} md:col-span-2`}
        placeholder="Description"
        rows={2}
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <input
        type="date"
        className={inputClass}
        value={form.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />
      <select
        className={inputClass}
        value={form.status}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <div className="md:col-span-2">
        <label className={labelClass}>Topics</label>
        <div className="mt-1 flex flex-wrap gap-2">
          {topicsList.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => handleTopicToggle(topic)}
              className={`rounded-full px-3 py-1 text-sm ${
                form.topics.includes(topic)
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              {topic}
            </button>
          ))}
          {topicsList.length === 0 && (
            <span className="text-sm text-slate-400">No topics</span>
          )}
        </div>
      </div>
      <div>
        <label className={labelClass}>Cover Image</label>
        {form.coverImage && (
          <img src={form.coverImage} alt="cover" className="mt-1 h-16 w-auto object-cover rounded" />
        )}
        <input
          type="file"
          accept="image/*"
          className="mt-1"
          onChange={(e) => onCoverUpload(magazine.id, e)}
        />
      </div>
      <div>
        <label className={labelClass}>PDF</label>
        {form.pdfUrl && (
          <a href={form.pdfUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline text-sm">
            Current PDF
          </a>
        )}
        <input
          type="file"
          accept=".pdf"
          className="mt-1"
          onChange={(e) => onPdfUpload(magazine.id, e)}
        />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <button
          onClick={onCancel}
          className="rounded-lg bg-slate-200 px-4 py-2 text-sm dark:bg-slate-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}