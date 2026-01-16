import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, Pagination, Chip, Tab, Tabs } from "@mui/material";
import {
  FiPackage,
  FiEye,
  FiXCircle,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { orderApi, formatCurrency, getStatusConfig, orderStatuses } from "../../services/api";
import Swal from "sweetalert2";

// Status icon component
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
      return <FiAlertCircle className="text-gray-500" />;
  }
};

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [activeTab, setActiveTab] = useState("all");

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/orders" } });
    }
  }, [navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const status = activeTab === "all" ? "" : activeTab;
        const response = await orderApi.getOrders(pagination.page, pagination.limit, status);
        if (response.success) {
          setOrders(response.data.orders);
          setPagination(response.data.pagination);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          navigate("/login", { state: { from: "/orders" } });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination.page, activeTab, navigate, pagination.limit]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Handle cancel order
  const handleCancelOrder = async (orderId, orderCode) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: `Are you sure you want to cancel order ${orderCode}?`,
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
        const response = await orderApi.cancelOrder(orderId, result.value || "");
        if (response.success) {
          Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          // Refresh orders
          const updatedResponse = await orderApi.getOrders(
            pagination.page,
            pagination.limit,
            activeTab === "all" ? "" : activeTab
          );
          if (updatedResponse.success) {
            setOrders(updatedResponse.data.orders);
          }
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Could not cancel order. Please try again.",
          "error"
        );
      }
    }
  };

  // Tab configuration
  const tabs = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "shipped", label: "Shipping" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                className="!normal-case"
              />
            ))}
          </Tabs>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <CircularProgress />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiPackage className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-500 mb-6">
              {activeTab === "all"
                ? "You don't have any orders yet. Start shopping!"
                : `No orders with status "${
                    orderStatuses[activeTab]?.label || activeTab
                  }"`}
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.orderStatus);
              const canCancel = ["pending", "confirmed"].includes(order.orderStatus);

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-4">
                      <StatusIcon status={order.orderStatus} />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Order #{order.orderCode}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <Chip
                      label={statusConfig.label}
                      size="small"
                      className={`${statusConfig.bgColor} ${statusConfig.textColor}`}
                    />
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-3">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={
                              item.image ||
                              "https://via.placeholder.com/60x60?text=No+Image"
                            }
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} x {formatCurrency(item.price)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-gray-500 pl-20">
                          and {order.items.length - 2} more items...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-gray-500 text-sm">Total:</span>
                        <span className="ml-2 text-lg font-bold text-red-600">
                          {formatCurrency(order.totalPrice)}
                        </span>
                      </div>
                      {order.isPaid && (
                        <Chip
                          label="Paid"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                      {order.paymentMethod && (
                        <Chip
                          label={order.paymentMethod}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {canCancel && (
                        <button
                          onClick={() => handleCancelOrder(order._id, order.orderCode)}
                          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center text-sm"
                        >
                          <FiXCircle className="mr-1" />
                          Cancel
                        </button>
                      )}
                      <Link
                        to={`/orders/${order.orderCode}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                      >
                        <FiEye className="mr-1" />
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
