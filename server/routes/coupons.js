const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon");
const { verifyToken, isAdmin } = require("../middleware/auth");

// POST /api/coupons/validate - Validate a coupon code
router.post("/validate", verifyToken, async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const validation = coupon.isValid(orderAmount);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const discountAmount = coupon.calculateDiscount(orderAmount);

    res.status(200).json({
      success: true,
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discountAmount,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error("Coupon validation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error during coupon validation",
    });
  }
});

// Admin routes for managing coupons
// POST /api/coupons - Create a new coupon
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/coupons - Get all coupons (Admin only)
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
