import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected successfully");
    } catch (err) {
        console.log("DB CONNECTION ISSUES");
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;