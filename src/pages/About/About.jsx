import React from 'react';
import './about.css'; // Import the CSS for about page

export default function About() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-eyebrow">
            <span className="icon">✦</span> About Us
          </div>
          <h1 className="about-hero-title">
            Crafting <span className="gradient-text">Digital Excellence</span> Since 1999
          </h1>
          <p className="about-hero-desc">
            We're a team of passionate innovators dedicated to building solutions
            that empower businesses and transform industries.
          </p>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="about-intro">
        <div className="about-intro-text">
          <h2>
            A legacy of <span className="highlight">excellence</span> and innovation
          </h2>
          <p>
            For over two decades, we've been at the forefront of digital transformation.
            From our humble beginnings in 1999 to becoming a global leader, our journey
            has been defined by a relentless pursuit of quality and customer success.
          </p>
          <p>
            Today, we work with over 2,500 teams across 50+ countries, delivering
            solutions that make a real difference. Our commitment to innovation
            continues to drive everything we do.
          </p>

          <div className="about-stats-row">
            <div className="about-stat">
              <span className="stat-num">25+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">2,500+</span>
              <span className="stat-label">Teams Trust Us</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="about-stat">
              <span className="stat-num">99.9%</span>
              <span className="stat-label">Uptime Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="about-intro-photo">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
            alt="Our team collaborating"
          />
          <div className="img-overlay">
            <span>Our team at work — building the future, together</span>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY / TIMELINE ===== */}
      <section className="about-journey">
        <div className="about-section">
          <div className="about-section-label">
            <div className="about-eyebrow">Our Journey</div>
            <h2>Milestones that <span className="highlight">define us</span></h2>
          </div>

          <div className="about-timeline">
            <div className="tl-item left">
              <div className="tl-card">
                <h3>🏢 Founded in 1999</h3>
                <p>Started with a small team of 5 in a garage, with a vision to revolutionize digital solutions.</p>
              </div>
              <div className="tl-center">
                <span className="tl-year">1999</span>
              </div>
              <div className="tl-empty"></div>
            </div>

            <div className="tl-item right">
              <div className="tl-empty"></div>
              <div className="tl-center">
                <span className="tl-year">2005</span>
              </div>
              <div className="tl-card">
                <h3>🌍 Global Expansion</h3>
                <p>Opened our first international office and expanded our client base to 10+ countries.</p>
              </div>
            </div>

            <div className="tl-item left">
              <div className="tl-card">
                <h3>🚀 1,000th Client</h3>
                <p>Reached a major milestone by onboarding our 1,000th client, cementing our industry reputation.</p>
              </div>
              <div className="tl-center">
                <span className="tl-year">2010</span>
              </div>
              <div className="tl-empty"></div>
            </div>

            <div className="tl-item right">
              <div className="tl-empty"></div>
              <div className="tl-center">
                <span className="tl-year">2015</span>
              </div>
              <div className="tl-card">
                <h3>💡 AI Innovation Hub</h3>
                <p>Launched our dedicated AI research division to pioneer next‑generation solutions.</p>
              </div>
            </div>

            <div className="tl-item left">
              <div className="tl-card">
                <h3>🏆 2,500+ Teams</h3>
                <p>Today, we proudly serve over 2,500 teams across 50+ countries, delivering excellence.</p>
              </div>
              <div className="tl-center">
                <span className="tl-year">2024</span>
              </div>
              <div className="tl-empty"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section className="about-leadership">
        <div className="about-section-label">
          <div className="about-eyebrow">Leadership</div>
          <h2>Meet the <span className="highlight">visionaries</span></h2>
        </div>

        <div className="leaders-grid">
          <div className="leader-card">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
              alt="John Smith"
              className="leader-banner"
            />
            <div className="leader-info">
              <div className="leader-role">CEO & Founder</div>
              <div className="leader-name">John Smith</div>
              <div className="leader-org">Since 1999</div>
            </div>
            <div className="leader-body">
              <div className="leader-quote">
                "Innovation is not just about technology—it's about creating meaningful change."
              </div>
              <p className="leader-bio">
                With 25+ years of experience, John has led the company from a small startup to a global force.
              </p>
            </div>
          </div>

          <div className="leader-card">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop"
              alt="Sarah Johnson"
              className="leader-banner"
            />
            <div className="leader-info">
              <div className="leader-role">Chief Technology Officer</div>
              <div className="leader-name">Sarah Johnson</div>
              <div className="leader-org">Since 2010</div>
            </div>
            <div className="leader-body">
              <div className="leader-quote">
                "Technology should serve people, not the other way around."
              </div>
              <p className="leader-bio">
                Sarah drives our technical vision and has been instrumental in our AI innovation journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="about-values">
        <h2>Our <span className="highlight">Core Values</span></h2>
        <p className="values-subtitle">
          The principles that guide everything we do
        </p>

        <div className="values-grid">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="value-icon">🎯</span>
                <h3>Innovation</h3>
                <p>Pushing boundaries and redefining what's possible</p>
              </div>
              <div className="flip-card-back">
                <span className="back-icon">🚀</span>
                <h3>Innovation</h3>
                <p>We embrace creativity and continuous improvement to deliver breakthrough solutions.</p>
              </div>
            </div>
          </div>

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="value-icon">🤝</span>
                <h3>Integrity</h3>
                <p>Honest, transparent, and ethical in everything</p>
              </div>
              <div className="flip-card-back">
                <span className="back-icon">⭐</span>
                <h3>Integrity</h3>
                <p>We build trust through transparency, honesty, and doing the right thing.</p>
              </div>
            </div>
          </div>

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="value-icon">👥</span>
                <h3>Collaboration</h3>
                <p>Stronger together through teamwork</p>
              </div>
              <div className="flip-card-back">
                <span className="back-icon">🤲</span>
                <h3>Collaboration</h3>
                <p>We believe the best solutions emerge from diverse perspectives working together.</p>
              </div>
            </div>
          </div>

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="value-icon">💡</span>
                <h3>Excellence</h3>
                <p>Setting and surpassing high standards</p>
              </div>
              <div className="flip-card-back">
                <span className="back-icon">🏆</span>
                <h3>Excellence</h3>
                <p>We strive for perfection in every project, exceeding expectations at every turn.</p>
              </div>
            </div>
          </div>

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="value-icon">🌍</span>
                <h3>Sustainability</h3>
                <p>Building a better future for everyone</p>
              </div>
              <div className="flip-card-back">
                <span className="back-icon">🌱</span>
                <h3>Sustainability</h3>
                <p>We're committed to creating solutions that benefit both business and the planet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}