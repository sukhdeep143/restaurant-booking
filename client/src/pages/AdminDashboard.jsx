import React from "react";

export default function AdminDashboard() {
  // Dummy user data (replace with real user context / fetch later)
  const user = {
    name: "Kalpak",
    email: "kalpak@example.com",
    phone: "+91 4446543210",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 User Profile</h2>
        
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-medium">Name:</span>
            <span>{user.name}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Phone:</span>
            <span>{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}