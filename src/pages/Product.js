import React from "react";
import ProductDetails from "../components/Product/ProductDetails";
import Tabs from "../components/Product/Tabs";
import RelatedProduct from "../components/Product/RelatedProduct";
import RecentlyViewPro from "../components/Product/RecentlyViewPro";

function Product() {
  return (
    <div className="bg-gray-100 p-4">
      <ProductDetails />
      <Tabs />
      <div
        className={`cursor-pointer lg:ml-[118px] text-lg uppercase font-bold text-gray-700`}
      >
        Related Product{" "}
      </div>
      <RelatedProduct />
      <div
        className={`cursor-pointer md:ml-[120px]  text-lg uppercase font-bold text-gray-700`}
      >
        Related Product{" "}
      </div>
      <RecentlyViewPro />
    </div>
  );
}

export default Product;
