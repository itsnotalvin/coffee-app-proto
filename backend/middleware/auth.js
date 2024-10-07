const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers (Authorization: Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; // Optional chaining

  // If no token provided, send error
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user ID to the request object for later use
    req.userId = decoded.id;

    // Call next middleware or route handler
    next();
  });
};

module.exports = authMiddleware;
