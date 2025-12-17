import "./Landing.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Where <span>Machines</span><br />
            Meet <span>Meaning</span>
          </h1>

          <p className="hero-subtitle">
            Discover legendary cars, iconic brands, and engineering
            excellence — all in one immersive experience.
          </p>

          <div className="hero-actions">
            <NavLink to="/collection" className="hero-btn primary">
              Explore Collection
            </NavLink>
            <NavLink to="/about" className="hero-btn secondary">
              Learn More
            </NavLink>
          </div>
        </div>

        <div className="hero-visual">
          <div className="speed-lines"></div>
          <div className="pulse-circle"></div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="values">
        <div className="value-card">
          <h3>Curated Intelligence</h3>
          <p>
            Every model is dynamically fetched and presented with
            real-world specifications — no static data.
          </p>
        </div>

        <div className="value-card">
          <h3>Design with Purpose</h3>
          <p>
            A dark, performance-inspired interface built for
            enthusiasts who appreciate detail.
          </p>
        </div>

        <div className="value-card">
          <h3>Built to Scale</h3>
          <p>
            Architected with modern React practices, ready for
            future AI, analytics, and backend expansion.
          </p>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="features">
        <div className="feature">
          <span>⚙️</span>
          <p>Live API-driven car data</p>
        </div>
        <div className="feature">
          <span>🚀</span>
          <p>Optimized performance & caching</p>
        </div>
        <div className="feature">
          <span>🎯</span>
          <p>Precision-focused UI/UX</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your Drive</h2>
        <p>
          Step into a platform built for those who don’t just see cars —
          they understand them.
        </p>

        <NavLink to="/collection" className="hero-btn primary">
          Enter Gear Head
        </NavLink>
      </section>

    </div>
  );
};

export default Landing;
