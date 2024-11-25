import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";

function ProductZoom() {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const goto = (index) => {
    setActiveSlide(index);
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
    focusOnSelect: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="w-full mt-3 h-auto overflow-hidden rounded-xl">
      <span className="bg-blue-100 text-blue-600 text-xs font-semibold ml-2 px-2 rounded">
        23% OFF
      </span>
      {/* Big Image Slider */}
      <Slider {...settings2} ref={zoomSliderBig} className="zoomSliderBig">
        <div className="overflow-hidden rounded-xl cursor-pointer">
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className="overflow-hidden rounded-xl cursor-pointer">
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className="overflow-hidden rounded-xl cursor-pointer">
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
            className="rounded-lg w-full h-auto"
          />
        </div>
      </Slider>

      {/* Thumbnail Slider */}
      <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
        <div className="item cursor-pointer" onClick={() => goto(0)}>
          <img
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
            alt="Product image"
            className="w-[80px] sm:w-[100px] md:w-[110px] h-[60px] sm:h-[70px] md:h-[85px] lg:h-[90px] object-cover rounded-md"
          />
        </div>
        <div className="item cursor-pointer" onClick={() => goto(1)}>
          <img
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
            alt="Product image"
            className="w-[80px] sm:w-[100px] md:w-[110px] h-[60px] sm:h-[70px] md:h-[85px] lg:h-[90px] object-cover rounded-md"
          />
        </div>
        <div className="item cursor-pointer" onClick={() => goto(2)}>
          <img
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
            alt="Product image"
            className="w-[80px] sm:w-[100px] md:w-[110px] h-[60px] sm:h-[70px] md:h-[85px] lg:h-[90px] object-cover rounded-md"
          />
        </div>
      </Slider>
    </div>
  );
}

export default ProductZoom;
