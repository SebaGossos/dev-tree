import express from "express";
import 'dotenv/config';
import cors from "cors";

import router from "./router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";


//? NOTE: Connect to MongoDB
connectDB();

//? Create an Express application
const app = express();

//? Cors
app.use(cors(corsConfig))

//? Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //sirve para recibir datos de tipo application/x-www-form-urlencoded

//? Routing
app.use("/", router);

export default app;