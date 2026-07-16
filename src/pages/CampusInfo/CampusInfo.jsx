import { useReveal, useDataCountCounters } from '../../hooks/useScrollEffects';
import './CampusInfo.css'; // Import the CSS

const STAT_HIGHLIGHTS = [
  { icon: 'fa-graduation-cap', count: '20', label: '+ Diverse Programs' },
  { icon: 'fa-trophy', count: '100', label: '% Scholarships Available' },
  { icon: 'fa-university', count: '1', label: 'Prestigious UCP Degree' },
  { icon: 'fa-chalkboard-teacher', count: '50', label: '% Highly Qualified Faculty' },
  { icon: 'fa-flask', count: '5', label: '+ Well Equipped Labs' },
  { icon: 'fa-map-marker-alt', count: '2', label: 'Campuses in Punjab' },
];

const BS_FEES = [
  ['BS Business Analytics', 131, '2,500', '10,500', '6,700', '890,700', '222,675'],
  ['BBA', 131, '2,500', '10,500', '6,700', '890,700', '222,675'],
  ['BS Acc & Finance', 131, '2,500', '10,500', '6,700', '890,700', '222,675'],
  ['BS Computer Science', 133, '2,500', '10,500', '7,900', '1,063,700', '265,925'],
  ['BS Psychology', 132, '2,250', '8,000', '5,900', '789,300', '197,325'],
  ['BS English', 132, '2,250', '8,000', '5,900', '789,300', '191,325'],
  ['BS Biotechnology', 137, '2,500', '8,000', '5,900', '818,800', '204,700'],
];

const ADP_FEES = [
  ['ADP Psychology', 63, '2,500', '10,000', '4,800', '314,900', '157,450'],
  ['ADP English', 66, '2,500', '10,000', '4,800', '329,300', '164,650'],
  ['ADP Business Analytics', 64, '2,500', '10,000', '5,600', '370,900', '185,450'],
  ['ADP Business Admin', 66, '2,500', '10,000', '5,600', '382,100', '191,050'],
  ['ADP Biotechnology', 70, '2,500', '10,000', '5,000', '362,500', '181,250'],
  ['ADP Accounting & Finance', 66, '2,500', '10,000', '5,600', '382,100', '191,050'],
  ['ADP Computer Science', 75, '2,500', '10,000', '6,600', '507,500', '253,750'],
  ['ADP Artificial Intelligence', 75, '2,500', '10,000', '7,200', '552,500', '276,250'],
  ['ADP Data Science', 78, '2,500', '10,000', '7,200', '574,100', '287,050'],
];

const POST_ADP_FEES = [
  ['Post-ADP Acc & Finance', 63, '2,500', '10,500', '6,700', '435,100', '217,550'],
  ['Post-ADP Business Admin', 60, '2,500', '10,500', '6,700', '415,000', '207,500'],
  ['Post-ADP Computer Science', 64, '2,500', '10,500', '7,900', '518,600', '259,300'],
];

const FEE_COLUMNS = ['Programme', 'Cr Hrs', 'Registration', 'Admission', 'Per Cr Hr', 'Total', 'Yearly Avg'];

const FEATURES = [
  'HEC Recognized Degree Programs', 'Outcome-Based Education', 'Industry-Aligned Curriculum',
  'AI & Emerging Technologies Integration', 'State-of-the-Art Smart Classrooms',
  'Modern Computer & Science Laboratories', 'Robotics, Automation & IoT Labs',
  'Entrepreneurship & Startup Incubation Support', 'Industry Certifications & Micro-Credentials',
  'Research & Innovation Culture', 'Career Development', 'Business & Leadership Development Programs',
  'Student Exchange & Mobility Opportunities', 'Soft Skills & Professional Grooming Workshops',
  'Competitive Scholarships & Financial Assistance', 'Sports Complex, Gym & Recreational Facilities',
  'Alumni Networking & Mentorship Programs',
];

const CLUBS = [
  { icon: 'fa-code', name: 'Devforge Digital Club' },
  { icon: 'fa-handshake', name: 'Alumni Association Club' },
  { icon: 'fa-theater-masks', name: 'Dramatic Club' },
  { icon: 'fa-heartbeat', name: 'Blood Donors Society' },
  { icon: 'fa-hiking', name: 'Sports & Hiking Club' },
  { icon: 'fa-gamepad', name: 'Gaming Club' },
  { icon: 'fa-hand-holding-heart', name: 'CSR Club' },
  { icon: 'fa-robot', name: 'Robotics & Automation Society' },
  { icon: 'fa-book', name: 'Literary Society' },
  { icon: 'fa-flask', name: 'Scientific Society' },
  { icon: 'fa-globe', name: 'UCP Research World' },
  { icon: 'fa-chalkboard', name: 'Academic Community' },
];

