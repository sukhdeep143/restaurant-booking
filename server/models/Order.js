const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  tableNumber: Number,
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  total: Number,
  paymentMethod: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
