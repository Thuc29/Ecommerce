import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios"; // Import Axios
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCat() {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-6ssp.onrender.com/api/category/with-count"
        );
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 8, // Reduced to match the image (5 visible cards)
    centerMode: false, // Disabled centerMode for even spacing
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 8 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <section
      className="mx-auto w-full max-w-[1270px] px-4 py-3 lg:py-3 rounded-xl relative"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/wave-pattern.png')`, // Wave-like background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#2bbef9", // Dark purple background to match the image
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between mb-5 group">
          <h2 className="text-2xl font-bold text-white">Featured Categories</h2>
          <div className="flex space-x-2">
            <button
              className="bg-white p-1 border rounded-full cursor-pointer shadow-lg hover:bg-[#2bbef9] transition-colors duration-200"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <IoIosArrowBack className="text-2xl text-[#2bbef9] hover:text-white" />
            </button>
            <button
              className="bg-white border p-1 rounded-full cursor-pointer shadow-lg hover:bg-[#2bbef9] transition-colors duration-200"
              onClick={() => sliderRef.current.slickNext()}
            >
              <IoIosArrowForward className="text-2xl text-[#2bbef9] hover:text-white" />
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-center text-white">Loading categories...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <Slider ref={sliderRef} {...settings} className="px-1">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className="px-2" // Added padding for spacing between cards
              >
                <div className="bg-white bg-opacity-80 shadow-lg h-[200px] rounded-xl overflow-hidden relative flex flex-col items-center justify-between cursor-pointer hover:scale-95">
                  <img
                    className="w-full h-30 object-contain p-5"
                    src={
                      category.images && category.images.length > 0
                        ? category.images[0]
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGHzjfE-wskiGXZMMtxuOFQ_0mLxGLiFz6Q&s"
                    }
                    alt={category.name}
                  />
                  <div className="flex-1 flex flex-col items-center justify-center pb-4 relative">
                    <h4 className="text-lg font-semibold text-gray-800 text-center relative">
                      {category.name}
                      {/* Add badge for "Coffee" category */}
                      {category.name.toLowerCase() === "coffee" && (
                        <span className="absolute -top-2 -right-8 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          0
                        </span>
                      )}
                    </h4>
                    <p className="text-center text-gray-600 text-sm mt-1">
                      {category?.productCount ?? 0} Items
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default HomeCat;
