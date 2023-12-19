import express from "express";
import { createProject, getProjects } from "../controllers/projectController";
import { auth } from "../middleware/auth";
import { validateRequest } from "../middleware/validateRequest";
import { createProjectSchema } from "../validators/projectValidation";

const projectRouter = express.Router();

projectRouter.get("/", auth, getProjects);
projectRouter.post(
  "/",
  auth,
  validateRequest(createProjectSchema),
  createProject
);

export default projectRouter;
