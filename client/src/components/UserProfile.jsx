import React from "react";

export default function UserProfile() {
  // Dummy user data (in a real app, fetch from backend or context)
  const user = {
    name: "Sukhdeep Singh",
    email: "sukhdeep@example.com",
    phone: "+91 9876543210",
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-center">👤 User Profile</h3>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone:</span>
          <span>{user.phone}</span>
        </div>
      </div>
    </div>
  );
}
