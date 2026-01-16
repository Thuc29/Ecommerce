import React from "react";
import { GridSkeleton } from "../common/Skeleton";
import "../common/Skeleton.css";

/**
 * Listing Page Skeleton
 * Shows skeleton for product listing page with sidebar and grid
 */
const ListingSkeleton = () => {
  return (
    <div className="listing-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              {/* Filter sections */}
              {[1, 2, 3, 4].map((section) => (
                <div key={section} className="mb-6">
                  <div className="skeleton skeleton-pulse mb-3" style={{ width: "60%", height: "20px" }} />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="skeleton skeleton-pulse" style={{ width: "20px", height: "20px", borderRadius: "4px" }} />
                        <div className="skeleton skeleton-pulse" style={{ width: "70%", height: "16px" }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="lg:col-span-3">
            {/* Toolbar Skeleton */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="skeleton skeleton-pulse" style={{ width: "150px", height: "20px" }} />
                <div className="flex gap-3">
                  <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "40px", borderRadius: "8px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "40px", borderRadius: "8px" }} />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <GridSkeleton items={12} columns={3} />

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="skeleton skeleton-pulse" style={{ width: "40px", height: "40px", borderRadius: "8px" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSkeleton;
