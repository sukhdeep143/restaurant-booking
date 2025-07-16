import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
// import api from "../apiUrl/api"


function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState("");
  const  email = new URLSearchParams(location.search).get("email");
  
  const PORT=import.meta.env.VITE_APP_API_URL 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${PORT}/api/auth/verify-email`,
        { email, verificationCode }
      );
      toast.success("Email verified successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error,"Invalid or expired verification code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Verify Your Email
          </h2>
          <p className="mt-3 text-gray-600">
            We sent a verification code to{" "}
            <span className="font-semibold text-indigo-600">{email}</span>
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="verification-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Verification Code
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="verification-code"
                    name="verification-code"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg tracking-widest placeholder:text-gray-400"
                    placeholder="••••••"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength="6"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full flex items-center justify-center px-4 py-3.5 text-white !bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              >
                <span className="absolute left-4">
                  <CheckCircle className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-200" />
                </span>
                <span className="font-medium text-base">Verify Email</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                >
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  Resend verification code
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Check your spam folder if you don't see the email in your inbox
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;