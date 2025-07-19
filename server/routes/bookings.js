const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const User = require("../models/UserModel"); // adjust the path as needed

router.post("/", async (req, res) => {
  try {
    const storedUser = req.body.userId;

    const newBooking = new Booking({
      ...req.body,
      userId: storedUser, // 🔥 this is important!
      reference: `RSV${Math.floor(100000 + Math.random() * 900000)}`
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book table" });
  }
});



// in routes/booking.js
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching bookings.' });
  }
});


// PATCH /api/bookings/:id/cancel
router.patch("/:id/cancel", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Cancel failed", error: err.message });
  }
});

// GET /api/bookings/future?userId=123
router.get("/future", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

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

// GET /api/bookings/past?userId=123
router.get("/past", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

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
// GET /api/bookings/filter?userId=...&type=past|future|all&status=confirmed|cancelled|pending
router.get("/filter", async (req, res) => {
  const { userId, type = "all", status } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  const today = new Date();
  let filter = { userId };

  // Filter based on type
  if (type === "past") {
    filter.date = { $lt: today };
  } else if (type === "future") {
    filter.date = { $gte: today };
  }

  // Optional status filter
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

// TEMPORARY: Get all bookings with userId
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

    // const pastConfirmed = allBookings
    //   .filter((b) => b.date < now && b.status === "confirmed")
    //   .sort((a, b) => new Date(b.date) - new Date(a.date));

    // const lastVisit = pastConfirmed[0]?.date;
// Get all confirmed *past* bookings
const pastConfirmedBookings = allBookings
  .filter(
    (b) =>
      b.status === "confirmed" &&
      new Date(b.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
  )
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending order

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
    res
      .status(500)
      .json({ message: "Failed to fetch dashboard data", error: err.message });
  }
});


module.exports = router;
