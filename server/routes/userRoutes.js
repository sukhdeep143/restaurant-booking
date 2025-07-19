// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Get all users
// router.get('/', async (req, res) => {
//   const users = await User.find({}, 'username email mobile');
//   res.json(users);
// });

// // Update user
// router.put('/:id', async (req, res) => {
//   const { username, email, mobile } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(
//     req.params.id,
//     { username, email, mobile },
//     { new: true }//   );
//   res.json(updatedUser);
// });

// // Delete user
// router.delete('/:id', async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: 'User deleted successfully' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();


const protect = require('../middleware/authMiddleware');

const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} = require('../controllers/userController');



router.get('/', protect, getUserProfile);
router.put('/', protect, updateUserProfile);
router.put('/password', protect, updateUserPassword);
router.delete('/', protect, deleteUserAccount);

const User = require('../models/UserModel');

router.get('/test-user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

