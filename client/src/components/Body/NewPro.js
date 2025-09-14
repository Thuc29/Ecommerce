import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductModal from "../Product/ProductModal"; // Import the modal component
import axios from "axios";
import { showError } from "../../utils/sweetAlert";
import { FaStar } from "react-icons/fa6";
import Feature from "./Feature";

function NewPro() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch new products
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8888/api/products/by-time?limit=8&sortBy=createdAt&sortOrder=desc"
        );
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching new products:", err.message);
        setError("Failed to load products");
        setLoading(false);
        showError(
          "Failed to Load Products",
          "Could not load new products. Please try again."
        );
      }
    };

    fetchNewProducts();
  }, []);

  // Fetch trending products
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setTrendingLoading(true);
        const response = await axios.get(
          "http://localhost:8888/api/products/trending?limit=6"
        );
        setTrendingProducts(response.data.data);
        setTrendingLoading(false);
      } catch (err) {
        console.error("Error fetching trending products:", err.message);
        setTrendingLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

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
      <section className="mx-auto w-full max-w-[1270px] px-4 mb-3 z-10">
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
              className="mt-[10%] lg:w-[270px] "
              data-aos="zoom-in"
              data-aos-offset="100"
              data-aos-delay="400"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Trending Products
              </h3>
              <div className="flex flex-col border p-2 rounded-xl gap-3">
                {trendingLoading && (
                  <div className="text-center text-gray-500 py-4">
                    Loading trending products...
                  </div>
                )}
                {!trendingLoading && trendingProducts.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No trending products available
                  </div>
                )}
                {!trendingLoading &&
                  trendingProducts.map((product, index) => (
                    <div
                      key={product._id || index}
                      className="flex justify-between items-center py-1 px-2 border rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => handleOpenModal(product)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={
                            product.images && product.images[0]
                              ? product.images[0].url
                              : "/assets/placeholder.jpg"
                          }
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover flex-shrink-0"
                        />

                        <div className="min-w-0">
                          <span className="text-gray-800 font-semibold text-sm truncate block">
                            {product.name}
                          </span>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(Math.round(product.rating || 0))].map(
                              (_, i) => (
                                <span
                                  key={i}
                                  className="text-yellow-400 text-xs"
                                >
                                  <FaStar className="text-yellow-400 text-xs" />
                                </span>
                              )
                            )}
                            <span className="text-gray-500 text-xs">
                              {product.rating || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <span className="text-red-500 font-semibold text-sm">
                          ${product.price.toFixed(0)}
                        </span>
                        {product.oldPrice > 0 && (
                          <span className="line-through text-gray-400 text-xs">
                            ${product.oldPrice.toFixed(0)}
                          </span>
                        )}
                        {product.salesCount > 0 && (
                          <span className="text-gray-300 text-xs">
                            {product.salesCount} sold
                          </span>
                        )}
                      </div>
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
                {loading && (
                  <div className="col-span-full text-center text-gray-600 py-8">
                    Loading...
                  </div>
                )}

                {!loading &&
                  !error &&
                  products.map((product, index) => (
                    <div
                      key={product._id || index}
                      onClick={() => handleOpenModal(product)}
                      className="cursor-pointer"
                    >
                      <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
                        <div className="aspect-[3/4] lg:h-[300px] w-full overflow-hidden">
                          <img
                            src={
                              product.images && product.images[0]
                                ? product.images[0].url
                                : "/assets/placeholder.jpg"
                            }
                            alt={product.name}
                            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-2 left-2 flex flex-row justify-between gap-1">
                            <span className="bg-[#2bbff9c4] max-w-[70%]  text-white text-center text-xs font-bold p-1 rounded">
                              {product.oldPrice && product.price
                                ? `${Math.round(
                                    ((product.oldPrice - product.price) /
                                      product.oldPrice) *
                                      100
                                  )}%`
                                : "19%"}
                            </span>
                            <span className="bg-[#27fc18] text-white text-xs font-bold px-2 py-1 rounded">
                              New
                            </span>
                          </div>
                          {/* Quick Action Buttons */}
                          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              className="p-2 bg-white border rounded-full hover:bg-[#2bbef9] hover:text-white transition-all duration-300"
                              onClick={() => handleOpenModal(product)}
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
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <Link
                            to={`/product/${product._id}`}
                            className="hover:bg-teal-300 transition-all duration-300 hover:text-white"
                          >
                            <h4 className="text-base font-semibold text-white truncate">
                              {product.name}
                            </h4>
                          </Link>

                          {/* New Product Badge */}
                          {product.timeInfo && (
                            <div className="flex items-center gap-2 mt-1 mb-1">
                              {product.timeInfo.isNew && (
                                <span className="text-[8px] font-bold text-[#00ff40] bg-green-600 px-2 py-1 rounded">
                                  NEW
                                </span>
                              )}
                              {product.timeInfo.daysAgo === 0 && (
                                <span className="text-[8px] font-bold text-[#ff6b6b] bg-red-600 px-2 py-1 rounded">
                                  TODAY
                                </span>
                              )}
                              {product.timeInfo.daysAgo > 0 &&
                                product.timeInfo.daysAgo <= 7 && (
                                  <span className="text-[8px] font-bold text-[#4ecdc4] bg-teal-600 px-2 py-1 rounded">
                                    {product.timeInfo.daysAgo}D AGO
                                  </span>
                                )}
                            </div>
                          )}

                          {product.countInStock > 0 && (
                            <span className="text-[10px] font-bold text-[#27fa5cfc] mt-1 block">
                              IN STOCK
                            </span>
                          )}
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(Math.round(product.rating || 0))].map(
                              (_, i) => (
                                <span key={i} className="text-yellow-400">
                                  ★
                                </span>
                              )
                            )}
                            <span className="text-gray-200 text-sm ml-1">
                              {product.rating || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            {product.oldPrice > 0 && (
                              <span className="text-gray-400 line-through text-sm">
                                ${product.oldPrice.toFixed(0)}
                              </span>
                            )}
                            <p className="text-sm text-red-400 font-semibold">
                              ${product.price.toFixed(0)}
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
            <Feature />
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
