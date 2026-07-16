import { useEffect, useState } from 'react';
import './EMagazine.css';

// ============================================================
// DUMMY DATA (replace with API fetch later)
// ============================================================
const DUMMY_MAGAZINES = [
  {
    id: 1,
    title: 'THE HORIZON',
    issue: 'Spring 2026',
    coverImage: '/images/team/magzine-image.jpeg',
    pdfUrl: '/files/The-Horizon-Spring-2026.pdf',
    description:
      'This spring, we celebrate the extraordinary resilience of our community. From groundbreaking research in AI ethics to the vibrant energy of our cultural festival, this issue captures the many faces of Crossroads — bold, compassionate, and relentlessly curious.',
    topics: ['Technology', 'Education', 'Campus Life', 'Research'],
    date: 'Spring 2026',
  },
  {
    id: 2,
    title: 'INNOVATION DIGEST',
    issue: 'Fall 2025',
    coverImage: '/images/team/innovation-cover.jpg',
    pdfUrl: '/files/Innovation-Digest-Fall2025.pdf',
    description:
      'A deep dive into the latest breakthroughs in sustainable energy, AI-driven healthcare, and the future of work. Featuring interviews with industry leaders and faculty researchers.',
    topics: ['Innovation', 'Sustainability', 'AI', 'Future Work'],
    date: 'Fall 2025',
  },
];

export default function EMagazine() {
  const [magazines, setMagazines] = useState([]);
  const [selectedMag, setSelectedMag] = useState(null);
  const [coverExists, setCoverExists] = useState({});
  const [pdfExists, setPdfExists] = useState({});

  // ---------- fetch magazines ----------
  useEffect(() => {
    // TODO: Replace with actual API call
    const data = DUMMY_MAGAZINES;
    setMagazines(data);
    if (data.length > 0) setSelectedMag(data[0]);
  }, []);

  // ---------- check images & PDFs ----------
  useEffect(() => {
    if (!selectedMag) return;

    const img = new Image();
    img.src = selectedMag.coverImage;
    img.onload = () => setCoverExists(prev => ({ ...prev, [selectedMag.id]: true }));
    img.onerror = () => setCoverExists(prev => ({ ...prev, [selectedMag.id]: false }));

    let cancelled = false;
    fetch(selectedMag.pdfUrl, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setPdfExists(prev => ({ ...prev, [selectedMag.id]: res.ok }));
      })
      .catch(() => {
        if (!cancelled) setPdfExists(prev => ({ ...prev, [selectedMag.id]: false }));
      });
    return () => { cancelled = true; };
  }, [selectedMag]);

  // ---------- download ----------
  function downloadPdf() {
    if (!selectedMag) return;
    const a = document.createElement('a');
    a.href = selectedMag.pdfUrl;
    a.download = selectedMag.pdfUrl.split('/').pop();
    a.click();
  }

  // ---------- read online (opens in new tab) ----------
  function readOnline() {
    if (!selectedMag) return;
    window.open(selectedMag.pdfUrl, '_blank');
  }

  if (!selectedMag) {
    return <div className="loading-magazines">Loading magazines...</div>;
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow"><span className="icon">📖</span> Explore</div>
          <h1 className="hero-title">Horizon: Campus <span className="red">Edition</span></h1>
          <p className="hero-desc">Our official university magazine — stories, research and campus life.</p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <section className="mag-section">
        <div className="mag-inner">
          <div className="mag-layout">
            {/* -------- SIDEBAR -------- */}
            <div className="mag-sidebar">
              <h3 className="sidebar-title">📚 All Issues</h3>
              <ul className="mag-list">
                {magazines.map((mag) => (
                  <li
                    key={mag.id}
                    className={`mag-list-item ${selectedMag.id === mag.id ? 'active' : ''}`}
                    onClick={() => setSelectedMag(mag)}
                  >
                    <div className="mag-list-cover">
                      {coverExists[mag.id] ? (
                        <img src={mag.coverImage} alt={mag.title} />
                      ) : (
                        <div className="list-placeholder">📄</div>
                      )}
                    </div>
                    <div className="mag-list-info">
                      <div className="mag-list-title">{mag.title}</div>
                      <div className="mag-list-issue">{mag.issue}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* -------- CONTENT -------- */}
            <div className="mag-content">
              <div className="mag-cover-side">
                <span className="cover-badge">E-Magazine</span>
                <div className="cover-image-wrap">
                  {coverExists[selectedMag.id] ? (
                    <img
                      className="cover-img"
                      src={selectedMag.coverImage}
                      alt={`${selectedMag.title} cover`}
                      onError={() => setCoverExists(prev => ({ ...prev, [selectedMag.id]: false }))}
                    />
                  ) : (
                    <div className="cover-placeholder">
                      <div className="ph-icon">🖼️</div>
                      <div className="ph-text">No cover image uploaded.</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mag-info-side">
                <div className="issue-badge">🗓 {selectedMag.date}</div>
                <h2 className="mag-title">{selectedMag.title}</h2>
                <p className="mag-subtitle">{selectedMag.issue}</p>
                <div className="editorial-block">
                  <div className="editorial-label">Editorial</div>
                  <p className="editorial-text">{selectedMag.description}</p>
                </div>
                <div className="topic-pills">
                  {selectedMag.topics.map((topic) => (
                    <span key={topic} className="topic-pill">{topic}</span>
                  ))}
                </div>

                {/* TWO BUTTONS: Download + Read Online */}
                <div className="mag-actions">
                  <button
                    className="btn-download"
                    onClick={downloadPdf}
                    disabled={!pdfExists[selectedMag.id]}
                  >
                    ⬇ Download PDF
                  </button>
                  <button
                    className="btn-read-online"
                    onClick={readOnline}
                    disabled={!pdfExists[selectedMag.id]}
                  >
                    📖 Read Online
                  </button>
                </div>
                {!pdfExists[selectedMag.id] && (
                  <p style={{ fontSize: '12px', color: '#E63946', marginTop: '10px' }}>
                    ⚠️ PDF not found. Please upload the file.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}