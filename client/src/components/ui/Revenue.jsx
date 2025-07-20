import React, { useEffect, useState } from "react";

const Revenue = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [todaysCODRevenue, setTodaysCODRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);

  const [todayOrders, setTodayOrders] = useState([]);
  const [monthOrders, setMonthOrders] = useState([]);
  const [yearOrders, setYearOrders] = useState([]);

  const [showTodayDetails, setShowTodayDetails] = useState(false);
  const [showMonthDetails, setShowMonthDetails] = useState(false);
  const [showYearDetails, setShowYearDetails] = useState(false);

  const fetchRevenue = async () => {
    try {
      const res = await fetch(`/api/revenue?month=${month}&year=${year}`);
      const data = await res.json();
      console.log("📊 Revenue data from backend:", data);

      setTotalRevenue(data.totalRevenue || 0);
      setTodaysRevenue(data.todaysRevenue || 0);
      setTodaysCODRevenue(data.todaysCODRevenue || 0);
      setYearlyRevenue(data.yearlyRevenue || 0);

      setTodayOrders(data.todayOrders || []);
      setMonthOrders(data.monthOrders || []);
      setYearOrders(data.yearOrders || []);
    } catch (err) {
      console.error("Error fetching revenue:", err);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [month, year]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const renderOrderList = (orders) => (
    <ul className="mt-2 space-y-2">
      {orders.map((order, index) => (
        <li key={index} className="border p-2 rounded bg-white shadow-sm">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Table:</strong> {order.tableNumber}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
          <p><strong>Items:</strong> {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📊 Revenue Dashboard</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Month</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            {months.map((name, index) => (
              <option key={index + 1} value={index + 1}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="space-y-6">

        {/* Today Revenue */}
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-gray-700 font-semibold">Today’s Revenue</h4>
              <p className="text-xl font-bold text-green-700 mt-1">₹{todaysRevenue}</p>
              <p className="text-sm text-gray-600">COD: ₹{todaysCODRevenue}</p>
            </div>
            <button
              onClick={() => setShowTodayDetails(!showTodayDetails)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {showTodayDetails ? "⏷ Hide Details" : "⏵ View Details"}
            </button>
          </div>
          {showTodayDetails && renderOrderList(todayOrders)}
        </div>

        {/* Month Revenue */}
        <div className="bg-indigo-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-gray-700 font-semibold">{months[month - 1]} Revenue</h4>
              <p className="text-xl font-bold text-indigo-700 mt-1">₹{totalRevenue}</p>
            </div>
            <button
              onClick={() => setShowMonthDetails(!showMonthDetails)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {showMonthDetails ? "⏷ Hide Details" : "⏵ View Details"}
            </button>
          </div>
          {showMonthDetails && renderOrderList(monthOrders)}
        </div>

        {/* Year Revenue */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-gray-700 font-semibold">{year} Revenue</h4>
              <p className="text-xl font-bold text-yellow-700 mt-1">₹{yearlyRevenue}</p>
            </div>
            <button
              onClick={() => setShowYearDetails(!showYearDetails)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {showYearDetails ? "⏷ Hide Details" : "⏵ View Details"}
            </button>
          </div>
          {showYearDetails && renderOrderList(yearOrders)}
        </div>
      </div>
    </div>
  );
};

export default Revenue;

