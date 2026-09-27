import { User } from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";


const register = async (req,res) =>{

    const {userName, email,password} = req.body;

    if(!userName || !email || !password){
        throw new Error("All fields are required");
    }

    const userExists = await User.findOne({
        $or: [
            {userName: userName},
            {email: email}
        ]
    })

    if(userExists){
        throw new Error("User already exists");
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })

    
}

export {register};