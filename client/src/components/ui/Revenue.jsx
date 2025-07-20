import React, { useEffect, useState } from "react";

const Revenue = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [todaysCODRevenue, setTodaysCODRevenue] = useState(0);

  const fetchRevenue = async () => {
    try {
      const res = await fetch(`/api/revenue?month=${month}&year=${year}`);
      const data = await res.json();
      setTotalRevenue(data.totalRevenue || 0);
      setTodaysRevenue(data.todaysRevenue || 0);
      setTodaysCODRevenue(data.todaysCODRevenue || 0);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-100 p-4 rounded-lg shadow">
          <h4 className="text-gray-700 font-semibold">Total Revenue</h4>
          <p className="text-xl font-bold text-indigo-700 mt-2">₹{totalRevenue}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h4 className="text-gray-700 font-semibold">Today’s Revenue</h4>
          <p className="text-xl font-bold text-green-700 mt-2">₹{todaysRevenue}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h4 className="text-gray-700 font-semibold">Today’s COD Revenue</h4>
          <p className="text-xl font-bold text-yellow-700 mt-2">₹{todaysCODRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
