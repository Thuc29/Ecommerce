import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductModal from "../ProductModal/ProductModal"; // Import the modal component

function NewPro() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample product data with unique images
  const products = [...Array(8)].map((_, index) => ({
    name: "Field Roast Chao Cheese Creamy Original",
    price: 19.5,
    originalPrice: 24.0,
    rating: 5,
    reviews: 1,
    status: "IN STOCK",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGHzjfE-wskiGXZMMtxuOFQ_0mLxGLiFz6Q&s",
  }));

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
    <section className="mx-auto w-full max-w-[1270px] px-4 mb-5 z-10">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
        {/* Left Banner Section */}
        <div className="w-full lg:w-3/12 hidden lg:block">
          <Link to="/">
            <img
              src="/assets/bannerLeft2.jpg"
              alt="Banner promotion"
              className="w-full h-[200px] lg:h-[380px] lg:w-[270px] rounded-xl object-cover shadow-md transition-all duration-300 hover:opacity-90"
            />
          </Link>
          {/* Trending Products */}
          <div
            className="mt-[10%] lg:w-[270px]"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Trending Products
            </h3>
            <div className="flex flex-col border p-3 rounded-xl gap-3">
              {[
                /* Trending products data here */
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <span className="text-gray-800 font-semibold">
                    {product.name}
                  </span>
                  <span className="text-red-500 font-semibold">
                    ${product.price.toFixed(2)}
                    <span className="line-through text-gray-400">
                      {" "}
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="w-full lg:w-9/12">
          <div className="md:mt-[4%] lg:mt-0 sm:mt-7 mt-7">
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  New Products
                </h3>
                <p className="text-sm capitalize text-gray-500">
                  New products with updated stocks.
                </p>
              </div>
              <Link
                to="/products"
                className="w-full sm:w-auto flex justify-center text-[#2bbef9] font-semibold items-center gap-2 rounded-3xl border border-gray-400 bg-white px-4 py-2 transition-all duration-300 hover:bg-[#2bbef9] hover:text-white"
              >
                View All
                <IoIosArrowForward className="text-lg" />
              </Link>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleOpenModal(product)}
                  className="cursor-pointer"
                >
                  <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-[3/4] lg:h-[300px] w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Quick Action Buttons */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="p-2 bg-white border rounded-full hover:bg-[#2bbef9] hover:text-white transition-all duration-300"
                        onClick={() => handleOpenModal(product)}>
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <Link
                        to={`/products/${product.name}`}
                        className="hover:bg-teal-300 transition-all duration-300 hover:text-white"
                      >
                        <h4 className="text-base font-semibold text-white truncate">
                          {product.name}
                        </h4>
                      </Link>
                      {product.status && (
                        <span className="text-[10px] font-bold text-green-400 mt-1 block">
                          {product.status}
                        </span>
                      )}
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(product.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                        <span className="text-gray-200 text-sm ml-1">
                          {product.reviews}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 line-through text-sm">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <p className="text-sm text-red-400 font-semibold">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="h-0 group-hover:h-[40px] transition-all duration-300 overflow-hidden">
                        <button className="w-full bg-white text-[#2bbef9] rounded-full py-2 font-medium hover:bg-[#2bbef9] hover:text-white transition-all duration-300">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banners */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            <img
              src="/assets/banner8.png"
              className="w-full cursor-pointer rounded-xl"
            />
            <img
              src="/assets/banner7.png"
              className="w-full cursor-pointer rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
     <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default NewPro;
