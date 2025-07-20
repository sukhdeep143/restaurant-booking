const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId,phone, items, tableNumber, paymentMethod } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      phone,
      items,
      tableNumber,
      paymentMethod,
      totalAmount // ✅ explicitly set
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Get all orders
// Get all orders with optional status filter
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    // Apply status filter only if it's not 'All Statuses' or undefined
    if (status && status !== 'All Statuses') {
      query.status = status;
    }

    const orders = await Order.find(query)
  .populate('userId', 'phone') // 👈 populate only the phone field from user
  .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});


// Get single order
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// Update order status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updatedOrder);
});

// Delete order
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted successfully' });
});
// ✅ Get total revenue
router.get('/stats/revenue', async (req, res) => {
  try {
    const orders = await Order.find();
    const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    res.json({ revenue });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    res.status(500).json({ message: 'Failed to calculate revenue' });
  }
});

router.get('/debug/created', async (req, res) => {
  const orders = await Order.find({ status: 'Completed' })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(orders.map(o => ({
    _id: o._id,
    createdAt: o.createdAt,
    status: o.status,
    totalAmount: o.totalAmount
  })));
});


module.exports = router;
