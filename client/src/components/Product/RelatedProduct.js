import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { fetchDataFromApi } from "../../services/api";

function RelatedProduct({ categoryId }) {
  const [productView, setProductView] = useState("four");
  const [productsPerPage] = useState(4);
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
    const fetchRelatedProducts = async () => {
      if (!categoryId) return;
      try {
        const response = await fetchDataFromApi(
          `/api/products?category=${categoryId}`
        );
        setProducts(response.data || response?.data?.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching related products:", err.message);
        setError("Failed to load related products");
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId]);

  return (
    <div className="mb-[60px] rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full bg-white">
      <div className="container">
        <h2 className="text-xl font-semibold mb-4 px-4">Related Products</h2>
        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-4">No related products found</div>
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

export default RelatedProduct;
