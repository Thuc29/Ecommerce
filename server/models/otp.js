const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["register", "reset-password", "verify-email"],
      default: "register",
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index - tự động xóa khi hết hạn
    },
  },
  {
    timestamps: true,
  }
);

// Index để tìm kiếm nhanh theo email và type
otpSchema.index({ email: 1, type: 1 });

// Method kiểm tra OTP còn hiệu lực không
otpSchema.methods.isValid = function () {
  return !this.isUsed && new Date() < this.expiresAt;
};

// Static method để tạo OTP mới
otpSchema.statics.generateOTP = function (length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

// Static method để tạo và lưu OTP
otpSchema.statics.createOTP = async function (email, type = "register", expiresInMinutes = 5) {
  // Xóa các OTP cũ chưa sử dụng của email này
  await this.deleteMany({ email: email.toLowerCase(), type, isUsed: false });

  const otp = this.generateOTP();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  const otpDoc = await this.create({
    email: email.toLowerCase(),
    otp,
    type,
    expiresAt,
  });

  return { otp, expiresAt, id: otpDoc._id };
};

// Static method để xác thực OTP
otpSchema.statics.verifyOTP = async function (email, otp, type = "register") {
  const otpDoc = await this.findOne({
    email: email.toLowerCase(),
    otp,
    type,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!otpDoc) {
    return { valid: false, message: "Invalid or expired OTP" };
  }

  // Đánh dấu OTP đã sử dụng
  otpDoc.isUsed = true;
  await otpDoc.save();

  return { valid: true, message: "OTP verified successfully" };
};

module.exports = mongoose.model("OTP", otpSchema);
