import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaConciergeBell, FaCalendarCheck } from "react-icons/fa";

export default function Home() {
  const reviews = [
    { id: 1, user: "Aarav", text: "Super easy to reserve a table online!" },
    { id: 2, user: "Riya", text: "Beautiful UI with clear booking steps." },
    { id: 3, user: "Kabir", text: "Seamless experience and responsive design!" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section with Overlay Text */}
      <div className="relative w-full">
        <img
          src="/restaurant.jpg"
          alt="Developer Restaurant"
          className="w-full h-72 sm:h-80 md:h-96 lg:h-[30rem] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            Welcome to Developer Restaurant
          </h1>
          <p className="mt-3 max-w-xl text-white text-lg sm:text-xl drop-shadow">
            Effortless online table reservations with a modern experience.
          </p>
          <div className="mt-6 flex gap-4">
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
      </div>

      {/* Features Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Book with Us?</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
            <FaCalendarCheck className="text-blue-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Instant Booking</h3>
            <p className="text-sm">
              Reserve your table in seconds with our user-friendly system.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
            <FaConciergeBell className="text-green-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Seamless Experience</h3>
            <p className="text-sm">
              Enjoy a smooth, hassle-free reservation process anytime.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
            <FaStar className="text-yellow-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Customer Approved</h3>
            <p className="text-sm">
              Rated highly for simplicity, reliability, and support.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Diners Say</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6"
            >
              <p className="text-gray-700 dark:text-gray-200 italic mb-2">
                “{review.text}”
              </p>
              <p className="text-right font-semibold text-sm text-gray-900 dark:text-gray-300">
                – {review.user}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA for Booking */}
      <section className="bg-blue-600 dark:bg-blue-700 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Book Your Table?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join us for an unforgettable dining experience. Reserve your table now!
        </p>
        <Link
          to="/booking"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow transition"
        >
          Book a Table
        </Link>
      </section>
    </div>
  );
}
