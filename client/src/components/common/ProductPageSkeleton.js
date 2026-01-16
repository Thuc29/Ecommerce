import React from "react";
import { ProductDetailSkeleton } from "../common/Skeleton";
import "../common/Skeleton.css";

/**
 * Product Page Skeleton
 * Shows skeleton for product detail page
 */
const ProductPageSkeleton = () => {
  return (
    <div className="product-page-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="skeleton skeleton-pulse" style={{ width: "60px", height: "16px" }} />
          <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "16px" }} />
          <div className="skeleton skeleton-pulse" style={{ width: "120px", height: "16px" }} />
        </div>

        {/* Product Detail */}
        <ProductDetailSkeleton />

        {/* Related Products Section */}
        <div className="mt-12">
          <div className="skeleton skeleton-pulse mb-6" style={{ width: "200px", height: "28px" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="product-card-skeleton">
                <div className="skeleton skeleton-pulse mb-3" style={{ width: "100%", height: "200px", borderRadius: "8px" }} />
                <div className="skeleton skeleton-pulse mb-2" style={{ width: "80%", height: "16px" }} />
                <div className="skeleton skeleton-pulse mb-2" style={{ width: "60%", height: "14px" }} />
                <div className="skeleton skeleton-pulse" style={{ width: "40%", height: "20px" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
