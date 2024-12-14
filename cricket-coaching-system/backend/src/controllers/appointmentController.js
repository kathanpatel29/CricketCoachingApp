import Appointment from '../models/Appointment.js';

export const appointmentController = {
  // Create appointment for client
  async createAppointment(req, res) {
    try {
      const { coachId, date, time } = req.body;
      const appointment = new Appointment({
        client: req.user.id,
        coach: coachId,
        date,
        time,
        status: 'pending'
      });
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      console.error('Create appointment error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Create appointment slot by coach
  async createAppointmentSlot(req, res) {
    try {
      const { date, time, duration } = req.body;
      const appointment = new Appointment({
        coach: req.user.id,
        date,
        time,
        duration,
        status: 'available'
      });
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      console.error('Create appointment slot error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get appointments for client
  async getClientAppointments(req, res) {
    try {
      const appointments = await Appointment.find({ client: req.user.id })
        .populate('coach', 'name')
        .sort({ date: 1, time: 1 });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get appointments for coach
  async getCoachAppointments(req, res) {
    try {
      const appointments = await Appointment.find({ coach: req.user.id })
        .populate('client', 'name')
        .sort({ date: 1, time: 1 });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update appointment status
  async updateAppointmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get available slots
  async getAvailableAppointmentSlots(req, res) {
    try {
      const { coachId, date } = req.query;
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const availableSlots = await Appointment.find({
        coach: coachId,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: 'available'
      }).sort({ time: 1 });

      res.json(availableSlots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
