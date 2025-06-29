import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgetPassword";
import ProtectRoute from "./pages/ProtectRoute";
import Home from "./pages/Home";
import VerifyEmailPage from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Header from "./components/Header ";


const token = localStorage.getItem('token');
// console.log(token);

const userId = localStorage.getItem('userId');
// console.log(userId);


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;



