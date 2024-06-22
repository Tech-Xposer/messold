import ApiError from "../handlers/error.handler.js";
import ApiResponse from "../handlers/response.handler.js";
import Cart from "../models/cart.model.js";
import shopify from "../services/shopify.service.js";

export const getCartItems = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const cart = await Cart.findOne({ user: userId }).select(
      "-createdAt -updatedAt -__v -_id",
    );
    if (!cart) {
      throw new ApiError(404, "Cart not found!");
    }

    // Fetch product details from Shopify for each product in the cart
    const updatedCart = await Promise.all(
      cart.products.map(async (product) => {
        const shopifyProduct = await shopify.product.get(product.id);
        return {
          ...product.toObject(),
          shopifyProduct,
        };
      }),
    );

    // Update the cart with detailed product information
    const detailedCart = {
      ...cart.toObject(),
      products: updatedCart,
    };

    return ApiResponse.success(
      res,
      200,
      "Cart found successfully",
      detailedCart,
    );
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const removeItemFromCart = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }
    console.log(cart);
    const updatedCart = cart.products.filter((product) => product.id !== id);
    cart.products = updatedCart;
    await cart.save();
    return ApiResponse.success(
      res,
      200,
      "Item removed from cart successfully",
      cart,
    );
  } catch (error) {
    return ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};
