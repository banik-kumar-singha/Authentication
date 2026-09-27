import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"; // Import all controllers as authController e.g authController.register
// import { register } from "../controllers/auth.controller.js";


const Authrouter = Router();


Authrouter.post("/register", authController.register);


export default Authrouter;