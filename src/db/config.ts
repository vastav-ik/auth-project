import { log } from "console";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI as string);

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully.");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
}
