import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Chip } from "@mui/material";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiChevronRight,
  FiCreditCard,
} from "react-icons/fi";
import { orderApi, formatCurrency, getStatusConfig } from "../../services/api";
import EmptyState from "./EmptyState";

const StatusIcon = ({ status }) => {
  switch (status) {
    case "pending":
      return <FiClock className="text-yellow-500" />;
    case "confirmed":
    case "processing":
      return <FiPackage className="text-blue-500" />;
    case "shipped":
      return <FiTruck className="text-purple-500" />;
    case "delivered":
      return <FiCheckCircle className="text-green-500" />;
    case "cancelled":
    case "refunded":
      return <FiXCircle className="text-red-500" />;
    default:
      return <FiPackage className="text-gray-500" />;
  }
};

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getOrders(1, 5); // Get last 5 orders for profile view
        if (response.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching profile orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <CircularProgress size={40} thickness={4} sx={{ color: "#2bbef9" }} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={FiPackage}
        title="No Orders Yet"
        message="You haven't placed any orders yet. Start shopping to see your orders here!"
        buttonText="Shop Now"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
        <Link
          to="/orders"
          className="text-sm font-medium text-[#2bbef9] hover:text-[#1da8e0] flex items-center gap-1"
        >
          View All <FiChevronRight />
        </Link>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => {
          const status = getStatusConfig(order.orderStatus);
          return (
            <div
              key={order._id}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-[#2bbef9] transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                    <StatusIcon status={order.orderStatus} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">
                        #{order.orderCode}
                      </span>
                      <Chip
                        label={status.label}
                        size="small"
                        className={`${status.bgColor} ${status.textColor} text-[10px] font-bold h-5`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="font-bold text-red-600">
                      {formatCurrency(order.totalPrice)}
                    </p>
                  </div>
                  <Link
                    to={`/orders/${order.orderCode}`}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 group-hover:text-[#2bbef9] group-hover:border-[#2bbef9] transition-all"
                  >
                    <FiChevronRight size={20} />
                  </Link>
                </div>
              </div>

              {/* Quick info for pending VNPAY orders */}
              {order.orderStatus === "pending" &&
                order.paymentMethod === "VNPAY" &&
                !order.isPaid && (
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <FiCreditCard /> Awaiting payment via VNPay
                    </p>
                    <Link
                      to={`/orders/${order.orderCode}`}
                      className="text-xs font-bold text-[#2bbef9] hover:underline"
                    >
                      Pay Now
                    </Link>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileOrders;
