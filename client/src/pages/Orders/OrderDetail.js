import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CircularProgress, Chip, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import {
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiChevronLeft,
  FiPhone,
  FiFileText,
} from "react-icons/fi";
import { orderApi, formatCurrency, getStatusConfig } from "../../services/api";
import Swal from "sweetalert2";

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrder(orderId);
        if (response.success) {
          setOrder(response.data);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Could not load order information");
        if (err.response?.status === 401) {
          navigate("/login", { state: { from: `/orders/${orderId}` } });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handleCancelOrder = async () => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: `Are you sure you want to cancel order ${order.orderCode}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Cancel Order",
      cancelButtonText: "No",
      input: "text",
      inputLabel: "Reason for cancellation (optional)",
      inputPlaceholder: "Enter cancellation reason...",
    });

    if (result.isConfirmed) {
      try {
        const response = await orderApi.cancelOrder(order._id, result.value || "");
        if (response.success) {
          Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          setOrder(response.data);
        }
      } catch (err) {
        Swal.fire(
          "Error!",
          err.message || "Could not cancel order. Please try again.",
          "error"
        );
      }
    }
  };

  const handlePayNow = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.getPaymentUrl(order.orderCode);
      if (response.success && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: err.message || "Could not generate payment URL. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get status step index
  const getStatusStep = (status) => {
    const statusOrder = ["pending", "confirmed", "processing", "shipped", "delivered"];
    const index = statusOrder.indexOf(status);
    return index >= 0 ? index : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CircularProgress />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <FiXCircle className="mx-auto text-6xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error || "This order does not exist or has been removed"}</p>
          <Link
            to="/orders"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FiChevronLeft className="mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.orderStatus);
  const canCancel = ["pending", "confirmed"].includes(order.orderStatus);
  const isCancelled = ["cancelled", "refunded"].includes(order.orderStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <FiChevronLeft className="mr-1" />
            Back to Orders
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order.orderCode}
              </h1>
              <p className="text-gray-600">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <Chip
              icon={
                isCancelled ? (
                  <FiXCircle />
                ) : order.orderStatus === "delivered" ? (
                  <FiCheckCircle />
                ) : (
                  <FiClock />
                )
              }
              label={statusConfig.label}
              className={`${statusConfig.bgColor} ${statusConfig.textColor}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Progress */}
            {!isCancelled && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTruck className="mr-2 text-blue-600" />
                  Order Status
                </h2>
                <Stepper
                  activeStep={getStatusStep(order.orderStatus)}
                  orientation="vertical"
                >
                  {[
                    { label: "Pending", description: "Order is awaiting confirmation" },
                    { label: "Confirmed", description: "Order has been confirmed" },
                    { label: "Processing", description: "Order is being prepared" },
                    { label: "Shipping", description: "Order is on the way" },
                    { label: "Delivered", description: "Order has been delivered successfully" },
                  ].map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        <p className="text-sm text-gray-500">{step.description}</p>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiPackage className="mr-2 text-blue-600" />
                Products ({order.items?.length || 0})
              </h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <Link to={`/product/${item.product}`}>
                      <img
                        src={
                          item.image || "https://via.placeholder.com/80x80?text=No+Image"
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product}`}
                        className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Unit price: {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status History */}
            {order.statusHistory && order.statusHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiClock className="mr-2 text-blue-600" />
                  Order History
                </h2>
                <div className="space-y-3">
                  {order.statusHistory
                    .slice()
                    .reverse()
                    .map((history, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full mt-1.5 ${
                            index === 0 ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium">
                            {getStatusConfig(history.status).label}
                          </p>
                          {history.note && (
                            <p className="text-sm text-gray-500">{history.note}</p>
                          )}
                          <p className="text-xs text-gray-400">
                            {new Date(history.updatedAt).toLocaleString("en-US")}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {order.shippingPrice === 0
                      ? "Free"
                      : formatCurrency(order.shippingPrice)}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discountAmount)}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-red-600">{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiCreditCard className="mr-2 text-blue-600" />
                Payment
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  {order.isPaid ? (
                    <Chip label="Paid" size="small" color="success" />
                  ) : (
                    <Chip label="Unpaid" size="small" color="warning" />
                  )}
                </div>
                {order.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid on:</span>
                    <span className="text-sm">
                      {new Date(order.paidAt).toLocaleString("en-US")}
                    </span>
                  </div>
                )}
                {order.paymentResult?.bankCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span>{order.paymentResult.bankCode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiMapPin className="mr-2 text-blue-600" />
                Shipping Address
              </h2>
              {order.shippingAddress && (
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="flex items-center">
                    <FiPhone className="mr-2 text-gray-400" />
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    {order.shippingAddress.street}
                    {order.shippingAddress.ward && `, ${order.shippingAddress.ward}`}
                  </p>
                  <p>
                    {order.shippingAddress.district}, {order.shippingAddress.city}
                  </p>
                </div>
              )}
            </div>

            {/* Order Note */}
            {order.note && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiFileText className="mr-2 text-blue-600" />
                  Notes
                </h2>
                <p className="text-gray-600">{order.note}</p>
              </div>
            )}

            {/* Cancel Reason */}
            {order.cancelReason && (
              <div className="bg-red-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2 text-red-700 flex items-center">
                  <FiXCircle className="mr-2" />
                  Cancellation Reason
                </h2>
                <p className="text-red-600">{order.cancelReason}</p>
              </div>
            )}

            {/* Actions */}
            {canCancel && (
              <button
                onClick={handleCancelOrder}
                className="w-full py-3 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center"
              >
                <FiXCircle className="mr-2" />
                Cancel Order
              </button>
            )}

            {order.orderStatus === "pending" && order.paymentMethod === "VNPAY" && !order.isPaid && (
              <button
                onClick={handlePayNow}
                disabled={isLoading}
                className="w-full py-3 bg-[#2bbef9] text-white rounded-lg font-semibold hover:bg-[#1da8e0] transition-colors flex items-center justify-center shadow-md"
              >
                <FiCreditCard className="mr-2" />
                {isLoading ? "Processing..." : "Pay Now with VNPay"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
