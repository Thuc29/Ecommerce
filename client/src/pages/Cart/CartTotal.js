import React from "react";
import { Link } from "react-router-dom";
import { Button, Radio } from "@mui/material";
import { IoCartSharp } from "react-icons/io5";

function CartTotal() {
  return (
    <div className="border my-4 rounded-lg shadow-lg">
      {/* Header */}
      <p className="uppercase font-bold text-lg p-4 border-b">Cart Totals</p>

      {/* Subtotal */}
      <div className="p-4 flex justify-between">
        <p className="font-semibold">Subtotal</p>
        <p>$30.04</p>
      </div>
      <hr className="w-[90%] mx-auto" />

      {/* Shipping Options */}
      <div className="p-4 flex justify-between items-start">
        <p className="font-semibold my-auto items-center">Shipping</p>
        <div className="space-y-[-5px]">
          <div className="flex items-center justify-end">
            <p className="inline">
              Flat rate:{" "}
              <span className="font-semibold text-red-500">$5.00</span>
            </p>
            <Radio size="small" color="primary" />
          </div>

          {/* Local pickup option */}
          <div className="flex items-center justify-end">
            <p className="inline">Local pickup</p>
            <Radio size="small" color="primary" />
          </div>

          {/* Shipping details */}
          <div className="items-center justify-end">
            <p>
              Shipping to <b className="text-gray-800">AL.</b>
            </p>
            <div className="mt-5">
              <Link
                to="/change-address"
                className="text-blue-500 hover:text-blue-800 font-medium underline"
              >
                Change address
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[90%] mx-auto" />

      {/* Total */}
      <div className="p-4 flex justify-between">
        <p className="font-semibold text-lg">Total</p>
        <p className="text-lg font-bold">$35.04</p>
      </div>
      <hr className="w-[90%] mx-auto" />

      {/* Proceed to Checkout */}
      <div className="p-4 lg:pb-[30%]">
        <Link to="/checkout">
          <button className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 hover:bg-red-700 flex items-center justify-center">
            <IoCartSharp className="mr-2" />
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartTotal;
