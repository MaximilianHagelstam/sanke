import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDb } from "./lib/utils";
import authRouter from "./routes/authRouter";
import projectRouter from "./routes/projectRouter";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

connectDb();

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

export default app;
