// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const reviews = [
    { id: 1, user: "Aarav", text: "Nice booking functionality, very easy to use!" },
    { id: 2, user: "Riya", text: "Clean UI and smooth reservation process." },
    { id: 3, user: "Kabir", text: "Loved the customer support and seamless flow." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pt-10 pb-10">
      {/* Hero Image */}
      <div className="w-full">
        <img
          src="/restaurant.jpg"
          alt="Restaurant"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
        />
      </div>

      {/* Welcome Text and Buttons */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to EasyDine</h1>
        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 w-full px-6 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          What Our Users Say
        </h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-700 italic">“{review.text}”</p>
              <p className="text-right font-semibold text-sm mt-2">– {review.user}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
