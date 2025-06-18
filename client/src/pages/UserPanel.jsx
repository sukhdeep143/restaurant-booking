import React from "react";
import UserProfile from "../components/UserProfile";
import BookingForm from "../components/BookingForm";
import BookingHistory from "../components/BookingHistory";

export default function UserPanel() {
  return (
    <div className="bg-gray-300 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          🧑‍💼 User Panel – Restaurant Booking
        </h2>

        {/* Profile */}
        <UserProfile />

        {/* Booking Form */}
        <BookingForm />

        {/* Booking History */}
        <BookingHistory />

        {/* Logout Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => alert("You have been logged out.")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
