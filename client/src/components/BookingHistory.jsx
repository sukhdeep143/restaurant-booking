import React, { useEffect, useState } from "react";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy booking data — replace with actual API call
    setBookings([
      {
        id: "B123",
        restaurant: "Ohara Dine",
        date: "2025-06-18",
        time: "19:00",
        guests: 2,
        status: "Confirmed",
      },
      {
        id: "B124",
        restaurant: "Spice Villa",
        date: "2025-06-20",
        time: "20:30",
        guests: 4,
        status: "Pending",
      },
    ]);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-center">📜 My Booking History</h3>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="p-4 border rounded-md shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between text-lg font-medium">
                <span>{b.restaurant}</span>
                <span className={`text-sm ${b.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                  {b.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                📅 {b.date} | ⏰ {b.time} | 👥 {b.guests} Guests
              </div>
              <div className="text-xs text-gray-400 mt-1">Booking ID: {b.id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
