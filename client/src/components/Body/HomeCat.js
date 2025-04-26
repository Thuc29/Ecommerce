import React, { useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Function to generate a random hex color
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function HomeCat() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 8,
    centerMode: true,
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
      {
        breakpoint: 375,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="mx-auto w-full max-w-[1270px] px-4 py-3 lg:py-3 rounded-xl">
      <div className="container">
        <div className="flex items-center justify-between mb-5 group">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Categories
          </h2>

          {/* Button container aligned to end */}
          <div className="flex space-x-2">
            {/* Previous Arrow Button */}
            <button
              className="bg-white p-1 border rounded-full cursor-pointer shadow-lg hover:bg-[#2bbef9] transition-colors duration-200"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <IoIosArrowBack className="text-2xl text-[#2bbef9] hover:text-white" />
            </button>

            {/* Next Arrow Button */}
            <button
              className="bg-white border p-1 rounded-full cursor-pointer shadow-lg hover:bg-[#2bbef9] transition-colors duration-200"
              onClick={() => sliderRef.current.slickNext()}
            >
              <IoIosArrowForward className="text-2xl text-[#2bbef9] hover:text-white" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg h-[220px] rounded-lg overflow-hidden relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              {/* Random gradient background */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `linear-gradient(to top, ${generateRandomColor()}, transparent)`,
                }}
              ></div>
              <img
                className="w-full h-40 object-cover transition-all duration-300 ease-in-out transform hover:scale-110"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGHzjfE-wskiGXZMMtxuOFQ_0mLxGLiFz6Q&s"
                alt="Red Apple"
              />
              <div className="absolute bottom-0 left-0 right-0 pb-4">
                <h4 className="text-base font-medium text-white text-center">
                  Red Apple
                </h4>
                <p className="text-center text-white text-xs">54 Items</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default HomeCat;
