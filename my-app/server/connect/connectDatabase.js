const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "";
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDatabase;
