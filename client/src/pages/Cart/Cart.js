import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import QuantityBox from "../../components/Product/QuantityBox";
import { IoMdClose } from "react-icons/io";
import CouponCode from "./CouponCode";
import CartTotal from "./CartTotal";

function Cart() {
  const totalAmount = 81.0; // Example total amount in cart
  const freeShippingThreshold = 100.0; // Threshold for free shipping
  const remainingAmount = freeShippingThreshold - totalAmount;
  const progressPercentage = Math.min(
    (totalAmount / freeShippingThreshold) * 100,
    100
  );

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white rounded-md mx-auto max-w-screen-xl">
      <div className="container mx-auto lg:flex">
        <div className="lg:w-8/12">
          {/* Cart Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <p className="text-gray-500">
              There are <b>23</b> products in your cart
            </p>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="my-5 border p-4 rounded-lg bg-gray-50">
            {remainingAmount > 0 ? (
              <>
                <p>
                  Add{" "}
                  <b className="text-red-600">${remainingAmount.toFixed(2)}</b>{" "}
                  to cart and get free shipping!
                </p>
                <div className="mt-2 w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-yellow-500 h-full rounded"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="text-green-600 font-semibold">
                Congratulations! You qualify for free shipping! 🎉
              </p>
            )}
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white text-sm text-left rtl:text-right text-gray-800">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr className="text-center text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3 sm:table-cell hidden">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3 sm:table-cell hidden">
                    Subtotal
                  </th>
                  <th scope="col" className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {/* Product Row */}
                {[...Array(2)].map((_, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium whitespace-normal text-left"
                    >
                      <Link to={`/product/${idx + 1}`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 overflow-hidden">
                            <img
                              src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-60-600x600.jpg"
                              className="object-cover w-full h-full"
                              alt="Product"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="hover:text-[#2bbef9] text-black break-words">
                              All Natural Italian-Style Chicken Meatballs with a
                              Very Long Name
                            </p>
                            <Rating
                              name="read-only"
                              value={4.5}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                          </div>
                        </div>
                      </Link>
                    </th>
                    <td className="px-4 py-4 sm:table-cell hidden">$2999</td>
                    <td className="px-4 py-4">
                      <QuantityBox />
                    </td>
                    <td className="px-4 py-4 sm:table-cell hidden">$5998</td>
                    <td className="px-2 py-2">
                      <button className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                        <IoMdClose size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Coupon Code Section */}
            <div className="mb-6">
              <CouponCode />
            </div>
          </div>
        </div>
        <div className="lg:w-4/12 lg:mx-3">
          <CartTotal />
        </div>
      </div>
    </section>
  );
}

export default Cart;
