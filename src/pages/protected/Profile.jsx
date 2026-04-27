import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ full_name: user?.full_name || '', currency: user?.currency || 'GBP' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.put('/profile', form);
      updateUser(form);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update profile'); }
    setLoading(false);
  };

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Profile</h1><p>Manage your account information</p></div>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: 'white' }}>
            {user?.full_name?.[0] || '?'}
          </div>
          <div><h2>{user?.full_name}</h2><p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
            <span className="badge badge-success" style={{ marginTop: '8px' }}>Active</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} id="profile-form">
          <div className="form-group"><label>Full Name</label><input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
          <div className="form-group"><label>Email</label><input value={user?.email || ''} disabled style={{ opacity: 0.5 }} /></div>
          <div className="form-group"><label>Currency</label>
            <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}>
              <option value="GBP">GBP (£)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
}
