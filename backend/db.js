import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Helper function to build the MongoDB URI from individual environment variables
export function getMongoURI() {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;
  return `mongodb://${host}:${port}/${dbName}`;
}

// Main connection function
// Uses process.env.MONGO_URI if available, otherwise falls back to getMongoURI()
export default async function connectDB() {
  // Use MONGO_URI if provided; otherwise, call getMongoURI()
  const uri = process.env.MONGO_URI || getMongoURI() || "mongodb://127.0.0.1:27017/recipeDB";
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
    // Instead of connection.db(), use mongoose.connection.getClient().db()
    return mongoose.connection.getClient().db();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
