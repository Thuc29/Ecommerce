import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

function RelatedProduct() {
  const [productView, setProductView] = useState("four");
  const [productsPerPage, setProductsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setProductView("four");
      } else if (screenWidth >= 768) {
        setProductView("three");
      } else {
        setProductView("two");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" mb-[60px] rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full bg-white">
      <div className="container ">
        <div
          className={`product-grid grid gap-2 ${
            productView === "four"
              ? "grid-cols-4"
              : productView === "three"
              ? "grid-cols-3"
              : productView === "two"
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {[...Array(productsPerPage)].map((_, i) => (
            <ProductItem key={i} layout={productView} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedProduct;
