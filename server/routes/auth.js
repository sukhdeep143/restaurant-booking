const express=require('express')
const router = express.Router()
const {signup, login, changePassword, verifyEmail} = require('../controllers/SignUpLogin')
const {forgotPassword,verifyOTP,resetPassword,resendOTP} = require('../controllers/authController')

router.post('/signup', signup); 
router.post('/login', login); 
router.post('/verify-email', verifyEmail); 
router.post('/login', login);
router.post('/changepassword', changePassword);


router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOTP);

module.exports = router; 