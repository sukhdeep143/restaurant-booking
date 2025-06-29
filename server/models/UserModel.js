const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures no duplicate emails
    lowercase: true, // Stores email in lowercase for consistency
    trim: true, // Removes leading/trailing whitespace
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Basic email validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'], // Minimum length for security
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true, // Optional field
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [150, 'Age cannot exceed 150'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'], // Restricts to capitalized values
  },
  
  countryCode: {
    type: String,
    required: [true, 'Country code is required'],
    trim: true,
    default: '+91', // Default value as per your form
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\d{6,15}$/, 'Phone number must be 6-15 digits'], // Basic phone number validation
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Default to 'user' for new signups
    required: true,
  },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  emailVerificationTokenExpires: { type: Date },
  
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set update date
  },
});

// Update `updatedAt` before saving
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});



module.exports = mongoose.model('User', userSchema);