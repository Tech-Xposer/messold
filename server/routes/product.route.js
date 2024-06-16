import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";

const productRoute = express.Router();
productRoute.get("", getProducts);
productRoute.get("/:id", getProductById);

export default productRoute;
