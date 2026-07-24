import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createLocalCrudService } from "../services/localCrud";
import { SOCIETIES } from "../config/societies";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Users,
  Calendar,
  Award,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  RefreshCw,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Target,
  Activity,
  EyeOff,
  CheckCircle,
  Circle,
  Loader2,
} from "lucide-react";

// ----- Constants & Defaults -----
const HERO_STORAGE_KEY = "societies_hero";
const defaultHero = {
  eyebrow: "Student Life",
  title: "Clubs &",
  gradientText: "Societies",
  description: "Engage, network, and grow with our vibrant student communities.",
};

// ----- Updated empty society (new schema) -----
const emptySociety = {
  name: "",
  logo: "",
  icon: "",
  tagline: "",
  tag: "",
  description: "",
  headOfSociety: {
    name: "",
    designation: "",
    phone: "",
    image: "",
  },
  mission: "",
  objectives: [],
  activities: [],
  vision: "",
  contact: {
    phone: "",
    email: "",
    office: "",
  },
  motto: "",
  status: "active",
};

const emptyTeamMember = {
  name: "",
  designation: "",
  image: "",
  skills: [],
  linkedin: "",
  github: "",
};

// ----- Helpers for hero -----
const loadHero = () => {
  const stored = localStorage.getItem(HERO_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultHero;
    }
  }
  return defaultHero;
};
const saveHero = (hero) => localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(hero));

