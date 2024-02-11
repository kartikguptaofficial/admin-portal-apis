import express from "express";
import cors from "cors";
import { SERVER_CONFIG } from "./configs/app.config";
import serverRoutes from "./routes/index.route";

const app = express();
const appVersion = SERVER_CONFIG.VERSION;

app.use(cors());

app.use(express.json());

app.use(`/${appVersion}`, serverRoutes);

export default app;
