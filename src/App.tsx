import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/pages/Dashboard';
import { TicketList } from './components/pages/TicketList';
import { TicketDetail } from './components/pages/TicketDetail';
import { NotificationCenter } from './components/pages/NotificationCenter';
import { Settings } from './components/pages/Settings';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { ForgotPassword } from './components/pages/ForgotPassword';
import { LandingPage } from './components/pages/LandingPage';
import { CreateTicket } from './pages/CreateTicket';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false to show landing page
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'register'>('landing');

  // Set document title
  useEffect(() => {
    document.title = 'SiteSupportPro - Premium Web Support & Bug Fixing';
  }, []);

  const handleNavigate = (page: 'login' | 'register') => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            currentPage === 'landing' ? (
              <LandingPage onNavigate={handleNavigate} />
            ) : currentPage === 'login' ? (
              <Login 
                onLogin={() => setIsAuthenticated(true)} 
                onBackToLanding={() => setCurrentPage('landing')}
              />
            ) : (
              <Register onBackToLanding={() => setCurrentPage('landing')} />
            )
          } />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}