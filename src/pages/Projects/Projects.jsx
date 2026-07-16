import { useState } from 'react';
import { useReveal } from '../../hooks/useScrollEffects';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'drone-swarm',
    category: 'fyp',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80',
    emoji: '🚁',
    alt: 'Drone swarm crop monitoring',
    badges: [
      { label: 'Artificial Intelligence', cls: 'badge-ai' },
      { label: 'Computer Science', cls: 'badge-cs' },
    ],
    title: 'Autonomous Drone Swarm for Crop Monitoring',
    desc: 'A multi-agent AI system using deep reinforcement learning to coordinate autonomous drones for precision agriculture...',
    tech: ['Python', 'TensorFlow', 'ROS', '+1'],
    supervisor: 'Prof. Dr. Wei Zhang',
    link: 'https://www.northwayguide.com/', // YouTube link (example)
  },
  {
    id: 'sign-glove',
    category: 'fyp',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80',
    emoji: '🤝',
    alt: 'Sign language recognition glove',
    badges: [
      { label: 'Innovation', cls: 'badge-innovation' },
      { label: 'Biomedical Engineering', cls: 'badge-biomedical' },
    ],
    title: 'Real-time Sign Language Recognition Glove',
    desc: 'A wearable glove with flexible sensors that translates American Sign Language into speech and text in real-time...',
    tech: ['TensorFlow Lite', 'Arduino', 'C++', '+1'],
    supervisor: 'Prof. Dr. James Park',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'educhain',
    category: 'fyp',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    emoji: '⛓️',
    alt: 'Blockchain network',
    badges: [
      { label: 'Software Engineering', cls: 'badge-software' },
      { label: 'Computer Science', cls: 'badge-cs' },
    ],
    title: 'EduChain — Blockchain Credential Verification',
    desc: 'A decentralized platform for issuing and verifying academic credentials using Ethereum smart contracts,...',
    tech: ['Solidity', 'React', 'Node.js', '+1'],
    supervisor: 'Prof. Dr. Sarah Chen',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'neural-translate',
    category: 'fyp',
    image: null, // no photo — shows placeholder
    badges: [
      { label: 'Research & Development', cls: 'badge-rd' },
      { label: 'Computer Science', cls: 'badge-cs' },
    ],
    title: 'Arabic-English Simultaneous Neural Translation',
    desc: 'A transformer-based neural machine translation system optimized for low-resource Arabic dialects, achieving...',
    tech: ['PyTorch', 'Transformers', 'NLP', '+1'],
    supervisor: 'Prof. Dr. Wei Zhang',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

function ProjectCard({ p }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className={`${styles['project-card']} reveal reveal-up`}>
      {p.image && !imgFailed ? (
        <img
          className={styles['card-image']}
          src={p.image}
          alt={p.alt}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className={styles['card-image-placeholder']}>
          {p.emoji || (
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(26,60,110,0.25)"
              strokeWidth="1.5"
            >
              <path d="M3 7h5l2 5-3 3 4 4 3-3 5 2v5" />
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
          )}
        </div>
      )}
      <div className={styles['card-body']}>
        <div className={styles['card-tags']}>
          {p.badges.map((b) => (
            <span key={b.label} className={`${styles.badge} ${styles[b.cls]}`}>
              {b.label}
            </span>
          ))}
        </div>
        <h3 className={styles['card-title']}>{p.title}</h3>
        <p className={styles['card-desc']}>{p.desc}</p>
        <div className={styles['tech-pills']}>
          {p.tech.map((t, i) => (
            <span
              key={i}
              className={`${styles['tech-pill']}${t.startsWith('+') ? ' ' + styles.more : ''}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className={styles['card-footer-row']}>
          <span className={styles.supervisor}>Supervisor: {p.supervisor}</span>
          {/* Open link in new tab */}
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['view-link']}
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  useReveal([filter]);

  const visible = PROJECTS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles['hero-inner']}>
          <div className={styles.eyebrow}>
            <span className={styles.icon}>🎓</span> Showcase
          </div>
          <h1 className={styles['hero-title']}>
            Final Year <span className={styles.blue}>Proj</span>
            <span className={styles.red}>ects</span>
          </h1>
          <p className={styles['hero-desc']}>
            Discover innovative final-year work across disciplines — from AI to
            engineering to the arts.
          </p>
          <div className={styles['filter-tabs']}>
            <div
              className={`${styles.tab}${filter === 'all' ? ' ' + styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </div>
            <div
              className={`${styles.tab}${filter === 'fyp' ? ' ' + styles.active : ''}`}
              onClick={() => setFilter('fyp')}
            >
              Final Year Projects
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className={styles['cards-section']}>
        <div className={styles['cards-inner']}>
          <h2 className={`${styles['section-title']} reveal reveal-up`}>
            Final Year Projects
          </h2>
          <div className={styles['cards-grid']}>
            {visible.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}