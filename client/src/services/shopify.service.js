// src/services/cartService.js
import axios from "axios";

const getCartItems = async () => {
	try {
		const response = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/v1/cart`,{
			withCredentials:true
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching cart items:", error);
		throw error;
	}
};

export const removeItemFromCart = async (productId) => {
	try {
		const response = await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/api/v1/cart/remove/${productId}`,
			{
				withCredentials:true
			}
		);
    return response
	} catch (error) {
		console.error("Error fetching cart items:", error);
		throw error;
	}
};

export default getCartItems;
