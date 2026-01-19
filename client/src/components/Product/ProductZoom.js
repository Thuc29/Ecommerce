import React, { useRef, useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import {
  IoSearch,
  IoClose,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductZoom({ images = [], discount = 0 }) {
  const zoomSliderBig = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageContainerRef = useRef(null);

  // Normalize images array
  const normalizeImages = (imgData) => {
    if (!imgData || imgData.length === 0) {
      return [
        {
          url: "https://via.placeholder.com/600x600.png?text=No+Image+Available",
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
    return imgData.map((item) => ({
      url:
        item.url ||
        item ||
        "https://via.placeholder.com/600x600.png?text=No+Image+Available",
    }));
  };

  const displayImages = normalizeImages(images);
  const hasMultipleImages = displayImages.length > 1;

  // Go to specific slide
  const goto = (index) => {
    setActiveSlide(index);
    if (zoomSliderBig.current) {
      zoomSliderBig.current.slickGoTo(index);
    }
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = useCallback((e) => {
    if (!imageContainerRef.current) return;

    const container = imageContainerRef.current;
    const rect = container.getBoundingClientRect();

    // Calculate position as percentage
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  }, []);

  // Handle mouse enter/leave
  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  // Open lightbox
  const openLightbox = (index = activeSlide) => {
    setActiveSlide(index);
    setIsLightboxOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = "auto";
  };

  // Navigate in lightbox
  const nextImage = () => {
    const next = (activeSlide + 1) % displayImages.length;
    goto(next);
  };

  const prevImage = () => {
    const prev =
      (activeSlide - 1 + displayImages.length) % displayImages.length;
    goto(prev);
  };

  // Zoom controls in lightbox
  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "+":
        case "=":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, activeSlide, nextImage, prevImage]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="w-full h-auto">
      {/* Main Image Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-4 left-4 z-10 bg-[#2bbef9] text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
            -{discount}%
          </span>
        )}

        {/* Zoom/Fullscreen Button */}
        <button
          onClick={() => openLightbox()}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-[#2bbef9] transition-all duration-300 hover:scale-110"
          title="View fullscreen"
        >
          <IoSearch size={20} />
        </button>

        {/* Main Image Slider */}
        <div
          ref={imageContainerRef}
          className="w-full aspect-square cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => openLightbox()}
        >
          <Slider {...sliderSettings} ref={zoomSliderBig}>
            {displayImages.map((image, index) => (
              <div key={index} className="w-full aspect-square">
                <div
                  className="w-full h-full flex items-center justify-center p-4 overflow-hidden"
                  style={{
                    backgroundImage:
                      isZooming && activeSlide === index
                        ? `url(${image.url})`
                        : "none",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "200%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                      isZooming && activeSlide === index
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x600.png?text=Image+Error";
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {hasMultipleImages && (
        <div className="mt-4 flex justify-center gap-3">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goto(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeSlide === index
                  ? "border-[#2bbef9] shadow-lg scale-105"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/100x100.png?text=Error";
                }}
              />
              {activeSlide === index && (
                <div className="absolute inset-0 bg-[#2bbef9]/10" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {hasMultipleImages && (
        <div className="mt-2 text-center text-sm text-gray-500">
          {activeSlide + 1} / {displayImages.length}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <IoClose size={28} />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 1}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full disabled:opacity-30 transition-all"
            >
              <MdZoomOut size={24} />
            </button>
            <span className="text-white font-medium px-2 min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 4}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full disabled:opacity-30 transition-all"
            >
              <MdZoomIn size={24} />
            </button>
          </div>

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <IoChevronBack size={28} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <IoChevronForward size={28} />
              </button>
            </>
          )}

          {/* Main Image */}
          <div
            className="w-full h-full flex items-center justify-center p-8 overflow-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <img
              src={displayImages[activeSlide]?.url}
              alt={`Product ${activeSlide + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel})`,
                cursor: zoomLevel > 1 ? "move" : "zoom-in",
              }}
              onClick={() => {
                if (zoomLevel < 4) zoomIn();
                else setZoomLevel(1);
              }}
              draggable={false}
            />
          </div>

          {/* Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 rounded-xl p-2 max-w-[90vw] overflow-x-auto">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goto(index)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeSlide === index
                      ? "border-white scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
            {activeSlide + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductZoom;
