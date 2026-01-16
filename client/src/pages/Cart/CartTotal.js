import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { IoCartSharp } from "react-icons/io5";
import { useCart } from "../../context/CartContext";

function CartTotal({ subtotal = 0 }) {
  const { totalItems } = useCart();
  const [shippingMethod, setShippingMethod] = useState("flat");

  // Shipping rates in VND
  const shippingRates = {
    flat: 30000, // 30,000 VND
    local: 0,
  };

  const shippingCost = shippingRates[shippingMethod];
  const total = subtotal + shippingCost;

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="border my-4 rounded-lg shadow-lg sticky top-4">
      {/* Header */}
      <p className="uppercase font-bold text-lg p-4 border-b">Cart Totals</p>

      {/* Subtotal */}
      <div className="p-4 flex justify-between">
        <p className="font-semibold">Subtotal</p>
        <p>{formatPrice(subtotal)}</p>
      </div>
      <hr className="w-[90%] mx-auto" />

      {/* Shipping Options */}
      <div className="p-4">
        <p className="font-semibold mb-2">Shipping</p>
        <RadioGroup
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
        >
          <FormControlLabel
            value="flat"
            control={<Radio size="small" color="primary" />}
            label={
              <span className="text-sm">
                Standard Shipping:{" "}
                <span className="font-semibold text-red-500">
                  {formatPrice(shippingRates.flat)}
                </span>
              </span>
            }
          />
          <FormControlLabel
            value="local"
            control={<Radio size="small" color="primary" />}
            label={
              <span className="text-sm">
                Local pickup:{" "}
                <span className="font-semibold text-green-500">Free</span>
              </span>
            }
          />
        </RadioGroup>

        {/* Shipping details */}
        <div className="mt-3 text-sm text-gray-600">
          <p>
            Shipping to <b className="text-gray-800">Your Location</b>
          </p>
          <div className="mt-2">
            <Link
              to="/profile"
              className="text-blue-500 hover:text-blue-800 font-medium underline"
            >
              Change address
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-[90%] mx-auto" />

      {/* Total */}
      <div className="p-4 flex justify-between">
        <p className="font-semibold text-lg">Total</p>
        <p className="text-lg font-bold text-red-600">{formatPrice(total)}</p>
      </div>
      <hr className="w-[90%] mx-auto" />

      {/* Proceed to Checkout */}
      <div className="p-4 lg:pb-6">
        <Link to="/checkout">
          <button
            disabled={totalItems === 0}
            className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded transition-colors duration-200 hover:bg-red-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoCartSharp className="mr-2" />
            Proceed to Checkout
          </button>
        </Link>

        {/* Continue Shopping */}
        <Link
          to="/"
          className="block text-center mt-3 text-blue-600 hover:text-blue-800 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CartTotal;
