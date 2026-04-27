import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import client from '../../api/client';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/analytics').then(r => { setData(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner" />;
  if (!data) return <div className="empty-state"><p>No analytics data</p></div>;

  const COLORS = ['#7C3AED', '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>Analytics</h1><p>Detailed financial insights and trends</p></div>

      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card" style={{ background: 'var(--gradient-green)' }}>
          <div className="stat-label">Total Income</div><div className="stat-value">£{data.total_income.toFixed(2)}</div><div className="stat-sub">Last 6 months</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-orange)' }}>
          <div className="stat-label">Total Expenses</div><div className="stat-value">£{data.total_expenses.toFixed(2)}</div><div className="stat-sub">Last 6 months</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--gradient-blue)' }}>
          <div className="stat-label">Daily Average</div><div className="stat-value">£{data.avg_daily_spending.toFixed(2)}</div><div className="stat-sub">Last 30 days</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthly_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month_label" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={v => `£${v}`} />
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} formatter={v => `£${v.toFixed(2)}`} />
              <Bar dataKey="total" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Spending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.category_breakdown} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {data.category_breakdown.map((e, i) => <Cell key={i} fill={e.color || COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => `£${v.toFixed(2)}`} contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Daily Spending (This Month)</h3>
          {data.daily_spending.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.daily_spending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={v => `£${v}`} />
                <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} formatter={v => `£${v.toFixed(2)}`} />
                <Line type="monotone" dataKey="total" stroke="#EC4899" strokeWidth={2} dot={{ fill: '#EC4899' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <div className="empty-state"><p>No data this month</p></div>}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Top Merchants</h3>
          {data.top_merchants.length > 0 ? data.top_merchants.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div><strong>{m.merchant}</strong><span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontSize: '0.8rem' }}>{m.count} txns</span></div>
              <span style={{ fontWeight: 700 }}>£{m.total.toFixed(2)}</span>
            </div>
          )) : <div className="empty-state"><p>No merchant data</p></div>}
        </div>
      </div>
    </div>
  );
}
