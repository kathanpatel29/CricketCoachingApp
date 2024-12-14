import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }, // Store salt along with the hashed password
  role: { type: String, required: true, enum: ['admin', 'coach', 'player'] },
  expertise: { type: String }, // Optional, only for coaches
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
