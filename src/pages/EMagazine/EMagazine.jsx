import { useEffect, useState } from 'react';
import styles from './EMagazine.module.css';

// Where to put your files so this page can find them:
const COVER_SRC = '/images/magazine-cover.jpg';
const PDF_SRC = '/files/magazine.pdf';

export default function EMagazine() {
  const [coverExists, setCoverExists] = useState(false);
  const [pdfExists, setPdfExists] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(PDF_SRC, { method: 'HEAD' })
      .then((res) => { if (!cancelled) setPdfExists(res.ok); })
      .catch(() => { if (!cancelled) setPdfExists(false); });
    return () => { cancelled = true; };
  }, []);

  function openReader() {
    if (!pdfExists) return;
    setReaderOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeReader() {
    setReaderOpen(false);
    document.body.style.overflow = '';
  }

  function downloadPdf() {
    if (!pdfExists) return;
    const a = document.createElement('a');
    a.href = PDF_SRC;
    a.download = 'Horizon-Campus-Edition.pdf';
    a.click();
  }

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles['blob-1']}></div>
        <div className={styles['blob-2']}></div>
        <div className={styles['blob-3']}></div>
        <div className={styles['hero-inner']}>
          <div className={styles.eyebrow}><span className={styles.icon}>📖</span> Explore</div>
          <h1 className={styles['hero-title']}>Horizon: Campus <span className={styles.red}>Edition</span></h1>
          <p className={styles['hero-desc']}>Our official university magazine — stories, research and campus life.</p>
        </div>
      </section>

      {/* MAGAZINE */}
      <section className={styles['mag-section']}>
        <div className={styles['mag-inner']}>
          <div className={`${styles['mag-layout']} reveal reveal-up`}>
            {/* COVER — add public/images/magazine-cover.jpg */}
            <div className={styles['mag-cover-side']}>
              <span className={styles['cover-badge']}>E-Magazine</span>
              <div className={styles['cover-image-wrap']}>
                {coverExists ? (
                  <img
                    className={styles['cover-img']}
                    src={COVER_SRC}
                    alt="Magazine Cover"
                    onClick={openReader}
                    title="Click to read"
                    onError={() => setCoverExists(false)}
                  />
                ) : (
                  <img
                    src={COVER_SRC}
                    alt=""
                    style={{ display: 'none' }}
                    onLoad={() => setCoverExists(true)}
                    onError={() => setCoverExists(false)}
                  />
                )}
                {!coverExists && (
                  <div className={styles['cover-placeholder']}>
                    <div className={styles['ph-icon']}>🖼️</div>
                    <div className={styles['ph-text']}>No cover image uploaded.<br />Add one at public/images/magazine-cover.jpg</div>
                  </div>
                )}
              </div>
            </div>

            {/* INFO */}
            <div className={styles['mag-info-side']}>
              <div className={styles['issue-badge']}>🗓 Latest Issue — Spring 2026</div>
              <h2 className={styles['mag-title']}>THE HORIZON</h2>
              <p className={styles['mag-subtitle']}>Spring 2026</p>
              <div className={styles['editorial-block']}>
                <div className={styles['editorial-label']}>Editorial</div>
                <p className={styles['editorial-text']}>
                  This spring, we celebrate the extraordinary resilience of our community. From groundbreaking
                  research in AI ethics to the vibrant energy of our cultural festival, this issue captures the many
                  faces of Crossroads — bold, compassionate, and relentlessly curious.
                </p>
              </div>
              <div className={styles['topic-pills']}>
                <span className={styles['topic-pill']}>Technology</span>
                <span className={styles['topic-pill']}>Education</span>
                <span className={styles['topic-pill']}>Campus Life</span>
                <span className={styles['topic-pill']}>Research</span>
              </div>

              <div className={styles['mag-actions']}>
                <button className={styles['btn-read']} onClick={openReader} disabled={!pdfExists}>
                  👁 Read Online →
                </button>
                <button className={styles['btn-download']} onClick={downloadPdf} disabled={!pdfExists}>
                  ⬇ Download PDF
                </button>
              </div>
              {!pdfExists && (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
                  Add your PDF at <code>public/files/magazine.pdf</code> to enable reading &amp; downloads.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* READER MODAL */}
      <div className={`${styles['reader-overlay']}${readerOpen ? ' ' + styles.open : ''}`}>
        <div className={styles['reader-modal']}>
          <div className={styles['reader-header']}>
            <div className={styles['reader-title']}>
              <div className={styles['mag-dot']}></div>
              THE HORIZON — Spring 2026
            </div>
            <div className={styles['reader-controls']}>
              <button className={styles['reader-btn']} onClick={downloadPdf}>⬇ Download</button>
              <div className={styles['reader-close']} onClick={closeReader}>✕</div>
            </div>
          </div>
          <div className={styles['reader-body']}>
            {pdfExists ? (
              <iframe src={PDF_SRC} title="Magazine PDF Reader" />
            ) : (
              <div className={styles['reader-empty']}>
                <div className={styles['em-icon']}>📖</div>
                <p>No PDF uploaded yet.</p>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>Add it at public/files/magazine.pdf</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
