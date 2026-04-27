import { useState, useEffect } from 'react';
import { HiLink, HiX } from 'react-icons/hi';
import client from '../../api/client';
import toast from 'react-hot-toast';
import './ConnectBank.css';

const BANK_COLORS = { HSBC: '#DB0011', Barclays: '#00AEEF', Lloyds: '#006A4D', NatWest: '#6B2C91', Santander: '#EC0000', Nationwide: '#003DA5', Monzo: '#FF5A5F', Revolut: '#0066FF' };

export default function ConnectBank() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);

  const fetchBanks = () => { client.get('/banks').then(r => { setBanks(r.data.banks); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { fetchBanks(); }, []);

  const handleConnect = async (bankName) => {
    setConnecting(bankName);
    try {
      const res = await client.post('/banks/connect', { bank_name: bankName });
      toast.success(`${bankName} connected! ${res.data.transactions_imported} transactions imported.`);
      fetchBanks();
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed to connect'); }
    setConnecting(null);
  };

  const handleDisconnect = async (bankId, bankName) => {
    if (!confirm(`Disconnect ${bankName}?`)) return;
    try { await client.post('/banks/disconnect', { bank_id: bankId }); toast.success('Disconnected'); fetchBanks(); }
    catch { toast.error('Failed to disconnect'); }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Connect Bank</h1><p>Connect your UK bank accounts to automatically import transactions</p></div>
      <div className="card"><h3 style={{ marginBottom: '8px' }}>Available Banks</h3><p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>Connect your bank accounts to automatically import transactions</p>
        <div className="bank-grid">
          {banks.map(bank => (
            <div key={bank.name} className="bank-card" style={{ borderTopColor: BANK_COLORS[bank.name] || 'var(--primary)' }}>
              <div className="bank-info">
                <div className="bank-logo" style={{ background: BANK_COLORS[bank.name] || 'var(--primary)' }}>{bank.logo}</div>
                <div><h4>{bank.name}</h4><p>{bank.connected ? `Connected${bank.last_synced ? ` · Last synced: ${new Date(bank.last_synced).toLocaleDateString()}` : ''}` : 'Not connected'}</p></div>
              </div>
              {bank.connected ? (
                <button className="btn btn-danger btn-sm" onClick={() => handleDisconnect(bank.account_id, bank.name)}><HiX /> Disconnect</button>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={() => handleConnect(bank.name)} disabled={connecting === bank.name}>
                  {connecting === bank.name ? 'Connecting...' : <><HiLink /> Connect</>}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
