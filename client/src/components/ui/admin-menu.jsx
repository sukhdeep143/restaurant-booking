
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    dishName: '',
    category: '',
    isTodaySpecial: false
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
const [stats, setStats] = useState({
  totalCategories: 0,
  totalItems: 0,
  todaysSpecials: 0,
});

// ✅ Add this function outside useEffect so it's accessible in handleSubmit & handleDelete
const fetchStats = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/menu/stats/dashboard");
    setStats(res.data);
      localStorage.setItem("dashboardStats", JSON.stringify(res.data));
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
  }
};

useEffect(() => {
  const cachedStats = localStorage.getItem("dashboardStats");
  if (cachedStats) {
    setStats(JSON.parse(cachedStats)); // 🌟 Load cached stats
  }

  fetchMenu();
  fetchStats(); // Also refresh once in background

  const interval = setInterval(fetchStats, 60000); // every 1 min
  return () => clearInterval(interval);
}, []);



  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(res.data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editId) {
      await axios.put(`http://localhost:5000/api/menu/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/menu', form);
    }

    await fetchMenu();
    fetchStats(); // ✅ Refresh dashboard stats immediately

    setForm({ dishName: '', category: '', isTodaySpecial: false });
    setEditId(null);
  } catch (err) {
    console.error('Error adding dish:', err);
    alert("Failed to add dish. See console for error.");
  }
};


  const handleEdit = (item) => {
    setForm({
      dishName: item.dishName,
      category: item.category,
      isTodaySpecial: item.isTodaySpecial
    });
    setEditId(item._id);
  };

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/menu/${id}`);
    await fetchMenu();
    fetchStats(); // ✅ Refresh dashboard stats after deletion
  } catch (err) {
    console.error('Error deleting dish:', err);
  }
};


  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item =>
    (item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'All' || item.category === categoryFilter)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold mb-6 text-center">🍽 Menu Panel</h2>

  {/* Search & Filter */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <div className="flex gap-2 justify-end w-full md:w-auto">
      <input
        type="text"
        placeholder="Search dishes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-48 px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-40 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {categories.map((cat, idx) => (
          <option key={idx}>{cat}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Add/Edit Form */}
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded shadow-md mb-6 space-y-4"
  >
    <input
      type="text"
      name="dishName"
      value={form.dishName}
      onChange={handleChange}
      placeholder="Dish Name"
      required
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
    />

    <input
      type="text"
      name="category"
      value={form.category}
      onChange={handleChange}
      placeholder="Category (e.g. Starter, Drink...)"
      required
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
    />

<div className="flex items-center">
    <label className="text-gray-700 ml-2 w-[200px]">
    Mark as Today's Special
  </label>
  <input
    type="checkbox"
    name="isTodaySpecial"
    checked={form.isTodaySpecial}
    onChange={handleChange}
   className="!w-[20px] h-[17px] text-blue-600"
  />

</div>


    <div className="text-center">
      <button
        type="submit"
        className="!bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {editId ? 'Update Dish' : 'Add Dish'}
      </button>
    </div>
  </form>

  {/* Menu Table */}
  <h3 className="text-2xl font-semibold mb-4">📋 Current Menu</h3>
  {filteredItems.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border">Dish Name</th>
            <th className="text-left px-4 py-2 border">Category</th>
            <th className="text-center px-4 py-2 border">Today's Special</th>
            <th className="text-center px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr
              key={item._id}
              className={`hover:bg-gray-50 ${
                item.isTodaySpecial ? 'bg-yellow-50 font-semibold' : ''
              }`}
            >
              <td className="px-4 py-2 border text-sm text-gray-800 font-medium">
                {item.dishName}
              </td>
              <td className="px-4 py-2 border text-sm text-gray-800 font-medium">
                {item.category}
              </td>
              <td className="px-4 py-2 border text-center align-middle text-xl">
                {item.isTodaySpecial ? '✅' : '❌'}
              </td>
              <td className="px-4 py-2 border text-center space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 bg-red-500 text-black rounded hover:bg-red-600 transition text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-500 mt-4">No dishes found.</p>
  )}
</div>

  );
}

export default AdminMenu;
