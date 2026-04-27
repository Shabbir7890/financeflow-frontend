import { useState } from 'react';
import toast from 'react-hot-toast';
import client from '../../api/client';
import './StaticPage.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill required fields');
    setLoading(true);
    try {
      await client.post('/profile/contact', form);
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch { toast.error('Failed to send message'); }
    setLoading(false);
  };

  return (
    <div className="static-page animate-fade">
      <div className="static-container">
        <h1>Contact Us</h1>
        <p className="subtitle">Have a question or feedback? We'd love to hear from you.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
            <div className="form-group"><label>Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" /></div>
            <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" /></div>
            <div className="form-group"><label>Subject</label><input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Subject" /></div>
            <div className="form-group"><label>Message *</label><textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your message..." /></div>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
          </form>
          <div>
            <div className="card" style={{ marginBottom: '16px', padding: '24px' }}><h3>📧 Email</h3><p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>support@financeflow.co.uk</p></div>
            <div className="card" style={{ marginBottom: '16px', padding: '24px' }}><h3>📞 Phone</h3><p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>+44 20 7123 4567</p></div>
            <div className="card" style={{ padding: '24px' }}><h3>📍 Address</h3><p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>71-75 Shelton Street, Covent Garden, London WC2H 9JQ</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
