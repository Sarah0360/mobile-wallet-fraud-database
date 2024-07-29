import { Router } from "express";
import { signUp, logout } from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post("/api/auth/register", signUp);

userRouter.post("/users/auth/logout", isAuthenticated, logout);

