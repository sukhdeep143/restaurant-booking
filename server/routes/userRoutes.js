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

