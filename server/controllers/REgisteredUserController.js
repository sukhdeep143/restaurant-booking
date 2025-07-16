const RegisteredUser = require('../models/RegisteredUserModel');

// Get all registered users
const getAllRegisteredUsers = async (req, res) => {
  try {
    const users = await RegisteredUser.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// Get single user by ID
const getRegisteredUserById = async (req, res) => {
  try {
    const user = await RegisteredUser.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update user
const updateRegisteredUser = async (req, res) => {
  try {
    const updatedUser = await RegisteredUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete user
const deleteRegisteredUser = async (req, res) => {
  try {
    const deletedUser = await RegisteredUser.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  getAllRegisteredUsers,
  getRegisteredUserById,
  updateRegisteredUser,
  deleteRegisteredUser,
};
