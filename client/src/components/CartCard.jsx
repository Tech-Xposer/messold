import React from "react";
import { Trash } from "lucide-react";
const CartCard = ({ product, onRemove, onUpdateQuantity }) => {
	return (
		<div className="flex p-4 border-b border-gray-200 bg-white rounded-lg shadow-md">
			<div className="w-1/12">
				<img
					src={product.shopifyProduct.image?.src}
					alt={product?.title}
					className="w-full h-auto rounded-md"
				/>
			</div>
			<div className="w-3/4 pl-4 flex flex-col justify-between">
				<div>
					<h4 className="text-xl font-semibold">
						{product?.shopifyProduct.title}
					</h4>
					<p className="text-gray-600 mt-2">
						{product.shopifyProduct.body_html
							?.replace(/(<([^>]+)>)/gi, "")
							.substring(0, 100)}
						...
					</p>
					<div className="flex items-center mt-2">
						<p className="text-gray-600">Quantity: </p>
						<button
							className="ml-2 bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
							onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
							disabled={product.quantity <= 1}>
							-
						</button>
						<span className="mx-2">{product.quantity}</span>
						<button
							className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
							onClick={() =>
								onUpdateQuantity(product.id, product.quantity + 1)
							}>
							+
						</button>
					</div>
					<p className="text-gray-600 mt-1">
						Price:{" "}
						{product.shopifyProduct?.variants[0].price * product.quantity} Rs.
					</p>

					<div className="mt-2">
						<span className="text-gray-600">Variant:</span>
						<span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full ml-2">
							{product.variant}
						</span>
					</div>
				</div>
				<div className="flex justify-between items-center mt-4">
					{product.shopifyProduct.variants.some(
						(variant) =>
							variant.title === product.variant &&
							variant.inventory_quantity > product.quantity
					) ? (
						<p className="text-green-500">In Stock</p>
					) : (
						<p className="text-red-500">Out of Stock</p>
					)}
				</div>
			</div>
			<div className="">
				<button
					className="flex bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 items-center gap-1"
					onClick={() => onRemove(product.id)}>
					<Trash size={18} />
					Delete
				</button>
			</div>
		</div>
	);
};

export default CartCard;
