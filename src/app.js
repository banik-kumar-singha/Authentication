import express from "express";
import morgan from "morgan";
import Authrouter from "./routes/auth.route.js";


const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", Authrouter);

export default app;