import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header ";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
