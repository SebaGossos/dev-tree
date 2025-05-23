import express from "express";
import router from "./router";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //sirve para recibir datos de tipo application/x-www-form-urlencoded

// Routing
app.use("/", router);

export default app;