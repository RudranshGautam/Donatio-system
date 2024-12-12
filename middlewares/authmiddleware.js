const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach user data to request
    console.log('Decoded user:', user);  // Log entire decoded user data to see the structure
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to authorize organization
const authorizeOrganization = (req, res, next) => {
    console.log('Decoded user:', req.user);  // Log the user object to ensure it's correctly attached
    if (!req.user || req.user.role !== 'organization') {  // This is the correct check
        return res.status(403).json({ message: 'Access denied: Only organizations can create campaigns' });
    }
    
    next();
};

module.exports = { authenticateToken, authorizeOrganization };
