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
  totalAmount: Number,  // ✅ updated
  paymentMethod: String // e.g., 'COD' or 'Online'
}, { timestamps: true }); // ✅ adds createdAt and updatedAt

orderSchema.pre('save', function (next) {
  // Only calculate if totalAmount is not already set
  if (!this.totalAmount || this.totalAmount === 0) {
    this.totalAmount = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }
  next();
});


module.exports = mongoose.model('Order', orderSchema);
