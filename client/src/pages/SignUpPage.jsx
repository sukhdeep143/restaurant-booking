import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
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

  const PORT = import.meta.env.VITE_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${PORT}/api/auth/signup`, formData, {
        headers: { 'Content-Type': 'application/json' },
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
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Animated Blurred Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full opacity-10 animate-spin slow-spin"></div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Create Your Account
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our community and start your amazing journey with us today
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/20 animate-slide-up">
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* === PROFILE SECTION === */}
              <SectionCard title="Profile Information" color="from-indigo-50 to-blue-50" iconColor="from-indigo-500 to-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['firstName', 'middleName', 'lastName'].map((name, i) => (
                    <InputField key={i} name={name} value={formData[name]} onChange={handleChange} placeholder={name.replace(/([A-Z])/g, ' $1').trim()} />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <InputField name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
                  <SelectField name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
                </div>
              </SectionCard>

              {/* === CONTACT SECTION === */}
              <SectionCard title="Contact Information" color="from-blue-50 to-cyan-50" iconColor="from-blue-500 to-cyan-500">
                <div className="space-y-6">
                  <InputField name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder="Country Code" />
                    <InputField name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                  </div>
                  <TextAreaField name="address" value={formData.address} onChange={handleChange} placeholder="Enter your full address" />
                </div>
              </SectionCard>

              {/* === SECURITY SECTION === */}
              <SectionCard title="Security" color="from-purple-50 to-pink-50" iconColor="from-purple-500 to-pink-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                  <InputField name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                </div>
              </SectionCard>

              {/* === ROLES SECTION === */}
              <SectionCard title="Roles" color="from-purple-50 to-pink-50" iconColor="from-purple-500 to-pink-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="role" value={formData.role} onChange={handleChange} placeholder="Enter Your Role" />
                  <InputField name="adminSecret" type="password" value={formData.adminSecret} onChange={handleChange} placeholder="Secret Key" />
                </div>
              </SectionCard>

              {/* === SUBMIT === */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-8 space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600 order-2 sm:order-1">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign in here
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden px-10 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl order-1 sm:order-2"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .slow-spin { animation: spin 20s linear infinite; }
      `}</style>
    </div>
  );
};

// === Reusable Components ===
const SectionCard = ({ title, color, iconColor, children }) => (
  <div className={`bg-gradient-to-r ${color} p-6 sm:p-8 rounded-2xl border border-indigo-100/50 transform hover:scale-[1.01] transition-all duration-300`}>
    <div className="flex items-center mb-6">
      <div className={`w-10 h-10 bg-gradient-to-r ${iconColor} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const InputField = ({ name, value, onChange, placeholder, type = "text" }) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ name, value, onChange, options }) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{name}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
    >
      <option value="">Select {name}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ name, value, onChange, placeholder }) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{name}</label>
    <textarea
      name={name}
      rows="4"
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
      placeholder={placeholder}
    />
  </div>
);

export default SignupForm;
