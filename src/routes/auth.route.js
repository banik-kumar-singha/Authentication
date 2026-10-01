import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"; // Import all controllers as authController e.g authController.register
// import { register } from "../controllers/auth.controller.js";


const Authrouter = Router();


Authrouter.post("/register", authController.register);

Authrouter.get("/get-me", authController.getMe); 

Authrouter.get("/reffresh-token",authController.refreshToken)


export default Authrouter;