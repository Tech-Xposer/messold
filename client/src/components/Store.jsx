import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Store = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const getProducts = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/products?page=${currentPage}&limit=6`
			);
			setProducts(data.data.products);
			console.log("Fetched products:", data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		getProducts();
	}, [currentPage]);

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{products.length > 0 ? (
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<div>No products found</div>
				)}
			</div>
			<nav className="flex justify-between">
				<button
					onClick={() => {
						if (currentPage > 0) setCurrentPage(currentPage - 1);
					}}
					className="bg-black text-white p-2 rounded-xl">
					Prev.
				</button>
				<button
					onClick={() => {
						setCurrentPage(currentPage + 1);
					}}
					className="bg-black text-white p-2 rounded-xl">
					Next
				</button>
			</nav>
		</div>
	);
};

export default Store;
