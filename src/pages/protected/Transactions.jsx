import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiSearch, HiPencil, HiTrash, HiPlus } from 'react-icons/hi';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchExpenses = () => {
    setLoading(true);
    const params = { page, limit: 15 };
    if (search) params.search = search;
    client.get('/expenses', { params }).then(r => {
      setExpenses(r.data.expenses);
      setTotal(r.data.total);
      setTotalPages(r.data.total_pages);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchExpenses(); }, [page]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchExpenses(); };

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense?')) return;
    try { await client.delete(`/expenses/${id}`); toast.success('Deleted'); fetchExpenses(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="animate-fade">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Transactions</h1><p>{total} total transactions</p></div>
        <Link to="/add-expense" className="btn btn-primary"><HiPlus /> Add Expense</Link>
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <HiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by merchant or description..." style={{ paddingLeft: '40px' }} />
        </div>
        <button type="submit" className="btn btn-secondary">Search</button>
      </form>

      <div className="card">
        {loading ? <div className="loading-spinner" /> : expenses.length === 0 ? (
          <div className="empty-state"><p>No transactions found</p><Link to="/add-expense" className="btn btn-primary" style={{ marginTop: '16px' }}>Add Your First Expense</Link></div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead><tr><th>Date</th><th>Merchant</th><th>Category</th><th>Source</th><th style={{ textAlign: 'right' }}>Amount</th><th>Actions</th></tr></thead>
                <tbody>
                  {expenses.map(e => (
                    <tr key={e.id}>
                      <td>{e.expense_date}</td>
                      <td><strong>{e.merchant || e.description || '—'}</strong></td>
                      <td>{e.category_icon && <span style={{ marginRight: '4px' }}>{e.category_icon}</span>}<span style={{ color: e.category_color }}>{e.category_name || '—'}</span></td>
                      <td><span className={`badge badge-${e.source === 'manual' ? 'primary' : e.source === 'csv' ? 'warning' : 'success'}`}>{e.source}</span></td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>£{e.amount.toFixed(2)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link to={`/edit-expense/${e.id}`} className="btn btn-secondary btn-sm"><HiPencil /></Link>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}><HiTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button>
                <span style={{ padding: '8px 16px', color: 'var(--text-secondary)' }}>Page {page} of {totalPages}</span>
                <button className="btn btn-secondary btn-sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
