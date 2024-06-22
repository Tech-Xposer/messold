import express from "express";
import {  getCartItems, removeItemFromCart } from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import ApiResponse from "../handlers/response.handler.js";

const cartRoute = express.Router();
cartRoute.get("/", authMiddleware, getCartItems);
cartRoute.delete("/remove/:id", authMiddleware, removeItemFromCart)

export default cartRoute;
