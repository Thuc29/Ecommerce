import React from "react";
import { BannerSkeleton, CategoryCardSkeleton, GridSkeleton } from "../common/Skeleton";
import "../common/Skeleton.css";

/**
 * Home Page Skeleton
 * Shows skeleton for home page with banner, categories, and products
 */
const HomeSkeleton = () => {
  return (
    <div className="home-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Banner Skeleton */}
        <BannerSkeleton />

        {/* Categories Section */}
        <div className="mb-8">
          <div className="skeleton skeleton-pulse mb-4" style={{ width: "200px", height: "28px" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="skeleton skeleton-pulse" style={{ width: "200px", height: "28px" }} />
            <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "36px", borderRadius: "8px" }} />
          </div>
          <GridSkeleton items={8} columns={4} />
        </div>

        {/* New Products Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="skeleton skeleton-pulse" style={{ width: "200px", height: "28px" }} />
            <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "36px", borderRadius: "8px" }} />
          </div>
          <GridSkeleton items={8} columns={4} />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4">
                <div className="skeleton skeleton-pulse" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                <div className="flex-1">
                  <div className="skeleton skeleton-pulse mb-2" style={{ width: "70%", height: "18px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "90%", height: "14px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
