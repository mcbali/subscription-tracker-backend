import mongoose from "mongoose";
import { DB_URI } from "./env.js";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(DB_URI);
  isConnected = true;
};
