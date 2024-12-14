import jwt from 'jsonwebtoken';
import { getAdminCredentials } from '../config/adminCredentials.js'; // Import your admin credentials

// General authentication middleware for JWT-based authentication
export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from the "Authorization" header
  if (!token) return res.status(401).json({ message: 'No token provided' });  // Check if token exists

  try {
    // Verify the token using JWT_SECRET from environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded user info to req.user
    next();  // If valid token, pass control to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });  // Handle invalid or expired tokens
  }
};

// Admin authentication middleware to check email and accessKey for admin access
export const adminAuth = (req, res, next) => {
  const { email, accessKey } = req.headers;  // Extract email and accessKey from headers
  const adminCreds = getAdminCredentials();  // Get stored admin credentials from a config file

  // Check if email and accessKey match the stored admin credentials
  if (email === adminCreds.email && accessKey === adminCreds.accessKey) {
    req.user = { role: 'admin' };  // If valid, attach admin role to req.user
    return next();  // Proceed to the next middleware/route handler
  }

  res.status(401).json({ message: 'Unauthorized. Invalid admin credentials' });  // If invalid, send a 401 Unauthorized response
};
