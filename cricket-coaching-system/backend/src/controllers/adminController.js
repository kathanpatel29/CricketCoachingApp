import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Review from '../models/Review.js';

// Helper function to handle errors and send a 500 response with the error message
const handleError = (res, error) => res.status(500).json({ message: error.message });

export const adminController = {
  // Get basic stats: total clients, total coaches, and total appointments
  async getDashboardStats(req, res) {
    try {
      // Get the counts of clients, coaches, and appointments concurrently
      const stats = await Promise.all([
        User.countDocuments({ role: 'client' }),  // Count all clients
        User.countDocuments({ role: 'coach' }),   // Count all coaches
        Appointment.countDocuments()              // Count all appointments
      ]);

      // Respond with the stats as JSON
      res.json({
        totalClients: stats[0],  // Total clients count
        totalCoaches: stats[1],  // Total coaches count
        totalAppointments: stats[2]  // Total appointments count
      });
    } catch (error) {
      // If any error occurs, handle it
      handleError(res, error);
    }
  },

  // Get a list of all users (excluding passwords) sorted by creation date
  async getUsers(req, res) {
    try {
      // Fetch all users, exclude the password field, and sort them by createdAt in descending order
      const users = await User.find().select('-password').sort({ createdAt: -1 });

      // Respond with the list of users
      res.json(users);
    } catch (error) {
      // If any error occurs, handle it
      handleError(res, error);
    }
  },

  // Delete a user (client or coach) by their ID
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      // Delete all appointments and reviews related to the user before deleting the user
      await Promise.all([
        Appointment.deleteMany({ $or: [{ client: userId }, { coach: userId }] }),  // Remove appointments related to this user (client or coach)
        Review.deleteMany({ $or: [{ client: userId }, { coach: userId }] }),        // Remove reviews related to this user (client or coach)
        User.findByIdAndDelete(userId)  // Delete the user itself from the database
      ]);

      // Respond with a success message
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      // If any error occurs, handle it
      handleError(res, error);
    }
  },

  // Update the verification status of a coach (verify/block)
  async updateCoachStatus(req, res) {
    try {
      // Find the coach by ID and update their verification status
      const coach = await User.findByIdAndUpdate(
        req.params.id,  // Find coach by ID from URL params
        { isVerified: req.body.isVerified },  // Update the 'isVerified' field with the value from the request body
        { new: true }  // Return the updated coach document
      ).select('-password');  // Exclude the password from the response

      // Respond with the updated coach data
      res.json(coach);
    } catch (error) {
      // If any error occurs, handle it
      handleError(res, error);
    }
  }
};
