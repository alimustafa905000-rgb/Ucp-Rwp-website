import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import { SOCIETIES } from "../config/societies";
import {
  
  
} from "lucide-react";

const nav = ({ isActive }) =>
  clsx(
    "group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,0.15)] text-white"
      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
  );

export default function Sidebar({ open, onClose }) {
  const [socOpen, setSocOpen] = useState(true);

  return (
    <>
    
      <div onClick={onClose} className={clsx("fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden", open ? "block" : "hidden")} />

      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 h-screen w-72 p-4 md:p-5 transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "bg-slate-900/90 backdrop-blur-xl border-r border-white/10 shadow-2xl shadow-indigo-500/10"
        )}
      >
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform duration-300"
              >
                <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <span className="text-xs font-black text-white/80 tracking-wider">UCP</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl -z-10" />
            </div>

            <div className="leading-tight">
              <div className="font-bold text-white text-lg tracking-tight">Admin Panel</div>
              <div className="text-[11px] text-indigo-300/70 font-medium">University Management</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden rounded-xl p-2 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

      
        <nav className="pgd-scroll h-[calc(100vh-180px)] overflow-y-auto pr-1 space-y-1.5">
          <NavLink to="/admin" end className={nav}>
            <LayoutDashboard className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/home" className={nav}>
            <Home className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            Home
          </NavLink>
          <NavLink to="/admin/about" className={nav}>
            <Info className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            About
          </NavLink>
          <NavLink to="/admin/notices" className={nav}>
            <Bell className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            Notices
          </NavLink>
          <NavLink to="/admin/magazines" className={nav}>
            <BookOpen className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            E‑Magazine
          </NavLink>
          <NavLink to="/admin/projects" className={nav}>
            <FolderKanban className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            Projects
          </NavLink>
          <NavLink to="/admin/campus-info" className={nav}>
            <Building2 className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            Campus Info
          </NavLink>
          <NavLink to="/admin/contact-messages" className={nav}>
            <MessageSquare className="w-4 h-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-200" />
            Messages
          </NavLink>

          
          <button
            onClick={() => setSocOpen((s) => !s)}
            className="mt-2 w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <span className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              Societies
            </span>
            <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", socOpen && "rotate-180")} />
          </button>

          <div className={clsx("grid gap-1 overflow-hidden transition-all duration-300", socOpen ? "max-h-[700px] mt-1" : "max-h-0")}>
            {SOCIETIES.map((s) => (
              <NavLink
                key={s.key}
                to={`/admin/societies/${s.key}`}
                className={({ isActive }) =>
                  clsx(
                    "ml-6 rounded-xl px-4 py-2 text-xs border transition-all",
                    isActive
                      ? "bg-indigo-500/10 border-indigo-400/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                      : "bg-white/5 border-white/5 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20"
                  )
                }
              >
                {s.label}
              </NavLink>
            ))}
          </div>
        </nav>

        
        <div className="absolute bottom-4 left-4 right-4 border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                AD
              </div>
              <div>
                <div className="font-medium text-white/80">Admin</div>
                <div className="text-[10px] text-white/40">Logged in</div>
              </div>
            </div>
            <NavLink
              to="/admin/settings"
              className="p-2 rounded-xl hover:bg-white/10 transition-colors group"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}