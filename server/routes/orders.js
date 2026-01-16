const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");
const vnpayService = require("../services/vnpayService");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Helper function to get client IP
const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.socket?.remoteAddress || req.ip || "127.0.0.1";
  // Convert IPv6 localhost to IPv4
  return ip === "::1" ? "127.0.0.1" : ip;
};

// POST /api/orders - Create new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      shippingPrice = 0,
      discountAmount = 0,
      note = "",
    } = req.body;

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.street || !shippingAddress.district || !shippingAddress.city) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete shipping information",
      });
    }

    // Validate payment method
    if (!paymentMethod || !["COD", "VNPAY", "MOMO", "ZALOPAY"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name images price countInStock",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // Verify stock and prepare order items
    const orderItems = [];
    let itemsPrice = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product "${item.product.name}" no longer exists`,
        });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Product "${product.name}" only has ${product.countInStock} items in stock`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: item.price,
        quantity: item.quantity,
      });

      itemsPrice += item.price * item.quantity;
    }

    // Calculate total
    const totalPrice = itemsPrice + shippingPrice - discountAmount;

    // Generate order code
    const orderCode = await Order.generateOrderCode();

    // Create order
    const order = new Order({
      user: req.user._id,
      orderCode,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      discountAmount,
      totalPrice,
      note,
      isPaid: false,
      orderStatus: "pending",
    });

    await order.save();

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.quantity },
      });
    }

    // Clear cart after successful order
    await cart.clearCart();

    // If payment method is VNPay, create payment URL
    if (paymentMethod === "VNPAY") {
      // Amount is already in VND (integer)
      const paymentUrl = vnpayService.createPaymentUrl({
        orderId: orderCode,
        amount: Math.round(totalPrice), // Ensure integer
        orderInfo: `Payment for order ${orderCode}`,
        ipAddr: getClientIp(req),
      });

      return res.status(201).json({
        success: true,
        message: "Order has been created",
        data: {
          order,
          paymentUrl,
        },
      });
    }

    // For COD orders
    res.status(201).json({
      success: true,
      message: "Order has been created successfully",
      data: {
        order,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
});

// GET /api/orders/vnpay-return - Handle VNPay return URL
router.get("/vnpay-return", async (req, res) => {
  // Get client URL from vnpayService (auto-detects environment)
  const clientUrl = vnpayService.getClientUrl();
  
  try {
    const vnpParams = { ...req.query };
    const result = vnpayService.verifyReturnUrl(vnpParams);

    if (!result.isValid) {
      return res.redirect(
        `${clientUrl}/payment/result?success=false&message=Invalid signature`
      );
    }

    // Find order by order code
    const order = await Order.findOne({ orderCode: result.orderId });

    if (!order) {
      return res.redirect(
        `${clientUrl}/payment/result?success=false&message=Order not found`
      );
    }

    if (vnpayService.isPaymentSuccess(result.responseCode)) {
      // Update order payment status
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        transactionId: result.transactionNo,
        status: "success",
        updateTime: new Date(),
        bankCode: result.bankCode,
        cardType: result.cardType,
        responseCode: result.responseCode,
      };
      order.orderStatus = "confirmed";
      order.statusHistory.push({
        status: "confirmed",
        note: "VNPay payment successful",
        updatedAt: new Date(),
      });

      await order.save();

      return res.redirect(
        `${clientUrl}/payment/result?success=true&orderId=${order.orderCode}`
      );
    } else {
      // Payment failed
      order.paymentResult = {
        transactionId: result.transactionNo,
        status: "failed",
        updateTime: new Date(),
        responseCode: result.responseCode,
      };

      await order.save();

      const errorMessage = vnpayService.getResponseMessage(result.responseCode);
      return res.redirect(
        `${clientUrl}/payment/result?success=false&message=${encodeURIComponent(errorMessage)}&orderId=${order.orderCode}`
      );
    }
  } catch (error) {
    console.error("VNPay return error:", error);
    return res.redirect(
      `${clientUrl}/payment/result?success=false&message=Server error`
    );
  }
});

