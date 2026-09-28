import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB) {
  throw new Error("MONGODB environment variable is not set");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const config = {
  mongodb: process.env.MONGODB,
  jwt_secret : process.env.JWT_SECRET
};

export default config;