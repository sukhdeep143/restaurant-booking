// server/routes/table.js
const express = require("express");
const router = express.Router();
const TableBooking = require("../models/Tables");

// 🟢 Get all tables
router.get("/", async (req, res) => {
  try {
    const tables = await TableBooking.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔵 Add a new table booking
router.post("/", async (req, res) => {
  const { tableNumber, capacity, status, bookingTime } = req.body;

  const newTable = new TableBooking({
    tableNumber,
    capacity,
    status,
    bookingTime,
  });

  try {
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🟡 Update booking status or time
router.patch('/by-number/:tableNumber', async (req, res) => {
  const { tableNumber } = req.params;
  const updates = req.body;

  try {
    const updated = await TableBooking.findOneAndUpdate(
      { tableNumber: Number(tableNumber) },  // ✅ must be a number
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error in PATCH /by-number:", err);
    res.status(500).json({ message: err.message });
  }
});



// 🔴 Delete a booking
router.delete('/by-number/:tableNumber', async (req, res) => {
  const { tableNumber } = req.params;
  try {
    const deleted = await TableBooking.findOneAndDelete({ tableNumber: Number(tableNumber) });
    if (!deleted) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json({ message: "Table deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
