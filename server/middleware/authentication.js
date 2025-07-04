const jwt = require('jsonwebtoken');

// Middleware to authenticate using Authorization header
const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.headers['authorization']; // Header key is case-insensitive
  
  // Check if the header exists and follows the "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed: No valid Authorization header provided'
    });
  }

  // Extract the token (remove "Bearer " prefix)
  const token = authHeader.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed: Token missing'
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach decoded user data to the request object
    // req.user = decoded.user;
    req.user= decoded
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors (e.g., invalid or expired token)
    return res.status(401).json({
      success: false,
      message: 'Authentication failed: Invalid or expired token'
    });
  }
};

module.exports = authMiddleware;