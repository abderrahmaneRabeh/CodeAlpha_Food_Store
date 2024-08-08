import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export { connectDB };
