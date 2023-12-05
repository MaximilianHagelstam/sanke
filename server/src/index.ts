import express from "express";
import { PORT } from "./config/constants";
import logger from "./config/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  return res.json({ message: "Hello team!" });
});

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
