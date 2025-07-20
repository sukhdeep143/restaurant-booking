const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const now = new Date();
router.get('/', async (req, res) => {
  try {
    const { month, year } = req.query;

const selectedMonth = parseInt(month) || now.getMonth() + 1; // default: current month
const selectedYear = parseInt(year) || now.getFullYear();  

    
// India Standard Time (UTC+5:30)
// ✅ Get IST current date

const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
const istNow = new Date(now.getTime() + istOffset);

// ✅ Extract year, month, date from IST
const istYear = istNow.getUTCFullYear();
const istMonth = istNow.getUTCMonth(); // 0-based
const istDate = istNow.getUTCDate();

// ✅ Start and End of Today in IST (converted back to UTC)
const startOfToday = new Date(Date.UTC(istYear, istMonth, istDate, 0, 0, 0));
const endOfToday = new Date(Date.UTC(istYear, istMonth, istDate, 23, 59, 59, 999));



const todayRevenue = await Order.aggregate([
  {
    $match: {
      status: 'Completed',
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: '$totalAmount' }
    }
  }
]);



    const startOfMonth = new Date(Date.UTC(selectedYear, selectedMonth - 1, 1));
    const endOfMonth = new Date(Date.UTC(selectedYear, selectedMonth, 0, 23, 59, 59));

    const startOfYear = new Date(Date.UTC(selectedYear, 0, 1));
    const endOfYear = new Date(Date.UTC(selectedYear, 11, 31, 23, 59, 59));

    // Fetch Orders
    const todayOrders = await Order.find({
      status: 'Completed',
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    });

    const monthOrders = await Order.find({
      status: 'Completed',
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const yearOrders = await Order.find({
      status: 'Completed',
      createdAt: { $gte: startOfYear, $lte: endOfYear }
    });

// ✅ Debug Logs (add this block right here)
console.log("📅 Today Orders:", todayOrders.length);
console.log("📆 Month Orders:", monthOrders.length);
console.log("📈 Year Orders:", yearOrders.length);
    // Calculate Revenues
    const calcRevenue = orders => orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const calcCOD = orders => orders.filter(o => o.paymentMethod === 'COD').reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    res.json({
      todaysRevenue: calcRevenue(todayOrders),
      todaysCODRevenue: calcCOD(todayOrders),
      totalRevenue: calcRevenue(monthOrders),
      yearlyRevenue: calcRevenue(yearOrders),
      todayOrders,
      monthOrders,
      yearOrders
    });

  } catch (err) {
    console.error("❌ Revenue fetch error:", err);
    res.status(500).json({ error: "Server error while fetching revenue" });
  }
});

module.exports = router;
