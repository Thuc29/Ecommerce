import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import QuantityBox from "../../components/Product/QuantityBox";
import { IoMdClose } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import CouponCode from "./CouponCode";
import CartTotal from "./CartTotal";
import { useCart } from "../../context/CartContext";
import { CartSkeleton } from "../../components/common";

function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    isLoading,
    isUpdating,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Free shipping threshold in VND
  const freeShippingThreshold = 2000000; // 2,000,000 VND
  const remainingAmount = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercentage = Math.min(
    (totalPrice / freeShippingThreshold) * 100,
    100
  );

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Handle quantity change
  const handleQuantityChange = async (productId, newQuantity) => {
    await updateQuantity(productId, newQuantity);
  };

  // Handle remove item
  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  // Get product ID from item
  const getProductId = (item) => {
    return item.product._id || item.product;
  };

  // Loading state
  if (isLoading) {
    return <CartSkeleton />;
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white rounded-md mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white rounded-md mx-auto max-w-screen-xl">
      <div className="container mx-auto lg:flex">
        <div className="lg:w-8/12">
          {/* Cart Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <p className="text-gray-500">
              There are <b>{totalItems}</b> products in your cart
            </p>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="my-3 border p-3 rounded-lg bg-gray-50">
            {remainingAmount > 0 ? (
              <>
                <p>
                  Add{" "}
                  <b className="text-red-600">{formatPrice(remainingAmount)}</b>{" "}
                  to cart and get free shipping!
                </p>
                <div className="mt-2 w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-yellow-500 h-full rounded transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="text-[#1ba747] font-semibold">
                Congratulations! You qualify for free shipping!
              </p>
            )}
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white text-sm text-left rtl:text-right text-gray-800">
              <thead className="bg-emerald-600 text-xs uppercase">
                <tr className="text-center text-white">
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
              <tbody className="text-center text-gray-700">
                {items.map((item) => {
                  const productId = getProductId(item);
                  const product = item.product;
                  const imageUrl =
                    product.images?.[0]?.url ||
                    "https://via.placeholder.com/100x100?text=No+Image";
                  const subtotal = item.price * item.quantity;

                  return (
                    <tr key={productId} className="border-b hover:bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-4 font-medium whitespace-normal text-left"
                      >
                        <Link to={`/product/${productId}`}>
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                              <img
                                src={imageUrl}
                                className="object-cover w-full h-full rounded"
                                alt={product.name || "Product"}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="hover:text-[#2bbef9] text-black break-words line-clamp-2">
                                {product.name || "Unknown Product"}
                              </p>
                              {product.rating > 0 && (
                                <Rating
                                  name="read-only"
                                  value={product.rating}
                                  readOnly
                                  precision={0.5}
                                  size="small"
                                />
                              )}
                              {product.brand && (
                                <p className="text-xs text-gray-500">
                                  {product.brand}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </th>
                      <td className="px-4 py-4 sm:table-cell hidden">
                        <span className="font-semibold text-red-600">
                          {formatPrice(item.price)}
                        </span>
                        {product.oldPrice > item.price && (
                          <span className="block text-xs text-gray-400 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <QuantityBox
                            quantity={item.quantity}
                            onQuantityChange={(newQty) =>
                              handleQuantityChange(productId, newQty)
                            }
                            min={1}
                            max={product.countInStock || 99}
                            disabled={isUpdating}
                            size="small"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 sm:table-cell hidden font-semibold">
                        <span className="text-red-600">
                          {formatPrice(subtotal)}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => handleRemoveItem(productId)}
                          disabled={isUpdating}
                          className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          aria-label="Remove item"
                        >
                          <IoMdClose size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Coupon Code Section */}
            <div className="mb-6">
              <CouponCode />
            </div>
          </div>
        </div>

        <div className="lg:w-4/12 lg:mx-3">
          <CartTotal subtotal={totalPrice} />
        </div>
      </div>
    </section>
  );
}

export default Cart;
