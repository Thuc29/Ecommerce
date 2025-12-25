import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";

function RecentlyViewPro({ productId }) {
  const [productView, setProductView] = useState("four");
  const [productsPerPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        // Simulate fetching recently viewed products; ideally, this would use a user-specific API
        const response = await axios.get(" https://ecommerce-u7gm.onrender.com/api/products");
        const allProducts = response.data.data || [];
        // Filter out the current product and take the first few as "recently viewed"
        const filteredProducts = allProducts.filter(
          (p) => p._id["$oid"] !== productId
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recently viewed products:", err.message);
        setError("Failed to load recently viewed products");
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, [productId]);

  return (
    <div className="mb-[60px] rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full bg-white">
      <div className="container">
        <h2 className="text-xl font-semibold mb-4 px-4">
          Recently Viewed Products
        </h2>
        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-4">No recently viewed products</div>
        )}
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
          {products.slice(0, productsPerPage).map((product, index) => (
            <ProductItem key={index} layout={productView} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentlyViewPro;
