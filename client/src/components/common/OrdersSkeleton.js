import React from "react";
import { OrderCardSkeleton } from "../common/Skeleton";
import "../common/Skeleton.css";

/**
 * Orders Page Skeleton
 * Shows skeleton for orders list page
 */
const OrdersSkeleton = () => {
  return (
    <div className="orders-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="skeleton skeleton-pulse" style={{ width: "150px", height: "32px" }} />
          <div className="skeleton skeleton-pulse" style={{ width: "120px", height: "40px", borderRadius: "8px" }} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton skeleton-pulse" style={{ width: "100px", height: "36px", borderRadius: "20px" }} />
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton skeleton-pulse" style={{ width: "40px", height: "40px", borderRadius: "8px" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
