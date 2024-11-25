import React from "react";
import ProductItem from "./ProductItem";

function RecentlyViewPro() {
  return (
    <div className=" mb-[60px] rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full bg-white">
      <div className="container">
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-2">
          <ProductItem />
        </div>
      </div>
    </div>
  );
}

export default RecentlyViewPro;
