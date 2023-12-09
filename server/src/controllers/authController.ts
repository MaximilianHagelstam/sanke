import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";
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

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(400).json({ error: "invalid username or password" });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    return res.status(400).json({ error: "invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  logger.info(`User @${user.username} logged in`);
  return res.json({ token });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.token.id);
  return res.json({ user });
};
