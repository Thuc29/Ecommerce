import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "../ProductModal/ProductModal";

function ProductItem({ layout = "grid", itemView }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Field Roast Chao Cheese Creamy Original",
      price: 19.5,
      originalPrice: 24.0,
      discount: 19, // Percent discount
      rating: 5,
      reviews: 1,
      status: "IN STOCK",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGHzjfE-wskiGXZMMtxuOFQ_0mLxGLiFz6Q&s",
    },
  ];

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div
        className={`mx-auto w-full md:max-w-[1270px] px-0 py-[2%] ${itemView}`}
      >
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => handleOpenModal(product)}
            className="cursor-pointer p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg">
              {product.discount && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="mt-4 md:ml-4 flex-1">
              <Link to={`/products/${product.name}`}>
                <h4 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h4>
              </Link>
              <p className="text-green-600 font-bold text-xs mt-1">
                {product.status}
              </p>
              <div className="flex items-center mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
                <span className="ml-1 text-gray-500 text-sm">
                  ({product.reviews})
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-400 line-through text-sm mr-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-red-500 font-semibold text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center mt-4 space-x-2">
                <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M..." />
                  </svg>
                  Add to Wishlist
                </button>
                <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M..." />
                  </svg>
                  Compare
                </button>
              </div>

              <button
                onClick={(e) => e.stopPropagation()}
                className="w-full mt-4 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
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
