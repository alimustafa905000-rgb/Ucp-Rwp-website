import { useState } from "react";
import { Bell, Search, Menu, LogOut, Sun, Moon } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useAdminTheme } from "../context/AdminThemeContext";
import { motion } from "framer-motion";

export default function Topbar({ onMenu }) {
  const { admin, logout } = useAdminAuth();
  const { theme, toggle } = useAdminTheme();

  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-3 z-30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="pgd-glass px-3 md:px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={onMenu} className="md:hidden rounded-xl p-2 hover:bg-white/10">
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative hidden sm:block w-[420px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                className="w-full rounded-xl bg-white/5 border border-white/15 pl-10 pr-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-cyan-300/20 focus:border-cyan-300/30"
                placeholder="Search…"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggle} className="rounded-xl p-2 hover:bg-white/10">
              {theme === "dark" ? <Sun className="w-5 h-5 text-cyan-300" /> : <Moon className="w-5 h-5 text-white/80" />}
            </button>

            <div className="relative">
              <button onClick={() => setNotifOpen((s) => !s)} className="rounded-xl p-2 hover:bg-white/10 relative">
                <Bell className="w-5 h-5" />
                <motion.span
                  className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-cyan-300"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.3, repeat: Infinity }}
                />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 pgd-glass p-3">
                  <div className="text-sm font-semibold mb-2">Notifications</div>
                  <div className="text-xs text-white/70">No new notifications (UI).</div>
                </div>
              )}
            </div>

            {/* ✅ Only the gradient logout button – no profile dropdown */}
            <button
              onClick={() => logout(false)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white
                         bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}