// ----- Main Component -----
export default function SocietyManager() {
  const { societyKey } = useParams();
  const society = SOCIETIES.find((s) => s.key === societyKey);
  if (!society) {
    return (
      <div className="p-6 text-center text-slate-500">
        <h2 className="text-xl font-semibold">Invalid Society</h2>
        <p>Please select a valid society from the sidebar.</p>
      </div>
    );
  }

  // ----- Services -----
  const service = createLocalCrudService({ key: society.storageKey, defaults: [] });
  let teamService = null;
  if (societyKey === "devforge") {
    teamService = createLocalCrudService({ key: "devforge_team", defaults: [] });
  }

  // ----- State -----
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name"); // 'name' | 'status'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [hero, setHero] = useState(defaultHero);
  const [heroOpen, setHeroOpen] = useState(true);

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptySociety);
  const [showForm, setShowForm] = useState(false);
  const [objInput, setObjInput] = useState("");
  const [actInput, setActInput] = useState("");

  // Team state (only for devforge)
  const [showTeamManager, setShowTeamManager] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [teamForm, setTeamForm] = useState(emptyTeamMember);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamSkillInput, setTeamSkillInput] = useState("");

  // View details modal
  const [viewingSociety, setViewingSociety] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // ----- Load data -----
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = service.all();
        setSocieties(data);
        if (teamService) {
          const teamData = teamService.all();
          setTeamMembers(teamData);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
    setHero(loadHero());
  }, [societyKey]);

  // ----- CRUD helpers -----
  const refreshList = () => {
    try {
      const data = service.all();
      setSocieties(data);
    } catch (err) {
      toast.error("Failed to refresh");
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptySociety);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    try {
      const item = service.get(id);
      if (item) {
        // Ensure nested objects exist
        const safe = {
          ...item,
          headOfSociety: item.headOfSociety || { name: "", designation: "", phone: "", image: "" },
          contact: item.contact || { phone: "", email: "", office: "" },
          objectives: Array.isArray(item.objectives) ? item.objectives : [],
          activities: Array.isArray(item.activities) ? item.activities : [],
        };
        setEditingId(id);
        setFormData(safe);
        setShowForm(true);
      }
    } catch (err) {
      toast.error("Failed to load item");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this society?")) return;
    try {
      service.remove(id);
      refreshList();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = () => {
    if (!formData.name?.trim()) {
      toast.error("Society Name is required");
      return;
    }
    try {
      const toSave = {
        ...formData,
        objectives: formData.objectives || [],
        activities: formData.activities || [],
        status: formData.status || "active",
      };
      if (editingId) {
        service.update(editingId, toSave);
        toast.success("Updated");
      } else {
        service.create(toSave);
        toast.success("Added");
      }
      refreshList();
      setShowForm(false);
      setEditingId(null);
      setFormData(emptySociety);
    } catch (err) {
      toast.error("Save failed");
    }
  };

  // ----- Objectives / Activities helpers -----
  const addObjective = () => {
    if (objInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        objectives: [...(prev.objectives || []), objInput.trim()],
      }));
      setObjInput("");
    }
  };
  const removeObjective = (idx) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== idx),
    }));
  };
  const addActivity = () => {
    if (actInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        activities: [...(prev.activities || []), actInput.trim()],
      }));
      setActInput("");
    }
  };
  const removeActivity = (idx) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== idx),
    }));
  };

  // ----- Team CRUD -----
  const refreshTeam = () => {
    if (teamService) {
      try {
        const data = teamService.all();
        setTeamMembers(data);
      } catch (e) {
        toast.error("Failed to refresh team");
      }
    }
  };

  const handleAddTeam = () => {
    setEditingTeamId(null);
    setTeamForm({ ...emptyTeamMember, skills: [] });
    setShowTeamForm(true);
  };
  const handleEditTeam = (id) => {
    if (teamService) {
      try {
        const item = teamService.get(id);
        if (item) {
          setTeamForm({
            ...item,
            skills: Array.isArray(item.skills) ? item.skills : [],
          });
          setEditingTeamId(id);
          setShowTeamForm(true);
        }
      } catch (e) {
        toast.error("Failed to load member");
      }
    }
  };
  const handleDeleteTeam = (id) => {
    if (!window.confirm("Delete team member?")) return;
    if (teamService) {
      try {
        teamService.remove(id);
        refreshTeam();
        toast.success("Deleted");
      } catch (e) {
        toast.error("Delete failed");
      }
    }
  };
  const handleSubmitTeam = () => {
    if (!teamForm.name?.trim()) {
      toast.error("Name required");
      return;
    }
    if (teamService) {
      try {
        const toSave = {
          ...teamForm,
          skills: teamForm.skills || [],
        };
        if (editingTeamId) {
          teamService.update(editingTeamId, toSave);
        } else {
          teamService.create(toSave);
        }
        refreshTeam();
        setShowTeamForm(false);
        setEditingTeamId(null);
        setTeamForm(emptyTeamMember);
        toast.success("Saved");
      } catch (e) {
        toast.error("Save failed");
      }
    }
  };
  const addTeamSkill = () => {
    if (teamSkillInput.trim()) {
      setTeamForm((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), teamSkillInput.trim()],
      }));
      setTeamSkillInput("");
    }
  };
  const removeTeamSkill = (idx) => {
    setTeamForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  // ----- Hero update -----
  const updateHero = (field, value) => {
    const updated = { ...hero, [field]: value };
    setHero(updated);
    saveHero(updated);
    toast.success("Hero updated");
  };

  // ----- Filters, Sorting, Pagination -----
  const allTags = Array.from(new Set(societies.map((s) => s.tag).filter(Boolean)));

  let filtered = societies.filter((item) => {
    const matchSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tagline || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tag || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchTag = filterTag === "all" || item.tag === filterTag;
    const matchStatus = filterStatus === "all" || item.status === filterStatus;
    return matchSearch && matchTag && matchStatus;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === "name") {
      return a.name?.localeCompare(b.name || "") || 0;
    } else if (sortBy === "status") {
      return (a.status === "active" ? 0 : 1) - (b.status === "active" ? 0 : 1);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const total = societies.length;
  const active = societies.filter((s) => s.status === "active").length;
  const members = societies.reduce((acc, s) => acc + (s.headOfSociety?.name ? 1 : 0), 0); // dummy
  const events = societies.reduce((acc, s) => acc + (s.activities?.length || 0), 0);

  // ----- Loading -----
  if (loading) {
    return (
      <div className="space-y-4 p-4 max-w-6xl mx-auto">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
      </div>
    );
  }
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  // ========================= RENDER =========================
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          {society.label} Management
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage societies, hero, and team (for DevForge)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Societies" value={total} icon={Users} color="indigo" />
        <StatCard label="Active Societies" value={active} icon={Award} color="green" />
        <StatCard label="Total Members" value={members} icon={User} color="blue" />
        <StatCard label="Activities" value={events} icon={Activity} color="purple" />
      </div>

      {/* Hero Section */}
      <div className="glass-card p-4 rounded-3xl">
        <div
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setHeroOpen(!heroOpen)}
        >
          <h2 className="text-lg font-semibold text-white">Hero Section</h2>
          <button className="text-white/70 hover:text-white">
            {heroOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        {heroOpen && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Eyebrow"
              value={hero.eyebrow}
              onChange={(e) => updateHero("eyebrow", e.target.value)}
              placeholder="Student Life"
            />
            <InputField
              label="Title"
              value={hero.title}
              onChange={(e) => updateHero("title", e.target.value)}
              placeholder="Clubs &"
            />
            <InputField
              label="Gradient Text"
              value={hero.gradientText}
              onChange={(e) => updateHero("gradientText", e.target.value)}
              placeholder="Societies"
            />
            <div className="md:col-span-2">
              <InputField
                label="Description"
                value={hero.description}
                onChange={(e) => updateHero("description", e.target.value)}
                placeholder="Engage, network, and grow..."
                multiline
                rows={2}
              />
            </div>
          </div>
        )}
      </div>

      {/* Society Table */}
      <div className="glass-card p-4 rounded-3xl">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                className="pl-9 pr-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option value="all">All Categories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCurrentPage(1); refreshList(); }}
              className="glass-btn px-3 py-2 rounded-xl flex items-center gap-1 text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={handleAdd}
              className="gradient-btn px-4 py-2 rounded-xl flex items-center gap-1 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Society
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white/90">
            <thead className="text-left text-white/50 border-b border-white/10">
              <tr>
                <th className="py-2 px-2">Logo</th>
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2 hidden md:table-cell">Category</th>
                <th className="py-2 px-2 hidden lg:table-cell">Tagline</th>
                <th className="py-2 px-2 hidden xl:table-cell">Head</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-white/40">No societies found.</td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-2 px-2">
                      {item.logo ? (
                        <img src={item.logo} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
                          {item.icon || "📌"}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-2 font-medium">{item.name}</td>
                    <td className="py-2 px-2 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                        {item.tag || "General"}
                      </span>
                    </td>
                    <td className="py-2 px-2 hidden lg:table-cell text-white/60">{item.tagline}</td>
                    <td className="py-2 px-2 hidden xl:table-cell">{item.headOfSociety?.name || "-"}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        item.status === "active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}>
                        {item.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setViewingSociety(item); setShowViewModal(true); }}
                          className="p-1 hover:text-indigo-300 transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(item.id)} className="p-1 hover:text-indigo-300 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-1 hover:text-red-300 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {societyKey === "devforge" && (
                          <button
                            onClick={() => setShowTeamManager(true)}
                            className="p-1 hover:text-cyan-300 transition"
                            title="Manage Team"
                          >
                            <Users className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 text-white/60 text-sm">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-xl border border-white/10 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-xl border border-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---- Add/Edit Modal (Glass) ---- */}
      {showForm && (
        <GlassModal onClose={() => setShowForm(false)} title={editingId ? "Edit Society" : "Add Society"}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Info */}
              <InputField
                label="Society Name *"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="DevForge"
              />
              <InputField
                label="Logo URL"
                value={formData.logo || ""}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://..."
              />
              <InputField
                label="Icon (FontAwesome class or emoji)"
                value={formData.icon || ""}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="fa-code or 📌"
              />
              <InputField
                label="Tagline"
                value={formData.tagline || ""}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Build the Future"
              />
              <InputField
                label="Category Tag"
                value={formData.tag || ""}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Technology"
              />
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Status</label>
                <select
                  className="w-full rounded-xl border border-white/20 bg-white/10 text-white px-3 py-2 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
                  value={formData.status || "active"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Full description..."
                  multiline
                  rows={3}
                />
              </div>

              {/* Head of Society */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-white/70 mb-2">Head of Society</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    label="Name"
                    value={formData.headOfSociety?.name || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfSociety: { ...formData.headOfSociety, name: e.target.value }
                    })}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Designation"
                    value={formData.headOfSociety?.designation || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfSociety: { ...formData.headOfSociety, designation: e.target.value }
                    })}
                    placeholder="President"
                  />
                  <InputField
                    label="Phone"
                    value={formData.headOfSociety?.phone || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfSociety: { ...formData.headOfSociety, phone: e.target.value }
                    })}
                    placeholder="+92-..."
                  />
                  <InputField
                    label="Profile Image URL"
                    value={formData.headOfSociety?.image || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfSociety: { ...formData.headOfSociety, image: e.target.value }
                    })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Mission */}
              <div className="md:col-span-2">
                <InputField
                  label="Mission"
                  value={formData.mission || ""}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  placeholder="Our mission is..."
                  multiline
                  rows={2}
                />
              </div>

              {/* Objectives */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-white/50 mb-1">Objectives</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 rounded-xl border border-white/20 bg-white/10 text-white px-3 py-2 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
                    placeholder="Add objective"
                    value={objInput}
                    onChange={(e) => setObjInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addObjective()}
                  />
                  <button onClick={addObjective} className="gradient-btn px-3 py-2 rounded-xl text-sm">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.objectives?.map((obj, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs text-white/80">
                      {obj}
                      <button onClick={() => removeObjective(idx)} className="hover:text-red-300">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-white/50 mb-1">Activities</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 rounded-xl border border-white/20 bg-white/10 text-white px-3 py-2 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
                    placeholder="Add activity"
                    value={actInput}
                    onChange={(e) => setActInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addActivity()}
                  />
                  <button onClick={addActivity} className="gradient-btn px-3 py-2 rounded-xl text-sm">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.activities?.map((act, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs text-white/80">
                      {act}
                      <button onClick={() => removeActivity(idx)} className="hover:text-red-300">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Vision */}
              <div className="md:col-span-2">
                <InputField
                  label="Vision"
                  value={formData.vision || ""}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Our vision..."
                  multiline
                  rows={2}
                />
              </div>

              {/* Contact */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-white/70 mb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <InputField
                    label="Phone"
                    value={formData.contact?.phone || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })}
                    placeholder="+92-..."
                  />
                  <InputField
                    label="Email"
                    value={formData.contact?.email || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })}
                    placeholder="society@univ.edu"
                  />
                  <InputField
                    label="Office"
                    value={formData.contact?.office || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, office: e.target.value }
                    })}
                    placeholder="Room 301, CS Building"
                  />
                </div>
              </div>

              {/* Motto */}
              <div className="md:col-span-2">
                <InputField
                  label="Motto"
                  value={formData.motto || ""}
                  onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                  placeholder="Innovate together"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="gradient-btn px-6 py-2 rounded-xl font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </form>
        </GlassModal>
      )}

      {/* ---- View Details Modal ---- */}
      {showViewModal && viewingSociety && (
        <GlassModal onClose={() => setShowViewModal(false)} title="Society Details">
          <div className="space-y-4 text-white/80">
            <div className="flex items-center gap-4">
              {viewingSociety.logo ? (
                <img src={viewingSociety.logo} alt={viewingSociety.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl">
                  {viewingSociety.icon || "📌"}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{viewingSociety.name}</h3>
                <p className="text-sm text-white/50">{viewingSociety.tagline}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p><span className="text-white/50">Category:</span> {viewingSociety.tag || "-"}</p>
              <p><span className="text-white/50">Status:</span> 
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  viewingSociety.status === "active" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                }`}>
                  {viewingSociety.status === "active" ? "Active" : "Inactive"}
                </span>
              </p>
              <p className="md:col-span-2"><span className="text-white/50">Description:</span> {viewingSociety.description || "-"}</p>
              <p className="md:col-span-2"><span className="text-white/50">Mission:</span> {viewingSociety.mission || "-"}</p>
              <p className="md:col-span-2"><span className="text-white/50">Vision:</span> {viewingSociety.vision || "-"}</p>
              <p className="md:col-span-2"><span className="text-white/50">Motto:</span> {viewingSociety.motto || "-"}</p>
              <div className="md:col-span-2">
                <span className="text-white/50">Objectives:</span>
                <ul className="list-disc list-inside">
                  {viewingSociety.objectives?.map((o, i) => <li key={i}>{o}</li>) || <li>None</li>}
                </ul>
              </div>
              <div className="md:col-span-2">
                <span className="text-white/50">Activities:</span>
                <ul className="list-disc list-inside">
                  {viewingSociety.activities?.map((a, i) => <li key={i}>{a}</li>) || <li>None</li>}
                </ul>
              </div>
              <div className="md:col-span-2">
                <span className="text-white/50">Head of Society:</span>
                <div className="mt-1 p-3 bg-white/5 rounded-xl">
                  <p><span className="text-white/50">Name:</span> {viewingSociety.headOfSociety?.name || "-"}</p>
                  <p><span className="text-white/50">Designation:</span> {viewingSociety.headOfSociety?.designation || "-"}</p>
                  <p><span className="text-white/50">Phone:</span> {viewingSociety.headOfSociety?.phone || "-"}</p>
                  {viewingSociety.headOfSociety?.image && (
                    <img src={viewingSociety.headOfSociety.image} alt="Head" className="w-12 h-12 rounded-full mt-2" />
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="text-white/50">Contact:</span>
                <div className="mt-1 p-3 bg-white/5 rounded-xl">
                  <p><span className="text-white/50">Phone:</span> {viewingSociety.contact?.phone || "-"}</p>
                  <p><span className="text-white/50">Email:</span> {viewingSociety.contact?.email || "-"}</p>
                  <p><span className="text-white/50">Office:</span> {viewingSociety.contact?.office || "-"}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowViewModal(false)} className="glass-btn px-4 py-2 rounded-xl">
                Close
              </button>
            </div>
          </div>
        </GlassModal>
      )}

      {/* ---- DevForge Team Manager (Glass) ---- */}
      {showTeamManager && societyKey === "devforge" && (
        <GlassModal onClose={() => setShowTeamManager(false)} title="DevForge Team Management">
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={handleAddTeam} className="gradient-btn px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>
            {teamMembers.length === 0 ? (
              <div className="text-center text-white/40 py-8">No team members yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="glass-card p-3 rounded-2xl hover:scale-105 transition flex items-start gap-3">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-white/50" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-white/60">{member.designation}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.skills?.map((s, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">{s}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-1">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white">LinkedIn</a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white">GitHub</a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditTeam(member.id)} className="p-1 hover:text-indigo-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteTeam(member.id)} className="p-1 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassModal>
      )}

      {/* ---- Team Add/Edit Form (inside modal) ---- */}
      {showTeamForm && (
        <GlassModal onClose={() => setShowTeamForm(false)} title={editingTeamId ? "Edit Team Member" : "Add Team Member"}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name *"
                value={teamForm.name || ""}
                onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                placeholder="John Doe"
              />
              <InputField
                label="Designation"
                value={teamForm.designation || ""}
                onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                placeholder="Lead Developer"
              />
              <InputField
                label="Image URL"
                value={teamForm.image || ""}
                onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                placeholder="https://..."
              />
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Skills</label>
                <div className="flex flex-wrap gap-1 mb-1">
                  {teamForm.skills?.map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-xs text-white/80">
                      {s}
                      <button onClick={() => removeTeamSkill(idx)} className="hover:text-red-300">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl border border-white/20 bg-white/10 text-white px-3 py-1 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none"
                    placeholder="Add skill"
                    value={teamSkillInput}
                    onChange={(e) => setTeamSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTeamSkill()}
                  />
                  <button onClick={addTeamSkill} className="gradient-btn px-3 py-1 rounded-xl text-sm">Add</button>
                </div>
              </div>
              <InputField
                label="LinkedIn URL"
                value={teamForm.linkedin || ""}
                onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
              <InputField
                label="GitHub URL"
                value={teamForm.github || ""}
                onChange={(e) => setTeamForm({ ...teamForm, github: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowTeamForm(false)} className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition">
                Cancel
              </button>
              <button onClick={handleSubmitTeam} className="gradient-btn px-6 py-2 rounded-xl font-medium flex items-center gap-2">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </form>
        </GlassModal>
      )}
    </div>
  );
}

// ========================= HELPER COMPONENTS =========================

function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    indigo: "from-indigo-500 to-purple-500",
    green: "from-green-500 to-emerald-500",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
  };
  return (
    <div className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color]} bg-opacity-20`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-white/50">{label}</div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline = false, rows = 1, className = "" }) {
  const base =
    "w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 px-4 py-2.5 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400/50 outline-none transition";
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-white/50 mb-1">{label}</label>
      {multiline ? (
        <textarea className={base} rows={rows} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input className={base} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

function GlassModal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl relative animate-slideUp">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}