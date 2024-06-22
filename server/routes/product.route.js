import express from "express";
import {
  addToCart,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productRoute = express.Router();
productRoute.get("", getProducts);
productRoute.get("/:id", getProductById);
productRoute.post("/addtocart/:id", authMiddleware, addToCart);
export default productRoute;
