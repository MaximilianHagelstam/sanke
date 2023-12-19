import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/constants";
import logger from "../lib/logger";
import { getAvatar } from "../lib/utils";
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
  const avatar = getAvatar(username);

  const user = await User.create({
    username,
    password: passwordHash,
    avatar,
    displayName: username,
  });

  logger.info(`Registered user @${user.username}`);
  return res.status(201).json({ user });
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
  if (!user) return res.status(401).json({ error: "unauthorized" });
  return res.json({ user });
};
