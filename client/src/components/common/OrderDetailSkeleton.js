import React from "react";
import "../common/Skeleton.css";

/**
 * Order Detail Skeleton
 * Shows skeleton for order detail page
 */
const OrderDetailSkeleton = () => {
  return (
    <div className="order-detail-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="skeleton skeleton-pulse mb-2" style={{ width: "100px", height: "16px" }} />
          <div className="skeleton skeleton-pulse mb-4" style={{ width: "250px", height: "32px" }} />
          <div className="flex gap-3">
            <div className="skeleton skeleton-pulse" style={{ width: "120px", height: "32px", borderRadius: "16px" }} />
            <div className="skeleton skeleton-pulse" style={{ width: "150px", height: "32px", borderRadius: "16px" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="skeleton skeleton-pulse mb-4" style={{ width: "150px", height: "20px" }} />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b">
                    <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "80px", borderRadius: "8px" }} />
                    <div className="flex-1">
                      <div className="skeleton skeleton-pulse mb-2" style={{ width: "70%", height: "18px" }} />
                      <div className="skeleton skeleton-pulse mb-2" style={{ width: "40%", height: "16px" }} />
                      <div className="flex justify-between">
                        <div className="skeleton skeleton-pulse" style={{ width: "60px", height: "16px" }} />
                        <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "18px" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="skeleton skeleton-pulse mb-4" style={{ width: "150px", height: "20px" }} />
              <div className="space-y-2">
                <div className="skeleton skeleton-pulse" style={{ width: "60%", height: "16px" }} />
                <div className="skeleton skeleton-pulse" style={{ width: "50%", height: "16px" }} />
                <div className="skeleton skeleton-pulse" style={{ width: "80%", height: "16px" }} />
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="skeleton skeleton-pulse mb-4" style={{ width: "150px", height: "20px" }} />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="skeleton skeleton-pulse" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                    <div className="flex-1">
                      <div className="skeleton skeleton-pulse mb-2" style={{ width: "50%", height: "16px" }} />
                      <div className="skeleton skeleton-pulse" style={{ width: "40%", height: "14px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="skeleton skeleton-pulse mb-4" style={{ width: "120px", height: "20px" }} />

              {/* Summary Items */}
              <div className="space-y-3 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "16px" }} />
                    <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "16px" }} />
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-4">
                  <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "20px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "24px" }} />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div className="skeleton skeleton-pulse" style={{ width: "100%", height: "44px", borderRadius: "8px" }} />
                <div className="skeleton skeleton-pulse" style={{ width: "100%", height: "44px", borderRadius: "8px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
