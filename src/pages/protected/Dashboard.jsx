import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HiCurrencyPound, HiChartBar, HiTrendingDown, HiCalendar } from 'react-icons/hi';
import client from '../../api/client';
import './Dashboard.css';

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/dashboard').then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner" />;
  if (!data) return <div className="empty-state"><p>Failed to load dashboard</p></div>;

  const trendData = data.spending_trend.map(t => ({
    name: `${MONTH_NAMES[t.month]} ${String(t.year).slice(2)}`,
    Spent: t.total,
    Budget: data.budget_trend.find(b => b.month === t.month && b.year === t.year)?.total || 0
  }));

  return (
    <div className="dashboard animate-fade">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your financial activity for {MONTH_NAMES[data.month]} {data.year}</p>
      </div>

      <div className="grid-4 stat-cards">
        <div className="stat-card" style={{ background: 'var(--gradient-purple)' }}>
          <HiCurrencyPound className="stat-icon" /><div className="stat-label">Total Spending</div>
          <div className="stat-value">£{data.total_spent.toFixed(2)}</div><div className="stat-sub">This month</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-blue)' }}>
          <HiChartBar className="stat-icon" /><div className="stat-label">Budget</div>
          <div className="stat-value">£{data.total_budget.toFixed(2)}</div>
          <div className="stat-sub">{data.total_budget > 0 ? `${data.budget_percentage.toFixed(0)}% used` : 'Not set'}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-green)' }}>
          <HiTrendingDown className="stat-icon" /><div className="stat-label">Remaining</div>
          <div className="stat-value">£{Math.abs(data.remaining).toFixed(2)}</div>
          <div className="stat-sub">{data.remaining >= 0 ? 'Under budget' : 'Over budget'}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-orange)' }}>
          <HiCalendar className="stat-icon" /><div className="stat-label">Transactions</div>
          <div className="stat-value">{data.transaction_count}</div><div className="stat-sub">This month</div>
        </div>
      </div>

      <div className="grid-2 chart-row">
        <div className="card">
          <h3>Spending by Category</h3>
          {data.category_spending.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data.category_spending} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {data.category_spending.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `£${v.toFixed(2)}`} contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="empty-state"><p>No spending data yet</p></div>}
        </div>

        <div className="card">
          <h3>6-Month Trend</h3>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={v => `£${v}`} />
                <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} formatter={v => `£${v.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="Spent" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Budget" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="empty-state"><p>Not enough data for trends</p></div>}
        </div>
      </div>

      <div className="card recent-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Recent Transactions</h3>
          <Link to="/transactions" className="btn btn-secondary btn-sm">View All</Link>
        </div>
        {data.recent_transactions.length > 0 ? (
          <div className="recent-list">
            {data.recent_transactions.map((tx, i) => (
              <div key={i} className="recent-item">
                <div className="recent-info">
                  <span className="recent-merchant">{tx.merchant || tx.description || 'Transaction'}</span>
                  <span className="recent-meta">{tx.expense_date} · {tx.category_name || 'Uncategorized'}</span>
                </div>
                <span className="recent-amount">£{tx.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : <div className="empty-state"><p>No recent transactions</p></div>}
      </div>
    </div>
  );
}
