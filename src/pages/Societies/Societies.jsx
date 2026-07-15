import { useState } from 'react';
import { useReveal } from '../../hooks/useScrollEffects';
import { societiesData } from '../../data/societiesData';
import styles from './Societies.module.css';

const AVATAR_COLORS = ['#2563EB', '#7C3AED', '#E63946', '#D4A017', '#1A3C6E', '#0EA5E9', '#8B5CF6', '#EF4444', '#F59E0B', '#10B981'];

function initialsOf(name) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function Societies() {
  const [selectedId, setSelectedId] = useState(null);
  useReveal([selectedId]);

  const selected = societiesData.find((s) => s.id === selectedId);

  function openDetail(id) {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeDetail() {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {!selected && (
        <>
          {/* HERO */}
          <section className={styles.hero}>
            <div className={styles['hero-inner']}>
              <div className={styles.eyebrow}><i className="fas fa-users"></i> Student Life</div>
              <h1 className={styles['hero-title']}>
                Clubs &amp; <br /><span className={styles['gradient-text']}>Societies</span>
              </h1>
              <p className={styles['hero-desc']}>
                Engage, network, and grow with our vibrant student communities. Explore our diverse range of clubs
                and societies that help you develop skills, build connections, and enhance your university experience.
              </p>
            </div>
          </section>

          {/* GRID */}
          <section className={styles.section}>
            <div className={`${styles['section-label']} reveal reveal-up`}>
              <div className={styles.eyebrow}><i className="fas fa-star"></i> Our Community</div>
              <h2>Explore <span className={styles.highlight}>All Societies</span></h2>
            </div>
            <div className={styles['societies-grid']}>
              {societiesData.map((s, idx) => {
                const shortDesc = s.description.length > 100 ? s.description.slice(0, 100) + '…' : s.description;
                return (
                  <div
                    key={s.id}
                    className={`${styles['society-card']} reveal`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    onClick={() => openDetail(s.id)}
                  >
                    <div className={styles['icon-wrap']}><i className={`fas ${s.icon}`}></i></div>
                    <h3>{s.name}</h3>
                    <div className={styles.tagline}>{s.tagline}</div>
                    <span className={styles.tag}>{s.tag}</span>
                    <p className={styles.desc}>{shortDesc}</p>
                    <div className={styles['card-actions']}>
                      <button
                        className={`${styles['btn-sm']} ${styles['btn-sm-primary']}`}
                        onClick={(e) => { e.stopPropagation(); openDetail(s.id); }}
                      >
                        <i className="fas fa-eye"></i> View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {selected && (
        <div className={`${styles['detail-view']} ${styles.active}`}>
          <button className={styles['detail-back']} onClick={closeDetail}>
            <i className="fas fa-arrow-left"></i> Back to Societies
          </button>

          <div className={styles['detail-header']}>
            <div className={styles['detail-icon']}><i className={`fas ${selected.icon}`}></i></div>
            <div className={styles['detail-header-info']}>
              <h1>{selected.name}</h1>
              <div className={styles['detail-tagline']}>{selected.tagline}</div>
              <span className={styles['detail-tag']}>{selected.tag}</span>
            </div>
          </div>

          <div className={styles['detail-description']}>{selected.description}</div>

          <div className={styles['team-section']}>
            <div className={styles['team-heading-wrapper']}>
              <div className={styles['team-heading']}>
                <i className="fas fa-users"></i>
                <span>Meet Our Team</span>
              </div>
              <div className={styles['heading-underline']}></div>
              <p className={styles['team-sub']}>The passionate individuals behind the society who drive innovation and impact.</p>
            </div>

            <div className={styles['team-grid']}>
              {selected.team.map((member, idx) => {
                const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                return (
                  <div
                    key={member.name}
                    className={styles['team-member']}
                    style={{ '--member-color': color, animationDelay: `${idx * 0.04}s` }}
                  >
                    <div className={styles['member-badge']}></div>
                    <div className={styles['avatar-wrap']}>
                      <div className={styles.avatar} style={{ background: `${color}15`, color, borderColor: `${color}30` }}>
                        {/* Drop a photo at public/images/team/{selected.id}/{idx+1}.jpg — initials show until then */}
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                        <span className={styles['avatar-fallback']} style={{ display: 'none' }}>{initialsOf(member.name)}</span>
                        <div className={styles['avatar-ring']}></div>
                      </div>
                    </div>
                    <div className={styles['member-name']}>{member.name}</div>
                    <div className={styles['member-designation']}>{member.designation}</div>
                    <div className={styles['member-skills']}>
                      {member.skills.map((s) => <span key={s}>{s}</span>)}
                    </div>
                    <div className={styles['member-links']}>
                      <a href={member.linkedin} className={styles.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                      <a href={member.github} className={styles.github} target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
