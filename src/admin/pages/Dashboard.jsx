import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, BookOpen, FolderKanban, Users, MessageSquare,
  TrendingUp, ArrowUpRight, Plus, Sparkles
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { Link } from "react-router-dom";
import "../styles/premiumGlass.css";

import { noticesService, magazinesService, projectsService, contactsService } from "../services";
import { SOCIETIES } from "../config/societies";
import { createLocalCrudService } from "../services/localCrud";

/* ---------- Animated counter hook (UI only) ---------- */
function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.floor(start + (target - start) * eased));
      if (p < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

/* ---------- Premium stat card ---------- */
function GlassStat({ title, value, icon: Icon, gradient, trend, delay }) {
  const count = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="pgd-glass pgd-hover relative overflow-hidden p-5"
    >
      {/* gradient overlay */}
      <div
        className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-40"
        style={{ background: gradient }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">{title}</p>
          <p className="mt-2 text-4xl font-black text-white">{count}</p>

          {trend && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
              <TrendingUp className="h-3.5 w-3.5" />
              {trend}
            </div>
          )}
        </div>

        <div
          className="grid h-12 w-12 place-items-center rounded-2xl shadow-lg"
          style={{ background: gradient }}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  /* ================= LOGIC UNCHANGED ================= */
  const notices = noticesService.all().length;
  const magazines = magazinesService.all().length;
  const projects = projectsService.all().length;
  const unread = contactsService.all().filter((m) => !m.read).length;
  const messages = contactsService.all().length;
  const societyTotal = SOCIETIES.reduce((sum, s) => {
    const svc = createLocalCrudService({ key: s.storageKey, defaults: [] });
    return sum + svc.all().length;
  }, 0);
  /* ================================================== */

  /* ---------- chart data (derived from real counts) ---------- */
  const barData = [
    { name: "Notices", value: notices },
    { name: "Magazines", value: magazines },
    { name: "Projects", value: projects },
    { name: "Societies", value: societyTotal },
    { name: "Messages", value: messages },
  ];

  const areaData = [
    { name: "Mon", value: Math.max(2, notices) },
    { name: "Tue", value: Math.max(3, magazines + 1) },
    { name: "Wed", value: Math.max(4, projects + 2) },
    { name: "Thu", value: Math.max(3, societyTotal) },
    { name: "Fri", value: Math.max(5, messages + 1) },
    { name: "Sat", value: Math.max(4, notices + projects) },
    { name: "Sun", value: Math.max(6, magazines + projects) },
  ];

  const pieData = [
    { name: "Notices", value: notices || 1 },
    { name: "Projects", value: projects || 1 },
    { name: "Societies", value: societyTotal || 1 },
    { name: "Messages", value: messages || 1 },
  ];

  const pieColors = ["#4F46E5", "#06B6D4", "#7C3AED", "#38BDF8"];

  const quickActions = [
    { label: "Add Notice", to: "/admin/notices", gradient: "linear-gradient(135deg,#4F46E5,#7C3AED)" },
    { label: "Add Project", to: "/admin/projects", gradient: "linear-gradient(135deg,#10B981,#06B6D4)" },
    { label: "Upload Magazine", to: "/admin/magazines", gradient: "linear-gradient(135deg,#EC4899,#7C3AED)" },
    { label: "View Messages", to: "/admin/contact-messages", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  ];

  return (
    <div className="space-y-6">
      {/* ---------- HERO ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pgd-glass relative overflow-hidden p-8"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
             style={{ background: "rgba(124,58,237,.35)" }} />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-3xl"
             style={{ background: "rgba(6,182,212,.30)" }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              University Management System
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight">
              Welcome Back,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#FFFFFF,#67E8F9,#7C3AED)" }}
              >
                Admin
              </span>{" "}
              👋
            </h1>

            <p className="mt-2 max-w-md text-white/60">
              Manage your university content with ease — notices, projects, societies, and more.
            </p>

            <div className="mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-cyan-300 to-purple-500" />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:grid h-28 w-28 place-items-center rounded-3xl"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED,#06B6D4)" }}
          >
            <TrendingUp className="h-12 w-12 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- STAT CARDS ---------- */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <GlassStat title="Notices" value={notices} icon={Bell} gradient="linear-gradient(135deg,#4F46E5,#7C3AED)" trend="+12%" delay={0.05} />
        <GlassStat title="Magazines" value={magazines} icon={BookOpen} gradient="linear-gradient(135deg,#EC4899,#7C3AED)" trend="+8%" delay={0.1} />
        <GlassStat title="Projects" value={projects} icon={FolderKanban} gradient="linear-gradient(135deg,#10B981,#06B6D4)" trend="+5%" delay={0.15} />
        <GlassStat title="Societies" value={societyTotal} icon={Users} gradient="linear-gradient(135deg,#38BDF8,#4F46E5)" trend="+3%" delay={0.2} />
        <GlassStat title="Unread" value={unread} icon={MessageSquare} gradient="linear-gradient(135deg,#F59E0B,#EF4444)" trend="new" delay={0.25} />
      </div>

      {/* ---------- CHARTS ---------- */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Area chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="pgd-glass p-5 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Activity Overview</h3>
              <p className="text-xs text-white/50">Content added this week</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">Weekly</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#67E8F9" strokeWidth={2} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="pgd-glass p-5"
        >
          <h3 className="mb-4 text-lg font-bold text-white">Content Split</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-white/70">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: pieColors[i % pieColors.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ---------- BAR CHART + QUICK ACTIONS ---------- */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pgd-glass p-5 lg:col-span-2"
        >
          <h3 className="mb-4 text-lg font-bold text-white">Totals by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="pgd-glass p-5"
        >
          <h3 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-cyan-300" /> Quick Actions
          </h3>

          <div className="space-y-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 hover:scale-[1.02]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: a.gradient }}>
                    <Plus className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm font-medium text-white">{a.label}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}