// server/models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Starter', 'Main Course', 'Dessert', 'Drink'],
    required: true
  },
  isTodaySpecial: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
