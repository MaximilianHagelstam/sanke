import express from "express";
import { getCurrentUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);

export default userRouter;
