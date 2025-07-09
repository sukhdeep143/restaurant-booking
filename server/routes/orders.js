const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ timestamp: -1 });
  res.json(orders);
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

module.exports = router;
