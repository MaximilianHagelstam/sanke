import { Request, Response } from "express";
import mongoose from "mongoose";
import logger from "../lib/logger";
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

  logger.info(`Created project ${project.title}`);
  return res.status(201).json({ project });
};

export const deleteProject = async (req: Request, res: Response) => {
  const user = await User.findById(req.token.id);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const projectId = req.params.id;

  const isValidId = mongoose.Types.ObjectId.isValid(projectId);
  if (!isValidId) return res.status(400).json({ error: "invalid id" });

  const project = await Project.findById(projectId).populate("user");
  if (!project || project?.user?.id.toString() !== String(user.id))
    return res.status(400).json({ error: "invalid id" });

  await Project.findByIdAndDelete(project.id);

  logger.info(`Deleted project ${project.title}`);
  return res.status(204).end();
};

export const getProjectById = async (req: Request, res: Response) => {
  const user = await User.findById(req.token.id);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const projectId = req.params.id;

  const isValidId = mongoose.Types.ObjectId.isValid(projectId);
  if (!isValidId) return res.status(400).json({ error: "invalid id" });

  const project = await Project.findById(projectId).populate("user");
  if (!project || project?.user?.id.toString() !== String(user.id))
    return res.status(400).json({ error: "invalid id" });

  return res.status(200).json({ project });
};
