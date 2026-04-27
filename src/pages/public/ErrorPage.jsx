import { Link } from 'react-router-dom';
import './StaticPage.css';

export default function ErrorPage() {
  return (
    <div className="static-page" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-scale">
        <div style={{ fontSize: '6rem', marginBottom: '16px' }}>🚫</div>
        <h1 style={{ fontSize: '4rem', marginBottom: '8px', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '32px' }}>The page you're looking for doesn't exist or has been moved.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
