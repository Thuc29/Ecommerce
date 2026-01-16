import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Collapse,
  Alert,
} from "@mui/material";
import {
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiShoppingBag,
  FiChevronLeft,
  FiCheck,
  FiAlertCircle,
  FiChevronRight,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import {
  orderApi,
  paymentMethods,
  shippingMethods,
  formatCurrency,
} from "../../services/api";
import Swal from "sweetalert2";
import { FaCreditCard, FaDollarSign, FaPhone, FaUser } from "react-icons/fa6";
import { FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";

// Payment method icons
const PaymentIcon = ({ method }) => {
  switch (method) {
    case "vnpay":
      return (
        <img
          src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg"
          alt="VNPay"
          className="h-8 w-auto"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    case "momo":
      return (
        <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          MoMo
        </div>
      );
    case "zalopay":
      return (
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          ZP
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
          <FiCreditCard />
        </div>
      );
  }
};

function Checkout() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  // Form state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [note, setNote] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    try {
      const response = await orderApi.validateCoupon({
        code: couponCode,
        orderAmount: totalPrice,
      });

      if (response.success) {
        setCouponData(response.data);
        Swal.fire({
          icon: "success",
          title: "Coupon Applied!",
          text: `You saved ${formatCurrency(response.data.discountAmount)}`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Coupon error:", err);
      Swal.fire({
        icon: "error",
        title: "Coupon Error",
        text: err.message || "Invalid coupon code",
      });
      setCouponData(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setCouponData(null);
    setCouponCode("");
  };

  // Load user info from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setShippingAddress((prev) => ({
          ...prev,
          fullName: user.name || "",
          phone: user.phone || "",
          street: user.address?.street || "",
          ward: user.address?.ward || "",
          district: user.address?.district || "",
          city: user.address?.city || "",
        }));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to proceed with checkout",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login", { state: { from: "/checkout" } });
      });
    }
  }, [navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      navigate("/cart");
    }
  }, [items, navigate, isLoading]);

  // Free shipping threshold (VND)
  const FREE_SHIPPING_THRESHOLD = 2000000; // 2,000,000 VND

  // Calculate shipping cost
  const getShippingCost = () => {
    const method = shippingMethods.find((m) => m.id === selectedShipping);
    if (!method) return 0;

    // Free shipping for orders over threshold
    if (
      method.id === "free" &&
      totalPrice >= (method.minOrderAmount || FREE_SHIPPING_THRESHOLD)
    ) {
      return 0;
    }

    // Check if eligible for free shipping
    if (totalPrice >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }

    return method.price || 0;
  };

  const shippingCost = getShippingCost();
  const discountAmount = couponData ? couponData.discountAmount : 0;
  const orderTotal = totalPrice + shippingCost - discountAmount;

  // Validate shipping form
  const validateShippingForm = () => {
    const errors = {};

    if (!shippingAddress.fullName.trim()) {
      errors.fullName = "Please enter your full name";
    }

    if (!shippingAddress.phone.trim()) {
      errors.phone = "Please enter your phone number";
    } else if (!/^(\+84|0)[0-9]{9,10}$/.test(shippingAddress.phone.trim())) {
      errors.phone = "Invalid phone number";
    }

    if (!shippingAddress.street.trim()) {
      errors.street = "Please enter your address";
    }

    if (!shippingAddress.district.trim()) {
      errors.district = "Please enter your district";
    }

    if (!shippingAddress.city.trim()) {
      errors.city = "Please enter your city";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle shipping address change
  const handleAddressChange = (field) => (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle next step
  const handleNext = () => {
    if (activeStep === 0) {
      if (validateShippingForm()) {
        setActiveStep(1);
      }
    } else if (activeStep === 1) {
      setActiveStep(2);
    }
  };

  // Handle previous step
  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError("");

    try {
      const orderData = {
        shippingAddress,
        paymentMethod: selectedPayment,
        shippingPrice: shippingCost,
        couponCode: couponData ? couponData.code : "",
        note,
      };

      const response = await orderApi.createOrder(orderData);

      if (response.success) {
        // If VNPay, redirect to payment URL
        if (selectedPayment === "VNPAY" && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
          return;
        }

        // For COD orders, show success and redirect
        await Swal.fire({
          icon: "success",
          title: "Order Placed Successfully!",
          html: `
            <p>Order Code: <strong>${response.data.order.orderCode}</strong></p>
            <p>Thank you for your order!</p>
          `,
          confirmButtonText: "View Order",
        });

        navigate(`/orders/${response.data.order.orderCode}`);
      }
    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "An error occurred while placing order");
      Swal.fire({
        icon: "error",
        title: "Order Error",
        text:
          err.message ||
          "An error occurred while placing order. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Stepper steps
  const steps = [
    { label: "Shipping Address", icon: FiMapPin },
    { label: "Payment Method", icon: FiCreditCard },
    { label: "Order Confirmation", icon: FiCheck },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center underline text-[#2bbef9] hover:text-[#1da8e0] mb-4"
          >
            <FiChevronLeft className="mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.label}>
                <div
                  className={`flex items-center ${
                    index <= activeStep ? "text-[#2bbef9]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      index < activeStep
                        ? "bg-[#12ff3ecf] border-[#1ba747] text-white"
                        : index === activeStep
                        ? "border-[#1ba747] text-[#12ff3ecf]"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {index < activeStep ? (
                      <FiCheck className="text-lg" />
                    ) : (
                      <step.icon className="text-lg" />
                    )}
                  </div>
                  <span className="ml-2 hidden sm:inline font-medium">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-32 h-1 mx-2 rounded ${
                      index < activeStep ? "bg-[#2bbef9]" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Step 1: Shipping Address */}
              <Collapse in={activeStep === 0}>
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <FiMapPin className="mr-2 text-[#2bbef9]" />
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="Full Name *"
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange("fullName")}
                      error={!!formErrors.fullName}
                      helperText={formErrors.fullName}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Phone Number *"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange("phone")}
                      error={!!formErrors.phone}
                      helperText={formErrors.phone}
                      fullWidth
                      variant="outlined"
                      placeholder="0912345678"
                    />
                    <TextField
                      label="Address (Street, House Number) *"
                      value={shippingAddress.street}
                      onChange={handleAddressChange("street")}
                      error={!!formErrors.street}
                      helperText={formErrors.street}
                      fullWidth
                      variant="outlined"
                      className="md:col-span-2"
                    />
                    <TextField
                      label="Ward"
                      value={shippingAddress.ward}
                      onChange={handleAddressChange("ward")}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="District *"
                      value={shippingAddress.district}
                      onChange={handleAddressChange("district")}
                      error={!!formErrors.district}
                      helperText={formErrors.district}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="City/Province *"
                      value={shippingAddress.city}
                      onChange={handleAddressChange("city")}
                      error={!!formErrors.city}
                      helperText={formErrors.city}
                      fullWidth
                      variant="outlined"
                      className="md:col-span-2"
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="bg-[#2bbef9] flex items-center text-white px-4 py-1 rounded-lg font-semibold hover:bg-[#1da8e0] transition-colors"
                    >
                      Continue
                      <FiChevronRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </Collapse>

              {/* Step 2: Payment Method */}
              <Collapse in={activeStep === 1}>
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <FiCreditCard className="mr-2 text-blue" />
                    Payment Method
                  </h2>

                  <RadioGroup
                    value={selectedPayment}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${
                          !method.enabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() =>
                          method.enabled && setSelectedPayment(method.id)
                        }
                      >
                        <FormControlLabel
                          value={method.id}
                          control={<Radio disabled={!method.enabled} />}
                          label={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <PaymentIcon method={method.icon} />
                                <div className="ml-3">
                                  <p className="font-medium">{method.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {method.description}
                                  </p>
                                </div>
                              </div>
                              {!method.enabled && (
                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          }
                          disabled={!method.enabled}
                          className="w-full m-0"
                        />
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Shipping Method */}
                  <h3 className="text-lg font-semibold mt-8 mb-4 flex items-center">
                    <FiTruck className="mr-2 text-blue-600" />
                    Shipping Method
                  </h3>

                  <RadioGroup
                    value={selectedShipping}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                  >
                    {shippingMethods.map((method) => {
                      const isFreeShippingAvailable =
                        totalPrice >= FREE_SHIPPING_THRESHOLD;

                      return (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                            selectedShipping === method.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          } ${
                            method.id === "free" && !isFreeShippingAvailable
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => {
                            if (
                              method.id === "free" &&
                              !isFreeShippingAvailable
                            )
                              return;
                            setSelectedShipping(method.id);
                          }}
                        >
                          <FormControlLabel
                            value={method.id}
                            control={
                              <Radio
                                disabled={
                                  method.id === "free" &&
                                  !isFreeShippingAvailable
                                }
                              />
                            }
                            label={
                              <div className="flex items-center justify-between w-full">
                                <div>
                                  <p className="font-medium">{method.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {method.description}
                                  </p>
                                </div>
                                <span
                                  className={`font-semibold ${
                                    method.price === 0 ||
                                    isFreeShippingAvailable
                                      ? "text-green-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {method.price === 0 || isFreeShippingAvailable
                                    ? "Free"
                                    : formatCurrency(method.price)}
                                </span>
                              </div>
                            }
                            disabled={
                              method.id === "free" && !isFreeShippingAvailable
                            }
                            className="w-full m-0"
                          />
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Order Note */}
                  <div className="mt-6">
                    <TextField
                      label="Order Notes"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="Notes about your order, e.g. delivery time or special instructions."
                    />
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={handleBack}
                      className="text-gray-600 px-4 flex items-center py-1 border rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <FiChevronLeft className="mr-1" />
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-[#2bbef9] flex items-center text-white px-4 py-1 rounded-lg font-semibold hover:bg-[#1da8e0] transition-colors"
                    >
                      Continue
                      <FiChevronRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </Collapse>

              {/* Step 3: Order Confirmation */}
              <Collapse in={activeStep === 2}>
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <FiCheck className="mr-2 text-blue-600" />
                    Order Confirmation
                  </h2>

                  {error && (
                    <Alert severity="error" className="mb-4">
                      {error}
                    </Alert>
                  )}

                  {/* Shipping Address Summary */}
                  <div className="bg-gray-50 border  rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[#1ba747] flex items-center">
                          <FiMapPin className="mr-2" />
                          Shipping Address
                        </h3>
                        <div className="mt-2 text-gray-700">
                          <p className="font-medium flex items-center">
                            <FaUser className="mr-2" />
                            {shippingAddress.fullName}
                          </p>
                          <p className="font-medium flex items-center">
                            <FaPhone className="mr-2" />
                            {shippingAddress.phone}
                          </p>
                          <p className="font-medium flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            {shippingAddress.street}, {shippingAddress.ward},
                            {shippingAddress.district}, {shippingAddress.city}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveStep(0)}
                        className="text-blue underline flex items-center hover:text-blue text-sm"
                      >
                        <FaShippingFast className="mr-1" />
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Summary */}
                  <div className="bg-gray-50 border  rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-cyan-600 flex items-center">
                          <FiCreditCard className="mr-2" />
                          Payment Method
                        </h3>
                        <div className="mt-2">
                          <p className="text-gray-700 flex items-center">
                            <FaCreditCard className="mr-2" />
                            {
                              paymentMethods.find(
                                (m) => m.id === selectedPayment
                              )?.name
                            }
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveStep(1)}
                        className="text-blue underline flex items-center hover:text-blue text-sm"
                      >
                        <FaDollarSign className="mr-1" />
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 border  rounded-lg p-4 mb-4">
                    <h3 className="font-semibold gap-2 text-cyan-600 flex items-center mb-4">
                      <FiShoppingBag />
                      Products - <p className="text-red-700"> ({totalItems})</p>
                    </h3>
                    <hr className="my-2" />
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => {
                        const product = item.product;
                        const imageUrl =
                          product?.images?.[0]?.url ||
                          "https://via.placeholder.com/60x60?text=No+Image";

                        return (
                          <div
                            key={product?._id || item.product}
                            className="flex items-center space-x-3 border-b border-gray-200 pb-2"
                          >
                            <img
                              src={imageUrl}
                              alt={product?.name}
                              className="w-14 h-14 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product?.name || "Product"}
                              </p>
                              <p className="text-sm text-blue font-medium gap-2 flex items-center">
                                Q: {item.quantity} x{" "}
                                <p className="text-red-700">
                                  {formatCurrency(item.price)}
                                </p>
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-red-700">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Note */}
                  {note && (
                    <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-gray-700 flex items-center">
                        <FiAlertCircle className="mr-2" />
                        Notes
                      </h3>
                      <p className="mt-2 text-gray-600">{note}</p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={handleBack}
                      className="text-gray-600 flex items-center px-4 py-1 border rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <FiChevronLeft className="mr-1" />
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="bg-red-600 text-white px-5 py-1 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress
                            size={20}
                            className="mr-2"
                            color="inherit"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          {selectedPayment === "COD"
                            ? "Place Order"
                            : "Pay Now"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Items Preview */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.slice(0, 3).map((item) => {
                  const product = item.product;
                  const imageUrl =
                    product?.images?.[0]?.url ||
                    "https://via.placeholder.com/40x40?text=No+Image";

                  return (
                    <div
                      key={product?._id || item.product}
                      className="flex items-center space-x-3"
                    >
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={product?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{product?.name}</p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  );
                })}
                {items.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    and {items.length - 3} more items...
                  </p>
                )}
              </div>

              <hr className="my-4" />

              {/* Coupon Code */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Have a coupon?
                </p>
                {couponData ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2">
                    <div className="flex items-center">
                      <FiCheck className="text-green-600 mr-2" />
                      <div>
                        <p className="text-xs font-bold text-green-800">
                          {couponData.code}
                        </p>
                        <p className="text-[10px] text-green-600">
                          {couponData.description || "Coupon applied"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2bbef9]"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      className="bg-[#2bbef9] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1da8e0] disabled:opacity-50"
                    >
                      {isApplyingCoupon ? "..." : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              <hr className="my-4" />

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
              </div>

              <hr className="my-4" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  {formatCurrency(orderTotal)}
                </span>
              </div>

              {/* Free shipping notice */}
              {totalPrice < FREE_SHIPPING_THRESHOLD && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Add{" "}
                    <span className="font-semibold">
                      {formatCurrency(FREE_SHIPPING_THRESHOLD - totalPrice)}
                    </span>{" "}
                    more to get free shipping!
                  </p>
                </div>
              )}

              {/* Security badges */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Safe & Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
