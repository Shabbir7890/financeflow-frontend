import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function EditExpense() {
  const { id } = useParams();
  const [form, setForm] = useState({ amount: '', description: '', merchant: '', category_id: '', expense_date: '' });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([client.get(`/expenses/${id}`), client.get('/categories')])
      .then(([expRes, catRes]) => {
        const e = expRes.data;
        setForm({ amount: e.amount, description: e.description || '', merchant: e.merchant || '', category_id: e.category_id || '', expense_date: e.expense_date });
        setCategories(catRes.data.categories);
        setLoading(false);
      }).catch(() => { toast.error('Expense not found'); navigate('/transactions'); });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.put(`/expenses/${id}`, { ...form, amount: parseFloat(form.amount) });
      toast.success('Expense updated!');
      navigate('/transactions');
    } catch (err) { toast.error('Failed to update expense'); }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    try { await client.delete(`/expenses/${id}`); toast.success('Expense deleted'); navigate('/transactions'); }
    catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Edit Expense</h1><p>Update transaction details</p></div>
      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} id="edit-expense-form">
          <div className="form-group"><label>Amount (£) *</label><input type="number" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /></div>
          <div className="form-group"><label>Merchant</label><input value={form.merchant} onChange={e => setForm({...form, merchant: e.target.value})} /></div>
          <div className="form-group"><label>Description</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
          <div className="form-group"><label>Category</label>
            <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Date *</label><input type="date" value={form.expense_date} onChange={e => setForm({...form, expense_date: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
