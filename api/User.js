// User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const DiaryEntrySchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
  backgroundColor: { type: String, default: '#1e1e1e' },
  emoji: { type: String, default: '' }  // Add emoji field
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  journals: [DiaryEntrySchema],
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
