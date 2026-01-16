import {
  fetchDataFromApi,
  postDataToApi,
  updateDataToApi,
} from "./http";

// Order API calls
export const orderApi = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await postDataToApi("/api/orders", orderData);
    return response;
  },

  // Get user's orders
  getOrders: async (page = 1, limit = 10, status = "") => {
    let url = `/api/orders?page=${page}&limit=${limit}`;
    if (status) {
      url += `&status=${status}`;
    }
    const response = await fetchDataFromApi(url);
    return response;
  },

  // Get single order by ID or order code
  getOrder: async (orderId) => {
    const response = await fetchDataFromApi(`/api/orders/${orderId}`);
    return response;
  },

  // Cancel order
  cancelOrder: async (orderId, reason = "") => {
    const response = await updateDataToApi(`/api/orders/${orderId}/cancel`, { reason });
    return response;
  },
  
  // Get payment URL for existing order
  getPaymentUrl: async (orderId) => {
    const response = await fetchDataFromApi(`/api/orders/${orderId}/payment-url`);
    return response;
  },

  // Validate coupon
  validateCoupon: async (couponData) => {
    const response = await postDataToApi("/api/coupons/validate", couponData);
    return response;
  },
};

// Payment methods configuration
export const paymentMethods = [
  {
    id: "COD",
    name: "Cash on Delivery (COD)",
    description: "Pay with cash when you receive your order",
    icon: "cash",
    enabled: true,
  },
  {
    id: "VNPAY",
    name: "VNPay",
    description: "Pay via VNPay (ATM, Visa, MasterCard)",
    icon: "vnpay",
    enabled: true,
  },
  {
    id: "MOMO",
    name: "MoMo Wallet",
    description: "Pay via MoMo e-wallet",
    icon: "momo",
    enabled: false, // Not implemented yet
  },
  {
    id: "ZALOPAY",
    name: "ZaloPay",
    description: "Pay via ZaloPay e-wallet",
    icon: "zalopay",
    enabled: false, // Not implemented yet
  },
];

// Shipping methods configuration (VND)
export const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery in 3-5 business days",
    price: 30000, // 30,000 VND
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 1-2 business days",
    price: 50000, // 50,000 VND
  },
  {
    id: "free",
    name: "Free Shipping",
    description: "Free shipping on orders over 2,000,000đ",
    price: 0,
    minOrderAmount: 2000000, // 2,000,000 VND
  },
];

// Order status configuration
export const orderStatuses = {
  pending: {
    label: "Pending",
    color: "warning",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  confirmed: {
    label: "Confirmed",
    color: "info",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  processing: {
    label: "Processing",
    color: "info",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-800",
  },
  shipped: {
    label: "Shipping",
    color: "primary",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  delivered: {
    label: "Delivered",
    color: "success",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    color: "error",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  refunded: {
    label: "Refunded",
    color: "default",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
};

// Helper function to get status config
export const getStatusConfig = (status) => {
  return orderStatuses[status] || orderStatuses.pending;
};

// Format currency - Default to VND
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
