import { useState } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Store from "./components/Store.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart.jsx";
import useLoggegIn from "./services/auth.service.js";

function App() {
	const { isLoggedIn } = useLoggegIn();
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route
					path="/login"
					element={isLoggedIn ? <Navigate to="/store" /> : <Login />}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/store" element={<Store />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
