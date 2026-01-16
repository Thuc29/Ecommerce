const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    value: {
      type: Number,
      required: true,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    maxDiscountAmount: {
      type: Number, // Only for percentage type
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      default: null, // null means unlimited
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Method to check if coupon is valid
couponSchema.methods.isValid = function (orderAmount) {
  const now = new Date();
  
  if (!this.isActive) return { valid: false, message: "Coupon is inactive" };
  if (now < this.startDate) return { valid: false, message: "Coupon is not yet active" };
  if (now > this.expiryDate) return { valid: false, message: "Coupon has expired" };
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
    return { valid: false, message: "Coupon usage limit reached" };
  }
  if (orderAmount < this.minOrderAmount) {
    return { 
      valid: false, 
      message: `Minimum order amount of ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(this.minOrderAmount)} required` 
    };
  }
  
  return { valid: true };
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function (orderAmount) {
  let discount = 0;
  if (this.type === "percentage") {
    discount = (orderAmount * this.value) / 100;
    if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
      discount = this.maxDiscountAmount;
    }
  } else {
    discount = this.value;
  }
  
  // Discount cannot exceed order amount
  return Math.min(discount, orderAmount);
};

module.exports = mongoose.model("Coupon", couponSchema);
