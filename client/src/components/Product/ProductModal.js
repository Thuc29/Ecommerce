import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from "@mui/material";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import ProductZoom from "./ProductZoom";
import QuantityBox from "./QuantityBox";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatCurrency } from "../../services/api";

const ProductModal = ({ isOpen, product, onClose }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 768);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileView]);

  // Reset quantity when modal opens with new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.countInStock <= 0) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
      setQuantity(1);
    } finally {
      setIsAddingToCart(false);
    }
  };

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
              {product.oldPrice > 0 && (
                <span className="text-gray-500 text-base line-through ml-2">
                  {formatCurrency(product.oldPrice)}
                </span>
              )}
              <span className="text-red-600 text-[22px] font-bold px-3">
                {formatCurrency(product.price)}
              </span>
            </div>
            <p className="text-[#00b853] font-semibold mb-4 text-[12px] bg-[#e5f8ed] rounded-full max-w-[80px] px-3 py-1">
              {product.status || "In Stock"}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <QuantityBox
                quantity={quantity}
                onQuantityChange={setQuantity}
                min={1}
                max={product.countInStock || 99}
                disabled={product.countInStock <= 0}
              />
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.countInStock <= 0}
                className={`ml-4 font-semibold px-10 py-3 rounded-full flex items-center transition-colors ${
                  product.countInStock <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
                    : isInCart(product._id)
                    ? "bg-emerald-500 text-white border border-emerald-500 hover:bg-emerald-600"
                    : "hover:bg-[#2bbef9] hover:text-white border border-[#2bbef9] text-[#2bbef9]"
                } disabled:opacity-50`}
              >
                <FaShoppingCart className="mr-2" />
                {isAddingToCart
                  ? "Adding..."
                  : product.countInStock <= 0
                  ? "Out of Stock"
                  : isInCart(product._id)
                  ? `In Cart (${getItemQuantity(product._id)})`
                  : "Add to cart"}
              </button>
            </div>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleWishlistToggle}
                className={`border rounded-full px-5 py-2 flex text-xs items-center uppercase transition-all duration-300 ${
                  isInWishlist(product._id)
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "text-gray-500 border-gray-300 hover:border-red-400 hover:text-red-500"
                }`}
              >
                {isInWishlist(product._id) ? (
                  <>
                    <FaHeart className="mr-1" />
                    In Wishlist
                  </>
                ) : (
                  <>
                    <FaRegHeart className="mr-1" />
                    Add to Wishlist
                  </>
                )}
              </button>
              <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase hover:border-[#2bbef9] hover:text-[#2bbef9] transition-all duration-300">
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
