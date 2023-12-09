import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDb } from "./config/connectDb";
import authRouter from "./routes/authRouter";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

connectDb();

app.use("/api/auth", authRouter);

export default app;
