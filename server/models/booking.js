const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
date: { type: Date, required: true },

  time: { type: String, required: true },
  guests: { type: Number, required: true, default: 2 },
  tableType: String,
  specialRequests: String,
  addons: [String],
  allergies: String,
  tableNumber: String,
 reference: {
  type: String,
  unique: true,
},
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

  status: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("booking", bookingSchema);
