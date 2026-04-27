import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">💸</span>
          <span className="brand-text">FinanceFlow</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {!user && publicLinks.map(l => (
            <Link key={l.path} to={l.path}
              className={`nav-link ${location.pathname === l.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          {user && (
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}>Dashboard</Link>
          )}
        </div>

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          ) : (
            <div className="user-menu">
              <span className="user-avatar">{user.full_name?.[0] || '?'}</span>
              <span className="user-name">{user.full_name}</span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
            </div>
          )}
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
