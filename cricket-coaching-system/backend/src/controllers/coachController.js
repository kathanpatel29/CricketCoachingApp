// src/controllers/coachController.js
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

const handleError = (res, error) => res.status(500).json({ message: error.message });

export const coachController = {
  // Get all coaches
  async getAllCoaches(req, res) {
    try {
      const coaches = await User.find({ role: 'coach' })
        .select('-password')
        .sort({ createdAt: -1 });
      res.json(coaches);
    } catch (error) {
      handleError(res, error);
    }
  },

  // Get specific coach by ID
  async getCoachById(req, res) {
    try {
      const coach = await User.findOne({ 
        _id: req.params.id, 
        role: 'coach' 
      }).select('-password');
      
      if (!coach) {
        return res.status(404).json({ message: 'Coach not found' });
      }
      res.json(coach);
    } catch (error) {
      handleError(res, error);
    }
  },

  // Update coach expertise
  async updateExpertise(req, res) {
    try {
      const { expertise } = req.body;
      
      if (!expertise || !Array.isArray(expertise)) {
        return res.status(400).json({ message: 'Invalid expertise data' });
      }

      const validExpertise = ['Batting', 'Bowling', 'Fielding', 'Wicket Keeping'];
      if (!expertise.every(exp => validExpertise.includes(exp))) {
        return res.status(400).json({ message: 'Invalid expertise values' });
      }

      const coach = await User.findByIdAndUpdate(
        req.user.id,
        { expertise },
        { new: true }
      ).select('-password');

      if (!coach) {
        return res.status(404).json({ message: 'Coach not found' });
      }

      res.json(coach);
    } catch (error) {
      handleError(res, error);
    }
  },

  // Get coach profile
  async getCoachProfile(req, res) {
    try {
      const coach = await User.findOne({
        _id: req.user.id,
        role: 'coach'
      }).select('-password');

      if (!coach) {
        return res.status(404).json({ message: 'Coach profile not found' });
      }

      // Get additional stats
      const appointmentsCount = await Appointment.countDocuments({
        coach: req.user.id
      });

      const response = {
        ...coach.toObject(),
        appointmentsCount
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  },

  // Update coach profile
  async updateCoachProfile(req, res) {
    try {
      const { name, hourlyRate, expertise } = req.body;
      const updateData = {};

      if (name) updateData.name = name;
      if (hourlyRate) updateData.hourlyRate = hourlyRate;
      if (expertise) {
        const validExpertise = ['Batting', 'Bowling', 'Fielding', 'Wicket Keeping'];
        if (!expertise.every(exp => validExpertise.includes(exp))) {
          return res.status(400).json({ message: 'Invalid expertise values' });
        }
        updateData.expertise = expertise;
      }

      const coach = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
      ).select('-password');

      if (!coach) {
        return res.status(404).json({ message: 'Coach not found' });
      }

      res.json(coach);
    } catch (error) {
      handleError(res, error);
    }
  }
};