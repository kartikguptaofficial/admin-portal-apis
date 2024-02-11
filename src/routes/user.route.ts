import express from "express";
import { catchAsync } from "../utils/catchAsync.util";
const app = express();

app.use("/");

export default app;
