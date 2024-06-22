import express from "express";
import productRoute from "./product.route.js";
import userRoute from "./user.route.js";
import cartRoute from "./cart.route.js";

const router = express.Router();
router.use("/products", productRoute);
router.use("/auth", userRoute);
router.use("/cart", cartRoute)
export default router;
