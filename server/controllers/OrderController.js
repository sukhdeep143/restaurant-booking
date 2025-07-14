const Order = require('../models/Order'); // adjust path as needed

const getRevenueData = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Today's revenue
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todaysOrders = await Order.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: 'Completed'
    });

    const todaysRevenue = todaysOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    const todaysCODRevenue = todaysOrders
      .filter(order => order.paymentMethod === 'COD')
      .reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    // Monthly revenue
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // Last day of month

    const monthlyOrders = await Order.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      status: 'Completed'
    });

    const totalRevenue = monthlyOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    res.json({
      totalRevenue,
      todaysRevenue,
      todaysCODRevenue
    });
  } catch (err) {
    console.error("Revenue Fetch Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getRevenueStats };

