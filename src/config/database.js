import config from "./config.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
//    const connection = await mongoose.connect(config.mongodb, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
 const connection = await mongoose.connect(config.mongodb);
    console.log(connection);
    
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // process.exit(1);
  }
};

export default connectDB;