import mongoose from 'mongoose';
import dotenv from "dotenv";
// Replace with your actual MongoDB connection string
//in password, use %40 for @

dotenv.config()
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
