import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { contactsService } from "../services";

export default function ContactMessages() {
  // ---------- State ----------
  const [data, setData] = useState(null);
  const [editingDeptIndex, setEditingDeptIndex] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null); // message id
  const [replyText, setReplyText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // ---------- Load data ----------
  useEffect(() => {
    const serviceData = contactsService.get() || {};
    const fullData = {
      hero: serviceData.hero || {
        title: "Contact Us",
        subtitle: "Get in touch with UCP Rawalpindi...",
        icon: "✉️",
      },
      messages: serviceData.messages || [],
      contactInfo: serviceData.contactInfo || {
        address: "D-464 6th Road, Rawalpindi",
        phone: "(051) 4421672",
        email: "info@ucp.edu.pk",
        postalCode: "46000",
      },
      departments: serviceData.departments || [
        "Computer Science",
        "Business Administration",
        "Engineering",
      ],
      emailSettings: serviceData.emailSettings || {
        receiverEmail: "syedashahnoor1412@gmail.com",
        subject: "New Contact Inquiry",
        autoReply: "Thank you for reaching out. We'll get back to you soon.",
      },
    };
    setData(fullData);
  }, []);

  if (!data) return <div>Loading...</div>;

  // ---------- Styling ----------
  const input =
    "w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white dark:border-slate-700";
  const label = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  // ---------- Helpers ----------
  const updateHero = (field, value) => {
    setData((s) => ({ ...s, hero: { ...s.hero, [field]: value } }));
  };

  const updateContactInfo = (field, value) => {
    setData((s) => ({ ...s, contactInfo: { ...s.contactInfo, [field]: value } }));
  };

  const updateEmailSettings = (field, value) => {
    setData((s) => ({ ...s, emailSettings: { ...s.emailSettings, [field]: value } }));
  };

  // ---------- Messages ----------
  const markRead = (id) => {
    const msg = data.messages.find((m) => m.id === id);
    if (!msg) return;
    const newStatus = msg.status === "read" ? "unread" : "read";
    contactsService.patch(id, { status: newStatus });
    setData((s) => ({
      ...s,
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, status: newStatus } : m
      ),
    }));
    toast.success(`Marked as ${newStatus}`);
  };

  const deleteMessage = (id) => {
    if (!window.confirm("Delete this message?")) return;
    contactsService.delete?.(id); // if service supports delete
    setData((s) => ({
      ...s,
      messages: s.messages.filter((m) => m.id !== id),
    }));
    toast.success("Message deleted");
  };

  const replyToMessage = (id) => {
    const msg = data.messages.find((m) => m.id === id);
    if (!msg) return;
    // Open mailto with pre-filled
    const subject = encodeURIComponent(`Re: ${data.emailSettings.subject}`);
    const body = encodeURIComponent(
      `Hi ${msg.name},\n\n${replyText || "Thank you for your inquiry."}\n\n--\n${data.emailSettings.autoReply}`
    );
    window.location.href = `mailto:${msg.email}?subject=${subject}&body=${body}`;
    // Update status to replied
    contactsService.patch(id, { status: "replied" });
    setData((s) => ({
      ...s,
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, status: "replied" } : m
      ),
    }));
    setReplyingTo(null);
    setReplyText("");
    toast.success("Reply sent (via mailto)");
  };

  // ---------- Departments ----------
  const addDepartment = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return toast.error("Department name is required");
    if (data.departments.includes(trimmed))
      return toast.error("Department already exists");
    setData((s) => ({
      ...s,
      departments: [...s.departments, trimmed],
    }));
    toast.success("Department added");
  };

  const updateDepartment = (index, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return toast.error("Name cannot be empty");
    const updated = [...data.departments];
    updated[index] = trimmed;
    setData((s) => ({ ...s, departments: updated }));
    setEditingDeptIndex(null);
    toast.success("Department updated");
  };

  const deleteDepartment = (index) => {
    if (!window.confirm("Delete this department?")) return;
    setData((s) => ({
      ...s,
      departments: s.departments.filter((_, i) => i !== index),
    }));
    toast.success("Department deleted");
  };

  // ---------- Save all ----------
  const saveAll = () => {
    contactsService.update(data);
    toast.success("All changes saved");
  };

  // ---------- Statistics ----------
  const totalMessages = data.messages.length;
  const unreadMessages = data.messages.filter((m) => m.status === "unread").length;
  const repliedMessages = data.messages.filter((m) => m.status === "replied").length;
  const today = new Date().toISOString().split("T")[0];
  const todayMessages = data.messages.filter((m) => m.createdAt?.startsWith(today)).length;

  // ---------- Analytics (computed) ----------
  const getMonthlyCounts = () => {
    const counts = {};
    data.messages.forEach((m) => {
      if (m.createdAt) {
        const month = m.createdAt.slice(0, 7); // YYYY-MM
        counts[month] = (counts[month] || 0) + 1;
      }
    });
    return Object.entries(counts).sort();
  };

  const getDepartmentCounts = () => {
    const counts = {};
    data.messages.forEach((m) => {
      const dept = m.interest || "Unknown";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const getCityCounts = () => {
    const counts = {};
    data.messages.forEach((m) => {
      const city = m.city || "Unknown";
      counts[city] = (counts[city] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  // ---------- Filtered messages ----------
  const filteredMessages = data.messages.filter((m) => {
    const matchSearch =
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" ? true : m.status === filterStatus;
    const matchDate = dateFilter ? m.createdAt?.startsWith(dateFilter) : true;
    return matchSearch && matchStatus && matchDate;
  });

  // ---------- Render ----------
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Contact Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage contact messages, hero, contact info, departments, and email settings.
        </p>
      </div>

      {/* Notification Badge */}
      <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 dark:bg-amber-900/20">
        <span className="text-xl">🔔</span>
        <span>
          {unreadMessages > 0
            ? `You have ${unreadMessages} unread message${unreadMessages > 1 ? "s" : ""}.`
            : "No unread messages."}
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{totalMessages}</p>
          <p className="text-sm text-slate-500">Total Messages</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{unreadMessages}</p>
          <p className="text-sm text-slate-500">Unread</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{repliedMessages}</p>
          <p className="text-sm text-slate-500">Replied</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{todayMessages}</p>
          <p className="text-sm text-slate-500">Today's Inquiries</p>
        </div>
      </div>

      {/* ===== Hero Section ===== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Hero Section</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
              <label className={label}>Title</label>
              <input
                className={input}
                placeholder="Title"
                value={data.hero.title}
                onChange={(e) => updateHero("title", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Subtitle</label>
              <input
                className={input}
                placeholder="Subtitle"
                value={data.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact Information ===== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className={label}>Address</label>
              <input
                className={input}
                placeholder="Address"
                value={data.contactInfo.address}
                onChange={(e) => updateContactInfo("address", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Phone</label>
              <input
                className={input}
                placeholder="Phone"
                value={data.contactInfo.phone}
                onChange={(e) => updateContactInfo("phone", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Email</label>
              <input
                className={input}
                placeholder="Email"
                value={data.contactInfo.email}
                onChange={(e) => updateContactInfo("email", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Postal Code</label>
              <input
                className={input}
                placeholder="Postal Code"
                value={data.contactInfo.postalCode}
                onChange={(e) => updateContactInfo("postalCode", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Departments (Academic Interest) ===== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Departments (Academic Interest)</h2>
          <button
            onClick={() => {
              const name = prompt("Enter new department name:");
              if (name) addDepartment(name);
            }}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
          >
            + Add Department
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {data.departments.map((dept, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
            >
              {editingDeptIndex === idx ? (
                <div className="flex w-full gap-2">
                  <input
                    className={input}
                    defaultValue={dept}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateDepartment(idx, e.target.value);
                      }
                    }}
                    id={`dept-edit-${idx}`}
                  />
                  <button
                    onClick={() => {
                      const inp = document.getElementById(`dept-edit-${idx}`);
                      updateDepartment(idx, inp.value);
                    }}
                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingDeptIndex(null)}
                    className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm dark:bg-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{dept}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingDeptIndex(idx)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDepartment(idx)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {data.departments.length === 0 && (
            <p className="text-sm text-slate-400">No departments added yet.</p>
          )}
        </div>
      </section>

      {/* ===== Messages ===== */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Contact Messages</h2>
        </div>

        {/* Filters */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            className={input}
            placeholder="Search by name, email, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "250px" }}
          />
          <select
            className={input}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <input
            type="date"
            className={input}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ width: "180px" }}
          />
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Interest</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-slate-400">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-2 font-medium">{msg.name}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td className="px-4 py-2">{msg.interest || "—"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                          msg.status === "unread"
                            ? "bg-rose-500/15 text-rose-300 border-rose-500/25"
                            : msg.status === "replied"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                            : "bg-blue-500/15 text-blue-300 border-blue-500/25"
                        }`}
                      >
                        {msg.status || "unread"}
                      </span>
                    </td>
                    <td className="px-4 py-2">{msg.createdAt?.slice(0, 10) || "—"}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => markRead(msg.id)}
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        {msg.status === "read" ? "Unread" : "Read"}
                      </button>
                      <button
                        onClick={() => setReplyingTo(msg.id)}
                        className="mr-2 text-indigo-500 hover:underline"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
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

        {/* Reply Modal */}
        {replyingTo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-slate-900 dark:border dark:border-slate-700">
              <h3 className="mb-3 text-lg font-semibold">Reply to Message</h3>
              <textarea
                className={`${input} h-32`}
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText("");
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => replyToMessage(replyingTo)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
                >
                  Send Reply (mailto)
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== Email Settings ===== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Email Settings</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className={label}>Receiver Email</label>
              <input
                className={input}
                placeholder="Receiver Email"
                value={data.emailSettings.receiverEmail}
                onChange={(e) => updateEmailSettings("receiverEmail", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Email Subject</label>
              <input
                className={input}
                placeholder="Subject"
                value={data.emailSettings.subject}
                onChange={(e) => updateEmailSettings("subject", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={label}>Auto‑Reply Message</label>
              <textarea
                className={`${input} h-24`}
                placeholder="Auto‑reply message"
                value={data.emailSettings.autoReply}
                onChange={(e) => updateEmailSettings("autoReply", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Analytics ===== */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Message Analytics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Messages per month */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold">Messages per Month</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {getMonthlyCounts().map(([month, count]) => (
                <li key={month} className="flex justify-between">
                  <span>{month}</span>
                  <span className="font-bold">{count}</span>
                </li>
              ))}
              {getMonthlyCounts().length === 0 && (
                <li className="text-slate-400">No data</li>
              )}
            </ul>
          </div>

          {/* Most selected department */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold">Top Departments</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {getDepartmentCounts().map(([dept, count]) => (
                <li key={dept} className="flex justify-between">
                  <span>{dept}</span>
                  <span className="font-bold">{count}</span>
                </li>
              ))}
              {getDepartmentCounts().length === 0 && (
                <li className="text-slate-400">No data</li>
              )}
            </ul>
          </div>

          {/* City inquiries */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold">Inquiries by City</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {getCityCounts().map(([city, count]) => (
                <li key={city} className="flex justify-between">
                  <span>{city}</span>
                  <span className="font-bold">{count}</span>
                </li>
              ))}
              {getCityCounts().length === 0 && (
                <li className="text-slate-400">No data</li>
              )}
            </ul>
          </div>
        </div>
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