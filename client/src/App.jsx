import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthProvider from './utils/AuthContext';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgetPassword';
import ProtectRoute from './pages/ProtectRoute';
import Home from './pages/Home';
import VerifyEmailPage from './pages/VerifyEmail';

import Footer from './components/Footer';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import AdminPanel from './pages/Admin-panel';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          <Route element={<ProtectRoute requiredRole="admin" />}>
            <Route path="/AdminPanel" element={<AdminPanel />} />
          </Route>

          <Route element={<ProtectRoute requiredRole="user" />}>
            <Route path="/UserProfile" element={<UserProfile />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
