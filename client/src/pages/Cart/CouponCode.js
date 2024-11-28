import React, { useState } from "react";

const CouponCode = () => {
  const [couponCode, setCouponCode] = useState("");

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = () => {
    // Logic to apply the coupon
    alert(`Applying coupon: ${couponCode}`);
  };

  const removeAllItems = () => {
    // Logic to remove all items from the cart
    alert("All items removed");
  };

  return (
    <div className="actions-wrapper flex flex-col md:flex-row items-center justify-between gap-4 mt-4 bg-white mx-4 rounded-md">
      {/* Coupon Code Input Section */}
      <div className="coupon flex items-center gap-2 w-full md:w-auto">
        <label htmlFor="coupon_code" className="sr-only">
          Coupon:
        </label>
        <input
          type="text"
          name="coupon_code"
          className="input-text border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring focus:ring-blue-200"
          id="coupon_code"
          value={couponCode}
          onChange={handleCouponChange}
          placeholder="Enter coupon code"
        />
        <button
          type="button"
          className="button bg-blue-700 md: text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-all"
          onClick={applyCoupon}
        >
          Apply
        </button>
      </div>

      {/* Remove All Button */}
      <button
        type="button"
        className="button bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-all w-full md:w-auto"
        onClick={removeAllItems}
      >
        Remove All
      </button>
    </div>
  );
};

export default CouponCode;
