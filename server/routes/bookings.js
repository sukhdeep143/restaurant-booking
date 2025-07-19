const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const User = require("../models/UserModel");
const Table = require("../models/Tables"); // ✅ moved to top

// ✅ Create a new booking and update table status
router.post("/", async (req, res) => {
  try {
    const storedUser = req.body.userId;

    const newBooking = new Booking({
      ...req.body,
      userId: storedUser,
      reference: `RSV${Math.floor(100000 + Math.random() * 900000)}`
    });

    const savedBooking = await newBooking.save();

    // ✅ Update table status to "occupied"
    const updatedTable = await Table.findOneAndUpdate(
      { tableNumber: req.body.tableNumber },
      {
        status: "occupied",
        bookingTime: new Date(`${req.body.date}T${req.body.time}`)
      },
      { new: true }
    );

    // ✅ Emit tableBooked with updated table data
    if (global.io) {
global.io.emit("tableBooked", {
  status: "occupied",
  tableNumber: req.body.tableNumber
});
    }

    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// ✅ Cancel a booking and free the table
router.patch("/:id/cancel", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    const booking = await Booking.findById(req.params.id);

    if (booking) {
      await Table.findOneAndUpdate(
        { tableNumber: booking.tableNumber },
        { status: "available", bookingTime: null },
        { new: true }
      );

      const updatedTable = await Table.findOne({ tableNumber: booking.tableNumber });

      // ✅ Emit tableBooked with updated table data
      if (global.io) {
      global.io.emit("tableBooked", {
  status: "available",
  tableNumber: booking.tableNumber
});
      }
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Cancel failed", error: err.message });
  }
});

// ✅ Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching bookings.' });
  }
});


// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});




// ✅ Future bookings
router.get("/future", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  try {
    const bookings = await Booking.find({
      userId,
      date: { $gte: new Date() }
    }).sort({ date: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch future bookings", error: err.message });
  }
});

// ✅ Past bookings
router.get("/past", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  try {
    const bookings = await Booking.find({
      userId,
      date: { $lt: new Date() }
    }).sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch past bookings", error: err.message });
  }
});

// ✅ Filter bookings based on type and status
router.get("/filter", async (req, res) => {
  const { userId, type = "all", status } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  const today = new Date();
  let filter = { userId };

  if (type === "past") {
    filter.date = { $lt: today };
  } else if (type === "future") {
    filter.date = { $gte: today };
  }

  if (status) {
    filter.status = status;
  }

  try {
    const bookings = await Booking.find(filter).sort({ date: type === "past" ? -1 : 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
});

// ✅ User dashboard data
router.get("/dashboard/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const allBookings = await Booking.find({ userId }).sort({ date: -1 });
    const user = await User.findById(userId);
    const now = new Date();

    const profileComplete = [
      user.firstName?.trim(),
      user.lastName?.trim(),
      user.email?.trim(),
      user.phoneNumber?.toString().trim(),
      user.age,
      user.gender?.trim(),
      user.address?.trim(),
    ].every(Boolean);

    const upcoming = allBookings
      .filter((b) => b.date >= now && b.status === "confirmed")
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    const recent = allBookings.slice(0, 5);
    const total = allBookings.length;

    const pastConfirmedBookings = allBookings
      .filter(
        (b) =>
          b.status === "confirmed" &&
          new Date(b.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const lastVisit = pastConfirmedBookings.length > 0
      ? new Date(pastConfirmedBookings[0].date).toDateString()
      : null;

    res.json({
      upcomingBooking: upcoming
        ? { date: upcoming.date.toDateString(), time: upcoming.time }
        : null,
      recentBookings: recent.map((b) => ({
        date: b.date.toDateString(),
        guests: b.guests,
        status: b.status,
      })),
      totalBookings: total,
      lastVisit: user.lastLogin
        ? new Date(user.lastLogin).toLocaleString()
        : "No login history",
      profileStatus: profileComplete ? "Complete" : "Incomplete",
    });
    console.log("Last visit:", lastVisit);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data", error: err.message });
  }
});

module.exports = router;
