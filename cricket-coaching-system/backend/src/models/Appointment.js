import mongoose from 'mongoose';

// Appointment schema definition
const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Client is required for each appointment
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Coach is required for each appointment
  },
  date: { 
    type: Date, 
    required: true // Date of the appointment is required
  },
  time: { 
    type: String, 
    required: true // Time of the appointment is required
  },
  duration: { 
    type: Number, 
    required: true // Duration of the appointment is required
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'confirmed', 'cancelled', 'completed'],
    default: 'available'
  }
}, { timestamps: true });

// Export the model based on the schema
export default mongoose.model('Appointment', appointmentSchema);
