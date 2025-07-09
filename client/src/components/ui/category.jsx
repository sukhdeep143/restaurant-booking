import React, { useState, useEffect } from "react";
import "./category.css";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch categories from backend
  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Add or Edit category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/category/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } else {
      await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }

    setName("");
    setEditingId(null);
    fetchCategories();
  };

  // ✏️ Set for editing
  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category._id);
  };

  // ❌ Delete category
  const handleDelete = async (id) => {
    await fetch(`/api/category/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div className="category-container">
      <h2>📂 Category Management</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          value={name}
          placeholder="Enter category name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <table className="category-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
