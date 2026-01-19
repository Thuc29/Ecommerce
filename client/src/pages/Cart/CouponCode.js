import React, { useState } from "react";
import {
  showSuccess,
  showError,
  showDeleteConfirm,
} from "../../utils/sweetAlert";
import { FiTrash2 } from "react-icons/fi";

const CouponCode = () => {
  const [couponCode, setCouponCode] = useState("");

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      showError("Invalid Coupon", "Please enter a valid coupon code");
      return;
    }

    try {
      // Logic to apply the coupon
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showSuccess(
        "Coupon Applied!",
        `Coupon "${couponCode}" has been applied successfully`
      );
      setCouponCode("");
    } catch (error) {
      showError("Coupon Failed", "Invalid or expired coupon code");
    }
  };

  const removeAllItems = async () => {
    const result = await showDeleteConfirm(
      "Remove All Items?",
      "Are you sure you want to remove all items from your cart? This action cannot be undone."
    );

    if (result.isConfirmed) {
      try {
        // Logic to remove all items from the cart
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showSuccess(
          "Items Removed",
          "All items have been removed from your cart"
        );
      } catch (error) {
        showError(
          "Failed to Remove",
          "Could not remove all items. Please try again."
        );
      }
    }
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
        className="button bg-red-700 flex items-center justify-center text-white rounded-md px-4 py-2 hover:bg-red-600 transition-all w-full md:w-auto"
        onClick={removeAllItems}
      >
        <FiTrash2 className="mr-2 text-white" /> Remove All
      </button>
    </div>
  );
};

export default CouponCode;
