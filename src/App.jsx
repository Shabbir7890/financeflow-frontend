import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AIChatbot from './components/chat/AIChatbot';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Terms from './pages/public/Terms';
import ErrorPage from './pages/public/ErrorPage';

import Dashboard from './pages/protected/Dashboard';
import AddExpense from './pages/protected/AddExpense';
import EditExpense from './pages/protected/EditExpense';
import Transactions from './pages/protected/Transactions';
import CSVUpload from './pages/protected/CSVUpload';
import CSVPreview from './pages/protected/CSVPreview';
import SetBudget from './pages/protected/SetBudget';
import BudgetOverview from './pages/protected/BudgetOverview';
import Analytics from './pages/protected/Analytics';
import ConnectBank from './pages/protected/ConnectBank';
import Subscriptions from './pages/protected/Subscriptions';
import Profile from './pages/protected/Profile';
import Settings from './pages/protected/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<><Home /><Footer /></>} />
          <Route path="/about" element={<><About /><Footer /></>} />
          <Route path="/contact" element={<><Contact /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<><PrivacyPolicy /><Footer /></>} />
          <Route path="/terms" element={<><Terms /><Footer /></>} />

          {/* Protected with Dashboard Layout */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/edit-expense/:id" element={<EditExpense />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/csv-upload" element={<CSVUpload />} />
            <Route path="/csv-preview" element={<CSVPreview />} />
            <Route path="/budget" element={<SetBudget />} />
            <Route path="/budget-overview" element={<BudgetOverview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/connect-bank" element={<ConnectBank />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </AuthProvider>
  );
}
