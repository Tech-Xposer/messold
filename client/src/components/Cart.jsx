// src/components/Cart.js
import React, { useEffect, useState } from "react";
import getCartItems, {
	removeItemFromCart,
} from "../services/shopify.service.js";
import CartCard from "./CartCard.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLoggegIn from "../services/auth.service.js";
const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const {isLoggedIn, setIsLoggedIn}  = useLoggegIn()
	const navigate = useNavigate();
	useEffect(() => {

		fetchCartItems();
	}, [isLoggedIn]);
	const handleRemove = async (productId) => {
		try {
			const data = await removeItemFromCart(productId);
			console.log(data);
			setCartItems(cartItems.filter((item) => item.id !== productId));
		} catch (err) {
			console.log(err);
			toast.error(err.response);
		}
	};
	const fetchCartItems = async () => {
		try {
			const data = await getCartItems();
			setCartItems(data.data.products); // Adjust according to the structure of your response
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				toast.error("Please Login First!");
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			}
		} finally {
			setLoading(false);
		}
	};
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="cart-container">
			<h2>Your Cart</h2>
			{cartItems.length === 0 ? (
				<div>Your cart is empty.</div>
			) : (
				<ul>
					{cartItems.map((item) => (
						<li key={item.shopifyProduct.id}>
							<CartCard product={item} onRemove={handleRemove} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Cart;
