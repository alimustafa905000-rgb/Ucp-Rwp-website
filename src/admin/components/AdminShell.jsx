import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { AnimatePresence, motion } from "framer-motion";

import "../styles/premiumGlass.css";

export default function AdminShell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="pgd-bg text-white">
      <div className="pgd-stars" />

      <div className="pgd-blob left-[-140px] top-[-160px]" style={{ background: "rgba(124,58,237,.9)" }} />
      <div className="pgd-blob right-[-180px] top-[60px]" style={{ background: "rgba(6,182,212,.8)", animationDelay: "1.3s" }} />
      <div className="pgd-blob left-[25%] bottom-[-220px]" style={{ background: "rgba(56,189,248,.65)", animationDelay: "2.4s" }} />

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="relative md:pl-72">
        <Topbar onMenu={() => setOpen(true)} />

        <main className="mx-auto max-w-7xl p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}