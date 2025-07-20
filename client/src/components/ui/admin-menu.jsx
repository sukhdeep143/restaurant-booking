
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin-menu.css';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    dishName: '',
    category: 'Starter',
    isTodaySpecial: false
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMenu();
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
      setForm({ dishName: '', category: 'Starter', isTodaySpecial: false });
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
      fetchMenu();
    } catch (err) {
      console.error('Error deleting dish:', err);
    }
  };

  const filteredItems = menuItems.filter(item =>
    item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-menu-container">
      <h2 className="admin-menu-title">🍽 Menu Panel</h2>

      <div className="admin-menu-search">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="admin-menu-form">
        <input
          type="text"
          name="dishName"
          value={form.dishName}
          onChange={handleChange}
          placeholder="Dish Name"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option>Starter</option>
          <option>Main Course</option>
          <option>Dessert</option>
          <option>Drink</option>
        </select>

        <label className="checkbox-group">
          Mark as Today's Special
          <input
            type="checkbox"
            name="isTodaySpecial"
            checked={form.isTodaySpecial}
            onChange={handleChange}
          />
          
        </label>

        <button type="submit">
          {editId ? "Update Dish" : "Add Dish"}
        </button>
      </form>

      <h3 className="admin-menu-subtitle">📋 Current Menu</h3>
      {filteredItems.length > 0 ? (
        <div className="table-container">
          <table className="menu-table">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Category</th>
                <th>Today's Special</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.dishName}</td>
                  <td>{item.category}</td>
                  <td>{item.isTodaySpecial ? "✅" : "❌"}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-text">No dishes found.</p>
      )}
    </div>
  );
}

export default AdminMenu;
