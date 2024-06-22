import ApiResponse from "../handlers/response.handler.js";
import shopify from "../services/shopify.service.js";
import ApiError from "../handlers/error.handler.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
export const getProducts = async (req, res) => {
  try {
    let { limit, page } = req.query;
    limit = parseInt(limit, 10);
    page = parseInt(page, 10);
    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    let params = { limit };
    console.log(params);
    for (let i = 1; i < page; i++) {
      const products = await shopify.product.list(params);
      params = products.nextPageParameters;

      if (!params) {
        throw new ApiError(404, "No more products found");
      }
    }

    const products = await shopify.product.list(params);

    if (products && products.length > 0) {
      const totalProducts = await shopify.product.count();
      ApiResponse.success(res, 200, "Products found successfully", {
        count: totalProducts,
        products,
      });
    } else {
      throw new ApiError(404, "No products found");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await shopify.product.get(id);
    if (!product) {
      throw new ApiError(404, "No more products found");
    }
    return ApiResponse.success(res, 200, "Product found successfully", product);
  } catch (err) {
    return ApiResponse.error(
      res,
      err.message || "Internal Server Error",
      err.statusCode || 500,
    );
  }
};

export const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { quantity, variant } = req.body;

    if (!id) {
      throw new ApiError(400, "Product ID is required!");
    }

    const product = await shopify.product.get(id);
    if (!product) {
      throw new ApiError(404, "Product not found!");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [
          {
            id: product.id,
            quantity: quantity || 1,
            variant: variant || product.variants[0].id,
          },
        ],
      });
    } else {
      console.log("users cart found", cart);
      const productIndex = cart.products.findIndex((p) => p.id === id);
      console.log(productIndex);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity || 1;
      } else {
        cart.products.push({
          id: product.id,
          quantity: quantity || 1,
          variant: variant || product.variants[0].id,
        });
      }
    }

    await cart.save();

    return ApiResponse.success(
      res,
      200,
      "Product added to cart successfully",
      cart,
    );
  } catch (error) {
    return ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};
