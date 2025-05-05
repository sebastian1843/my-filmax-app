// pages/api/test.js
import mongoose from "mongoose";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  if (!uri) return res.status(500).json({ error: "No URI found" });

  try {
    await mongoose.connect(uri);
    return res.status(200).json({ message: "Connected to MongoDB!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
