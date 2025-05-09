import React, { useRef, useState, useEffect } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";

function ProductZoom({ images = [], discount = 0 }) {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  // Log images prop for debugging
  useEffect(() => {
    console.log("ProductZoom images prop:", images);
  }, [images]);

  const goto = (index) => {
    setActiveSlide(index);
    if (zoomSlider.current && zoomSliderBig.current) {
      zoomSlider.current.slickGoTo(index);
      zoomSliderBig.current.slickGoTo(index);
    }
  };

  // Normalize images array to ensure it contains objects with url
  const normalizeImages = (imgData) => {
    if (!imgData || imgData.length === 0) {
      return [
        {
          url: "https://via.placeholder.com/300x400.png?text=No+Image+Available",
        },
      ];
    }
    if (typeof imgData === "string") {
      return [{ url: imgData }];
    }
    if (
      Array.isArray(imgData) &&
      imgData.every((item) => typeof item === "string")
    ) {
      return imgData.map((url) => ({ url }));
    }
    const normalized = imgData.map((item) => ({
      url:
        item.url ||
        item ||
        "https://via.placeholder.com/300x400.png?text=No+Image+Available",
    }));
    console.log("Normalized images:", normalized);
    return normalized;
  };

  const displayImages = normalizeImages(images);
  const hasMultipleImages = displayImages.length > 1;

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: displayImages.length,
    slidesToScroll: 1,
    fade: false,
    arrows: hasMultipleImages,
    focusOnSelect: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="w-full mt-3 h-auto rounded-xl">
      {discount > 0 && (
        <span className="bg-blue text-white text-xs font-semibold ml-2 px-2 py-1 rounded shadow-md">
          {discount}% OFF
        </span>
      )}
      {/* Big Image Slider */}
      <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg relative">
        {displayImages.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No images available
          </div>
        ) : (
          <Slider
            {...settings2}
            ref={zoomSliderBig}
            className="zoomSliderBig h-full"
          >
            {displayImages.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl"
              >
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src={image.url}
                  className="rounded-xl w-full object-cover h-[100%]" // Use object-cover to fill the div
                  onError={() =>
                    console.log(`Failed to load image: ${image.url}`)
                  }
                />
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* Thumbnail Slider (hidden if single image) */}
      {hasMultipleImages && (
        <div className="w-full mt-4 flex justify-center">
          <div className="inline-flex">
            <Slider {...settings} className="zoomSlider">
              {displayImages.map((image, index) => (
                <div
                  className={`item cursor-pointer inline-block mx-3 p-2 transition-all duration-300 border rounded-md ${
                    activeSlide === index
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200 shadow-sm"
                  }`}
                  onClick={() => goto(index)}
                  key={index}
                >
                  <img
                    src={image.url}
                    alt={`Product image ${index + 1}`}
                    className="w-full sm:w-[90px] md:w-full h-[50px] sm:h-[60px] md:h-[70px] object-cover rounded-md"
                    onError={() =>
                      console.log(`Failed to load thumbnail: ${image.url}`)
                    }
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductZoom;
