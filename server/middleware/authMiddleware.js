const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
console.log("✅ Decoded userId:", decoded.userId)
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      console.error('JWT error:', error.message);
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
};

module.exports = protect;
