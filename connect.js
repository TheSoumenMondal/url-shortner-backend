import mongoose from "mongoose";

export default async function connectDB(mongoDBconnectionURL) {
  try {
    await mongoose.connect(mongoDBconnectionURL);
    console.log("MongoDB connection succeeded");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}
