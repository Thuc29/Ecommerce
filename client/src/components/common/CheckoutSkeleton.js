import React from "react";
import "../common/Skeleton.css";

/**
 * Checkout Page Skeleton
 * Shows skeleton for checkout page with stepper and forms
 */
const CheckoutSkeleton = () => {
  return (
    <div className="checkout-skeleton-container">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="skeleton skeleton-pulse mb-6" style={{ width: "150px", height: "32px" }} />

        {/* Stepper */}
        <div className="flex justify-center items-center mb-8">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div className="skeleton skeleton-pulse" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                <div className="skeleton skeleton-pulse ml-2" style={{ width: "120px", height: "16px" }} />
              </div>
              {index < 2 && (
                <div className="skeleton skeleton-pulse mx-4" style={{ width: "80px", height: "4px" }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Section Title */}
              <div className="skeleton skeleton-pulse mb-6" style={{ width: "200px", height: "24px" }} />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={i === 3 || i === 6 ? "md:col-span-2" : ""}>
                    <div className="skeleton skeleton-pulse mb-2" style={{ width: "100px", height: "14px" }} />
                    <div className="skeleton skeleton-pulse" style={{ width: "100%", height: "48px", borderRadius: "8px" }} />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "40px", borderRadius: "8px" }} />
                <div className="skeleton skeleton-pulse" style={{ width: "120px", height: "40px", borderRadius: "8px" }} />
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="skeleton skeleton-pulse mb-4" style={{ width: "150px", height: "24px" }} />

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="skeleton skeleton-pulse" style={{ width: "60px", height: "60px", borderRadius: "8px" }} />
                    <div className="flex-1">
                      <div className="skeleton skeleton-pulse mb-2" style={{ width: "100%", height: "16px" }} />
                      <div className="skeleton skeleton-pulse" style={{ width: "60%", height: "14px" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t pt-4 mb-4">
                <div className="skeleton skeleton-pulse mb-2" style={{ width: "100px", height: "16px" }} />
                <div className="flex gap-2">
                  <div className="skeleton skeleton-pulse flex-1" style={{ height: "40px", borderRadius: "8px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "40px", borderRadius: "8px" }} />
                </div>
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="skeleton skeleton-pulse" style={{ width: "100px", height: "16px" }} />
                    <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "16px" }} />
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <div className="skeleton skeleton-pulse" style={{ width: "80px", height: "24px" }} />
                  <div className="skeleton skeleton-pulse" style={{ width: "120px", height: "28px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
