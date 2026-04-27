import { NavLink, Outlet } from 'react-router-dom';
import { HiHome, HiCreditCard, HiChartBar, HiUpload, HiCurrencyPound, HiLink, HiRefresh, HiUser, HiCog } from 'react-icons/hi';
import AIChatbot from '../chat/AIChatbot';
import './DashboardLayout.css';

const sidebarLinks = [
  { path: '/dashboard', icon: <HiHome />, label: 'Dashboard' },
  { path: '/transactions', icon: <HiCreditCard />, label: 'Transactions' },
  { path: '/add-expense', icon: <HiCurrencyPound />, label: 'Add Expense' },
  { path: '/csv-upload', icon: <HiUpload />, label: 'CSV Upload' },
  { path: '/budget', icon: <HiChartBar />, label: 'Budgets' },
  { path: '/budget-overview', icon: <HiChartBar />, label: 'Budget Overview' },
  { path: '/analytics', icon: <HiChartBar />, label: 'Analytics' },
  { path: '/connect-bank', icon: <HiLink />, label: 'Connect Bank' },
  { path: '/subscriptions', icon: <HiRefresh />, label: 'Subscriptions' },
  { path: '/profile', icon: <HiUser />, label: 'Profile' },
  { path: '/settings', icon: <HiCog />, label: 'Settings' },
];

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar" id="sidebar">
        <div className="sidebar-links">
          {sidebarLinks.map(l => (
            <NavLink key={l.path} to={l.path} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-icon">{l.icon}</span>
              <span className="sidebar-label">{l.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
      <AIChatbot />
    </div>
  );
}
