const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} = require('../controllers/userController');

router.get('/', getUserProfile);             // GET profile
router.put('/', updateUserProfile);          // Update profile info
router.put('/password', updateUserPassword); // Change password
router.delete('/', deleteUserAccount);       // Delete account

module.exports = router;
