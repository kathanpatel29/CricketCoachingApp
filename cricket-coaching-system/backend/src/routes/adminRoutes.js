import express from 'express';
import { adminController } from '../controllers/adminController.js';  // Admin controller
import { adminAuth } from '../middleware/auth.js';  // Admin authentication middleware

const router = express.Router();

// Apply adminAuth middleware to protect all admin routes
router.use(adminAuth);

// Define routes and associate them with controller functions
router.get('/stats', adminController.getDashboardStats);  // Fetch stats for admin
router.get('/users', adminController.getUsers);  // List all users
router.delete('/users/:id', adminController.deleteUser);  // Delete a user
router.put('/coach/:id/status', adminController.updateCoachStatus);  // Update coach status

export default router;
