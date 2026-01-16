import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { FiCheckCircle, FiXCircle, FiPackage, FiHome, FiRefreshCw } from "react-icons/fi";
import { orderApi, formatCurrency, getStatusConfig } from "../../services/api";

function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);

  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const errorMessage = searchParams.get("message");

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const response = await orderApi.getOrder(orderId);
          if (response.success) {
            setOrder(response.data);
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
      setIsLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className={`px-6 py-12 text-center ${
              success ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"
            }`}
          >
            {success ? (
              <FiCheckCircle className="mx-auto text-white text-7xl mb-4" />
            ) : (
              <FiXCircle className="mx-auto text-white text-7xl mb-4" />
            )}
            <h1 className="text-3xl font-bold text-white mb-2">
              {success ? "Payment Successful!" : "Payment Failed"}
            </h1>
            <p className="text-white text-opacity-90">
              {success
                ? "Thank you for your order. Your order has been confirmed."
                : errorMessage || "An error occurred during payment."}
            </p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-8">
            {order && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Order Information</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getStatusConfig(order.orderStatus).bgColor
                    } ${getStatusConfig(order.orderStatus).textColor}`}
                  >
                    {getStatusConfig(order.orderStatus).label}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Code:</span>
                    <span className="font-semibold">{order.orderCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  {order.isPaid && (
                    <div className="flex justify-between text-green-600">
                      <span>Payment Status:</span>
                      <span className="font-semibold">Paid</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-red-600">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Products ({order.items?.length || 0})</h3>
                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.image || "https://via.placeholder.com/60x60?text=No+Image"}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-gray-500 text-sm">
                            Qty: {item.quantity} x {formatCurrency(item.price)}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                      {order.shippingAddress.fullName} - {order.shippingAddress.phone}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.street}
                      {order.shippingAddress.ward && `, ${order.shippingAddress.ward}`},{" "}
                      {order.shippingAddress.district}, {order.shippingAddress.city}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {success ? (
                <>
                  <Link
                    to={`/orders/${orderId}`}
                    className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <FiPackage className="mr-2" />
                    View Order Details
                  </Link>
                  <Link
                    to="/orders"
                    className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View All Orders
                  </Link>
                </>
              ) : (
                <>
                  {orderId && (
                    <button
                      onClick={() => {
                        navigate(`/orders/${orderId}`);
                      }}
                      className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <FiRefreshCw className="mr-2" />
                      Retry Payment
                    </button>
                  )}
                  <Link
                    to="/cart"
                    className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back to Cart
                  </Link>
                </>
              )}
              <Link
                to="/"
                className="w-full flex items-center justify-center text-blue-600 py-3 font-semibold hover:text-blue-800 transition-colors"
              >
                <FiHome className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        {!success && (
          <div className="mt-6 text-center text-gray-600">
            <p>
              If you're experiencing issues, please contact{" "}
              <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                customer support
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentResult;
