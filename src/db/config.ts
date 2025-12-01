import { log } from "console";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
}
