// server/models/TableBooking.js
const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["occupied", "reserved", "available"],
    default: "available",
  },
   bookingTime: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("TableBooking", tableBookingSchema);
