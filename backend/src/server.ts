import express from "express";
import 'dotenv/config';

import router from "./router";
import { connectDB } from "./config/db";

const app = express();

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //sirve para recibir datos de tipo application/x-www-form-urlencoded

// Routing
app.use("/", router);

export default app;