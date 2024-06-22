import express from "express";
import {
  currentUser,
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/verify/:token", verifyEmail);
userRoute.get("/current-user", authMiddleware, currentUser);
userRoute.post("/logout",authMiddleware, logout);
export default userRoute;
