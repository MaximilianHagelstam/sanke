import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDb } from "./config/connectDb";
import userRouter from "./routes/userRouter";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

connectDb();

app.use("/api/users", userRouter);

export default app;
