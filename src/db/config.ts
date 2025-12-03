import { log } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  try {
    await mongoose
      .connect(mongoURI)
      .then(() => console.log("✅ Connected to MongoDB Atlas"))
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
      });
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}
