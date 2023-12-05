import mongoose from "mongoose";
import { DB_URL } from "./constants";
import logger from "./logger";

export const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger.info("Connected to database");
  } catch (err) {
    logger.error(err);
  }
};
