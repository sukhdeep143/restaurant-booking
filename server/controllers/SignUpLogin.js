const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/UserModel');
const RegisteredUser = require('../models/RegisteredUserModel');
const fs = require('fs');
require('dotenv').config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}




// Signup route
const signup = async (req, res) => {
  console.log(req.body)
  try {
    const {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      address,
      age,
      gender,
      email,
      password,
      confirmPassword,
      role, // User-specified role ('user' or 'admin')
      adminSecret, // Secret key for admin role
    } = req.body;

    // Validate required fields
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !age ||
      !gender||
      !role // User-specified role ('user' or 'admin')
    ) {
      return res.status(400).json({ message: 'Required data missing' });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Validate admin role request
    const isAdminRequested = role === 'admin';
    const isValidAdminSecret = isAdminRequested && adminSecret === process.env.ADMIN_SECRET_KEY;
    if (isAdminRequested && !isValidAdminSecret) {
      return res.status(403).json({ message: 'Invalid admin secret key' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      address,
      age: Number(age),
      gender,
      role: isValidAdminSecret ? 'admin' : 'user', // Assign admin role if secret is valid
    });

    // Generate and save verification code
    const verificationCode = generateVerificationCode();
    const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000);
    newUser.emailVerificationToken = verificationCode;
    newUser.emailVerificationTokenExpires = tokenExpiration;
    await newUser.save();
// Save registered user info
const exists = await RegisteredUser.findOne({ email: newUser.email });
if (!exists) {
  await RegisteredUser.create({
    idNumber: newUser._id.toString(),
    name: `${newUser.firstName} ${newUser.lastName}`,
    email: newUser.email,
    mobileNumber: newUser.phoneNumber,
  });
}

    // Send verification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}. Please enter this code to verify your email.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Signup successful. Please check your email for verification.',
      data: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(400).json({ message: 'Email not verified. Please verify your email to log in.' });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
// After password and email verification checks
const exists = await RegisteredUser.findOne({ email: user.email });
if (!exists) {
  await RegisteredUser.create({
    idNumber: user._id.toString(),
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    mobileNumber: user.phoneNumber,
  });
}

    // Generate JWT
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.firstName + ' ' + user.lastName,
        username: user.firstName,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      userId: user._id,
      token: accessToken,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Change password route
const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist!',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Old password is incorrect!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

// Verify email route
const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email }).select(
      '+emailVerificationToken +emailVerificationTokenExpires'
    );

    if (!user) return res.status(400).json({ success: false, message: 'User not found.' });
    if (user.isEmailVerified) return res.status(400).json({ success: false, message: 'Email already verified.' });

    const isTokenValid = user.emailVerificationToken === verificationCode;
    const isTokenExpired = user.emailVerificationTokenExpires < new Date();

    if (!isTokenValid || isTokenExpired) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code.' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();
    res.status(200).json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // Create admin route (protected)
// const createAdmin = async (req, res) => {
//   try {
//     const {
//       firstName,
//       middleName,
//       lastName,
//       phoneNumber,
//       address,
//       age,
//       gender,
//       email,
//       password,
//       confirmPassword,
//     } = req.body;

//     // Validate required fields
//     if (
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !firstName ||
//       !lastName ||
//       !phoneNumber ||
//       !address ||
//       !age ||
//       !gender
//     ) {
//       return res.status(400).json({ message: 'Required data missing' });
//     }

//     // Check password match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists.' });
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create admin user
//     const newAdmin = await User.create({
//       email,
//       password: hashedPassword,
//       firstName,
//       middleName,
//       lastName,
//       phoneNumber,
//       address,
//       age: Number(age),
//       gender,
//       role: 'admin',
//       isEmailVerified: true, // Auto-verify for admins
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Admin created successfully.',
//       data: { email: newAdmin.email, role: newAdmin.role },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };

module.exports = { signup, login, changePassword, verifyEmail };