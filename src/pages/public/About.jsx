import './StaticPage.css';

export default function About() {
  return (
    <div className="static-page animate-fade">
      <div className="static-container">
        <h1>About FinanceFlow</h1>
        <p className="subtitle">Empowering individuals to take control of their financial future.</p>
        <section className="static-section">
          <h2>Our Mission</h2>
          <p>FinanceFlow was created to address a real-world need for better financial awareness and budgeting tools, especially relevant in the current cost-of-living climate. We believe everyone deserves access to powerful, intuitive financial management tools.</p>
        </section>
        <section className="static-section">
          <h2>What We Offer</h2>
          <div className="about-grid">
            <div className="about-card card"><h3>📊 Smart Dashboards</h3><p>Interactive charts and visualisations to understand your spending patterns at a glance.</p></div>
            <div className="about-card card"><h3>🏦 Bank Integration</h3><p>Connect your UK bank accounts to automatically import and categorise transactions.</p></div>
            <div className="about-card card"><h3>🤖 AI Assistant</h3><p>Powered by Google Gemini, get personalised financial advice based on your actual data.</p></div>
            <div className="about-card card"><h3>📁 CSV Import</h3><p>Upload bank statements and let our system automatically parse and categorise your transactions.</p></div>
          </div>
        </section>
        <section className="static-section">
          <h2>Technology Stack</h2>
          <p>Built with React, FastAPI, Supabase PostgreSQL, and Google Gemini AI — FinanceFlow combines modern web technologies with enterprise-grade security to protect your financial data.</p>
        </section>
        <section className="static-section">
          <h2>Privacy & Security</h2>
          <p>Your financial data is encrypted and stored securely using Supabase's row-level security. We are GDPR compliant and never share your data with third parties. All connections are encrypted with TLS.</p>
        </section>
      </div>
    </div>
  );
}
