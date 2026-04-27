import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-right" toastOptions={{
      style: { background: '#1E293B', color: '#F8FAFC', border: '1px solid #334155' },
      success: { iconTheme: { primary: '#10B981', secondary: '#F8FAFC' }},
      error: { iconTheme: { primary: '#EF4444', secondary: '#F8FAFC' }},
    }} />
    <App />
  </React.StrictMode>,
)
