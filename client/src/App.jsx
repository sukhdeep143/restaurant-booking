import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthProvider from './utils/AuthContext';

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgetPassword";
import ProtectRoute from "./pages/ProtectRoute";
import Home from "./pages/Home";
import VerifyEmailPage from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import AdminPanel from "./pages/Admin-panel";
import UserPanel from "./pages/UserPanel";

const token = localStorage.getItem("token");
// console.log(token);

const userId = localStorage.getItem("userId");
// console.log(userId);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/User/*" element={<UserPanel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
