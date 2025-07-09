const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
  idNumber: {
    type: String,
    required: [true, 'ID number is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address'],
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^\d{6,15}$/, 'Mobile number must be 6-15 digits'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.RegisteredUser || mongoose.model('RegisteredUser', registeredUserSchema);
