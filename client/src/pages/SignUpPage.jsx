import React, { useState } from 'react';

export default function SignUpPage() {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'admin' && formData.secretKey !== 'SECRET123') {
      alert('Invalid admin secret key');
      return;
    }

    // Send data to backend
    const dataToSend = {
      ...formData,
      role,
    };
    console.log('Sending:', dataToSend);
    // Send dataToSend to backend using Axios or Fetch
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {/* Role selection */}
        <div className="flex justify-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="user"
              name="role"
              checked={role === 'user'}
              onChange={() => setRole('user')}
              className="accent-blue-600"
            />
            User
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="admin"
              name="role"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="accent-red-600"
            />
            Admin
          </label>
        </div>

        {/* Common Fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Secret Key for Admin */}
        {role === 'admin' && (
          <input
            type="text"
            name="secretKey"
            placeholder="Enter Admin Secret Key"
            className="w-full p-2 border rounded"
            value={formData.secretKey}
            onChange={handleChange}
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
