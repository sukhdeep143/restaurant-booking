
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
      const data = await res.json();
      setBookings(data.bookings);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    console.error("User ID or token not found");
    setLoading(false);
    return;
  }

  fetchBookings(userId); // initial fetch

  socket.on("tableBooked", (data) => {
    console.log("📡 Booking updated (tableBooked event):", data);
    fetchBookings(userId); // re-fetch when booking updates
  });

  return () => {
    socket.off("tableBooked");
  };
}, []);
const handleCancel = async (id) => {
  const token = localStorage.getItem("token");
  if (window.confirm("Cancel this booking?")) {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b._id === id ? updated : b)));
    } catch (err) {
      console.error("Cancel failed", err);
    }
  }
};


  const filteredBookings = (allBookings, filterType) => {
    const now = new Date();
    return allBookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      if (filterType === "upcoming") return bookingDate > now && booking.status === "confirmed";
      if (filterType === "completed") return bookingDate <= now && booking.status === "confirmed";
      if (filterType === "cancelled") return booking.status === "cancelled";
      return true;
    });
  };

  const visibleBookings = filteredBookings(bookings, filter);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        📋 My Bookings
      </h2>

      <div className="flex gap-4 mb-4 justify-center">
        {["upcoming", "completed", "cancelled", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              filter === status
                ? "!bg-blue-600 text-white"
                : "!bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading bookings...</p>
      ) : visibleBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {visibleBookings.map((booking) => (
            <div key={booking._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">
                  📅 {booking.date} at {booking.time}
                </h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    booking.status === "cancelled"
                      ? "!bg-red-100 text-red-600"
                      : booking.status === "completed"
                      ? "!bg-green-100 text-green-600"
                      : "!bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>
              <p>Guests: {booking.guests}</p>
              <p>Table Type: {booking.tableType}</p>
              {booking.tableNumber && <p>Table Number: {booking.tableNumber}</p>}
              {booking.specialRequests && <p>Note: {booking.specialRequests}</p>}
              {booking.addons.length > 0 && <p>Add-ons: {booking.addons.join(", ")}</p>}
              {booking.allergies && <p>Allergies: {booking.allergies}</p>}

              {filter === "upcoming" && booking.status === "confirmed" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="px-4 py-1 rounded !bg-red-500 text-white text-sm hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
