import { User } from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


const register = async (req, res) => {

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        throw new Error("All fields are required");
    }

    const userExists = await User.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    })

    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    },
        config.jwt_secret,
        {
            expiresIn: "1d"
        })


    res.status(201).json({
        message: "User registered successfully",
        user : {
            id: user._id,
            userName: user.userName,
            email: user.email
        },
        token: token
    })
}


const getMe = async (req, res) => {

    // Tokens comes in the format "Bearer <token>", so we need to split the string and get the token part and then verify it using jwt.verify() method. If the token is valid, we can get the user id from the decoded token and then find the user in the database using that id.
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Token is missing"
        })
    }

    const decode = jwt.verify(token, config.jwt_secret);
    // when we create a token using jwt.sign() method where we pass the user id as the payload, it is stored in the token as a property called "id". So when we decode the token using jwt.verify() method, we can access the user id using decode.id.
    if (!decode) {
        res.status(401).json({
            message: "Token is invalid"
        })
    }

    console.log(decode);
    
    const user = await User.findById(decode.id); // when we read this line we got decode.id as undefined because we are not passing the user id as the payload when we create the token using jwt.sign() method. So we need to pass the user id as the payload when we create the token using jwt.sign() method.

    if (!user) {
        res.status(404).json({
            message: "User not found",
            
        })
    }

    res.status(200).json({
        message: "User found",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email
        }
    })

}

export { register, getMe };