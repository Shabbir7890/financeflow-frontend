import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function AddExpense() {
  const [form, setForm] = useState({ amount: '', description: '', merchant: '', category_id: '', expense_date: new Date().toISOString().split('T')[0] });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { client.get('/categories').then(r => setCategories(r.data.categories)).catch(() => {}); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.expense_date) return toast.error('Amount and date are required');
    setLoading(true);
    try {
      await client.post('/expenses', { ...form, amount: parseFloat(form.amount) });
      toast.success('Expense added!');
      navigate('/transactions');
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed to add expense'); }
    setLoading(false);
  };

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Add Expense</h1><p>Record a new transaction</p></div>
      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} id="add-expense-form">
          <div className="form-group"><label>Amount (£) *</label><input type="number" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="0.00" /></div>
          <div className="form-group"><label>Merchant</label><input value={form.merchant} onChange={e => setForm({...form, merchant: e.target.value})} placeholder="e.g. Tesco, Amazon" /></div>
          <div className="form-group"><label>Description</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="What was this for?" /></div>
          <div className="form-group"><label>Category</label>
            <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Date *</label><input type="date" value={form.expense_date} onChange={e => setForm({...form, expense_date: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Add Expense'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
