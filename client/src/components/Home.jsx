import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/featured/img1.jpg";
import img2 from "../assets/featured/img2.webp";
import img3 from "../assets/featured/img3.webp";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true
  };

  const images = [img1, img2, img3];

  return (
    <div className="flex flex-col h-screen items-center">
      <Slider {...settings} className="w-full relative top-12">
        {images.map((img, index) => (
          <div key={index} className="relative items-center">
            <img src={img} alt={`Image ${index + 1}`} className=" mx-auto object- w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-bold text-white opacity-80 text-center">
                Handpicked Quality, <br /> Just for You
              </span>
            </div>
          </div>
        ))}
      </Slider>
      <div className="  text-center w-full">

      </div>
    </div>
  );
};

export default Home;
