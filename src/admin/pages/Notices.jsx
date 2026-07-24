import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { noticesService } from "../services";

export default function Notices() {
  // ---------- All hooks must be called unconditionally ----------
  const [data, setData] = useState(null);
  const [editingAnnIdx, setEditingAnnIdx] = useState(null);
  const [editingEventIdx, setEditingEventIdx] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // ---------- Load data (still after all hooks) ----------
  useEffect(() => {
    const serviceData = noticesService.get() || {};
    const fullData = {
      hero: serviceData.hero || {
        icon: "📋",
        eyebrow: "Stay Informed",
        title: "Notice Board",
        description: "Announcements, academic updates, events and news from across campus.",
      },
      announcements: serviceData.announcements || [],
      events: serviceData.events || [],
    };
    setData(fullData);
  }, []);

  // ---------- Early return AFTER all hooks ----------
  if (!data) return <div>Loading...</div>;

  // ---------- Styling (unchanged) ----------
  const input =
    "w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700";
  const label = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  // ---------- Helpers (unchanged) ----------
  const updateHero = (field, value) => {
    setData((s) => ({
      ...s,
      hero: { ...s.hero, [field]: value },
    }));
  };

  const addAnnouncement = () => {
    setData((s) => ({
      ...s,
      announcements: [
        ...s.announcements,
        {
          id: Date.now(),
          day: "",
          month: "",
          tag: "",
          tagClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
          title: "",
          desc: "",
          status: "draft",
        },
      ],
    }));
  };

  const updateAnnouncement = (idx, field, value) => {
    setData((s) => {
      const next = [...s.announcements];
      next[idx] = { ...next[idx], [field]: value };
      return { ...s, announcements: next };
    });
  };

  const removeAnnouncement = (idx) => {
    if (!window.confirm("Delete this announcement?")) return;
    setData((s) => ({
      ...s,
      announcements: s.announcements.filter((_, i) => i !== idx),
    }));
    setEditingAnnIdx(null);
  };

  const addEvent = () => {
    setData((s) => ({
      ...s,
      events: [
        ...s.events,
        {
          id: Date.now(),
          day: "",
          month: "",
          color: "#ef4444",
          title: "",
          time: "",
          venue: "",
        },
      ],
    }));
  };

  const updateEvent = (idx, field, value) => {
    setData((s) => {
      const next = [...s.events];
      next[idx] = { ...next[idx], [field]: value };
      return { ...s, events: next };
    });
  };

  const removeEvent = (idx) => {
    if (!window.confirm("Delete this event?")) return;
    setData((s) => ({
      ...s,
      events: s.events.filter((_, i) => i !== idx),
    }));
    setEditingEventIdx(null);
  };

  const saveAll = () => {
    noticesService.update(data);
    toast.success("All changes saved");
  };

  // ---------- Filters (now safe) ----------
  const categories = Array.from(new Set(data.announcements.map((a) => a.tag).filter(Boolean)));
  const months = Array.from(new Set(data.announcements.map((a) => a.month).filter(Boolean)));

  let filteredAnnouncements = data.announcements.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter ? a.tag === categoryFilter : true;
    const matchMonth = monthFilter ? a.month === monthFilter : true;
    return matchSearch && matchCategory && matchMonth;
  });

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  filteredAnnouncements = filteredAnnouncements.sort((a, b) => {
    const aIdx = monthOrder.indexOf(a.month);
    const bIdx = monthOrder.indexOf(b.month);
    const aDay = parseInt(a.day) || 0;
    const bDay = parseInt(b.day) || 0;
    if (aIdx !== bIdx) return sortOrder === "newest" ? bIdx - aIdx : aIdx - bIdx;
    return sortOrder === "newest" ? bDay - aDay : aDay - bDay;
  });

  // ---------- Statistics ----------
  const totalNotices = data.announcements.length;
  const publishedNotices = data.announcements.filter((a) => a.status === "published").length;
  const upcomingEvents = data.events.length;
  const totalCategories = categories.length;

  // ---------- Render (unchanged) ----------
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Notice Board</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage hero section, announcements, and events.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{totalNotices}</p>
          <p className="text-sm text-slate-500">Total Notices</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{publishedNotices}</p>
          <p className="text-sm text-slate-500">Published Notices</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{upcomingEvents}</p>
          <p className="text-sm text-slate-500">Upcoming Events</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{totalCategories}</p>
          <p className="text-sm text-slate-500">Categories</p>
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

      {/* Announcements Management */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Announcements</h2>
          <button
            onClick={addAnnouncement}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Announcement
          </button>
        </div>

        {/* Filters */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            className={input}
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "200px" }}
          />
          <select
            className={input}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className={input}
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            className={input}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-slate-400">
                    No announcements found.
                  </td>
                </tr>
              ) : (
                filteredAnnouncements.map((ann, idx) => (
                  <tr key={ann.id || idx} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-2">
                      {ann.day} {ann.month}
                    </td>
                    <td className="px-4 py-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">
                        {ann.tag || "General"}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium">{ann.title}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                          ann.status === "published"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/25"
                        }`}
                      >
                        {ann.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() =>
                          setEditingAnnIdx(editingAnnIdx === idx ? null : idx)
                        }
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        {editingAnnIdx === idx ? "Close" : "Edit"}
                      </button>
                      <button
                        onClick={() => removeAnnouncement(idx)}
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

        {/* Inline edit for announcements */}
        {editingAnnIdx !== null && data.announcements[editingAnnIdx] && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 font-semibold">Edit Announcement</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input
                className={input}
                placeholder="Day"
                value={data.announcements[editingAnnIdx].day}
                onChange={(e) => updateAnnouncement(editingAnnIdx, "day", e.target.value)}
              />
              <input
                className={input}
                placeholder="Month"
                value={data.announcements[editingAnnIdx].month}
                onChange={(e) => updateAnnouncement(editingAnnIdx, "month", e.target.value)}
              />
              <input
                className={input}
                placeholder="Category / Tag"
                value={data.announcements[editingAnnIdx].tag}
                onChange={(e) => updateAnnouncement(editingAnnIdx, "tag", e.target.value)}
              />
              <select
                className={input}
                value={data.announcements[editingAnnIdx].status}
                onChange={(e) => updateAnnouncement(editingAnnIdx, "status", e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <input
                className={input}
                placeholder="Title"
                value={data.announcements[editingAnnIdx].title}
                onChange={(e) => updateAnnouncement(editingAnnIdx, "title", e.target.value)}
              />
              <textarea
                className={`${input} col-span-2`}
                placeholder="Description"
                rows={2}
                value={data.announcements[editingAnnIdx].desc}
                onChange={(e) => updateAnnouncement(editingAnnIdx, "desc", e.target.value)}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setEditingAnnIdx(null)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm dark:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Events Management */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Events</h2>
          <button
            onClick={addEvent}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Event
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Venue</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.events.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-400">
                    No events yet.
                  </td>
                </tr>
              ) : (
                data.events.map((ev, idx) => (
                  <tr key={ev.id || idx} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-2">
                      {ev.day} {ev.month}
                    </td>
                    <td className="px-4 py-2 font-medium">{ev.title}</td>
                    <td className="px-4 py-2">{ev.time}</td>
                    <td className="px-4 py-2">{ev.venue}</td>
                    <td className="px-4 py-2">
                      <span
                        className="inline-block h-4 w-4 rounded-full"
                        style={{ backgroundColor: ev.color }}
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() =>
                          setEditingEventIdx(editingEventIdx === idx ? null : idx)
                        }
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        {editingEventIdx === idx ? "Close" : "Edit"}
                      </button>
                      <button
                        onClick={() => removeEvent(idx)}
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

        {/* Inline edit for events */}
        {editingEventIdx !== null && data.events[editingEventIdx] && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 font-semibold">Edit Event</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input
                className={input}
                placeholder="Day"
                value={data.events[editingEventIdx].day}
                onChange={(e) => updateEvent(editingEventIdx, "day", e.target.value)}
              />
              <input
                className={input}
                placeholder="Month"
                value={data.events[editingEventIdx].month}
                onChange={(e) => updateEvent(editingEventIdx, "month", e.target.value)}
              />
              <input
                className={input}
                placeholder="Title"
                value={data.events[editingEventIdx].title}
                onChange={(e) => updateEvent(editingEventIdx, "title", e.target.value)}
              />
              <input
                className={input}
                placeholder="Time"
                value={data.events[editingEventIdx].time}
                onChange={(e) => updateEvent(editingEventIdx, "time", e.target.value)}
              />
              <input
                className={input}
                placeholder="Venue"
                value={data.events[editingEventIdx].venue}
                onChange={(e) => updateEvent(editingEventIdx, "venue", e.target.value)}
              />
              <input
                className={input}
                type="color"
                value={data.events[editingEventIdx].color}
                onChange={(e) => updateEvent(editingEventIdx, "color", e.target.value)}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setEditingEventIdx(null)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm dark:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveAll}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}