import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "@mui/material";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import ProductZoom from "./ProductZoom";
import QuantityBox from "./QuantityBox";

const ProductModal = ({ isOpen, product, onClose }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !product) return null;

  // Calculate discount safely
  const discount =
    product?.price && product?.oldPrice
      ? (((product.oldPrice - product.price) / product.oldPrice) * 100).toFixed(
          0
        )
      : 0;

  return (
    <div className="fixed inset-0 flex pt-3 items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-start sm:w-3/4 sm:p-5 h-[95%] lg:pt-[50px] md:p-16 rounded-lg relative overflow-y-auto scrollbar-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 bg-gray-100 rounded-full px-2 py-1 mx-auto hover:text-black"
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
        </div>
        <p className="text-gray-500 mb-7 flex items-center gap-4">
          <span>
            Brand:{" "}
            <span className="font-semibold">{product.brand || "ABC"}</span>
          </span>
          <span>|</span>
          <span className="flex items-center">
            <Rating
              readOnly
              value={product.rating || 5}
              size="small"
              precision={0.5}
              className="pr-1"
            />
            <span className="font-semibold">Review</span>
          </span>
          <span>|</span>
          <span>
            SKU: <span className="font-semibold">{product.sku || "ABC"}</span>
          </span>
        </p>
        <hr />
        <div className="lg:flex">
          <div className="w-full lg:w-6/12">
            <ProductZoom
              images={product.images || []}
              discount={parseFloat(discount)}
            />
          </div>
          <div className="w-full lg:w-6/12 mt-4 md:mt-0 flex flex-col px-10 md:justify-start pt-6">
            <div className="flex items-center mb-2">
              <span className="text-gray-500 text-[19px] line-through ml-2">
                ${product.oldPrice ? product.oldPrice.toFixed(2) : "N/A"}
              </span>
              <span className="text-red-600 text-[26px] font-bold px-3">
                ${product.price ? product.price.toFixed(2) : "N/A"}
              </span>
            </div>
            <p className="text-[#00b853] font-semibold mb-4 text-[12px] bg-[#e5f8ed] rounded-full max-w-[80px] px-3 py-1">
              {product.status || "In Stock"}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <QuantityBox />
              <button className="ml-4 hover:bg-[#2bbef9] hover:text-white border border-[#2bbef9] text-[#2bbef9] font-semibold px-10 py-3 rounded-full">
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
                  <strong>Type:</strong> {product.type || "N/A"}
                </p>
                <p>
                  <strong>MFG:</strong> {product.manufactureDate || "N/A"}
                </p>
                <p>
                  <strong>LIFE:</strong> {product.shelfLife || "30 days"}
                </p>
              </div>
              <hr />
              <div className="mt-5">
                <p>
                  <strong>Category:</strong>{" "}
                  {product.category?.name || product.category?.["_id"] || "N/A"}
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
