import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductModal = ({ isOpen, product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 768);
  const zoomSliderBig = useRef();
  const zoomslider = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goto = (index) => {
    setActiveSlide(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  if (!isOpen || !product) return null;

  const settings2 = {
    dots: false,
    infinite: false, // Prevents looping
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Enable previous and next arrows
    beforeChange: (current, next) => setActiveSlide(next),
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
    focusOnSelect: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="fixed inset-0 flex py-3 items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 sm:w-3/4 h-full lg:py-[80px] p-4 md:p-16 rounded-lg relative overflow-y-auto md:overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row items-center md:justify-between mb-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
        </div>

        <p className="text-gray-500 mb-7">
          Brand: <span className="font-semibold">{product.brand} ABC</span>{" "}
          {" | "}
          <span className="items-center">
            {" "}
            <Rating
              readOnly
              value={5}
              size="small"
              precision={0.5}
              className="mr-3"
            />
          </span>
          <span className="font-semibold"> Review{" | "}</span>
          SKU: <span className="font-semibold"> ABC</span>{" "}
        </p>
        <hr />

        <div className="flex flex-col md:flex-row md:space-x-6 md:justify-between items-start my-2">
          <div className="w-full md:w-5/12 flex justify-center md:justify-start">
            <div className="w-full h-auto overflow-hidden rounded-xl">
              <Slider
                {...settings2}
                ref={zoomSliderBig}
                className="zoomSliderBig"
              >
                <div className="overflow-hidden rounded-xl cursor-pointer">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                    className="rounded-lg w-full md:w-full h-auto"
                  />
                </div>
                <div className="overflow-hidden rounded-xl cursor-pointer">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
                    className="rounded-lg w-full md:w-full h-auto"
                  />
                </div>
                <div className="overflow-hidden rounded-xl cursor-pointer">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
                    className="rounded-lg w-full md:w-full h-auto"
                  />
                </div>
              </Slider>
              <Slider
                {...settings}
                className="zoomSlider pt-5"
                ref={zoomslider}
              >
                <div className={`item`} onClick={() => goto(0)}>
                  <img
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                    alt="Product image"
                    className="w-[110px] sm:pl-4 h-[85px] sm:h-[70px] object-cover rounded-md"
                  />
                </div>
                <div className={`item `} onClick={() => goto(1)}>
                  <img
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
                    alt="Product image"
                    className="w-[110px] sm:pl-4 h-[85px] sm:h-[70px] object-cover rounded-md"
                  />
                </div>
                <div className={`item `} onClick={() => goto(2)}>
                  <img
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
                    alt="Product image"
                    className="w-[110px] sm:pl-4 h-[85px] sm:h-[70px] object-cover rounded-md"
                  />
                </div>
              </Slider>
            </div>
          </div>

          <div className="w-full md:w-7/12 mt-4 md:mt-0 flex flex-col px-10 md:justify-start pt-6">
            <div className="flex items-center mb-2">
              <span className="text-gray-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-red-600 text-xl font-bold px-3">
                ${product.price.toFixed(2)}
              </span>
              <span className="bg-blue-100 text-blue-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded">
                23% OFF
              </span>
            </div>
            <p className="text-[#00b853] font-semibold mb-4 text-[12px] bg-[#e5f8ed] rounded-full max-w-[70px] px-2">
              {product.status}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="text-lg font-semibold px-[11px] border rounded-full bg-gray-200"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                className="w-12 text-center border border-gray-300 rounded mx-2"
                readOnly
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="text-lg font-semibold px-[11px] border rounded-full bg-gray-200"
              >
                +
              </button>
              <button className="ml-4 bg-[#2bbef9] text-white font-semibold px-10 py-3 rounded-full">
                Add to cart
              </button>
            </div>

            <div className="flex space-x-4 mb-4">
              <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase">
                <FaRegHeart className="mr-1" />
                Add to Wishlist
              </button>
              <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase">
                Compare
              </button>
            </div>

            <div className="pt-4">
              <div className="mb-5">
                <p>
                  <strong>Type:</strong> {product.type}
                </p>
                <p>
                  <strong>MFG:</strong> {product.manufactureDate}
                </p>
                <p>
                  <strong>LIFE: 30days</strong> {product.shelfLife}
                </p>
              </div>
              <hr />
              <div className="mt-5">
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Tags:</strong>{" "}
                  {product.tags ? product.tags.join(", ") : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
