import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: [true, "User name is required"],
        unique: [true, "Email already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export { User };