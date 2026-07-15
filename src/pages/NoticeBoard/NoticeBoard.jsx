import { useReveal } from '../../hooks/useScrollEffects';
import styles from './NoticeBoard.module.css';

const ANNOUNCEMENTS = [
  {
    day: '10', month: 'June', tag: 'Academic', tagClass: 'tag-academic',
    title: 'New AI & Ethics Institute launched with $4M grant from Horizon Foundation',
    desc: 'The institute will bring together researchers from computer science, philosophy, law and public policy to address ethical challenges in artificial intelligence.',
  },
  {
    day: '8', month: 'June', tag: 'Events', tagClass: 'tag-events',
    title: 'International Research Conclave 2026 — Call for Papers now open',
    desc: 'Researchers across all disciplines are invited to submit papers for the annual International Research Conclave, scheduled for September 12–14, 2026.',
  },
  {
    day: '3', month: 'June', tag: 'Student Life', tagClass: 'tag-student',
    title: 'Robotics Society wins Asia-Pacific Championship in Singapore',
    desc: 'The Crossroads Robotics Society team secured first place in the intercollegiate championship, beating 48 teams from across the region with their autonomous rescue robot.',
  },
  {
    day: '28', month: 'May', tag: 'Academic', tagClass: 'tag-academic',
    title: 'Final examinations schedule for Summer 2026 semester released',
    desc: 'All students are advised to check the updated examination timetable on the student portal. Examination period runs from August 1–14, 2026.',
  },
  {
    day: '22', month: 'May', tag: 'Campus', tagClass: 'tag-campus',
    title: 'Campus expansion — Phase 2 of the Innovation Hub is now complete',
    desc: 'The new wing adds 45,000 sq ft of dedicated maker space with 3D printers, VR labs, collaborative workstations and a 200-seat auditorium.',
  },
  {
    day: '18', month: 'May', tag: 'Events', tagClass: 'tag-events',
    title: "Annual Cultural Festival 'Crossroads Carnival' returns June 20–22",
    desc: 'Three days of music, dance, theater, food stalls and art exhibitions celebrating the diverse cultures represented on our campus. Open to the public.',
  },
];

const EVENTS = [
  { day: '20', month: 'Jun', color: '#E63946', title: 'Crossroads Carnival', time: '3:00 PM • Main Quad' },
  { day: '25', month: 'Jun', color: '#2563EB', title: 'Open House — Prospective Students', time: '10:00 AM • Admissions Hall' },
  { day: '10', month: 'Jul', color: '#1A3C6E', title: 'Faculty Development Workshop', time: '9:00 AM • Conference Room A' },
  { day: '15', month: 'Jul', color: '#D97706', title: 'Scholarship Application Deadline', time: '5:00 PM • Online' },
  { day: '28', month: 'Jul', color: '#059669', title: 'Alumni Homecoming Weekend', time: 'All Day • Campus Grounds' },
];

export default function NoticeBoard() {
  useReveal();

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles['blob-1']}></div>
        <div className={styles['blob-2']}></div>
        <div className={styles['blob-3']}></div>
        <div className={styles['hero-inner']}>
          <div className={styles.eyebrow}><span className={styles.icon}>📋</span> Stay Informed</div>
          <h1 className={styles['hero-title']}>Notice Board</h1>
          <p className={styles['hero-desc']}>Announcements, academic updates, events and news from across campus.</p>
        </div>
      </section>

      <div className={styles['main-content']}>
        {/* ANNOUNCEMENTS */}
        <div className={styles['announcements-col']}>
          <h2 className={`${styles['section-title']} reveal reveal-up`}>Latest Announcements</h2>
          <div className={styles['announcement-list']}>
            {ANNOUNCEMENTS.map((a, idx) => (
              <div key={a.title} className={`${styles['announcement-card']} reveal reveal-up`} style={{ transitionDelay: `${idx * 0.08}s` }}>
                <div className={styles['date-badge']}>
                  <div className={styles.day}>{a.day}</div>
                  <div className={styles.month}>{a.month}</div>
                </div>
                <div className={styles['ann-body']}>
                  <span className={`${styles['ann-tag']} ${styles[a.tagClass]}`}>{a.tag}</span>
                  <div className={styles['ann-title']}>{a.title}</div>
                  <div className={styles['ann-desc']}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={`${styles['events-card']} reveal reveal-right`}>
            <div className={styles['events-header']}>
              <div className={styles['icon-wrap']}>📅</div>
              <h3>Upcoming Events</h3>
            </div>
            <div className={styles['events-list']}>
              {EVENTS.map((e) => (
                <div key={e.title} className={styles['event-item']}>
                  <div className={styles['event-date-box']} style={{ background: e.color }}>
                    <div className={styles['e-day']}>{e.day}</div>
                    <div className={styles['e-month']}>{e.month}</div>
                  </div>
                  <div className={styles['event-info']}>
                    <div className={styles['e-title']}>{e.title}</div>
                    <div className={styles['e-time']}>{e.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
