import bcrypt from "bcrypt";
import { Request, Response } from "express";
import logger from "../config/logger";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const userWithSameUsername = await User.findOne({ username });
  if (userWithSameUsername) {
    return res.status(400).json({ error: "username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: passwordHash,
  });

  logger.info(`Registered user @${user.username}`);
  return res.status(201).json({
    user: {
      id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};
