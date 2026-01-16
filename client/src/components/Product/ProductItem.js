import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatCurrency } from "../../services/api";

function ProductItem({ layout = "grid", itemView, product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleOpenModal = (product) => {
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!product || product.countInStock <= 0) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product, 1);
    } finally {
      setIsAddingToCart(false);
    }
  };
  // Calculate discount percentage if oldPrice exists
  const discount =
    product?.oldPrice && product?.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  // Fallback image if product.images[0].url is missing
  const placeholderImage =
    "https://via.placeholder.com/300x400.png?text=No+Image+Available";
  if (!product) return null;
  return (
    <>
      <div
        className={`mx-auto w-full px-0 hover:shadow-lg hover:shadow-cyan-400 hover:rounded-xl ${itemView}`}
      >
        <div
          className={`cursor-pointer p-2 border border-gray-200 rounded-lg flex flex-col ${
            layout === "one" ? "md:flex-row items-start" : "items-center"
          } overflow-hidden transition-all duration-300 ease-in-out h-full`}
        >
          {/* Product Image */}
          <div
            className={`relative overflow-hidden rounded-lg group flex-shrink-0 ${
              layout === "one" ? "w-full md:w-[200px] lg:w-[240px]" : "w-full"
            }`}
          >
            {discount > 0 && (
              <div className="absolute top-2 left-2 bg-[#2bbef9] text-white text-xs font-semibold px-2 py-1 rounded transition-all duration-300 z-10">
                {discount}% OFF
              </div>
            )}
            <div className="w-full aspect-square overflow-hidden rounded-lg">
              <img
                src={
                  product.images[0]?.url
                    ? product.images[0].url
                    : placeholderImage
                }
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                className="p-2 bg-white border rounded-full hover:bg-[#2bbef9] hover:text-white transition-all duration-300"
                onClick={() => handleOpenModal(product)}
                disabled={!product}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className={`p-2 border rounded-full transition-all duration-300 ${
                  isInWishlist(product._id)
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white hover:bg-red-50 hover:border-red-400"
                }`}
              >
                {isInWishlist(product._id) ? (
                  <FaHeart className="h-5 w-5" />
                ) : (
                  <FaRegHeart className="h-5 w-5 text-red-500" />
                )}
              </button>
            </div>
          </div>
          {/* Product Info */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              layout === "one"
                ? "flex-1 md:ml-6 mt-3 md:mt-0 text-left"
                : "w-full p-2 text-center"
            }`}
          >
            <Link to={`/product/${product._id}`}>
              <h4
                className={`text-lg font-semibold text-gray-800 ${
                  layout === "two" && "text-base my-2"
                }
                ${
                  layout === "three" || layout === "four" ? "text-sm" : ""
                } transition-all duration-300 ease-in-out`}
              >
                {product?.name}
              </h4>
            </Link>
            <p
              className={`text-[#00ff40d2] font-bold text-xs mt-1 ${
                layout === "two" && "text-sm"
              }
               ${
                 layout === "three" || layout === "four" ? "text-xs" : ""
               } transition-all duration-300 ease-in-out`}
            >
              {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
            </p>
            <div
              className={`flex items-center mt-2 ${
                layout === "one" ? "justify-start" : "justify-center"
              }`}
            >
              {[...Array(Math.round(product.rating))].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
              <span className="ml-1 text-gray-500 text-sm">
                ({product.rating || 0})
              </span>
            </div>
            <div
              className={`flex items-center my-2 ${
                layout === "one" ? "justify-start" : "justify-center"
              } ${
                layout === "three" || layout === "four" ? "text-sm" : ""
              } transition-all duration-300 ease-in-out`}
            >
              {product?.oldPrice > 0 && (
                <span className="text-gray-400 line-through text-xs mr-2">
                  {formatCurrency(product?.oldPrice)}
                </span>
              )}
              <span
                className={`text-red-500 font-semibold text-base ${
                  layout === "two" && "text-sm"
                } ${
                  layout === "three" || layout === "four" ? "text-xs" : ""
                } transition-all duration-300 ease-in-out`}
              >
                {formatCurrency(product?.price)}
              </span>
            </div>

            {/* Action Buttons */}
            {layout === "one" && (
              <div className="flex space-x-4 my-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`border rounded-full px-5 py-2 flex text-[10px] items-center uppercase transition-all duration-300 ${
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
            )}

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.countInStock <= 0}
              className={`mt-2 flex items-center justify-center font-medium py-2 px-4 rounded-3xl transition-colors ${
                layout === "one" ? "w-auto" : "w-full"
              } ${
                layout === "three" || layout === "four" ? "text-sm py-1.5" : ""
              } ${
                product.countInStock <= 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
                  : isInCart(product._id)
                  ? "bg-green-500 text-white border border-green-500 hover:bg-green-600"
                  : "text-[#2bbef9] border border-[#2bbef9] hover:bg-[#2bbef9] hover:text-white"
              } disabled:opacity-50`}
            >
              <FaShoppingCart className="mr-1" />
              {isAddingToCart
                ? "Adding..."
                : product.countInStock <= 0
                ? "Out of Stock"
                : isInCart(product._id)
                ? "In Cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default ProductItem;
