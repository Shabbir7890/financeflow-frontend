import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">💸</span>
          <span className="footer-brand-text">FinanceFlow</span>
          <p>Smart personal finance management for everyone.</p>
        </div>
        <div className="footer-links-group">
          <h4>Navigation</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-links-group">
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
        <div className="footer-links-group">
          <h4>Support</h4>
          <a href="mailto:support@financeflow.co.uk">support@financeflow.co.uk</a>
          <a href="tel:+442071234567">+44 20 7123 4567</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FinanceFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}