function FeeTable({ title, icon, color, rows }) {
  return (
    <div className="card" style={{ marginBottom: '32px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '12px' }}>
        <i className={`fas ${icon}`} style={{ color, marginRight: '8px' }}></i> {title}
      </h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{FEE_COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>* All amounts in PKR.</p>
    </div>
  );
}

export default function CampusInfo() {
  useReveal();
  useDataCountCounters();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow"><i className="fas fa-university"></i> Campus Info</div>
          <h1 className="hero-title">
            Your Gateway to <br /><span className="gradient-text">Academic Excellence</span>
          </h1>
          <p className="hero-desc">
            Explore our programs, fee structure, scholarships, and vibrant campus life — all the information you need
            to begin your journey at UCP Rawalpindi.
          </p>
          <div className="hero-badge">
            <i className="fas fa-calendar-alt"></i> Academic Year <strong>2026</strong>
          </div>
        </div>
      </section>

      {/* ===== STAT HIGHLIGHTS ===== */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="grid-6 stagger-grid">
          {STAT_HIGHLIGHTS.map((s, idx) => (
            <div key={s.label} className="stat-highlight" style={{ '--i': idx }}>
              <span className="icon"><i className={`fas ${s.icon}`}></i></span>
              <span className="number" data-count={s.count}>0</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONSTITUENT COLLEGE + ADMISSION POLICY ===== */}
      <section className="section">
        <div className="grid-2">
          <div className="card">
            <span className="icon-large"><i className="fas fa-landmark"></i></span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '16px' }}>
              A Constituent College of <span className="highlight">UCP</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Constituent Colleges are maintained and administrated by the university itself. They provide students
              across Punjab the opportunity to earn Bachelors and ADP degrees from UCP. Our reputation for academic
              excellence and commitment to equip students with the knowledge, skills and drive to lead in the 21st
              century is unprecedented. Since 2002, UCP has opened a world of infinite opportunities.
            </p>
          </div>
          <div className="card" style={{ transitionDelay: '0.1s' }}>
            <span className="icon-large"><i className="fas fa-clipboard-list"></i></span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '12px' }}>Admission Policy</h3>
            <p><strong>Minimum Eligibility:</strong> 45% marks in Intermediate / A-Levels or equivalent.</p>
            <p style={{ marginTop: '12px' }}><strong>Admission Criteria:</strong></p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '6px' }}>
              <li style={{ padding: '4px 0' }}>• BSCS requires <strong>50%</strong> or above.</li>
              <li style={{ padding: '4px 0' }}>• All other BS programs require <strong>45%</strong> or above.</li>
            </ul>
            <hr style={{ margin: '16px 0', borderColor: 'rgba(26,60,110,0.08)' }} />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <strong>Registration:</strong> 1st semester courses are assigned by CPS Portal. Subsequent semesters
              require coordination with campus portal managers.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              <strong>Time Limit:</strong> 2-year programs: max 4 years; 4-year programs: max 6 years (CGPA ≥ 2.0).
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              <strong>Attendance:</strong> 100% attendance required; non-compliance leads to "W" grade and forfeiture of fees.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DEGREE PROGRAMS ===== */}
      <section className="section accent-bg">
        <div className="section-label">
          <div className="eyebrow"><i className="fas fa-book-open"></i> Programs</div>
          <h2>Explore Our <span className="highlight">Degree Programs</span></h2>
        </div>
        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="card">
            <span className="icon-large"><i className="fas fa-user-graduate"></i></span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>
              Associate Degree Programs <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)' }}>(2 Years)</span>
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['ADP Computer Science', 'ADP Artificial Intelligence', 'ADP Data Sciences', 'ADP Bio-Technology', 'ADP English', 'ADP Business Administration', 'ADP Business Analytics', 'ADP Accounting & Finance', 'ADP Psychology'].map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </div>
          <div className="card" style={{ transitionDelay: '0.1s' }}>
            <span className="icon-large"><i className="fas fa-university"></i></span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>
              Bachelors Programs <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)' }}>(4 Years)</span>
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['BSCS', 'BBA', 'BS Accounting & Finance', 'BS Business Analytics', 'BS Psychology', 'BS Bio-Technology', 'BS English'].map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEE STRUCTURE ===== */}
      <section className="section">
        <div className="section-label">
          <div className="eyebrow"><i className="fas fa-coins"></i> Fee Structure</div>
          <h2>2024-2026 <span className="highlight">Tuition Fees</span></h2>
        </div>
        <FeeTable title="BS Programs" icon="fa-graduation-cap" color="var(--blue-accent)" rows={BS_FEES} />
        <FeeTable title="ADP Programs" icon="fa-layer-group" color="var(--purple)" rows={ADP_FEES} />
        <FeeTable title="Post-ADP Programs" icon="fa-arrow-right" color="var(--gold)" rows={POST_ADP_FEES} />
      </section>

      {/* ===== SCHOLARSHIPS ===== */}
      <section className="section accent-bg">
        <div className="section-label">
          <div className="eyebrow"><i className="fas fa-hand-holding-usd"></i> Financial Support</div>
          <h2>Scholarships &amp; <span className="highlight">Concessions</span></h2>
        </div>
        <div className="grid-2">
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>
              <i className="fas fa-graduation-cap" style={{ color: 'var(--blue-accent)' }}></i> BS Programs
            </h3>
            <div className="scholar-card" style={{ borderLeftColor: 'var(--blue-accent)' }}>
              <h4>Merit Based Scholarship <span className="badge" style={{ background: 'var(--blue-accent)' }}>At Admission</span></h4>
              <p>CGPA/Percentage ≥ 80% → <span className="discount">50%</span> scholarship</p>
            </div>
            <div className="scholar-card" style={{ borderLeftColor: 'var(--purple)', marginTop: '12px' }}>
              <h4>BS Acc &amp; Finance, BS Psychology, BS English</h4>
              <p>Percentage ≥ 75% → <span className="discount">50%</span> scholarship</p>
            </div>
            <div className="scholar-card" style={{ borderLeftColor: 'var(--gold)', marginTop: '12px' }}>
              <h4>Old Student &amp; Kinship</h4>
              <p>At admission → <span className="discount">50%</span> discount</p>
            </div>
          </div>
          <div className="card" style={{ transitionDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>
              <i className="fas fa-layer-group" style={{ color: 'var(--purple)' }}></i> ADP Programs
            </h3>
            <div className="scholar-card" style={{ borderLeftColor: 'var(--blue-accent)' }}>
              <h4>Merit Based Scholarship <span className="badge" style={{ background: 'var(--blue-accent)' }}>At Admission</span></h4>
              <p>Percentage ≥ 75% → <span className="discount">50%</span> scholarship</p>
            </div>
            <div className="scholar-card" style={{ borderLeftColor: 'var(--purple)', marginTop: '12px' }}>
              <h4>Old Student</h4>
              <p>≥ 65% marks → <span className="discount">50%</span> ; &lt; 65% → <span className="discount">25%</span></p>
            </div>
            <div className="scholar-card" style={{ borderLeftColor: 'var(--gold)', marginTop: '12px' }}>
              <h4>Kinship / Govt / Armed Forces / Teacher's Child</h4>
              <p>At admission → <span className="discount">25%</span> discount</p>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: '24px', textAlign: 'center', border: '2px solid rgba(37,99,235,0.15)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)' }}>
            <i className="fas fa-star" style={{ color: 'var(--gold)' }}></i> CGPA Based Performance Scholarship
          </h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>For all programs — based on CGPA:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '16px' }}>
            <div><strong style={{ color: 'var(--dark)', fontSize: '1.2rem' }}>≥ 3.5</strong> <span style={{ color: 'var(--text-muted)' }}>→</span> <span className="discount" style={{ fontSize: '1.2rem' }}>50%</span></div>
            <div><strong style={{ color: 'var(--dark)', fontSize: '1.2rem' }}>3.25 – 3.49</strong> <span style={{ color: 'var(--text-muted)' }}>→</span> <span className="discount" style={{ fontSize: '1.2rem' }}>25%</span></div>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="section">
        <div className="section-label">
          <div className="eyebrow"><i className="fas fa-star"></i> Why UCP</div>
          <h2>Key <span className="highlight">Features</span></h2>
        </div>
        <div className="card">
          <ul className="feature-list">
            {FEATURES.map((f) => <li key={f}><i className="fas fa-check-circle"></i> {f}</li>)}
          </ul>
        </div>
      </section>

      {/* ===== CLUBS & SOCIETIES ===== */}
      <section className="section accent-bg">
        <div className="section-label">
          <div className="eyebrow"><i className="fas fa-users"></i> Community</div>
          <h2>Clubs &amp; <span className="highlight">Societies</span></h2>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem' }}>
            Engage, network, and grow with our vibrant student communities.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {CLUBS.map((c) => (
              <span key={c.name} className="club-tag"><i className={`fas ${c.icon}`}></i> {c.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAMPUSES ===== */}
      <section className="section">
        <div className="section-label">
          <div className="eyebrow"><i className="fas fa-map-pin"></i> Visit Us</div>
          <h2>Our <span className="highlight">Campuses</span></h2>
        </div>
        <div className="grid-2">
          <div className="campus-card">
            <h3><i className="fas fa-location-dot" style={{ color: 'var(--red-accent)' }}></i> Campus 1</h3>
            <p>Punjab College D-464, 6th Road, Satellite Town, Rawalpindi</p>
            <p className="phone"><i className="fas fa-phone"></i> 051-4421672 &nbsp;|&nbsp; 051-4421459</p>
          </div>
          <div className="campus-card" style={{ transitionDelay: '0.1s' }}>
            <h3><i className="fas fa-location-dot" style={{ color: 'var(--red-accent)' }}></i> Campus 2</h3>
            <p>Punjab College, Attock Oil Refinery Road, Rawalpindi</p>
            <p className="phone"><i className="fas fa-phone"></i> 051-5450033-44</p>
          </div>
        </div>
      </section>
    </>
  );
}