// src/admin/components/AdminShell.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/glass.css";

export default function AdminShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-bg text-slate-900">
      {/* Outer frame like the screenshot */}
      <div className="admin-frame mx-auto my-4 md:my-6 max-w-7xl min-h-[92vh]">
        <div className="flex">
          <Sidebar open={open} onClose={() => setOpen(false)} />

          {/* Right side content */}
          <div className="min-w-0 flex-1 p-3 md:p-4">
            <Topbar onMenu={() => setOpen(true)} />
            <main className="mt-4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}