import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB) {
  throw new Error("MONGODB environment variable is not set");
}

const config = {
  mongodb: process.env.MONGODB,
};

export default config;