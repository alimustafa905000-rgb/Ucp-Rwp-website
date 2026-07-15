/* ============================================================
   ADMIN DASHBOARD — MOCK DATA
   Replace these arrays/objects with real API responses whenever
   the backend is ready. Every component below only expects the
   shapes documented next to each export.
   ============================================================ */

// Top summary cards. `trend` is the % change vs last period.
export const statCards = [
  {
    id: 'students',
    label: 'Total Students',
    value: 14820,
    trend: 8.2,
    icon: 'fa-user-graduate',
    accent: 'blue',
  },
  {
    id: 'faculty',
    label: 'Faculty Members',
    value: 512,
    trend: 3.1,
    icon: 'fa-chalkboard-user',
    accent: 'purple',
  },
  {
    id: 'societies',
    label: 'Active Societies',
    value: 24,
    trend: 12.5,
    icon: 'fa-people-group',
    accent: 'gold',
  },
  {
    id: 'notices',
    label: 'Notices Published',
    value: 186,
    trend: -4.4,
    icon: 'fa-bullhorn',
    accent: 'red',
  },
];

// Bar chart: monthly admissions. `value` is scaled 0-100 by the chart itself.
export const admissionsByMonth = [
  { label: 'Jan', value: 320 },
  { label: 'Feb', value: 410 },
  { label: 'Mar', value: 380 },
  { label: 'Apr', value: 520 },
  { label: 'May', value: 610 },
  { label: 'Jun', value: 470 },
  { label: 'Jul', value: 590 },
];

// Donut chart: student split by faculty.
export const studentsByFaculty = [
  { label: 'Computer Science', value: 38, color: 'var(--blue-accent)' },
  { label: 'Business', value: 27, color: 'var(--purple)' },
  { label: 'Media Sciences', value: 18, color: 'var(--gold)' },
  { label: 'Sciences', value: 17, color: 'var(--red-accent)' },
];

// Line chart: engagement (site visits) over the last 8 weeks.
export const weeklyEngagement = [
  62, 70, 65, 80, 78, 92, 88, 100,
];

// Responsive table: recent notices.
export const recentNotices = [
  { id: 1, title: 'Fall 2026 Admissions Now Open', category: 'Admissions', date: '2026-07-10', status: 'Published' },
  { id: 2, title: 'Mid-Term Exam Schedule Released', category: 'Academics', date: '2026-07-08', status: 'Published' },
  { id: 3, title: 'Robotics Society Recruitment Drive', category: 'Societies', date: '2026-07-05', status: 'Draft' },
  { id: 4, title: 'Library Hours Extended for Finals', category: 'Campus', date: '2026-07-02', status: 'Published' },
  { id: 5, title: 'Annual Sports Gala — Save the Date', category: 'Events', date: '2026-06-28', status: 'Scheduled' },
  { id: 6, title: 'Scholarship Applications Deadline', category: 'Admissions', date: '2026-06-24', status: 'Published' },
];

// Sidebar navigation items.
export const adminNavItems = [
  { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
  { id: 'students', label: 'Students', icon: 'fa-user-graduate' },
  { id: 'societies', label: 'Societies', icon: 'fa-people-group' },
  { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
  { id: 'reports', label: 'Reports', icon: 'fa-chart-line' },
  { id: 'settings', label: 'Settings', icon: 'fa-gear' },
];
