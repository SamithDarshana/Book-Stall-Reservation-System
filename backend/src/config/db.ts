import mongoose from "mongoose";

const connectDB = async () => {
  const mongo_url = process.env.MONGO_URL;
  if (!mongo_url) {
    console.error("❌ MONGO_URL is not defined in environment variables");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(mongo_url);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
