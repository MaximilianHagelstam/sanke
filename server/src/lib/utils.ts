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

export const getAvatar = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=ffffff&size=64`;
