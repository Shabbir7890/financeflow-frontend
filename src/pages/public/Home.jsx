import { Link } from 'react-router-dom';
import { HiChartBar, HiShieldCheck, HiCurrencyPound, HiLightningBolt } from 'react-icons/hi';
import './Home.css';

const features = [
  { icon: <HiChartBar />, title: 'Real-Time Telemetry', desc: 'Track every transaction with surgical precision. Our widget system lets you drill down to category-level detail.', gradient: 'var(--gradient-purple)', image: '/images/dashboard-preview.png' },
  { icon: <HiShieldCheck />, title: 'Vault Security', desc: 'Bank-grade encryption protects your financial data, wrapped in a minimal footprint. Your data is isolated and encrypted.', gradient: 'var(--gradient-blue)', image: '/images/feature-security.png' },
  { icon: <HiCurrencyPound />, title: 'Liquidity View', desc: 'Instant visualisation of cash flow and asset distribution across all connected accounts.', gradient: 'var(--gradient-green)', image: '/images/feature-analytics.png' },
  { icon: <HiLightningBolt />, title: 'Intelligent Forecasting', desc: 'AI-driven analytics anticipate your spending patterns, subscription renewals, and budget conditions.', gradient: 'var(--gradient-primary)', image: '/images/hero-visual.png' },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero" id="hero-section">
        <div className="hero-content animate-fade">
          <span className="hero-badge">SYSTEM VERSION 2.0.1</span>
          <h1>PRECISION ARCHITECTURE FOR PERSONAL WEALTH.</h1>
          <p>A strictly engineered interface designed for high-stakes financial clarity. Strip away the noise and manage your capital through a rigorous, detailed framework.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Sign Up</Link>
            <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src="/images/hero-visual.png" alt="FinanceFlow Dashboard Preview" className="hero-img" />
            <div className="hero-img-glow" />
          </div>
        </div>
      </section>

      <section className="features-section" id="features-section">
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card card animate-slide" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon" style={{ background: f.gradient }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-image-wrapper">
                <img src={f.image} alt={f.title} className="feature-img" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" id="cta-section">
        <div className="cta-content">
          <div className="cta-image">
            <img src="/images/cta-visual.png" alt="FinanceFlow Analytics" className="cta-img" />
          </div>
          <div className="cta-text">
            <span className="cta-badge">REAL-TIME FINANCIAL MONITORING</span>
            <h2>ENGINEERED FOR REDUCTION.</h2>
            <p>We believe that cognitive load is the primary enemy of financial decision-making. Our system minimises distractions by foregrounding only essential components, no gradients, no nested content, no bottlenecks. Just your capital, clarified.</p>
            <Link to="/register" className="btn btn-primary">Start Managing Finances →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
