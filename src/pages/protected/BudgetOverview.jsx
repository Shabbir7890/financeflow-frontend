import { useState, useEffect } from 'react';
import client from '../../api/client';

export default function BudgetOverview() {
  const [data, setData] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    Promise.all([
      client.get('/budgets/overview', { params: { month, year }}),
      client.get('/budgets', { params: { month, year }})
    ]).then(([ovRes, bRes]) => { setData(ovRes.data); setBudgets(bRes.data.budgets); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner" />;
  if (!data) return <div className="empty-state"><p>No budget data</p></div>;

  const pct = data.percentage_used;

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Budget Overview</h1><p>{MONTHS[month]} {year} budget progress</p></div>
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card" style={{ background: 'var(--gradient-purple)' }}>
          <div className="stat-label">Total Budget</div><div className="stat-value">£{data.total_budget.toFixed(2)}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-blue)' }}>
          <div className="stat-label">Total Spent</div><div className="stat-value">£{data.total_spent.toFixed(2)}</div>
        </div>
        <div className="stat-card" style={{ background: data.remaining >= 0 ? 'var(--gradient-green)' : 'var(--gradient-orange)' }}>
          <div className="stat-label">Remaining</div><div className="stat-value">£{Math.abs(data.remaining).toFixed(2)}</div>
          <div className="stat-sub">{data.remaining >= 0 ? 'Under budget' : 'Over budget'}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Overall Progress</h3>
        <div style={{ background: 'var(--bg-dark)', borderRadius: '8px', height: '24px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > 100 ? 'var(--danger)' : pct > 80 ? 'var(--warning)' : 'var(--success)',
            borderRadius: '8px', transition: 'width 1s ease' }} />
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>{pct.toFixed(1)}% of budget used</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Category Budgets</h3>
        {budgets.length === 0 ? <div className="empty-state"><p>No category budgets set</p></div> :
          budgets.map(b => {
            const catPct = b.amount > 0 ? (b.spent / b.amount * 100) : 0;
            return (
              <div key={b.id} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span><span style={{ marginRight: '8px' }}>{b.category_icon}</span><strong>{b.category_name || 'Overall'}</strong></span>
                  <span style={{ color: 'var(--text-secondary)' }}>£{b.spent.toFixed(2)} / £{b.amount.toFixed(2)}</span>
                </div>
                <div style={{ background: 'var(--bg-dark)', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(catPct, 100)}%`, background: catPct > 100 ? 'var(--danger)' : catPct > 80 ? 'var(--warning)' : 'var(--success)',
                    borderRadius: '6px', transition: 'width 0.8s ease' }} />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
