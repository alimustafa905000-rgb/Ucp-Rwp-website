import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { homeService } from "../services";
import { 
  Sparkles, 
  FileText, 
  Save,
  GraduationCap,
  CheckCircle, 
  XCircle,
  Video
} from "lucide-react";

export default function HomeEditor() {
  const [data, setData] = useState(null);

  useEffect(() => setData(homeService.get()), []);

  if (!data) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
    </div>
  );

  const save = () => {
    homeService.update(data);
    toast.success("Home page updated successfully 🎉");
  };

  const updateHero = (field, value) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Home Page Editor
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage hero, description, admission status, and advertisement
          </p>
        </div>
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105 active:scale-95"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 dark:border-slate-700 dark:bg-slate-900/80 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
        
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold">Hero Section</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Title
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                placeholder="Main headline"
                value={data.hero?.title || ""}
                onChange={(e) => updateHero("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Subtitle
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                placeholder="Subheading"
                value={data.hero?.subtitle || ""}
                onChange={(e) => updateHero("subtitle", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                CTA Button Text
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                placeholder="e.g. Apply Now"
                value={data.hero?.ctaText || ""}
                onChange={(e) => updateHero("ctaText", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                CTA Link
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                placeholder="https://..."
                value={data.hero?.ctaLink || ""}
                onChange={(e) => updateHero("ctaLink", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Hero Image URL
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                placeholder="Image URL"
                value={data.hero?.imageDataUrl || ""}
                onChange={(e) => updateHero("imageDataUrl", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold">University Description</h2>
          </div>
          <textarea
            className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
            rows={5}
            placeholder="Describe the university..."
            value={data.description || ""}
            onChange={(e) => setData((s) => ({ ...s, description: e.target.value }))}
          />
        </div>

        {/* Advertisement Section - NEW */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold">Advertisement Video</h2>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Video URL (YouTube, Vimeo, or direct MP4)
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
              placeholder="https://www.youtube.com/embed/..."
              value={data.advertisementVideoUrl || ""}
              onChange={(e) => setData((s) => ({ ...s, advertisementVideoUrl: e.target.value }))}
            />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              This video will be displayed in the advertisement section on the home page.
            </p>
          </div>
        </div>

        {/* Admission Status Toggle */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-sm">Admission Status</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {data.admissionOpen !== false ? "Open for new applications" : "Closed for applications"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${data.admissionOpen !== false ? "text-green-500" : "text-red-500"}`}>
                {data.admissionOpen !== false ? "Open" : "Closed"}
              </span>
              <button
                onClick={() => setData((s) => ({ ...s, admissionOpen: s.admissionOpen !== false ? false : true }))}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                  data.admissionOpen !== false ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    data.admissionOpen !== false ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Open</span>
            <span className="mx-1 text-slate-300">•</span>
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Closed</span>
          </div>
        </div>

        {/* Save button (mobile friendly) */}
        <div className="mt-6 flex justify-end md:hidden">
          <button
            onClick={save}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02] active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}