import React, { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    restaurant: "",
    date: "",
    time: "",
    guests: 1,
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", form);
    alert("Booking Submitted!");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-center">🪑 Book a Table</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Restaurant Name */}
        <div>
          <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurant"
            id="restaurant"
            value={form.restaurant}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            value={form.time}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <input
            type="number"
            name="guests"
            id="guests"
            min="1"
            value={form.guests}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Special Requests (Optional)
          </label>
          <textarea
            name="notes"
            id="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any special instructions?"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
