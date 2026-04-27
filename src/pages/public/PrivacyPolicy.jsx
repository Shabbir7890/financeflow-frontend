import './StaticPage.css';
export default function PrivacyPolicy() {
  return (
    <div className="static-page animate-fade">
      <div className="static-container">
        <h1>Privacy Policy</h1>
        <p className="subtitle">Last updated: April 2026</p>
        <section className="static-section"><h2>1. Introduction</h2><p>FinanceFlow ("we", "our", "us") is committed to protecting your personal data and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This Privacy Policy explains how we collect, use, store, and protect your personal and financial information.</p></section>
        <section className="static-section"><h2>2. Data We Collect</h2><p>We collect: account information (name, email), financial data (expenses, budgets, bank transactions), usage data (app interactions, preferences), and technical data (IP address, browser type). We only collect data necessary for providing our services.</p></section>
        <section className="static-section"><h2>3. How We Use Your Data</h2><p>Your data is used to: provide and improve our services, display personalised financial insights, generate AI-powered budgeting advice, detect recurring subscriptions, and send service-related communications. We never sell your data to third parties.</p></section>
        <section className="static-section"><h2>4. Data Storage & Security</h2><p>All data is stored securely in Supabase's encrypted PostgreSQL database with row-level security policies. Data is encrypted in transit (TLS) and at rest. We implement industry-standard security practices including access controls and regular security audits.</p></section>
        <section className="static-section"><h2>5. Your Rights</h2><p>Under UK GDPR, you have the right to: access your data, rectify inaccurate data, erase your data, restrict processing, data portability, and object to processing. Contact us at privacy@financeflow.co.uk to exercise these rights.</p></section>
        <section className="static-section"><h2>6. AI Processing</h2><p>Our AI assistant uses Google Gemini to process your financial queries. Your financial context is shared with the AI only during active conversations and is not stored by Google for training purposes.</p></section>
        <section className="static-section"><h2>7. Third-Party Services</h2><p>We integrate with: Supabase (database & authentication), Google Gemini (AI assistant), and TrueLayer (bank connections via Open Banking). Each service has their own privacy policy and data handling practices.</p></section>
        <section className="static-section"><h2>8. Contact</h2><p>For privacy inquiries, contact our Data Protection Officer at: privacy@financeflow.co.uk or write to: FinanceFlow, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ.</p></section>
      </div>
    </div>
  );
}
