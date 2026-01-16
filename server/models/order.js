const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
});

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const paymentResultSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
    },
    status: {
      type: String,
    },
    updateTime: {
      type: Date,
    },
    bankCode: {
      type: String,
    },
    cardType: {
      type: String,
    },
    responseCode: {
      type: String,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderCode: {
      type: String,
      unique: true,
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      enum: ["COD", "VNPAY", "MOMO", "ZALOPAY"],
      required: true,
    },
    paymentResult: paymentResultSchema,
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        note: {
          type: String,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    note: {
      type: String,
      default: "",
    },
    deliveredAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancelReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique order code
orderSchema.statics.generateOrderCode = async function () {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const prefix = `DH${year}${month}${day}`;

  // Find the last order of today
  const lastOrder = await this.findOne({
    orderCode: new RegExp(`^${prefix}`),
  }).sort({ orderCode: -1 });

  let sequence = 1;
  if (lastOrder) {
    const lastSequence = parseInt(lastOrder.orderCode.slice(-4), 10);
    sequence = lastSequence + 1;
  }

  return `${prefix}${String(sequence).padStart(4, "0")}`;
};

// Calculate totals before saving
orderSchema.pre("save", function (next) {
  if (this.isNew) {
    // Add initial status to history
    this.statusHistory.push({
      status: "pending",
      note: "Order created",
      updatedAt: new Date(),
    });
  }
  next();
});

// Method to update order status
orderSchema.methods.updateStatus = async function (newStatus, note, updatedBy) {
  this.orderStatus = newStatus;
  this.statusHistory.push({
    status: newStatus,
    note: note || "",
    updatedAt: new Date(),
    updatedBy,
  });

  if (newStatus === "delivered") {
    this.deliveredAt = new Date();
    if (this.paymentMethod === "COD") {
      this.isPaid = true;
      this.paidAt = new Date();
    }
  }

  if (newStatus === "cancelled") {
    this.cancelledAt = new Date();
  }

  return this.save();
};

// Virtual for order items count
orderSchema.virtual("itemsCount").get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Ensure virtuals are included in JSON
orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

// Index for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderCode: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ isPaid: 1 });

module.exports = mongoose.model("Order", orderSchema);
