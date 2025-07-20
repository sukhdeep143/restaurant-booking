const express = require('express');
const router = express.Router();
const {
  getAllRegisteredUsers,
  getRegisteredUserById,
  updateRegisteredUser,
  deleteRegisteredUser,
} = require('../controllers/REgisteredUserController');

// Routes
router.get('/', getAllRegisteredUsers); // GET all
router.get('/:id', getRegisteredUserById); // GET single
router.put('/:id', updateRegisteredUser); // UPDATE
router.delete('/:id', deleteRegisteredUser); // DELETE

module.exports = router;
