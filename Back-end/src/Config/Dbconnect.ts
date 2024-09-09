import dotenv from "dotenv";
import mongoose from "mongoose";
//load environment varibales here from .env
dotenv.config();
const connectDB = async () => {
  try {
    const dbUri = process.env.DATABASE;
    if (!dbUri) {
      throw new Error("DATABASE environment variable is not defined");
    }
    await mongoose.connect(dbUri);
    console.log("+++++++database connected++++++++");
  } catch (err: any) {
    console.log(err.message);
  }
};

export default connectDB;
