import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Banner() {
  const [isAutoplay, setIsAutoplay] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    setIsAutoplay(window.innerWidth >= 1024);
  }, []);

  const swiperParams = {
    centeredSlides: true,
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1.2,
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      enabled: isAutoplay,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    modules: [Pagination, Autoplay],
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
    breakpoints: {
      1920: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      1280: {
        slidesPerView: 1.2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        if (window.innerWidth >= 1024) {
          swiperRef.current.autoplay.start();
        } else {
          swiperRef.current.autoplay.stop();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-[1270px] lg:max-h-[350px] md:max-h-[330px] sm:max-h-[250px] xs:max-h-[150px] max-h-auto px-4 lg:py-4 mx-auto relative z-1 overflow-hidden rounded-xl">
      <Swiper {...swiperParams} className="my-auto centered-slide-carousel ">
        {[1, 2, 3, 4, 10].map((num) => (
          <SwiperSlide key={num}>
            <div className="relative rounded-2xl h-full sm:h-72 md:h-80 lg:h-95 flex justify-center items-center overflow-hidden">
              <img
                src={`/assets/banner${num}.jpg`}
                alt={`banner ${num}`}
                className="w-[1000px] object-cover max-h-full rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="hidden lg:block">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-700 text-white z-10 cursor-pointer opacity-70 hover:opacity-100"
          >
            <i>
              <FaChevronLeft />
            </i>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-700 text-white z-10 cursor-pointer opacity-70 hover:opacity-100"
          >
            <i>
              <FaChevronRight />
            </i>
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default Banner;
