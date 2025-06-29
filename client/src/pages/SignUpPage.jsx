
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import api from '../api/api'
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',         
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',     
    gender: '',
    countryCode: '+91',
    phoneNumber: '',
    address: '',
    role:'',
    adminSecret:''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const PORT=import.meta.env.VITE_APP_API_URL 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleFileChange = (e) => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     profilePicture: e.target.files[0]
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      const response = await axios.post(`${PORT}/api/auth/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success('OTP sent to your email');
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }    
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Create Your Account
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our community and start your amazing journey with us today
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/20 animate-slide-up">
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Profile Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100/50 transform hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
                </div>

                {/* Profile Picture Upload */}
                {/* <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Profile Picture
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="profilePicture"
                      accept="image/*"
                    />
                    <label 
                      htmlFor="profilePicture"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <svg className="w-10 h-10 text-indigo-400 mx-auto mb-2 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                          {formData.profilePicture ? formData.profilePicture.name : 'Click to upload your photo'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div> */}

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300"
                      placeholder="John"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Middle Name
                    </label>
                    <input
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300"
                      placeholder="David"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                {/* Age and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Age
                    </label>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300"
                      placeholder="25"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300 appearance-none bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100/50 transform hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Country Code
                      </label>
                      <input
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                        placeholder="+91"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Phone Number
                      </label>
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Address
                    </label>
                    <textarea
                      name="address"
                      rows="4"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 resize-none"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100/50 transform hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Security</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>


              {/* Role Slection */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100/50 transform hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Roles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Role
                    </label>
                    <input
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300"
                      placeholder="Enter Your Role"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Secret Key
                    </label>
                    <input
                      name="adminSecret"
                      type="password"
                      value={formData.adminSecret}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
           
              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-8 space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600 order-2 sm:order-1">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                    Sign in here
                  </Link>
                </p>
                <button 
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden px-10 py-4 border border-transparent text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl order-1 sm:order-2"
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .group:hover .group-hover\\:border-indigo-300 {
          border-color: rgb(165 180 252);
        }
        
        .group:hover .group-hover\\:border-blue-300 {
          border-color: rgb(147 197 253);
        }
        
        .group:hover .group-hover\\:border-purple-300 {
          border-color: rgb(196 181 253);
        }
      `}</style>
    </div>
  );
};

export default SignupForm;