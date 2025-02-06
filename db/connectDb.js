import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully ✅");
  } catch (error) {
    console.error("Failed to connect to MongoDB 🔴⚠️", error);
    console.error("Exiting process due to MongoDB connection failure ❌");
    process.exit(1);
  }
}
