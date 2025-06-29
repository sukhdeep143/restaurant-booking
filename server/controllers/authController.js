const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/UserModel');

require("dotenv").config();
// Store OTPs temporarily (in production, use Redis or a database)
const otpStore = new Map();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Store OTP with expiry (5 minutes)
    otpStore.set(email, {
      otp,
      expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <h1>Password Reset Request</h1>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     console.log(email)
//     console.log(otp)
    

//     const storedOTPData = otpStore.get(email);
//     console.log(storedOTPData)
//     if (!storedOTPData) {
//       return res.status(400).json({ message: 'No OTP found for this email' });
//     }

//     if (Date.now() > storedOTPData.expiry) {
//       otpStore.delete(email);
//       return res.status(400).json({ message: 'OTP has expired' });
//     }

//     if (storedOTPData.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     res.status(200).json({ message: 'OTP verified successfully' });
//   } catch (error) {
//     console.error('Error in verifyOTP:', error);
//     res.status(500).json({ message: 'Error verifying OTP' });
//   }
// };

exports.verifyOTP = async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const { email, otp } = req.body;
  
      const storedOTPData = otpStore.get(email);
      console.log("Stored OTP data:", storedOTPData);
  
      if (!storedOTPData) {
        return res.status(400).json({ message: "No OTP found for this email" });
      }
  
      console.log("Current time:", Date.now(), "Expiry:", storedOTPData.expiry);
      if (Date.now() > storedOTPData.expiry) {
        otpStore.delete(email);
        return res.status(400).json({ message: "OTP has expired" });
      }
  
      console.log("Provided OTP:", otp, "Stored OTP:", storedOTPData.otp);
      if (storedOTPData.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      res.status(500).json({ message: "Error verifying OTP" });
    }
  };


exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const storedOTPData = otpStore.get(email);

    if (!storedOTPData || storedOTPData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password before saving
    const saltRounds = 10; // Recommended rounds
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    await user.save();

    // Clear OTP
    otpStore.delete(email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};


exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Store new OTP
    otpStore.set(email, {
      otp,
      expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New Password Reset OTP',
      html: `
        <h1>New Password Reset OTP</h1>
        <p>Your new OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'New OTP sent successfully' });
  } catch (error) {
    console.error('Error in resendOTP:', error);
    res.status(500).json({ message: 'Error resending OTP' });
  }
};


