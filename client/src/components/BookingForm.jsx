// import React, { useState } from "react";

// export default function BookingForm() {
//   const [form, setForm] = useState({
//     restaurant: "",
//     date: "",
//     time: "",
//     guests: 1,
//     notes: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Booking Submitted:", form);
//     alert("Booking Submitted!");
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
//       <h3 className="text-2xl font-semibold mb-4 text-center">🪑 Book a Table</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Restaurant Name */}
//         <div>
//           <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700">
//             Restaurant Name
//           </label>
//           <input
//             type="text"
//             name="restaurant"
//             id="restaurant"
//             value={form.restaurant}
//             onChange={handleChange}
//             placeholder="Enter restaurant name"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Date */}
//         <div>
//           <label htmlFor="date" className="block text-sm font-medium text-gray-700">
//             Date
//           </label>
//           <input
//             type="date"
//             name="date"
//             id="date"
//             value={form.date}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Time */}
//         <div>
//           <label htmlFor="time" className="block text-sm font-medium text-gray-700">
//             Time
//           </label>
//           <input
//             type="time"
//             name="time"
//             id="time"
//             value={form.time}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Number of Guests */}
//         <div>
//           <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
//             Number of Guests
//           </label>
//           <input
//             type="number"
//             name="guests"
//             id="guests"
//             min="1"
//             value={form.guests}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Special Requests */}
//         <div>
//           <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
//             Special Requests (Optional)
//           </label>
//           <textarea
//             name="notes"
//             id="notes"
//             value={form.notes}
//             onChange={handleChange}
//             rows="3"
//             placeholder="Any special instructions?"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

export default function BookingForm({ user = {} }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    date: "",
    time: "",
    guests: 2,
    tableType: "indoor",
    specialRequests: "",
    addons: [],
    allergies: "",
    tableNumber: ""
  
  });

  const [available, setAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  useEffect(() => {
    if (formData.date && formData.time && formData.guests) {
      const timer = setTimeout(() => {
        setAvailable(Math.random() > 0.3);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.date, formData.time, formData.guests]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?.userId;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        addons: checked
          ? [...prev.addons, value]
          : prev.addons.filter((a) => a !== value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, userId }),

    });

    if (!response.ok) {
      throw new Error("Failed to book table");
    }

    const data = await response.json();
    setBookingRef(data.reference);
    setConfirmedDetails(data);
    setShowConfirmation(true);

    // Reset form
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      date: "",
      time: "",
      guests: 2,
      tableType: "indoor",
      specialRequests: "",
      addons: [],
      allergies: "",
      tableNumber: "",
    });
  } catch (error) {
    alert("Booking failed. Please try again.");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};


  const handleCancel = () => {
    setConfirmedDetails(null);
    setShowConfirmation(false);
    setBookingRef(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input"
            required
            
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            required
            
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input"
            required
            
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
            min={new Date().toISOString().split("T")[0]}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input"
            required
          />
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="input"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} Guests</option>
            ))}
          </select>
          <select
            name="tableType"
            value={formData.tableType}
            onChange={handleChange}
            className="input"
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="window">Window Corner</option>
          </select>
          <input
            type="text"
            name="tableNumber"
            value={formData.tableNumber}
            onChange={handleChange}
            placeholder="Preferred Table Number (optional)"
            className="input"
          />
        </div>

        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests"
          className="input mt-4 w-full"
          rows="3"
        ></textarea>

        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Food Allergies or Pre-orders (optional)"
          className="input mt-2 w-full"
          rows="2"
        ></textarea>

        <div className="mt-4">
          <label className="font-medium">Add-ons:</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="checkbox"
                value="birthday"
                checked={formData.addons.includes("birthday")}
                onChange={handleChange}
              /> Birthday Setup
            </label>
            <label>
              <input
                type="checkbox"
                value="anniversary"
                checked={formData.addons.includes("anniversary")}
                onChange={handleChange}
              /> Anniversary Decor
            </label>
          </div>
        </div>

        {!available && (
          <p className="text-red-500 mt-2">
            Table not available. Try a different time.
          </p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={!available || isSubmitting}
            className="!bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
          
        </div>
      </form>

      {showConfirmation && confirmedDetails && (
        <div className="mt-6 bg-green-100 p-4 rounded">
          <h3 className="text-green-800 font-semibold mb-2">
            🎉 Booking Confirmed!
          </h3>
          <p>Reference: <strong>{bookingRef}</strong></p>
          <p>Date: {confirmedDetails.date}</p>
          <p>Time: {confirmedDetails.time}</p>
          <p>Guests: {confirmedDetails.guests}</p>
          <p>Table Type: {confirmedDetails.tableType}</p>
          {confirmedDetails.tableNumber && <p>Table No: {confirmedDetails.tableNumber}</p>}
          {confirmedDetails.addons.length > 0 && (
            <p>Add-ons: {confirmedDetails.addons.join(", ")}</p>
          )}
          {confirmedDetails.specialRequests && (
            <p>Note: {confirmedDetails.specialRequests}</p>
          )}
          <button
            type="button"
            onClick={handleCancel}
            className="!bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}