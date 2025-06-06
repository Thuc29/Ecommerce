import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { FaRegHeart } from "react-icons/fa6";

function ProductItem({ layout = "grid", itemView, product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        className={`mx-auto w-full md:max-w-[1270px] px-0 hover:shadow-lg hover:shadow-cyan-400 ${itemView}`}
      >
        <div
          className={`cursor-pointer md:p-2 border border-gray-200 rounded-lg flex flex-col ${
            layout === "three" || layout === "four"
              ? "items-center"
              : "md:flex-row"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg group">
            {discount > 0 && (
              <div
                className={`absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded transition-all duration-300`}
              >
                {discount}% OFF
              </div>
            )}
            <div className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 overflow-hidden rounded-lg">
              <img
                src={
                  product.images[0]?.url
                    ? product.images[0].url
                    : placeholderImage
                }
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
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
              <button className="p-2 bg-white border rounded-full hover:bg-[#2bbef9] hover:text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Product Info */}
          <div
            className={`text-start ${
              layout === "three" || layout === "four"
                ? "w-full p-2"
                : "md:ml-[30px] sm:mt-0 flex-1"
            } ${
              layout === "one"
                ? "md:mt-4 pl-[10%] text-center"
                : layout === "two" && "p-2 ml-0 text-center"
            } transition-all duration-300 ease-in-out`}
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
            <div className="flex items-start justify-start mt-2">
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
              className={`flex items-center justify-start my-2 ${
                layout === "two" || layout === "three" ? "my-1" : "my-2"
              }
               ${
                 layout === "three" || layout === "four" ? "text-sm" : ""
               } transition-all duration-300 ease-in-out`}
            >
              <span className="text-gray-400 line-through text-sm mr-2">
                ${product?.oldPrice?.toFixed(2)}
              </span>
              <span
                className={`text-red-500 font-semibold text-lg ${
                  layout === "two" && "text-base"
                } ${
                  layout === "three" || layout === "four" ? "text-sm" : ""
                } transition-all duration-300 ease-in-out`}
              >
                ${product?.price?.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            {layout === "one" && (
              <div className="flex space-x-4 my-2">
                <button className="text-gray-500 border rounded-full px-5 py-2 flex text-[10px] items-center uppercase">
                  <FaRegHeart className="mr-1" />
                  Add to Wishlist
                </button>
                <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase">
                  Compare
                </button>
              </div>
            )}

            <button
              onClick={(e) => e.stopPropagation()}
              className={`md:mt-2 text-[#2bbef9] border border-[#2bbef9] font-medium py-2 sm:my-2 rounded-3xl hover:bg-[#2bbef9] hover:text-white transition-colors ${
                layout === "one"
                  ? "sm:w-full md:w-1/3"
                  : layout === "two" && "w-full"
              } ${layout === "three" || layout === "four" ? "w-full" : ""}`}
            >
              Add to cart
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
