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
    infinite: false, // Prevents looping
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Enable previous and next arrows
    beforeChange: (current, next) => setActiveSlide(next),
  };

  var settings = {
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
    <>
      <div className="w-full lg:w-5/12 flex justify-center md:justify-start">
        <div className="w-full h-auto overflow-hidden rounded-xl">
          <Slider {...settings2} ref={zoomSliderBig} className="zoomSliderBig">
            <div className="overflow-hidden rounded-xl cursor-pointer">
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                className="rounded-lg w-full md:w-full h-auto"
              />
            </div>
            <div className="overflow-hidden rounded-xl cursor-pointer">
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
                className="rounded-lg w-full md:w-full h-auto"
              />
            </div>
            <div className="overflow-hidden rounded-xl cursor-pointer">
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
                className="rounded-lg w-full md:w-full h-auto"
              />
            </div>
          </Slider>
          <Slider {...settings} className="zoomSlider pt-5" ref={zoomSlider}>
            <div className={`item`} onClick={() => goto(0)}>
              <img
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                alt="Product image"
                className="w-[110px] sm:pl-4 h-[85px] sm:h-[70px] object-cover rounded-md"
              />
            </div>
            <div className={`item `} onClick={() => goto(1)}>
              <img
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"
                alt="Product image"
                className="w-[110px] sm:pl-4 h-[85px] sm:h-[70px] object-cover rounded-md"
              />
            </div>
            <div className={`item `} onClick={() => goto(2)}>
              <img
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"
                alt="Product image"
                className="w-[110px] sm:pl-4 h-[85px] sm:h-[70px] object-cover rounded-md"
              />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}

export default ProductZoom;
