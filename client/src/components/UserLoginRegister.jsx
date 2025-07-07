import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  const [isLoginView, setIsLoginView] = useState(true); // Toggles between Login and Register views
  const [message, setMessage] = useState(''); // For displaying success or error messages

  // Clear message after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLoginSuccess = () => {
    setMessage('Login successful!');
    // In a real app, you'd typically redirect or update user state here
  };

  const handleRegisterSuccess = () => {
    setMessage('Registration successful! Please log in.');
    setIsLoginView(true); // Switch to login view after successful registration
  };

  const handleApiError = (error) => {
    setMessage(`Error: ${error}`);
  };

  return (
    // Main container with background, fade-in animation, and overlay - Cool & Modern Theme
    // Added 'w-full' and 'bg-fixed' for better full-screen background behavior
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 font-sans bg-cover bg-center bg-no-repeat bg-fixed animate-fade-in-slow"
      style={{
        backgroundImage: "url('https://placehold.co/1920x1080/4F6D7A/EAEAEA?text=Modern+Cafe')", // Cool blue-grey background
      }}
    >
      {/* Background overlay for better contrast and a subtle glow */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm"></div>

      {/* Form container with subtle hover effect and shadow */}
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-md z-10
                  transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-wide">
          {isLoginView ? 'Welcome Back!' : 'Join Us Today!'}
        </h2>

        {/* Message display with fade-in/out animation */}
        {message && (
          <div className="mb-6 p-4 text-sm text-white bg-blue-600 rounded-md text-center
                      animate-fade-in-out transition-opacity duration-300">
            {message}
          </div>
        )}

        {isLoginView ? (
          <Login onLoginSuccess={handleLoginSuccess} onApiError={handleApiError} />
        ) : (
          <Register onRegisterSuccess={handleRegisterSuccess} onApiError={handleApiError} />
        )}

        <p className="mt-8 text-center text-gray-600 text-base">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-blue-700 hover:text-blue-900 font-bold transition-all duration-300
                      hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            {isLoginView ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
      {/* Custom CSS for fade-in animation */}
      <style>
        {`
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fadeInSlow 1.5s ease-out forwards;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 5s ease-in-out forwards;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
        `}
      </style>
    </div>
  );
};

// Login Component
const Login = ({ onLoginSuccess, onApiError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      onApiError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual backend login API endpoint
      const response = await fetch('/api/login', { // Assuming backend is at /api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess();
        // In a real app, you'd save the token from data.token to localStorage/context
        // localStorage.setItem('token', data.token);
      } else {
        onApiError(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login API error:', error);
      onApiError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-300 shadow-sm text-gray-800"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-300 shadow-sm text-gray-800"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800
                   transition-all duration-300 font-semibold text-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-75 shadow-md
                   transform hover:scale-105 flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            Login
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

// Register Component
const Register = ({ onRegisterSuccess, onApiError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      onApiError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      onApiError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      onApiError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual backend register API endpoint
      const response = await fetch('/api/register', { // Assuming backend is at /api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onRegisterSuccess();
      } else {
        onApiError(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Register API error:', error);
      onApiError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-300 shadow-sm text-gray-800"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="registerEmail"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-300 shadow-sm text-gray-800"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="registerPassword"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-300 shadow-sm text-gray-800"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-300 shadow-sm text-gray-800"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800
                   transition-all duration-300 font-semibold text-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-75 shadow-md
                   transform hover:scale-105 flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            Register
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default App;
