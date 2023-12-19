import { Request, Response } from "express";
import Project from "../models/Project";
import User from "../models/User";

export const getProjects = async (req: Request, res: Response) => {
  const user = await User.findById(req.token.id);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const projects = await Project.find({ user: user.id });
  return res.status(200).json({ projects });
};

export const createProject = async (req: Request, res: Response) => {
  const user = await User.findById(req.token.id);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const title = req.body.title as string;
  const project = await Project.create({
    title,
    user: user.id,
  });

  return res.status(201).json({ project });
};
