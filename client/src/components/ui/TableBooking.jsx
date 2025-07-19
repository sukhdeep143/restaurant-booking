
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

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

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tables");
      setTables(res.data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    fetchTables();
    fetchBookings();

    socket.on("tableBooked", () => {
      fetchTables();
      fetchBookings();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("tableBooked");
    };
  }, []);

  const handleDelete = async (tableNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/tables/by-number/${tableNumber}`);
      fetchTables();
    } catch (err) {
      console.error("Error deleting table:", err);
    }
  };

  const handleEdit = (table) => {
    setEditingTable({ ...table });
    setShowEditModal(true);
  };

  const handleSubmitAddTable = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tables", newTable);
      setTables([...tables, res.data]);
      setShowAddModal(false);
      setNewTable({ tableNumber: "", capacity: "", status: "available", bookingTime: "" });
    } catch (err) {
      console.error("Add table error:", err);
    }
  };

  const handleSubmitEditTable = async (e) => {
    e.preventDefault();
    try {
      const { tableNumber, capacity, status, bookingTime } = editingTable;
      const dataToSend = { tableNumber, capacity, status };
      if (status !== "available" && bookingTime) {
        dataToSend.bookingTime = bookingTime;
      }

      await axios.patch(`http://localhost:5000/api/tables/by-number/${tableNumber}`, dataToSend);
      fetchTables();
      setShowEditModal(false);
      setEditingTable(null);
    } catch (err) {
      console.error("Edit table error:", err);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Table Booking</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Table
        </button>
      </div>

      {/* Table Booking List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Table No.</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{booking.name}</td>
                  <td className="py-2 px-4 border">{booking.email}</td>
                  <td className="py-2 px-4 border">{booking.phone}</td>
                  <td className="py-2 px-4 border">{booking.tableNumber}</td>
                  <td className="py-2 px-4 border">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{booking.time}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium text-white ${
                        booking.status === "cancelled"
                          ? "!bg-red-500"
                          : booking.status === "confirmed"
                          ? "!bg-green-600"
                          : booking.status === "pending"
                          ? "!bg-yellow-400 text-black"
                          : "!bg-gray-400"
                      }`}
                    >
                      {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Available/Reserved/Occupied Table Sections */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Tables</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {tables.map((table) => (
            <div
              key={table._id}
              className={`p-4 rounded shadow border ${
                table.status === "available"
                  ? "!bg-green-100 border-green-300"
                  : table.status === "reserved"
                  ? "!bg-yellow-100 border-yellow-300"
                  : "!bg-red-100 border-red-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Table {table.tableNumber}</h4>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    table.status === "available"
                      ? "!bg-green-500 text-white"
                      : table.status === "reserved"
                      ? "!bg-yellow-400 text-black"
                      : "!bg-red-500 text-white"
                  }`}
                >
                  {table.status.toUpperCase()}
                </span>
              </div>
              <p className="mt-2 text-sm">Capacity: {table.capacity}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(table)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(table.tableNumber)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Table</h2>
            <form onSubmit={handleSubmitAddTable} className="space-y-4">
              <input
                type="text"
                placeholder="Table Number"
                value={newTable.tableNumber}
                onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newTable.capacity}
                onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={newTable.status}
                onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="occupied">Occupied</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {showEditModal && editingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="!bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Table</h2>
            <form onSubmit={handleSubmitEditTable} className="space-y-4">
              <input
                type="text"
                value={editingTable.tableNumber}
                onChange={(e) =>
                  setEditingTable({ ...editingTable, tableNumber: e.target.value })
                }
                className="w-full p-2 border rounded"
                readOnly
              />
              <input
                type="number"
                value={editingTable.capacity}
                onChange={(e) => setEditingTable({ ...editingTable, capacity: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={editingTable.status}
                onChange={(e) => setEditingTable({ ...editingTable, status: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="occupied">Occupied</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="!px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
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
