import express from "express";
import { connectDb } from "./config/connectDb";

const app = express();

app.use(express.json());

connectDb();

app.get("/", (_req, res) => {
  return res.json({ message: "Hello team!" });
});

export default app;
