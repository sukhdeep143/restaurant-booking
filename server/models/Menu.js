
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  category: { type: String, required: true }, // 🔁 CHANGED from ObjectId to String
  isTodaySpecial: { type: Boolean, default: false },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
