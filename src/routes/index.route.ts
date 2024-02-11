import express from "express";
import userRoutes from "./user.route";

const app = express();

app.use("/user", userRoutes);

export default app;
