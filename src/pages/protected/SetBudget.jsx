import { useState, useEffect } from 'react';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function SetBudget() {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([client.get('/categories'), client.get('/budgets', { params: { month, year }})])
      .then(([catRes, budRes]) => {
        setCategories(catRes.data.categories);
        const bMap = {};
        budRes.data.budgets.forEach(b => { bMap[b.category_id || 'overall'] = b.amount; });
        setBudgets(bMap);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (categoryId) => {
    const amount = budgets[categoryId || 'overall'];
    if (!amount || amount <= 0) return;
    try {
      await client.post('/budgets', { category_id: categoryId || null, amount: parseFloat(amount), month, year, period: 'monthly' });
      toast.success('Budget saved!');
    } catch { toast.error('Failed to save budget'); }
  };

  const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (loading) return <div className="loading-spinner" />;

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Set Budget</h1><p>Set your monthly budgets for {MONTHS[month]} {year}</p></div>
      <div style={{ maxWidth: '600px' }}>
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{ marginBottom: '16px' }}>💰 Overall Monthly Budget</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="number" step="0.01" placeholder="e.g. 2000" value={budgets['overall'] || ''}
              onChange={e => setBudgets({...budgets, overall: e.target.value})} />
            <button className="btn btn-primary" onClick={() => handleSave(null)}>Save</button>
          </div>
        </div>

        <h3 style={{ margin: '24px 0 16px', fontSize: '1.1rem' }}>Category Budgets</h3>
        {categories.filter(c => c.name !== 'Income').map(cat => (
          <div key={cat.id} className="card" style={{ marginBottom: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
            <span style={{ flex: 1, fontWeight: 600 }}>{cat.name}</span>
            <input type="number" step="0.01" placeholder="£0.00" style={{ width: '140px' }}
              value={budgets[cat.id] || ''}
              onChange={e => setBudgets({...budgets, [cat.id]: e.target.value})} />
            <button className="btn btn-primary btn-sm" onClick={() => handleSave(cat.id)}>Set</button>
          </div>
        ))}
      </div>
    </div>
  );
}
