import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiX, HiPaperAirplane, HiChatAlt2, HiSparkles } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import client from '../../api/client';
import './AIChatbot.css';

// Page-aware configuration
const PAGE_CONFIG = {
  '/': { greeting: "Hi! I'm FinanceFlow's assistant. Ask me about our features, budgeting tips, or how we can help you manage your money!", placeholder: "Ask about FinanceFlow features...", subtitle: "General finance help" },
  '/about': { greeting: "Welcome! I can tell you more about FinanceFlow's technology, security, and how we help you track finances.", placeholder: "Ask about FinanceFlow...", subtitle: "About FinanceFlow" },
  '/contact': { greeting: "Need help? I can answer common questions. For specific issues, use the contact form!", placeholder: "Ask a question...", subtitle: "Support assistant" },
  '/dashboard': { greeting: "Hi! I can analyse your spending, suggest budgets, and give insights based on your financial data.", placeholder: "Ask about your spending...", subtitle: "Your financial data" },
  '/transactions': { greeting: "I can help you understand your transaction patterns, find specific expenses, or suggest categories.", placeholder: "Ask about your transactions...", subtitle: "Transaction insights" },
  '/analytics': { greeting: "I can explain your spending trends, compare months, and identify areas to save money.", placeholder: "Ask about your trends...", subtitle: "Analytics insights" },
  '/budget': { greeting: "Need help setting budgets? I can suggest amounts based on your spending history.", placeholder: "Ask about budgeting...", subtitle: "Budget advisor" },
  '/budget-overview': { greeting: "I can help you understand your budget progress and suggest adjustments.", placeholder: "Ask about your budget...", subtitle: "Budget tracking" },
  '/subscriptions': { greeting: "I can help identify recurring charges, estimate annual costs, and suggest subscriptions to review.", placeholder: "Ask about subscriptions...", subtitle: "Subscription insights" },
  '/connect-bank': { greeting: "I can explain how bank connections work, what data we import, and our security measures.", placeholder: "Ask about bank connections...", subtitle: "Banking help" },
};

const DEFAULT_CONFIG = { greeting: "Hi! I'm your AI financial assistant. Ask me anything about personal finance!", placeholder: "Ask about your finances...", subtitle: "Financial assistant" };

export default function AIChatbot() {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastPath, setLastPath] = useState('');
  const messagesEnd = useRef(null);

  const config = PAGE_CONFIG[location.pathname] || DEFAULT_CONFIG;
  const isAuthPage = user && ['/dashboard', '/transactions', '/analytics', '/budget', '/budget-overview', '/subscriptions', '/connect-bank', '/add-expense', '/csv-upload', '/profile', '/settings'].some(p => location.pathname.startsWith(p));

  const [messages, setMessages] = useState([
    { role: 'assistant', message: config.greeting }
  ]);

  // Update greeting when page changes
  useEffect(() => {
    if (location.pathname !== lastPath) {
      setLastPath(location.pathname);
      const newConfig = PAGE_CONFIG[location.pathname] || DEFAULT_CONFIG;
      setMessages([{ role: 'assistant', message: newConfig.greeting }]);
    }
  }, [location.pathname]);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // Load chat history when opening on authenticated pages
  useEffect(() => {
    if (open && isAuthPage && messages.length <= 1) {
      client.get('/ai/history').then(res => {
        if (res.data.messages?.length) {
          const newConfig = PAGE_CONFIG[location.pathname] || DEFAULT_CONFIG;
          setMessages([{ role: 'assistant', message: newConfig.greeting }, ...res.data.messages]);
        }
      }).catch(() => {});
    }
  }, [open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', message: userMsg }]);
    setLoading(true);

    if (isAuthPage && user) {
      // Authenticated: call AI endpoint with user's financial context
      try {
        const res = await client.post('/ai/chat', { message: userMsg, page: location.pathname });
        setMessages(prev => [...prev, { role: 'assistant', message: res.data.message }]);
      } catch (err) {
        const errMsg = err.response?.status === 429
          ? '⏱️ Rate limit reached (20/hour). Please wait before sending more messages.'
          : 'Sorry, something went wrong. Please try again.';
        setMessages(prev => [...prev, { role: 'assistant', message: errMsg }]);
      }
    } else {
      // Public pages: answer about FinanceFlow features and general finance
      const generalResponses = [
        "FinanceFlow helps you track expenses, set budgets, connect UK bank accounts, and get AI-powered financial insights. Sign up to get started!",
        "You can upload CSV bank statements, manually add expenses, or connect your UK bank (HSBC, Barclays, Lloyds, etc.) to automatically import transactions.",
        "Our dashboard shows spending by category, 6-month trends, budget progress, and recent transactions — all in one place.",
        "FinanceFlow uses bank-grade encryption and Supabase row-level security. Your data is fully protected and GDPR compliant.",
        "The subscription scanner automatically detects recurring charges like Netflix, Spotify, and utility bills from your transaction history.",
        "Sign up for free to start tracking your expenses, set monthly budgets, and get personalised AI financial advice!",
        "I can provide detailed financial analysis once you're logged in. For now, I can answer general questions about personal finance and our features.",
      ];
      const response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', message: response }]);
        setLoading(false);
      }, 800);
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <button className={`chatbot-fab ${open ? 'hidden' : ''}`} onClick={() => setOpen(true)} id="ai-chatbot-toggle">
        <span className="fab-ring" />
        <span className="fab-icon"><HiChatAlt2 size={26} /></span>
      </button>
      {open && (
        <div className="chatbot-panel animate-scale" id="ai-chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar"><HiSparkles size={20} /></span>
              <div>
                <h3>AI Financial Assistant</h3>
                <p>{config.subtitle}</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}><HiX size={20} /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                <p>{m.message}</p>
              </div>
            ))}
            {loading && <div className="chat-bubble assistant"><div className="typing-dots"><span/><span/><span/></div></div>}
            <div ref={messagesEnd} />
          </div>
          <div className="chatbot-input">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={config.placeholder} disabled={loading} />
            <button onClick={send} disabled={loading || !input.trim()} className="send-btn">
              <HiPaperAirplane size={18} />
            </button>
          </div>
          <div className="chatbot-footer">
            Powered by Google Gemini AI • {isAuthPage ? '20 requests/hour' : 'General mode'}
          </div>
        </div>
      )}
    </>
  );
}
