import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import ProductModal from "../Product/ProductModal";

function Feature() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8888/api/products/featured?limit=4&sortBy=createdAt&sortOrder=desc"
        );
        setProducts(res.data.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  var productSlider = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    nextArrow: (
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10">
        <IoIosArrowForward className="text-gray-800 text-2xl border rounded-full p-1 hover:bg-gray-500 hover:text-white" />
      </div>
    ),
    prevArrow: (
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10">
        <IoIosArrowBack className="text-gray-800 text-2xl border rounded-full p-1 hover:bg-gray-500 hover:text-white" />
      </div>
    ),
  };

  return (
    <>
      <section className="mx-auto w-full max-w-[1270px] my-5 z-10">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
          <div className="w-full ">
            <div className="md:mt-[4%] lg:mt-0 sm:mt-7 mt-7">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Featured Products
                  </h3>
                  <p className="text-sm capitalize text-gray-500">
                    Featured products with updated stocks.
                  </p>
                </div>
                <Link
                  to="/featured"
                  className="w-full sm:w-auto flex justify-center text-[#2bbef9] font-semibold items-center gap-2 rounded-3xl border border-gray-400 bg-white px-4 py-2 transition-all duration-300 hover:bg-[#2bbef9] hover:text-white"
                >
                  View All
                  <IoIosArrowForward className="text-lg" />
                </Link>
              </div>

              <div className="w-full">
                <Slider {...productSlider}>
                  {loading && (
                    <div className="col-span-full text-center text-gray-600 py-8">
                      Loading...
                    </div>
                  )}{" "}
                  {error && (
                    <div className="col-span-full text-center text-red-500 py-8">
                      {error}
                    </div>
                  )}
                  {!loading &&
                    !error &&
                    products.map((product, index) => (
                      <div
                        key={product._id || index}
                        onClick={() => handleOpenModal(product)}
                        className="cursor-pointer px-2"
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
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              <span className="bg-[#ff04a3] text-white text-xs font-bold px-2 py-1 rounded">
                                Featured
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
                </Slider>
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

export default Feature;
