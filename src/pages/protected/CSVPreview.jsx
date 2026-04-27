import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function CSVPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadData = location.state?.uploadData;
  const [loading, setLoading] = useState(false);

  if (!uploadData) { navigate('/csv-upload'); return null; }

  const [rows] = useState(uploadData.preview || []);
  const columns = uploadData.columns || [];

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const transactions = rows.map(r => ({
        amount: parseFloat(r[columns.find(c => c.toLowerCase().includes('amount')) || columns[1]] || 0),
        merchant: r[columns.find(c => c.toLowerCase().includes('description') || c.toLowerCase().includes('merchant')) || columns[0]] || '',
        description: r[columns.find(c => c.toLowerCase().includes('description')) || columns[0]] || '',
        date: r[columns.find(c => c.toLowerCase().includes('date')) || columns[0]] || new Date().toISOString().split('T')[0],
      }));
      const res = await client.post('/csv/confirm', { upload_id: uploadData.upload_id, transactions });
      toast.success(`Imported ${res.data.imported} transactions!`);
      navigate('/transactions');
    } catch { toast.error('Import failed'); }
    setLoading(false);
  };

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>CSV Preview</h1><p>Review {rows.length} transactions before importing</p></div>
      <div className="card">
        <div className="table-container">
          <table>
            <thead><tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
            <tbody>{rows.slice(0, 50).map((r, i) => <tr key={i}>{columns.map((c, j) => <td key={j}>{r[c]}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={handleConfirm} className="btn btn-primary" disabled={loading}>{loading ? 'Importing...' : `Import ${rows.length} Transactions`}</button>
          <button onClick={() => navigate('/csv-upload')} className="btn btn-secondary">Upload Different File</button>
        </div>
      </div>
    </div>
  );
}
