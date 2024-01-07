const mongoose = require("mongoose");
const env = require("../config/envConfig");
const connectDatabase = async () => {
  try {
    const mongoURI =
      env.MONGODB_URI ||
      "mongodb+srv://koushik:koushik@employeedatabase.uqho6xi.mongodb.net/authdetails?retryWrites=true&w=majority";
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
