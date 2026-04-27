import { useState, useEffect } from 'react';
import { HiSparkles } from 'react-icons/hi';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function Subscriptions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const fetch = () => { client.get('/subscriptions').then(r => { setData(r.data); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { fetch(); }, []);

  const handleScan = async () => {
    setScanning(true);
    try { const res = await client.post('/subscriptions/scan'); toast.success(res.data.message); fetch(); }
    catch { toast.error('Scan failed'); }
    setScanning(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove subscription?')) return;
    try { await client.delete(`/subscriptions/${id}`); toast.success('Removed'); fetch(); }
    catch { toast.error('Failed'); }
  };

  if (loading) return <div className="loading-spinner" />;

  const COLORS = ['#7C3AED', '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  return (
    <div className="animate-fade">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Subscriptions</h1><p>Manage your recurring payments and subscriptions</p></div>
        <button className="btn btn-primary" onClick={handleScan} disabled={scanning}><HiSparkles /> {scanning ? 'Scanning...' : 'Scan for Subscriptions'}</button>
      </div>

      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card" style={{ background: 'var(--gradient-purple)' }}>
          <div className="stat-label">Monthly Total</div><div className="stat-value">£{(data?.monthly_total || 0).toFixed(2)}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-blue)' }}>
          <div className="stat-label">Annual Cost</div><div className="stat-value">£{(data?.annual_total || 0).toFixed(2)}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-green)' }}>
          <div className="stat-label">Active Subscriptions</div><div className="stat-value">{data?.active_count || 0}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '8px' }}>Active Subscriptions</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>Your recurring payments and memberships</p>
        {!data?.subscriptions?.length ? <div className="empty-state"><p>No subscriptions found. Click "Scan for Subscriptions" to detect recurring charges.</p></div> :
          data.subscriptions.map((sub, i) => (
            <div key={sub.id} style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border)', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: COLORS[i % COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '1.1rem', flexShrink: 0 }}>
                {sub.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong>{sub.name}</strong>
                  <span className="badge badge-primary">{sub.frequency}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  £{sub.amount.toFixed(2)} · {sub.next_billing_date ? `Next: ${sub.next_billing_date}` : ''} {sub.frequency === 'monthly' ? '(30 days)' : ''}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>£{sub.amount.toFixed(2)}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>£{sub.annual_cost.toFixed(2)}/year</div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(sub.id)} style={{ marginLeft: '8px' }}>×</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
