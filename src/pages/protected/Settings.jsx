import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleExportData = () => { toast.success('Data export feature coming soon!'); };
  const handleDeleteAccount = () => { if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) { toast.error('Account deletion requires admin verification. Please contact support.'); }};
  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out'); };

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Settings</h1><p>Manage your application preferences</p></div>
      <div style={{ maxWidth: '600px' }}>
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3>Preferences</h3>
          <div className="form-group" style={{ marginTop: '16px' }}><label>Theme</label>
            <select defaultValue="dark"><option value="dark">Dark Mode</option><option value="light">Light Mode (Coming Soon)</option></select>
          </div>
          <div className="form-group"><label>Notifications</label>
            <select defaultValue="enabled"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select>
          </div>
        </div>
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3>Data Management</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0', fontSize: '0.9rem' }}>Export or manage your financial data</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={handleExportData}>📥 Export Data</button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>🗑️ Delete Account</button>
          </div>
        </div>
        <div className="card">
          <h3>Session</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0', fontSize: '0.9rem' }}>Sign out of your account on this device</p>
          <button className="btn btn-secondary" onClick={handleLogout}>🚪 Sign Out</button>
        </div>
      </div>
    </div>
  );
}
