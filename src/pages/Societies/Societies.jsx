// src/pages/Societies/Societies.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReveal } from '../../hooks/useScrollEffects';
import { SOCIETIES } from '../../admin/config/societies';
import { societiesData } from '../../data/societiesData';
import styles from './Societies.module.css';

const AVATAR_COLORS = ['#7C3AED', '#E63946', '#D4A017', '#1A3C6E', '#0EA5E9', '#8B5CF6', '#EF4444', '#F59E0B', '#10B981'];

function initialsOf(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Societies() {
  const { societyKey } = useParams();
  const [allSocieties, setAllSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  useReveal([selectedId]);

  // ----- Load & Merge Data -----
  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        let merged = [];

        // 1. Start with static data
        let staticList = societiesData;

        // 2. Filter static data if a specific society key is requested
        if (societyKey) {
          staticList = societiesData.filter(
            (s) => s.category === societyKey || s.tag === societyKey
          );
        }

        // 3. Load admin data from localStorage
        let adminData = [];

        if (societyKey) {
          const society = SOCIETIES.find((s) => s.key === societyKey);
          if (society) {
            const stored = localStorage.getItem(society.storageKey);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed)) adminData = parsed;
            }
          }
        } else {
          SOCIETIES.forEach((s) => {
            const stored = localStorage.getItem(s.storageKey);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                const enriched = parsed.map((item) => ({
                  ...item,
                  categoryKey: s.key,
                }));
                adminData = adminData.concat(enriched);
              }
            }
          });
        }

        // 4. Merge: admin data overrides static data by `id`
        const adminMap = {};
        adminData.forEach((item) => {
          if (item.id) {
            adminMap[item.id] = item;
          }
        });

        merged = staticList.map((staticItem) => {
          if (adminMap[staticItem.id]) {
            const adminItem = adminMap[staticItem.id];
            return {
              ...adminItem,
              category: staticItem.category || staticItem.tag || societyKey || 'general',
            };
          }
          return staticItem;
        });

        adminData.forEach((adminItem) => {
          if (!merged.some((item) => item.id === adminItem.id)) {
            merged.push(adminItem);
          }
        });

        setAllSocieties(merged);
        setError(null);
      } catch (err) {
        console.error('Load error:', err);
        setError('Failed to load societies');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const handleStorage = (e) => {
      if (e.key && e.key.startsWith('uni_soc_')) {
        loadData();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [societyKey]);

  // ----- Detail view state -----
  const selected = allSocieties.find((s) => s.id === selectedId);

  function openDetail(id) {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeDetail() {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ----- Loading & Error states -----
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.hero} style={{ padding: '4rem 1rem' }}>
          <div className={styles['hero-inner']}>
            <div className={styles.eyebrow}>Loading societies…</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div
            className="spinner"
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #ccc',
              borderTopColor: '#7C3AED',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto',
            }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.hero} style={{ padding: '4rem 1rem', backgroundColor: '#fee2e2' }}>
          <h1 style={{ color: '#b91c1c' }}>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // ----- Render main view -----
  return (
    <>
      {!selected ? (
        <>
          {/* HERO */}
          <section className={styles.hero}>
            <div className={styles['hero-inner']}>
              <div className={styles.eyebrow}>
                <i className="fas fa-users"></i> Student Life
              </div>
              <h1 className={styles['hero-title']}>
                Clubs &amp; <br />
                <span className={styles['gradient-text']}>Societies</span>
              </h1>
              <p className={styles['hero-desc']}>
                Discover the diverse range of societies at our university.
                Join a community that shares your passion.
              </p>
            </div>
          </section>

          {/* GRID */}
          <section className={styles.section}>
            <div className={`${styles['section-label']} reveal reveal-up`}>
              <div className={styles.eyebrow}>
                <i className="fas fa-star"></i> Our Community
              </div>
              <h2>
                Explore <span className={styles.highlight}>All Societies</span>
              </h2>
            </div>

            {allSocieties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6b7280' }}>
                <p>No societies available yet. Check back later!</p>
              </div>
            ) : (
              <div className={styles['societies-grid']}>
                {allSocieties.map((s, idx) => {
                  const shortDesc =
                    s.description && s.description.length > 100
                      ? s.description.slice(0, 100) + '…'
                      : s.description || '';
                  return (
                    <div
                      key={s.id}
                      className={`${styles['society-card']} reveal`}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                      onClick={() => openDetail(s.id)}
                    >
                      <div className={styles['icon-wrap']}>
                        {s.logo ? (
                          <img src={s.logo} alt={s.name} className={styles['society-logo']} />
                        ) : (
                          <i className={`fas ${s.icon || 'fa-users'}`}></i>
                        )}
                      </div>
                      <h3>{s.name}</h3>
                      <div className={styles.tagline}>{s.tagline}</div>
                      <span className={styles.tag}>{s.tag}</span>
                      <p className={styles.desc}>{shortDesc}</p>
                      <div className={styles['card-actions']}>
                        <button
                          className={`${styles['btn-sm']} ${styles['btn-sm-primary']}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetail(s.id);
                          }}
                        >
                          <i className="fas fa-eye"></i> View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      ) : (
        /* ================== DETAIL VIEW (overlay) ================== */
        <div
          className={`${styles['detail-view']} ${styles.active}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            background: 'white',
            zIndex: 9999,
            padding: '20px 40px 60px',
          }}
        >
          {/* Back button */}
          <button
            onClick={closeDetail}
            style={{
              position: 'fixed',
              top: '20px',
              left: '24px',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid #ddd',
              borderRadius: '30px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2563EB',
              cursor: 'pointer',
              zIndex: 10000,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2563EB';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.95)';
              e.target.style.color = '#2563EB';
            }}
          >
            <i className="fas fa-arrow-left"></i> Back
          </button>

          <div style={{ marginTop: '70px' }}>
            {/* Header */}
            <div className={styles['detail-header']}>
              {/* --- UPDATED LOGO CONTAINER --- */}
              <div
                className={styles['detail-icon']}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f3f4f6',
                  flexShrink: 0,
                }}
              >
                {selected.logo ? (
                  <img
                    src={selected.logo}
                    alt={selected.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <i
                    className={`fas ${selected.icon || 'fa-users'}`}
                    style={{ fontSize: '50px', color: '#7C3AED' }}
                  ></i>
                )}
              </div>
              {/* --------------------------------- */}

              <div className={styles['detail-header-info']}>
                <h1>{selected.name}</h1>
                <div className={styles['detail-tagline']}>{selected.tagline}</div>
                <span className={styles['detail-tag']}>{selected.tag}</span>
              </div>
            </div>

            {/* Description */}
            <div className={styles['detail-description']}>{selected.description}</div>

            {/* Mission */}
            {selected.mission && (
              <div className={styles['detail-mission']}>
                <h2>Mission</h2>
                <p>{selected.mission}</p>
              </div>
            )}

            {/* Objectives */}
            {selected.objectives && selected.objectives.length > 0 && (
              <div className={styles['detail-objectives']}>
                <h2>Objectives</h2>
                <ul>
                  {selected.objectives.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Activities */}
            {selected.activities && selected.activities.length > 0 && (
              <div className={styles['detail-activities']}>
                <h2>Activities</h2>
                <ul>
                  {selected.activities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vision */}
            {selected.vision && (
              <div className={styles['detail-vision']}>
                <h2>Vision</h2>
                <p>{selected.vision}</p>
              </div>
            )}

            {/* Contact */}
            {selected.contact && (
              <div className={styles['detail-contact']}>
                <h2>Contact Information</h2>
                {selected.contact.email && (
                  <p>
                    <i className="fas fa-envelope"></i> {selected.contact.email}
                  </p>
                )}
                {selected.contact.phone && (
                  <p>
                    <i className="fas fa-phone"></i> {selected.contact.phone}
                  </p>
                )}
                {selected.contact.office && (
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {selected.contact.office}
                  </p>
                )}
              </div>
            )}

            {/* Motto */}
            {selected.motto && (
              <div className={styles['detail-motto']}>
                <h2>Club Motto</h2>
                <blockquote>{selected.motto}</blockquote>
              </div>
            )}

            {/* Team section */}
            {selected.team && selected.team.length > 0 && (
              <div className={styles['team-section']}>
                <div className={styles['team-heading-wrapper']}>
                  <div className={styles['team-heading']}>
                    <i className="fas fa-users"></i>
                    <span>Meet Our Team</span>
                  </div>
                  <div className={styles['heading-underline']}></div>
                  <p className={styles['team-sub']}>
                    The passionate individuals behind the society who drive innovation and impact.
                  </p>
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
                          <div
                            className={styles.avatar}
                            style={{ background: `${color}15`, color, borderColor: `${color}30` }}
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <span className={styles['avatar-fallback']} style={{ display: 'none' }}>
                              {initialsOf(member.name)}
                            </span>
                            <div className={styles['avatar-ring']}></div>
                          </div>
                        </div>
                        <div className={styles['member-name']}>{member.name}</div>
                        <div className={styles['member-designation']}>{member.designation}</div>
                        <div className={styles['member-skills']}>
                          {member.skills.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                        <div className={styles['member-links']}>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              className={styles.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="LinkedIn"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              className={styles.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="GitHub"
                            >
                              <i className="fab fa-github"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}