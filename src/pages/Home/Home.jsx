import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useReveal, useCounters } from '../../hooks/useScrollEffects';
import styles from './Home.module.css';

export default function Home() {
  useReveal();
  useCounters();

  const [videoUrl, setVideoUrl] = useState(null);
  const fileInputRef = useRef(null);

  function handleCardClick(e) {
    if (e.target.closest(`.${styles['remove-video-btn']}`)) return;
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file (MP4, WebM, MOV, AVI, etc.)');
      e.target.value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    e.target.value = '';
  }

  function handleRemoveVideo(e) {
    e.stopPropagation();
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
  }

  return (
    <>
      {/* HERO */}
      <section className={styles.hero} id="home">
        <div className={styles['hero-bg-circles']}>
          <div className={`${styles.circle} ${styles.c1}`}></div>
          <div className={`${styles.circle} ${styles.c2}`}></div>
        </div>
        <div className={styles['hero-inner']}>
          <div className={styles['hero-content']}>
            <div className={styles['hero-badge']}>
              <div className={styles.dot}></div>
              Admissions for Fall 2026 are now open
            </div>
            <h1 className={styles['hero-title']}>
              Welcome To,<br />
              Punjab College <span className={styles.highlight}>Ucp Campus</span>
            </h1>
            <p className={styles['hero-desc']}>
              UCP Rawalpindi is a constituent college of the University of Central Punjab (UCP), Lahore.
            </p>
            <div className={styles['hero-ctas']}>
              <Link to="/campus-info" className={styles['btn-primary']}>🎓 Explore Programs →</Link>
              <Link to="/contact" className={styles['btn-secondary']}>✏️ Apply Now</Link>
            </div>
            <div className={styles['hero-social-proof']}>
              <div className={styles['avatar-stack']}>
                {/* Add student photos at: public/images/ali-image.jpeg, arsal-image.jpeg, laraib.jpeg */}
                <img src="/images/team/ali-imge.jpeg" alt="Student" onError={(e) => { e.target.style.background = '#CBD5E1'; }} />
                <img src="/images/team/arsal-image.jpeg" alt="Student" onError={(e) => { e.target.style.background = '#BAC8FF'; }} />
                <img src="/images/team/laraib.jpeg" alt="Student" onError={(e) => { e.target.style.background = '#FCA5A5'; }} />
                <div className={styles['avatar-count']}>900+</div>
              </div>
              <span className={styles['social-text']}>Joining a community of <strong>820+ students</strong></span>
              <div className={styles['divider-v']}></div>
              <div className={styles.stars}>
                <span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star} style={{ opacity: 0.5 }}>★</span>
                <span className={styles['rating-text']}><strong>4.9</strong> / 5 from QS World Rankings</span>
              </div>
            </div>
          </div>
          <div className={styles['hero-image-wrap']}>
            <div className={styles['hero-img-card']}>
              {/* Add campus building photo at: public/images/campus-building.jpg */}
              <img
                src="/images/campus-building.jpg"
                alt="UCP Rawalpindi Campus Building"
                onError={(e) => {
                  e.target.style.background = 'linear-gradient(135deg,#EDF6FF,#C7D9F5)';
                  e.target.style.display = 'block';
                }}
              />
            </div>
            <div className={styles['hero-floating-card']}>
              <div className={styles['floating-icon']}>🎓</div>
              <div className={styles['floating-info']}>
                <div className={styles.val}>14,820+</div>
                <div className={styles.lbl}>Enrolled Students</div>
              </div>
            </div>
            <div className={styles['hero-floating-card2']}>
              <div className={styles.val}>#</div>
              <div className={styles.lbl}>Private University</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className={styles['about-section']} id="about">
        <div className={styles['about-inner']}>
          <div className={`${styles['about-img-wrap']} reveal-left`}>
            {/* Add campus photo at: public/images/campus-wide.jpg */}
            <img
              src="/images/campus-wide.jpg"
              alt="UCP Campus"
              onError={(e) => {
                e.target.style.background = 'linear-gradient(135deg,#F5FBFF,#D0E7FF)';
                e.target.style.display = 'block';
              }}
            />
          </div>
          <div className={`${styles['about-content']} reveal-right`}>
            <div className={styles.eyebrow}>🏛 About UCP</div>
            <h2>A legacy of <span className={styles.highlight}>excellence</span> since 1999</h2>
            <p>
              The University of Central Punjab stands among Pakistan's leading private institutions, driven by a
              commitment to academic rigour, innovation, and holistic student development. With a sprawling modern
              campus in the heart of Lahore, UCP brings together diverse minds from across the country and beyond.
            </p>
            <p>
              From internationally accredited programmes to vibrant student societies, from research labs pushing
              boundaries to a faculty that includes some of the brightest minds in their fields — UCP is where
              futures take shape.
            </p>
            <Link to="/about" className={styles['learn-more']}>Learn more about UCP <span className={styles.arrow}>→</span></Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles['stats-section']}>
        <div className={styles['stats-inner']}>
          <div className={`${styles['stat-item']} reveal`}>
            <div className={styles['stat-icon']}>👥</div>
            <div className={styles['stat-num']}><span className="count" data-target="1000">0</span><span className={styles.accent}>+</span></div>
            <div className={styles['stat-label']}>Total Students</div>
          </div>
          <div className={`${styles['stat-item']} reveal`} style={{ transitionDelay: '0.1s' }}>
            <div className={styles['stat-icon']}>📚</div>
            <div className={styles['stat-num']}><span className="count" data-target="10">0</span><span className={styles.accent}>+</span></div>
            <div className={styles['stat-label']}>Programs Offered</div>
          </div>
          <div className={`${styles['stat-item']} reveal`} style={{ transitionDelay: '0.2s' }}>
            <div className={styles['stat-icon']}>🎓</div>
            <div className={styles['stat-num']}><span className="count" data-target="50">0</span><span className={styles.accent}>+</span></div>
            <div className={styles['stat-label']}>Faculty Members</div>
          </div>
        </div>
      </section>

      {/* VIDEO AD CARD — click to upload your own promo video */}
      <section className={styles['ad-section']}>
        <div className={styles['ad-inner']}>
          <div className={`${styles['ad-card']} reveal`} onClick={handleCardClick}>
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {!videoUrl && (
              <div className={styles['upload-hint']}>
                <div className={styles['ad-icon']}>🎬</div>
                <h3>Upload Your Video Advertisement</h3>
                <p>Click anywhere on this card to select a video file.<br />Supported formats: MP4, WebM, MOV, AVI</p>
                <span className={styles['btn-outline']} style={{ pointerEvents: 'none' }}>🎥 Choose Video File</span>
              </div>
            )}

            {videoUrl && (
              <div className={`${styles['video-wrapper']} ${styles.show}`}>
                <video controls playsInline autoPlay src={videoUrl}>
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <button
              className={`${styles['remove-video-btn']}${videoUrl ? ' ' + styles.show : ''}`}
              onClick={handleRemoveVideo}
            >
              ✕ Remove Video
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
