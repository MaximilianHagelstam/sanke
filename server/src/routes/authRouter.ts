import express from "express";
import { register } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { registerSchema } from "../validators/authValidation";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(registerSchema), register);

export default authRouter;
