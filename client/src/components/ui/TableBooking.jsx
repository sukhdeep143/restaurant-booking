import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tablebooking.css";

const TableBooking = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({
    tableNumber: "",
    capacity: "",
    status: "available",
    bookingTime: "",
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tables");
      setTables(res.data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  const handleDelete = async (tableNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/tables/by-number/${tableNumber}`);

      fetchTables();
    } catch (err) {
      console.error("Error deleting table:", err);
    }
  };

  const handleEdit = (table) => {
    console.log("Editing table:", table);
    setEditingTable({table });
    setShowEditModal(true);
  };

  const handleSubmitAddTable = async (e) => {
  e.preventDefault();
  try {
    const dataToSend = {
      tableNumber: newTable.tableNumber,
      capacity: newTable.capacity,
      status: newTable.status,
    };

    // Only include bookingTime if status is not 'available' and value is set
    if (newTable.status !== "available" && newTable.bookingTime) {
      dataToSend.bookingTime = newTable.bookingTime;
    }

    console.log("Sending table data:", dataToSend); // Debug log

    const res = await axios.post("http://localhost:5000/api/tables", dataToSend);

    setTables([...tables, res.data]);
    setNewTable({ tableNumber: "", capacity: "", status: "available", bookingTime: "" });
    setShowAddModal(false);
  } catch (err) {
    console.error("Add table error:", err.response?.data || err.message || err);
    alert("Failed to add table. See console.");
  }
};

const handleSubmitEditTable = async (e) => {
  e.preventDefault();
  try {
    const {
      tableNumber,
      capacity,
      status,
      bookingTime
    } = editingTable;

    const dataToSend = {
      tableNumber,
      capacity,
      status,
    };

    if (status !== "available" && bookingTime) {
      dataToSend.bookingTime = bookingTime;
    }

    await axios.patch(`http://localhost:5000/api/tables/by-number/${tableNumber}`, dataToSend);

    fetchTables();
    setShowEditModal(false);
    setEditingTable(null);
  } catch (err) {
    console.error("Edit table error:", err.response?.data || err.message);
    alert("Failed to edit table. See console.");
  }
};



  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Table Booking</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
        >
          + Add Table
        </button>
      </div>

      <div className="admin-section-content overflow-x-auto">
        
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Table No.</th>
              <th className="p-3 text-left">Capacity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Booking Time</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table._id} className="even:bg-gray-50">
                <td className="p-3">{table.tableNumber}</td>
                <td className="p-3">{table.capacity}</td>
                <td className="p-3 font-semibold">
                  <span
                    className={`px-2 py-1 rounded ${
                      table.status === "available"
                        ? "bg-green-100 text-green-700"
                        : table.status === "occupied"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {table.status}
                  </span>
                </td>
                <td className="p-3">
                  {table.bookingTime
                    ? new Date(table.bookingTime).toLocaleString()
                    : "-"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(table)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(table.tableNumber)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tables.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No tables found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Table</h2>
            <form onSubmit={handleSubmitAddTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Table Number</label>
                <input
                  type="number"
                  value={newTable.tableNumber}
                  onChange={(e) =>
                    setNewTable({ ...newTable, tableNumber: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Capacity</label>
                <input
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) =>
                    setNewTable({ ...newTable, capacity: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={newTable.status}
                  onChange={(e) =>
                    setNewTable({ ...newTable, status: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Booking Time</label>
                <input
                  type="datetime-local"
                  value={newTable.bookingTime || ""}
                  onChange={(e) =>
                    setNewTable({ ...newTable, bookingTime: e.target.value })
                  }
                  disabled={newTable.status === "available"}
                  className="w-full p-2 border rounded-md"
                  required={newTable.status !== "available"}
                />
              </div>
              <div className="flex justify-end gap-3">
<button
  type="button"
  onClick={() => setShowAddModal(false)}
  className="cancel-btn"
>
  Cancel
</button>
<button
  type="submit"
  className="save-btn"
>
  Add Table
</button>

              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Table</h2>
            <form onSubmit={handleSubmitEditTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Table Number</label>
                <input
                  type="number"
                  value={editingTable.tableNumber}
                  onChange={(e) =>
                    setEditingTable({ ...editingTable, tableNumber: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Capacity</label>
                <input
                  type="number"
                  value={editingTable.capacity}
                  onChange={(e) =>
                    setEditingTable({ ...editingTable, capacity: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={editingTable.status}
                  onChange={(e) =>
                    setEditingTable({ ...editingTable, status: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Booking Time</label>
                <input
                  type="datetime-local"
                  value={editingTable.bookingTime || ""}
                  onChange={(e) =>
                    setEditingTable({ ...editingTable, bookingTime: e.target.value })
                  }
                  disabled={editingTable.status === "available"}
                  className="w-full p-2 border rounded-md"
                  required={editingTable.status !== "available"}
                />
              </div>
              <div className="flex justify-end gap-3">
<button
  type="button"
  onClick={() => setShowEditModal(false)}
  className="cancel-btn"
>
  Cancel
</button>
<button
  type="submit"
  className="save-btn"
>
  Save Changes
</button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBooking;

