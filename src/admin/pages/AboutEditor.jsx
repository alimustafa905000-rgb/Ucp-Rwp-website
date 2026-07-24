import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { aboutService } from "../services";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  FileText,
  Clock,
  Users,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ----- Default data (matches your About page) -----
const DEFAULT_DATA = {
  hero: {
    eyebrow: "About Us",
    title: "Crafting",
    gradientText: "Digital Excellence",
    description:
      "We're a team of passionate innovators dedicated to building solutions that empower businesses and transform industries.",
  },
  intro: {
    heading: "A legacy of",
    highlight: "excellence",
    paragraph1:
      "For over two decades, we've been at the forefront of digital transformation. From our humble beginnings in 1999 to becoming a global leader, our journey has been defined by a relentless pursuit of quality and customer success.",
    paragraph2:
      "Today, we work with over 2,500 teams across 50+ countries, delivering solutions that make a real difference. Our commitment to innovation continues to drive everything we do.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    overlayText: "Our team at work — building the future, together",
    stats: [
      { number: "25+", label: "Years Experience" },
      { number: "2,500+", label: "Teams Trust Us" },
      { number: "50+", label: "Countries Served" },
      { number: "99.9%", label: "Uptime Guaranteed" },
    ],
  },
  timeline: [
    {
      year: "1999",
      title: "Founded in 1999",
      description: "Started with a small team of 5 in a garage.",
      icon: "🏢",
    },
    {
      year: "2005",
      title: "Global Expansion",
      description: "Opened first international office, expanded to 10+ countries.",
      icon: "🌍",
    },
    {
      year: "2010",
      title: "1,000th Client",
      description: "Reached 1,000 clients, cementing industry reputation.",
      icon: "🚀",
    },
    {
      year: "2015",
      title: "AI Innovation Hub",
      description: "Launched dedicated AI research division.",
      icon: "💡",
    },
    {
      year: "2024",
      title: "2,500+ Teams",
      description: "Serving over 2,500 teams across 50+ countries.",
      icon: "🏆",
    },
  ],
  leadership: [
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      name: "John Smith",
      role: "CEO & Founder",
      organization: "UCP",
      joiningYear: "Since 1999",
      quote:
        '"Innovation is not just about technology—it\'s about creating meaningful change."',
      bio: "With 25+ years of experience, John has led the company from a small startup to a global force.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      organization: "UCP",
      joiningYear: "Since 2010",
      quote: '"Technology should serve people, not the other way around."',
      bio: "Sarah drives our technical vision and has been instrumental in our AI innovation journey.",
    },
  ],
  values: [
    {
      frontIcon: "🎯",
      title: "Innovation",
      shortDescription: "Pushing boundaries and redefining what's possible",
      backIcon: "🚀",
      detailedDescription:
        "We embrace creativity and continuous improvement to deliver breakthrough solutions.",
    },
    {
      frontIcon: "🤝",
      title: "Integrity",
      shortDescription: "Honest, transparent, and ethical in everything",
      backIcon: "⭐",
      detailedDescription:
        "We build trust through transparency, honesty, and doing the right thing.",
    },
    {
      frontIcon: "👥",
      title: "Collaboration",
      shortDescription: "Stronger together through teamwork",
      backIcon: "🤲",
      detailedDescription:
        "We believe the best solutions emerge from diverse perspectives working together.",
    },
    {
      frontIcon: "💡",
      title: "Excellence",
      shortDescription: "Setting and surpassing high standards",
      backIcon: "🏆",
      detailedDescription:
        "We strive for perfection in every project, exceeding expectations at every turn.",
    },
    {
      frontIcon: "🌍",
      title: "Sustainability",
      shortDescription: "Building a better future for everyone",
      backIcon: "🌱",
      detailedDescription:
        "We're committed to creating solutions that benefit both business and the planet.",
    },
  ],
};

// ----- Empty templates for forms -----
const emptyStat = { number: "", label: "" };
const emptyTimeline = { year: "", title: "", description: "", icon: "" };
const emptyLeader = {
  image: "",
  name: "",
  role: "",
  organization: "",
  joiningYear: "",
  quote: "",
  bio: "",
};
const emptyValue = {
  frontIcon: "",
  title: "",
  shortDescription: "",
  backIcon: "",
  detailedDescription: "",
};

