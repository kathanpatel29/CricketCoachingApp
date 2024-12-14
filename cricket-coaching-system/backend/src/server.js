import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import coachRoutes from './routes/coachRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true })); // Enable CORS with frontend URL
app.use(express.json()); // Middleware to parse incoming JSON requests

// Route definitions
app.use('/api/auth', authRoutes); // Authentication routes (Register, Login, Admin Login, Current User)
app.use('/api/coaches', coachRoutes); // Coach-related routes
app.use('/api/appointments', appointmentRoutes); // Appointment-related routes
app.use('/api/reviews', reviewRoutes); // Review-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes (protected by adminAuth)
app.use('/api/payments', paymentRoutes); // Payment-related routes

// Error handling middleware (last middleware)
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
