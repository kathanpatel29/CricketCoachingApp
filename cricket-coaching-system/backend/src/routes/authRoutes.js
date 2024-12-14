import express from 'express';  // Import the Express router
import { register, login, adminLogin, getCurrentUser } from '../controllers/authController.js';  // Import authentication controller functions

const router = express.Router();  // Create an Express router instance

// Define authentication-related routes
router.post('/register', register);  // User registration route
router.post('/login', login);  // User login route
router.post('/admin-login', adminLogin);  // Admin login route
router.get('/current-user', getCurrentUser);  // Get current logged-in user info

export default router;  // Export the router to be used in the main app
