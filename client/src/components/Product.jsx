import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";

const Product = () => {
	const { id } = useParams();
	const variantSizes = ["S", "M", "L", "XL", "XXl", "XXXL", "3XL"];
	const [productDetails, setProductDetails] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [currentVariant, setCurrentVariant] = useState("S");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	const slider1 = useRef(null);
	const slider2 = useRef(null);

	const getProductDetails = async (id) => {
		try {
			const ENDPOINT = `/api/v1/products/${id}`;
			const response = await axios.get(ENDPOINT);
			setProductDetails(response.data.data);
			setLoading(false);
		} catch (error) {
			setError("Failed to fetch product details.");
			setLoading(false);
		}
	};

	useEffect(() => {
		getProductDetails(id);
		setNav1(slider1.current);
		setNav2(slider2.current);
	}, [id]);

	const settingsMain = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: nav2,
		ref: slider1,
		centerMode: true,
	};

	const settingsThumbs = {
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: nav1,
		focusOnSelect: true,
		ref: slider2,
	};

	const extractDescription = (htmlContent) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlContent, "text/html");
		const firstPTag = doc.querySelector("p");
		return firstPTag ? firstPTag.innerText : "";
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const description = productDetails
		? extractDescription(productDetails.body_html)
		: "";

	const handleAddToCartClick = async () => {
		try {
			console.log(id);
			const response = await axios.post(`/api/v1/products/addtocart/${id}`, {
				quantity: quantity,
				variant: currentVariant,
			});
			if (response.status === 200) {
				console.log("Product added to cart successfully", response.data);
				toast.success("Product added to cart successfully");
			}
		} catch (error) {
			console.log("Error adding product to cart", error.response.data);
			toast.error(error.response.data.error);
		}
	};

	return (
		<div className="flex flex-col w-full h-full p-4">
			<div className="flex flex-col md:flex-row w-full h-full p-4">
				<div className="container p-4 w-full md:w-1/2">
					{/* Main slider */}
					{productDetails && productDetails.images && (
						<div className="space-y-6">
							<Slider {...settingsMain}>
								{productDetails.images.map((image, index) => (
									<div key={index} className="relative w-full">
										<img
											src={image.src}
											alt={productDetails.title}
											className="w-full object-contain h-[500px]"
										/>
									</div>
								))}
							</Slider>
							<Slider {...settingsThumbs}>
								{productDetails.images.map((image, index) => (
									<div key={index} className="relative w-full p-2">
										<img
											src={image.src}
											alt={`Thumbnail ${index}`}
											className="w-20 h-20 object-cover cursor-pointer"
										/>
									</div>
								))}
							</Slider>
						</div>
					)}
				</div>
				<div className="w-full md:w-1/2 p-4 flex flex-col">
					<h1 className="text-3xl font-bold mb-4">{productDetails.title}</h1>
					<p className="text-sm text-gray-700 mb-4">
						SKU: {productDetails.variants[0].sku}
					</p>
					<p className="text-xl text-gray-700 mb-4">{description}</p>
					<p className="text-2xl font-bold text-gray-900 mb-4">
						Price: ₹{productDetails.variants[0].price}
					</p>
					{productDetails.variants[0].compare_at_price && (
						<p className="text-xl text-gray-500 line-through mb-4">
							Compare at: ₹{productDetails.variants[0].compare_at_price}
						</p>
					)}
					<div className="flex items-center mt-2">
						<p className="text-gray-600">Quantity: </p>
						<button
							className="ml-2 bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
							onClick={() => setQuantity(quantity - 1)}
							disabled={quantity <= 1}>
							-
						</button>
						<span className="mx-2">{quantity}</span>
						<button
							className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
							onClick={() => setQuantity(quantity + 1)}>
							+
						</button>
					</div>
					<div className="space-x-5 mt-5">
						<button
							className="bg-blue-500 text-white py-2 px-4 rounded"
							onClick={handleAddToCartClick}>
							Add to Cart
						</button>
						<button className="bg-blue-500 text-white py-2 px-4 rounded">
							Buy Now
						</button>
					</div>
					{productDetails.variants.length > 0 && (
						<div className="flex space-x-3 mt-5">
							Variants:
							{productDetails.variants.map((variant) => (
								<button
									key={variant.id}
									className={`${
										currentVariant === variant.title
											? "bg-blue-300"
											: "bg-gray-300"
									} text-[12px] rounded-md px-2 mx-2`}
									onClick={() => setCurrentVariant(variant.title)}>
									{variantSizes.includes(variant.title)
										? variant.title
										: variant.title.split(" ")[0]}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
			{/* Product Details */}
			<div className="p-4">
				<h2 className="text-2xl font-bold mb-4">Product Details</h2>
				<p>
					<strong>Product ID:</strong> {productDetails.id}
				</p>
				<p>
					<strong>Title:</strong> {productDetails.title}
				</p>
				<p>
					<strong>Description:</strong> {description}
				</p>
				<p>
					<strong>Category:</strong> {productDetails.product_type}
				</p>
				<p>
					<strong>Generic Name:</strong> {productDetails.product_type}
				</p>
				<p>
					<strong>Item Weight:</strong> {productDetails.variants[0].grams}{" "}
					grams.
				</p>
				<p>
					<strong>Vendor:</strong> {productDetails.vendor}
				</p>
				<p>
					<strong>Tags:</strong> {productDetails.tags}
				</p>
			</div>
			{/* Variant Details */}
			<div className="p-4 ">
				<h2 className="text-2xl font-bold mb-4">Variants</h2>
				<div className="flex justify-between">
					{productDetails.variants.map((variant) => (
						<div key={variant.id} className="mb-4 ">
							<p>
								<strong>Variant ID:</strong> {variant.id}
							</p>
							<p>
								<strong>Title:</strong> {variant.title}
							</p>
							<p>
								<strong>Price:</strong> ₹{variant.price}
							</p>
							{variant.compare_at_price && (
								<p>
									<strong>Compared Price:</strong> ₹{variant.compare_at_price}
								</p>
							)}
							<p>
								<strong>SKU:</strong> {variant.sku}
							</p>
							<p>
								<strong>Quantity:</strong> {variant.inventory_quantity}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="p-4">
				<h2 className="text-2xl font-bold mb-4">Variants</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white">
						<thead>
							<tr>
								<th className="py-2 px-4 border-b">Variant ID</th>
								<th className="py-2 px-4 border-b">Title</th>
								<th className="py-2 px-4 border-b">Price</th>
								<th className="py-2 px-4 border-b">Compared Price</th>
								<th className="py-2 px-4 border-b">SKU</th>
								<th className="py-2 px-4 border-b">Quantity</th>
							</tr>
						</thead>
						<tbody>
							{productDetails.variants.map((variant) => (
								<tr key={variant.id} className="text-center">
									<td className="py-2 px-4 border-b">{variant.id}</td>
									<td className="py-2 px-4 border-b">{variant.title}</td>
									<td className="py-2 px-4 border-b">₹{variant.price}</td>
									<td className="py-2 px-4 border-b">
										{variant.compare_at_price
											? `₹${variant.compare_at_price}`
											: "-"}
									</td>
									<td className="py-2 px-4 border-b">{variant.sku}</td>
									<td className="py-2 px-4 border-b">
										{variant.inventory_quantity}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{/* Other details */}
			<div className="p-4">
				<h2 className="text-2xl font-bold mb-4">Other Details</h2>
				<div
					className="text-gray-700 text-base"
					dangerouslySetInnerHTML={{ __html: productDetails.body_html }}></div>
			</div>
		</div>
	);
};

export default Product;
