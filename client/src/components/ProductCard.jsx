import React, { useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoPlay:true,
    autoPlaySpeed:1000
  };

  return (
    <div
      className="max-w-xs rounded overflow-hidden shadow-lg m-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white relative">
        <div className="relative">
          <img
            className={`w-full transition-transform duration-300 ${
              isHovered ? "transform scale-105" : ""
            }`}
            src={product.image.src}
            alt={product.title}
          />
          {isHovered && (
            <button className="absolute inset-0 bg-black bg-opacity-10 text-white flex justify-center items-center ">
              <Link to={`/product/${product.id}`}>Quick View</Link>
            </button>
          )}
        </div>

        <div className="text-center p-4">
          <div className="font-bold text-base mb-2">{product.title}</div>
          <p className="text-gray-900 font-bold">
            ₹{product.variants[0].price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
