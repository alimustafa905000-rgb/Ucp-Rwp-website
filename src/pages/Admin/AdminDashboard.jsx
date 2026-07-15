import { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/useScrollEffects';
import AdminSidebar from './components/AdminSidebar';
import StatCard from './components/StatCard';
import BarChart from './components/BarChart';
import DonutChart from './components/DonutChart';
import LineChart from './components/LineChart';
import DataTable from './components/DataTable';
import {
  statCards,
  admissionsByMonth,
  studentsByFaculty,
  weeklyEngagement,
  recentNotices,
  adminNavItems,
} from './data/adminData';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Re-run the fade/slide-up scroll-reveal observer whenever the tab changes,
  // since switching tabs mounts a fresh batch of .reveal elements.
  useReveal([activeTab]);

  useEffect(() => {
    document.title = 'Admin Dashboard — UCP Rawalpindi';
  }, []);

  const activeLabel = adminNavItems.find((n) => n.id === activeTab)?.label ?? 'Overview';

  return (
    <div className={styles.shell}>
      <AdminSidebar
        activeTab={activeTab}
        onSelect={setActiveTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.main}>
        {/* ---------- Topbar ---------- */}
        <header className={styles.topbar}>
          <button
            className={styles.menuToggle}
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <div>
            <h1 className={styles.pageTitle}>{activeLabel}</h1>
            <p className={styles.pageSub}>Welcome back, here's what's happening today.</p>
          </div>

          <div className={styles.topbarActions}>
            <div className={styles.searchBox}>
              <i className="fas fa-magnifying-glass"></i>
              <input type="text" placeholder="Search..." />
            </div>
            <button className={styles.iconBtn} aria-label="Notifications">
              <i className="fas fa-bell"></i>
              <span className={styles.badge}></span>
            </button>
            <div className={styles.profile}>
              {/* Add an admin avatar at: src/assets/images/admin-avatar.jpg */}
              <div className={styles.avatarFallback}>A</div>
              <div>
                <div className={styles.profileName}>Admin User</div>
                <div className={styles.profileRole}>Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* ---------- Content ---------- */}
        <div className={styles.content}>
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'students' && <StudentsSection />}
          {activeTab === 'societies' && <SocietiesSection />}
          {activeTab === 'notices' && <NoticesSection />}
          {activeTab === 'reports' && <ReportsSection />}
          {activeTab === 'settings' && <SettingsSection />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TAB SECTIONS — each one is intentionally small & modular so
   it can be moved into its own file later without refactoring.
   ============================================================ */

function OverviewSection() {
  return (
    <>
      <div className={styles.statsGrid}>
        {statCards.map((s, i) => (
          <StatCard key={s.id} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <BarChart data={admissionsByMonth} title="Admissions by Month" />
        <DonutChart data={studentsByFaculty} title="Students by Faculty" />
        <LineChart data={weeklyEngagement} title="Website Engagement" />
      </div>

      <DataTable rows={recentNotices} title="Recent Notices" />
    </>
  );
}

function StudentsSection() {
  return (
    <>
      <div className={styles.statsGrid}>
        <StatCard label="Total Students" value={14820} trend={8.2} icon="fa-user-graduate" accent="blue" />
        <StatCard label="New This Term" value={642} trend={5.6} icon="fa-user-plus" accent="purple" />
        <StatCard label="Graduating" value={1180} trend={-2.1} icon="fa-graduation-cap" accent="gold" />
      </div>
      <DataTable
        title="Recently Enrolled Students"
        rows={[
          { id: 1, title: 'Ayesha Khan', category: 'Computer Science', date: '2026-07-11', status: 'Published' },
          { id: 2, title: 'Bilal Ahmed', category: 'Business', date: '2026-07-10', status: 'Published' },
          { id: 3, title: 'Sara Malik', category: 'Media Sciences', date: '2026-07-09', status: 'Draft' },
          { id: 4, title: 'Hamza Raza', category: 'Sciences', date: '2026-07-07', status: 'Published' },
        ]}
      />
    </>
  );
}

function SocietiesSection() {
  const societies = [
    { name: 'Devforge Digital Club', members: 82, icon: 'fa-code' },
    { name: 'Robotics Society', members: 54, icon: 'fa-robot' },
    { name: 'Literary Society', members: 61, icon: 'fa-feather' },
    { name: 'Dramatic Club', members: 47, icon: 'fa-masks-theater' },
  ];
  return (
    <div className={styles.statsGrid}>
      {societies.map((s, i) => (
        <StatCard
          key={s.name}
          label={s.name}
          value={s.members}
          trend={i % 2 === 0 ? 4.2 : -1.5}
          icon={s.icon}
          accent={['blue', 'purple', 'gold', 'red'][i % 4]}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}

function NoticesSection() {
  return (
    <>
      <div className={styles.sectionActions}>
        <button className={styles.primaryBtn}>
          <i className="fas fa-plus"></i> New Notice
        </button>
      </div>
      <DataTable rows={recentNotices} title="All Notices" />
    </>
  );
}

function ReportsSection() {
  return (
    <div className={styles.chartsGrid}>
      <BarChart data={admissionsByMonth} title="Admissions by Month" />
      <LineChart data={weeklyEngagement} title="Website Engagement" />
      <DonutChart data={studentsByFaculty} title="Students by Faculty" />
    </div>
  );
}

function SettingsSection() {
  return (
    <div className={`${styles.settingsCard} reveal`}>
      <h3>Account Settings</h3>
      <div className={styles.formGrid}>
        <label>
          Full Name
          <input type="text" defaultValue="Admin User" />
        </label>
        <label>
          Email Address
          <input type="email" defaultValue="admin@ucp.edu.pk" />
        </label>
        <label>
          Role
          <select defaultValue="super-admin">
            <option value="super-admin">Super Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </label>
        <label>
          Notification Preference
          <select defaultValue="all">
            <option value="all">All updates</option>
            <option value="important">Important only</option>
            <option value="none">None</option>
          </select>
        </label>
      </div>
      <button className={styles.primaryBtn}>Save Changes</button>
    </div>
  );
}