// POST /api/orders/vnpay-ipn - Handle VNPay IPN (Instant Payment Notification)
router.post("/vnpay-ipn", async (req, res) => {
  try {
    const vnpParams = { ...req.body };
    const result = vnpayService.verifyIPN(vnpParams);

    if (!result.isValid) {
      return res.status(200).json({ RspCode: "97", Message: "Invalid signature" });
    }

    const order = await Order.findOne({ orderCode: result.orderId });

    if (!order) {
      return res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }

    // Check if order already paid
    if (order.isPaid) {
      return res.status(200).json({ RspCode: "02", Message: "Order already paid" });
    }

    // Check amount
    if (order.totalPrice !== result.amount) {
      return res.status(200).json({ RspCode: "04", Message: "Invalid amount" });
    }

    if (vnpayService.isPaymentSuccess(result.responseCode)) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        transactionId: result.transactionNo,
        status: "success",
        updateTime: new Date(),
        bankCode: result.bankCode,
        cardType: result.cardType,
        responseCode: result.responseCode,
      };
      order.orderStatus = "confirmed";
      order.statusHistory.push({
        status: "confirmed",
        note: "VNPay payment successful (IPN)",
        updatedAt: new Date(),
      });

      await order.save();

      return res.status(200).json({ RspCode: "00", Message: "Confirm success" });
    } else {
      order.paymentResult = {
        status: "failed",
        responseCode: result.responseCode,
        updateTime: new Date(),
      };

      await order.save();

      return res.status(200).json({ RspCode: "00", Message: "Confirm success" });
    }
  } catch (error) {
    console.error("VNPay IPN error:", error);
    return res.status(200).json({ RspCode: "99", Message: "Server error" });
  }
});

// GET /api/orders - Get user's orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { user: req.user._id };
    if (status) {
      query.orderStatus = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("items.product", "name images");

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// GET /api/orders/:id - Get single order
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [{ _id: req.params.id }, { orderCode: req.params.id }],
      user: req.user._id,
    }).populate("items.product", "name images price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order details",
      error: error.message,
    });
  }
});

// PUT /api/orders/:id/cancel - Cancel order
router.put("/:id/cancel", verifyToken, async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findOne({
      $or: [{ _id: req.params.id }, { orderCode: req.params.id }],
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow cancellation for pending orders
    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Can only cancel orders with pending or confirmed status",
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: item.quantity },
      });
    }

    // Update order status
    order.orderStatus = "cancelled";
    order.cancelledAt = new Date();
    order.cancelReason = reason || "Cancelled by customer";
    order.statusHistory.push({
      status: "cancelled",
      note: reason || "Cancelled by customer",
      updatedAt: new Date(),
      updatedBy: req.user._id,
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order has been cancelled",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message,
    });
  }
});

// ==================== ADMIN ROUTES ====================

// GET /api/orders/admin/all - Get all orders (admin)
router.get("/admin/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, startDate, endDate, search } = req.query;

    const query = {};

    if (status) {
      query.orderStatus = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { orderCode: { $regex: search, $options: "i" } },
        { "shippingAddress.fullName": { $regex: search, $options: "i" } },
        { "shippingAddress.phone": { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("user", "name email phone")
      .populate("items.product", "name images");

    const total = await Order.countDocuments(query);

    // Get statistics
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// PUT /api/orders/admin/:id/status - Update order status (admin)
router.put("/admin/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, note } = req.body;

    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // If cancelling, restore stock
    if (status === "cancelled" && !["cancelled", "refunded"].includes(order.orderStatus)) {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { countInStock: item.quantity },
        });
      }
      order.cancelledAt = new Date();
      order.cancelReason = note || "Cancelled by admin";
    }

    // Update status
    await order.updateStatus(status, note, req.user._id);

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error: error.message,
    });
  }
});

// GET /api/orders/admin/stats - Get order statistics (admin)
router.get("/admin/stats", verifyToken, isAdmin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = {};
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    // General statistics
    const generalStats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $cond: [{ $eq: ["$isPaid", true] }, "$totalPrice", 0],
            },
          },
          averageOrderValue: { $avg: "$totalPrice" },
        },
      },
    ]);

    // Status breakdown
    const statusStats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Payment method breakdown
    const paymentStats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Daily orders for chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        general: generalStats[0] || {
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
        },
        byStatus: statusStats,
        byPaymentMethod: paymentStats,
        dailyOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
});

module.exports = router;
