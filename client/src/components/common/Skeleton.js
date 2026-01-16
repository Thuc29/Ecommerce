import React from "react";
import "./Skeleton.css";

/**
 * Base Skeleton Component
 * Reusable skeleton loader with customizable variants
 */
export const Skeleton = ({
  variant = "rectangular",
  width = "100%",
  height = "20px",
  className = "",
  animation = "pulse",
  borderRadius = "4px",
}) => {
  const style = {
    width,
    height,
    borderRadius: variant === "circular" ? "50%" : borderRadius,
  };

  return (
    <div
      className={`skeleton skeleton-${variant} skeleton-${animation} ${className}`}
      style={style}
    />
  );
};

/**
 * Product Card Skeleton
 */
export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <Skeleton variant="rectangular" height="250px" className="mb-3" />
      <Skeleton variant="text" width="80%" height="16px" className="mb-2" />
      <Skeleton variant="text" width="60%" height="14px" className="mb-2" />
      <div className="flex items-center justify-between mt-3">
        <Skeleton variant="text" width="40%" height="20px" />
        <Skeleton variant="rectangular" width="80px" height="36px" borderRadius="8px" />
      </div>
    </div>
  );
};

/**
 * Product Detail Skeleton
 */
export const ProductDetailSkeleton = () => {
  return (
    <div className="product-detail-skeleton">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div>
          <Skeleton variant="rectangular" height="500px" className="mb-4" borderRadius="12px" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" height="100px" borderRadius="8px" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div>
          <Skeleton variant="text" width="70%" height="32px" className="mb-3" />
          <Skeleton variant="text" width="50%" height="24px" className="mb-4" />
          <Skeleton variant="text" width="90%" height="16px" className="mb-2" />
          <Skeleton variant="text" width="85%" height="16px" className="mb-2" />
          <Skeleton variant="text" width="80%" height="16px" className="mb-4" />
          
          <div className="flex gap-3 mb-4">
            <Skeleton variant="rectangular" width="120px" height="44px" borderRadius="8px" />
            <Skeleton variant="rectangular" width="120px" height="44px" borderRadius="8px" />
          </div>

          <Skeleton variant="rectangular" width="100%" height="50px" borderRadius="8px" className="mb-3" />
          <Skeleton variant="rectangular" width="100%" height="50px" borderRadius="8px" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-8">
        <div className="flex gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" width="120px" height="40px" borderRadius="8px" />
          ))}
        </div>
        <Skeleton variant="text" width="100%" height="16px" className="mb-2" />
        <Skeleton variant="text" width="95%" height="16px" className="mb-2" />
        <Skeleton variant="text" width="90%" height="16px" className="mb-2" />
        <Skeleton variant="text" width="85%" height="16px" />
      </div>
    </div>
  );
};

/**
 * Cart Item Skeleton
 */
export const CartItemSkeleton = () => {
  return (
    <div className="cart-item-skeleton flex gap-4 p-4 border-b">
      <Skeleton variant="rectangular" width="100px" height="100px" borderRadius="8px" />
      <div className="flex-1">
        <Skeleton variant="text" width="70%" height="20px" className="mb-2" />
        <Skeleton variant="text" width="40%" height="16px" className="mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton variant="rectangular" width="100px" height="36px" borderRadius="8px" />
          <Skeleton variant="text" width="80px" height="20px" />
        </div>
      </div>
    </div>
  );
};

/**
 * Order Card Skeleton
 */
export const OrderCardSkeleton = () => {
  return (
    <div className="order-card-skeleton p-4 border rounded-lg mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Skeleton variant="text" width="150px" height="20px" className="mb-2" />
          <Skeleton variant="text" width="200px" height="16px" />
        </div>
        <Skeleton variant="rectangular" width="100px" height="32px" borderRadius="16px" />
      </div>
      
      <div className="flex gap-3 mb-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rectangular" width="60px" height="60px" borderRadius="8px" />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Skeleton variant="text" width="120px" height="18px" />
        <Skeleton variant="rectangular" width="100px" height="36px" borderRadius="8px" />
      </div>
    </div>
  );
};

/**
 * Profile Section Skeleton
 */
export const ProfileSkeleton = () => {
  return (
    <div className="profile-skeleton">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="circular" width="100px" height="100px" />
        <div className="flex-1">
          <Skeleton variant="text" width="200px" height="24px" className="mb-2" />
          <Skeleton variant="text" width="250px" height="16px" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <Skeleton variant="text" width="100px" height="14px" className="mb-2" />
            <Skeleton variant="rectangular" width="100%" height="44px" borderRadius="8px" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Table Skeleton
 */
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="table-skeleton">
      {/* Header */}
      <div className="flex gap-4 p-4 border-b bg-gray-50">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" width={`${100 / columns}%`} height="16px" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4 border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" width={`${100 / columns}%`} height="16px" />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * List Skeleton
 */
export const ListSkeleton = ({ items = 5 }) => {
  return (
    <div className="list-skeleton">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 border-b">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div className="flex-1">
            <Skeleton variant="text" width="60%" height="16px" className="mb-2" />
            <Skeleton variant="text" width="40%" height="14px" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Grid Skeleton
 */
export const GridSkeleton = ({ items = 8, columns = 4 }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-4`}>
      {Array.from({ length: items }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

/**
 * Category Card Skeleton
 */
export const CategoryCardSkeleton = () => {
  return (
    <div className="category-card-skeleton">
      <Skeleton variant="rectangular" height="150px" borderRadius="12px" className="mb-3" />
      <Skeleton variant="text" width="80%" height="18px" className="mb-2" />
      <Skeleton variant="text" width="50%" height="14px" />
    </div>
  );
};

/**
 * Banner Skeleton
 */
export const BannerSkeleton = () => {
  return (
    <div className="banner-skeleton mb-6">
      <Skeleton variant="rectangular" height="400px" borderRadius="16px" />
    </div>
  );
};

/**
 * Review Card Skeleton
 */
export const ReviewCardSkeleton = () => {
  return (
    <div className="review-card-skeleton p-4 border-b">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1">
          <Skeleton variant="text" width="150px" height="16px" className="mb-2" />
          <Skeleton variant="text" width="100px" height="14px" />
        </div>
      </div>
      <Skeleton variant="text" width="100%" height="14px" className="mb-2" />
      <Skeleton variant="text" width="90%" height="14px" className="mb-2" />
      <Skeleton variant="text" width="70%" height="14px" />
    </div>
  );
};

/**
 * Shimmer Skeleton (Alternative animation)
 */
export const ShimmerSkeleton = ({ width = "100%", height = "20px", className = "" }) => {
  return (
    <div
      className={`skeleton skeleton-shimmer ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
