// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";


// const [dashboardData, setDashboardData] = useState(null);
// const [loading, setLoading] = useState(true);

// // GET /api/bookings/dashboard/:userId
// router.get("/dashboard/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const allBookings = await Booking.find({ userId }).sort({ date: -1 });
//     const upcoming = allBookings.find(
//       (b) => b.date >= new Date() && b.status === "confirmed"
//     );
//     const recent = allBookings.slice(0, 5); // latest 5 bookings
//     const total = allBookings.length;

//     const pastConfirmed = allBookings
//       .filter((b) => b.date < new Date() && b.status === "confirmed")
//       .sort((a, b) => b.date - a.date);
//     const lastVisit = pastConfirmed[0]?.date;

//     res.json({
//       upcomingBooking: upcoming
//         ? { date: upcoming.date.toDateString(), time: upcoming.time }
//         : null,
//       recentBookings: recent.map((b) => ({
//         date: b.date.toDateString(),
//         guests: b.guests,
//         status: b.status,
//       })),
//       totalBookings: total,
//       lastVisit: lastVisit ? lastVisit.toDateString() : null,
//     });
//   } catch (err) {
//     console.error("Dashboard stats error:", err);
//     res.status(500).json({ message: "Failed to fetch dashboard data" });
//   }
// });

// export default function Dashboard( {
//   onBookTableClick,
//   onBookingHistoryClick,
//   onProfileClick,
//   stats
// }){

//   return (
//     <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
//       {/* Welcome Message */}
//       <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
//         👋 Welcome back, Kashvi!
//       </h2>
//       <p className="text-gray-600 dark:text-gray-300 mb-6">
//         Here's a quick overview of your booking activity.
//       </p>

//       {/* Stats Cards */}
//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//   <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow">
//     <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">Upcoming Booking</p>
//     {stats?.upcomingBooking ? (
//       <p className="text-sm text-gray-700 dark:text-gray-300">
//         {stats.upcomingBooking.date} at {stats.upcomingBooking.time}
//       </p>
//     ) : (
//       <p className="text-sm text-gray-500 italic">No upcoming booking</p>
//     )}
//   </div>

//   <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow">
//     <p className="text-lg font-semibold text-green-900 dark:text-green-100">Total Bookings</p>
//     <p className="text-sm text-gray-700 dark:text-gray-300">
//       {stats?.totalBookings || 0} bookings
//     </p>
//   </div>

//   <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow">
//     <p className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">Last Visit</p>
//     <p className="text-sm text-gray-700 dark:text-gray-300">
//       {stats?.lastVisit || "No visits yet"}
//     </p>
//   </div>

//   <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg shadow">
//     <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">Profile Status</p>
//     <p className="text-sm text-gray-700 dark:text-gray-300">
//       {stats?.profileCompletion || "Incomplete"}
//     </p>
//   </div>
// </div>

//       {/* Quick Actions */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <button
//           onClick= {onBookTableClick}
//           className="!bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           ➕ Book a Table
//         </button>
//         <button
//            onClick={onBookingHistoryClick}
//           className="!bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           📅 My Bookings
//         </button>
//         <button
//           onClick={onProfileClick}
//           className="!bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           ✏️ Update Profile
//         </button>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
//   <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">📌 Recent Bookings</h3>
//   <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
//     {stats?.recentBookings && stats.recentBookings.length > 0 ? (
//       stats.recentBookings.map((booking, index) => (
//         <li key={index}>
//           {booking.status === "cancelled" ? "❌" : "✅"} {booking.date} – Table for {booking.guests}
//         </li>
//       ))
//     ) : (
//       <li className="italic text-gray-500">No recent bookings</li>
//     )}
//   </ul>
// </div>

//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard({
  onBookTableClick,
  onBookingHistoryClick,
  onProfileClick,
}) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(`/api/bookings/dashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched dashboard data:", response.data); // 👈 debug
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = dashboardData;

  return (
    <div className="!bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Welcome Message */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        👋 Welcome back, Kashvi!
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Here's a quick overview of your booking activity.
      </p>

      {/* Grid Container for Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Upcoming Booking */}
        <div className="!bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Upcoming Booking
          </p>
          {loading ? (
            <p className="text-sm italic text-gray-500">Loading...</p>
          ) : dashboardData?.upcomingBooking ? (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {dashboardData.upcomingBooking.date} at {dashboardData.upcomingBooking.time}
            </p>
          ) : (
            <p className="text-sm italic text-gray-500">No upcoming booking</p>
          )}
        </div>

        {/* Total Bookings */}
        <div className="!bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold text-green-900 dark:text-green-100">
            Total Bookings
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {dashboardData?.totalBookings || 0} bookings
          </p>
        </div>

        {/* Last Visit */}
        <div className="!bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            Last Visit
          </p>
          {loading ? (
            <p className="text-sm italic text-gray-500">Loading...</p>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {dashboardData?.lastVisit ? dashboardData.lastVisit : "No visits yet"}
            </p>
          )}
        </div>

        {/* Profile Status */}
        <div className="!bg-purple-100 dark:bg-purple-800 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
            Profile Status
          </p>
          {loading ? (
            <p className="text-sm italic text-gray-500">Loading...</p>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {dashboardData?.profileStatus || "Incomplete"}
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={onBookTableClick}
          className="!bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          ➕ Book a Table
        </button>
        <button
          onClick={onBookingHistoryClick}
          className="!bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          📅 My Bookings
        </button>
        <button
          onClick={onProfileClick}
          className="!bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
        >
          ✏️ Update Profile
        </button>
      </div>

      {/* Recent Bookings */}
      <div className="!bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          📌 Recent Bookings
        </h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          {stats?.recentBookings && stats.recentBookings.length > 0 ? (
            stats.recentBookings.map((booking, index) => (
              <li key={index}>
                {booking.status === "cancelled" ? "❌" : "✅"} {booking.date} – Table for{" "}
                {booking.guests}
              </li>
            ))
          ) : (
            <li className="italic text-gray-500">No recent bookings</li>
          )}
        </ul>
      </div>
    </div>
  );
}
