import mongoose from 'mongoose';

// Review schema definition
const reviewSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Client is required for each review
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Coach is required for each review
  },
  rating: {
    type: Number,
    required: true, // Rating is required for each review
    min: 1, // Minimum rating value
    max: 5  // Maximum rating value
  },
  comment: {
    type: String,
    required: true // Comment is required for each review
  }
}, { timestamps: true });

// Export the model based on the schema
export default mongoose.model('Review', reviewSchema);
