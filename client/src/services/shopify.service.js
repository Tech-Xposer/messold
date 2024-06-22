// src/services/cartService.js
import axios from "axios";

const getCartItems = async () => {
	try {
		const response = await axios.get("/api/v1/cart");
		return response.data;
	} catch (error) {
		console.error("Error fetching cart items:", error);
		throw error;
	}
};

export const removeItemFromCart = async (productId) => {
	try {
		const response = await axios.delete(`/api/v1/cart/remove/${productId}`);
    return response
	} catch (error) {
		console.error("Error fetching cart items:", error);
		throw error;
	}
};

export default getCartItems;
