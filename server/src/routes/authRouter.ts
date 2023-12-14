import express from "express";
import { getCurrentUser, login, register } from "../controllers/authController";
import { auth } from "../middleware/auth";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validators/authValidation";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(registerSchema), register);
authRouter.post("/login", validateRequest(loginSchema), login);
authRouter.get("/me", auth, getCurrentUser);

export default authRouter;
