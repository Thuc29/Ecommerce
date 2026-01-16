import React from "react";
import { CartItemSkeleton } from "../common/Skeleton";
import "../common/Skeleton.css";

/**
 * Cart Page Skeleton
 * Shows skeleton for shopping cart page
 */
const CartSkeleton = () => {
  return (
    <div className="cart-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="skeleton skeleton-pulse mb-6" style={{ width: "200px", height: "32px" }} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Cart Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="skeleton skeleton-pulse" style={{ width: "150px", height: "20px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "16px" }} />
                </div>
              </div>

              {/* Cart Items */}
              {[1, 2, 3].map((i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="skeleton skeleton-pulse mb-4" style={{ width: "150px", height: "24px" }} />

              {/* Summary Items */}
              <div className="space-y-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "16px" }} />
                    <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "16px" }} />
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between">
                  <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "20px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "24px" }} />
                </div>
              </div>

              {/* Buttons */}
              <div className="skeleton skeleton-pulse mb-3" style={{ width: "100%", height: "48px", borderRadius: "8px" }} />
              <div className="skeleton skeleton-pulse" style={{ width: "100%", height: "48px", borderRadius: "8px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