export default function AboutEditor() {
  const [data, setData] = useState(null);
  // Editing states
  const [editingStat, setEditingStat] = useState(null);
  const [editingTimeline, setEditingTimeline] = useState(null);
  const [editingLeader, setEditingLeader] = useState(null);
  const [editingValue, setEditingValue] = useState(null);
  // Form states
  const [statForm, setStatForm] = useState(emptyStat);
  const [timelineForm, setTimelineForm] = useState(emptyTimeline);
  const [leaderForm, setLeaderForm] = useState(emptyLeader);
  const [valueForm, setValueForm] = useState(emptyValue);
  // Section toggles
  const [sections, setSections] = useState({
    hero: true,
    intro: true,
    timeline: true,
    leadership: true,
    values: true,
  });

  useEffect(() => {
    // Load from service, fallback to default if empty
    const loaded = aboutService.get();
    // Merge with defaults to ensure all fields exist
    setData({ ...DEFAULT_DATA, ...loaded });
  }, []);

  if (!data) return <div>Loading...</div>;

  const save = () => {
    aboutService.update(data);
    toast.success("About page updated successfully 🎉");
  };

  // ----- Helpers to update nested fields -----
  const updateHero = (field, value) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };
  const updateIntro = (field, value) => {
    setData((prev) => ({ ...prev, intro: { ...prev.intro, [field]: value } }));
  };

  // ----- STATS CRUD -----
  const addStat = () => {
    if (!statForm.number.trim() || !statForm.label.trim()) {
      toast.error("Please fill both number and label");
      return;
    }
    const newStat = { ...statForm };
    if (editingStat !== null) {
      const updatedStats = [...data.intro.stats];
      updatedStats[editingStat] = newStat;
      setData((prev) => ({
        ...prev,
        intro: { ...prev.intro, stats: updatedStats },
      }));
      setEditingStat(null);
    } else {
      setData((prev) => ({
        ...prev,
        intro: { ...prev.intro, stats: [...prev.intro.stats, newStat] },
      }));
    }
    setStatForm(emptyStat);
  };

  const editStat = (index) => {
    setStatForm(data.intro.stats[index]);
    setEditingStat(index);
  };

  const deleteStat = (index) => {
    const updatedStats = data.intro.stats.filter((_, i) => i !== index);
    setData((prev) => ({
      ...prev,
      intro: { ...prev.intro, stats: updatedStats },
    }));
    if (editingStat === index) {
      setEditingStat(null);
      setStatForm(emptyStat);
    }
  };

  // ----- TIMELINE CRUD -----
  const addTimeline = () => {
    if (!timelineForm.year.trim() || !timelineForm.title.trim()) {
      toast.error("Please fill at least Year and Title");
      return;
    }
    const newItem = { ...timelineForm };
    if (editingTimeline !== null) {
      const updated = [...data.timeline];
      updated[editingTimeline] = newItem;
      setData((prev) => ({ ...prev, timeline: updated }));
      setEditingTimeline(null);
    } else {
      setData((prev) => ({ ...prev, timeline: [...prev.timeline, newItem] }));
    }
    setTimelineForm(emptyTimeline);
  };

  const editTimeline = (index) => {
    setTimelineForm(data.timeline[index]);
    setEditingTimeline(index);
  };

  const deleteTimeline = (index) => {
    const updated = data.timeline.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, timeline: updated }));
    if (editingTimeline === index) {
      setEditingTimeline(null);
      setTimelineForm(emptyTimeline);
    }
  };

  // ----- LEADERSHIP CRUD -----
  const addLeader = () => {
    if (!leaderForm.name.trim() || !leaderForm.role.trim()) {
      toast.error("Please fill at least Name and Role");
      return;
    }
    const newItem = { ...leaderForm };
    if (editingLeader !== null) {
      const updated = [...data.leadership];
      updated[editingLeader] = newItem;
      setData((prev) => ({ ...prev, leadership: updated }));
      setEditingLeader(null);
    } else {
      setData((prev) => ({ ...prev, leadership: [...prev.leadership, newItem] }));
    }
    setLeaderForm(emptyLeader);
  };

  const editLeader = (index) => {
    setLeaderForm(data.leadership[index]);
    setEditingLeader(index);
  };

  const deleteLeader = (index) => {
    const updated = data.leadership.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, leadership: updated }));
    if (editingLeader === index) {
      setEditingLeader(null);
      setLeaderForm(emptyLeader);
    }
  };

  // ----- VALUES CRUD -----
  const addValue = () => {
    if (!valueForm.title.trim() || !valueForm.frontIcon.trim()) {
      toast.error("Please fill at least Title and Front Icon");
      return;
    }
    const newItem = { ...valueForm };
    if (editingValue !== null) {
      const updated = [...data.values];
      updated[editingValue] = newItem;
      setData((prev) => ({ ...prev, values: updated }));
      setEditingValue(null);
    } else {
      setData((prev) => ({ ...prev, values: [...prev.values, newItem] }));
    }
    setValueForm(emptyValue);
  };

  const editValue = (index) => {
    setValueForm(data.values[index]);
    setEditingValue(index);
  };

  const deleteValue = (index) => {
    const updated = data.values.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, values: updated }));
    if (editingValue === index) {
      setEditingValue(null);
      setValueForm(emptyValue);
    }
  };

  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reusable input style (same as your original)
  const input =
    "w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">About Page Editor</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage hero, intro, timeline, leadership, and values
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-6">
        {/* ----- HERO SECTION ----- */}
        <SectionCard
          title="Hero"
          icon={Sparkles}
          open={sections.hero}
          onToggle={() => toggleSection("hero")}
          inputClass={input}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Eyebrow"
              value={data.hero?.eyebrow || ""}
              onChange={(e) => updateHero("eyebrow", e.target.value)}
              placeholder="About Us"
              inputClass={input}
            />
            <InputField
              label="Title"
              value={data.hero?.title || ""}
              onChange={(e) => updateHero("title", e.target.value)}
              placeholder="Crafting"
              inputClass={input}
            />
            <InputField
              label="Gradient Text"
              value={data.hero?.gradientText || ""}
              onChange={(e) => updateHero("gradientText", e.target.value)}
              placeholder="Digital Excellence"
              inputClass={input}
            />
            <div className="md:col-span-2">
              <InputField
                label="Description"
                value={data.hero?.description || ""}
                onChange={(e) => updateHero("description", e.target.value)}
                placeholder="We're a team..."
                multiline
                rows={3}
                inputClass={input}
              />
            </div>
          </div>
        </SectionCard>

        {/* ----- INTRO SECTION ----- */}
        <SectionCard
          title="Intro"
          icon={FileText}
          open={sections.intro}
          onToggle={() => toggleSection("intro")}
          inputClass={input}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Heading"
              value={data.intro?.heading || ""}
              onChange={(e) => updateIntro("heading", e.target.value)}
              placeholder="A legacy of excellence"
              inputClass={input}
            />
            <InputField
              label="Highlight word"
              value={data.intro?.highlight || ""}
              onChange={(e) => updateIntro("highlight", e.target.value)}
              placeholder="excellence"
              inputClass={input}
            />
            <div className="md:col-span-2">
              <InputField
                label="Paragraph 1"
                value={data.intro?.paragraph1 || ""}
                onChange={(e) => updateIntro("paragraph1", e.target.value)}
                placeholder="First paragraph..."
                multiline
                rows={3}
                inputClass={input}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Paragraph 2"
                value={data.intro?.paragraph2 || ""}
                onChange={(e) => updateIntro("paragraph2", e.target.value)}
                placeholder="Second paragraph..."
                multiline
                rows={3}
                inputClass={input}
              />
            </div>
            <InputField
              label="Intro Image URL"
              value={data.intro?.image || ""}
              onChange={(e) => updateIntro("image", e.target.value)}
              placeholder="https://..."
              inputClass={input}
            />
            <InputField
              label="Overlay Text"
              value={data.intro?.overlayText || ""}
              onChange={(e) => updateIntro("overlayText", e.target.value)}
              placeholder="Our team at work..."
              inputClass={input}
            />
          </div>

          {/* Stats CRUD */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <span>Statistics Cards</span>
              <span className="text-xs text-slate-400">({data.intro?.stats?.length || 0})</span>
            </h4>
            <div className="flex flex-wrap items-end gap-2 mb-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              <InputField
                label="Number"
                value={statForm.number}
                onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
                placeholder="25+"
                className="w-24"
                inputClass={input}
              />
              <InputField
                label="Label"
                value={statForm.label}
                onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                placeholder="Years Experience"
                className="flex-1 min-w-[120px]"
                inputClass={input}
              />
              <button
                onClick={addStat}
                className="inline-flex items-center gap-1 rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600 transition"
              >
                {editingStat !== null ? "Update" : <><Plus className="w-4 h-4" /> Add</>}
              </button>
              {editingStat !== null && (
                <button
                  onClick={() => {
                    setEditingStat(null);
                    setStatForm(emptyStat);
                  }}
                  className="text-xs text-slate-400 hover:text-red-400"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="space-y-2">
              {data.intro?.stats?.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/50 dark:bg-slate-800/30 p-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex gap-4 text-sm">
                    <span className="font-semibold">{stat.number}</span>
                    <span className="text-slate-500 dark:text-slate-400">{stat.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editStat(idx)} className="p-1 hover:text-indigo-400 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteStat(idx)} className="p-1 hover:text-red-400 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {(!data.intro?.stats || data.intro.stats.length === 0) && (
                <div className="text-sm text-slate-400">No stats added yet.</div>
              )}
            </div>
          </div>
        </SectionCard>

        {/* ----- TIMELINE SECTION ----- */}
        <SectionCard
          title="Timeline / Journey"
          icon={Clock}
          open={sections.timeline}
          onToggle={() => toggleSection("timeline")}
          inputClass={input}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-end gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              <InputField
                label="Year"
                value={timelineForm.year}
                onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                placeholder="1999"
                className="w-24"
                inputClass={input}
              />
              <InputField
                label="Title"
                value={timelineForm.title}
                onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                placeholder="Founded in 1999"
                className="flex-1 min-w-[140px]"
                inputClass={input}
              />
              <InputField
                label="Icon (emoji)"
                value={timelineForm.icon}
                onChange={(e) => setTimelineForm({ ...timelineForm, icon: e.target.value })}
                placeholder="🏢"
                className="w-20"
                inputClass={input}
              />
              <div className="w-full">
                <InputField
                  label="Description"
                  value={timelineForm.description}
                  onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                  placeholder="Started with a small team..."
                  multiline
                  rows={2}
                  inputClass={input}
                />
              </div>
              <button
                onClick={addTimeline}
                className="inline-flex items-center gap-1 rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600 transition"
              >
                {editingTimeline !== null ? "Update" : <><Plus className="w-4 h-4" /> Add Event</>}
              </button>
              {editingTimeline !== null && (
                <button
                  onClick={() => {
                    setEditingTimeline(null);
                    setTimelineForm(emptyTimeline);
                  }}
                  className="text-xs text-slate-400 hover:text-red-400"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="space-y-2">
              {data.timeline?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/50 dark:bg-slate-800/30 p-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-semibold text-indigo-400">{item.year}</span>
                    <span className="font-medium">{item.title}</span>
                    {item.icon && <span>{item.icon}</span>}
                    <span className="text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editTimeline(idx)} className="p-1 hover:text-indigo-400">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteTimeline(idx)} className="p-1 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {(!data.timeline || data.timeline.length === 0) && (
                <div className="text-sm text-slate-400">No timeline events.</div>
              )}
            </div>
          </div>
        </SectionCard>

        {/* ----- LEADERSHIP SECTION ----- */}
        <SectionCard
          title="Leadership"
          icon={Users}
          open={sections.leadership}
          onToggle={() => toggleSection("leadership")}
          inputClass={input}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              <InputField
                label="Image URL"
                value={leaderForm.image}
                onChange={(e) => setLeaderForm({ ...leaderForm, image: e.target.value })}
                placeholder="https://..."
                inputClass={input}
              />
              <InputField
                label="Name"
                value={leaderForm.name}
                onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                placeholder="John Smith"
                inputClass={input}
              />
              <InputField
                label="Role"
                value={leaderForm.role}
                onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                placeholder="CEO & Founder"
                inputClass={input}
              />
              <InputField
                label="Organization"
                value={leaderForm.organization}
                onChange={(e) => setLeaderForm({ ...leaderForm, organization: e.target.value })}
                placeholder="UCP"
                inputClass={input}
              />
              <InputField
                label="Joining Year"
                value={leaderForm.joiningYear}
                onChange={(e) => setLeaderForm({ ...leaderForm, joiningYear: e.target.value })}
                placeholder="Since 1999"
                inputClass={input}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Quote"
                  value={leaderForm.quote}
                  onChange={(e) => setLeaderForm({ ...leaderForm, quote: e.target.value })}
                  placeholder="'Innovation is...'"
                  multiline
                  rows={2}
                  inputClass={input}
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Biography"
                  value={leaderForm.bio}
                  onChange={(e) => setLeaderForm({ ...leaderForm, bio: e.target.value })}
                  placeholder="With 25+ years..."
                  multiline
                  rows={3}
                  inputClass={input}
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  onClick={addLeader}
                  className="inline-flex items-center gap-1 rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600 transition"
                >
                  {editingLeader !== null ? "Update Leader" : <><Plus className="w-4 h-4" /> Add Leader</>}
                </button>
                {editingLeader !== null && (
                  <button
                    onClick={() => {
                      setEditingLeader(null);
                      setLeaderForm(emptyLeader);
                    }}
                    className="text-xs text-slate-400 hover:text-red-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {data.leadership?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/50 dark:bg-slate-800/30 p-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3 text-sm">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                    )}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editLeader(idx)} className="p-1 hover:text-indigo-400">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteLeader(idx)} className="p-1 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {(!data.leadership || data.leadership.length === 0) && (
                <div className="text-sm text-slate-400">No leadership members.</div>
              )}
            </div>
          </div>
        </SectionCard>

        {/* ----- VALUES SECTION ----- */}
        <SectionCard
          title="Core Values"
          icon={Heart}
          open={sections.values}
          onToggle={() => toggleSection("values")}
          inputClass={input}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              <InputField
                label="Front Icon (emoji)"
                value={valueForm.frontIcon}
                onChange={(e) => setValueForm({ ...valueForm, frontIcon: e.target.value })}
                placeholder="🎯"
                inputClass={input}
              />
              <InputField
                label="Title"
                value={valueForm.title}
                onChange={(e) => setValueForm({ ...valueForm, title: e.target.value })}
                placeholder="Innovation"
                inputClass={input}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Short Description"
                  value={valueForm.shortDescription}
                  onChange={(e) => setValueForm({ ...valueForm, shortDescription: e.target.value })}
                  placeholder="Pushing boundaries..."
                  multiline
                  rows={2}
                  inputClass={input}
                />
              </div>
              <InputField
                label="Back Icon (emoji)"
                value={valueForm.backIcon}
                onChange={(e) => setValueForm({ ...valueForm, backIcon: e.target.value })}
                placeholder="🚀"
                inputClass={input}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Detailed Description"
                  value={valueForm.detailedDescription}
                  onChange={(e) => setValueForm({ ...valueForm, detailedDescription: e.target.value })}
                  placeholder="We embrace creativity..."
                  multiline
                  rows={3}
                  inputClass={input}
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  onClick={addValue}
                  className="inline-flex items-center gap-1 rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600 transition"
                >
                  {editingValue !== null ? "Update Value" : <><Plus className="w-4 h-4" /> Add Value</>}
                </button>
                {editingValue !== null && (
                  <button
                    onClick={() => {
                      setEditingValue(null);
                      setValueForm(emptyValue);
                    }}
                    className="text-xs text-slate-400 hover:text-red-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {data.values?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/50 dark:bg-slate-800/30 p-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-xl">{item.frontIcon}</span>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-slate-400">{item.shortDescription}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editValue(idx)} className="p-1 hover:text-indigo-400">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteValue(idx)} className="p-1 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {(!data.values || data.values.length === 0) && (
                <div className="text-sm text-slate-400">No values added.</div>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={save}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Helper Components ----------
function SectionCard({ title, icon: Icon, open, onToggle, children }) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 1,
  className = "",
  inputClass,
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          className={inputClass}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={inputClass}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}