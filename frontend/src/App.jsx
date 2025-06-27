import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';

const App = () => {
  const location = useLocation();
  const [username, setUsername] = useState(localStorage.getItem('username') || 'User');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'User');
  }, [location.pathname]);

  useEffect(() => {
    const handleStorage = () => setUsername(localStorage.getItem('username') || 'User');
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div>
      {![
        '/',
        '/admin/login',
        '/admin/signup',
        '/user/login',
        '/user/signup'
      ].includes(location.pathname) && <Navbar username={username} />}

    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Admin-Routes */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/product/add" element={<AdminAddProduct />} />
      <Route path="/admin/product/:id/edit" element={<AdminEditProduct />} />
      {/* User-Routes */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/profile" element={<UserProfile />} />
    </Routes>
    </div>
  );
}

export default App
