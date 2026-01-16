const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const OTP = require("../models/otp");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { sendOTPEmail, sendWelcomeEmail } = require("../services/emailService");

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// @route   POST /api/users/send-otp
// @desc    Send OTP to email for registration
// @access  Public
router.post("/send-otp", async (req, res) => {
  try {
    const { email, name, type = "register" } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // For registration, check if email already exists
    if (type === "register") {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already registered. Please login instead.",
        });
      }
    }

    // For reset-password, check if email exists
    if (type === "reset-password") {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email",
        });
      }
    }

    // Create OTP (expires in 5 minutes)
    const { otp, expiresAt } = await OTP.createOTP(email, type, 5);

    // Send OTP email
    await sendOTPEmail(email, otp, type, name || "Customer");

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
      data: {
        email: email.toLowerCase(),
        expiresAt,
        expiresIn: "5 minutes",
      },
    });
  } catch (error) {
    console.error("Send OTP error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: error.message,
    });
  }
});

// @route   POST /api/users/verify-otp
// @desc    Verify OTP
// @access  Public
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, type = "register" } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and OTP",
      });
    }

    // Verify OTP
    const result = await OTP.verifyOTP(email, otp, type);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: {
        email: email.toLowerCase(),
        verified: true,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
});

// @route   POST /api/users/register
// @desc    Register a new user (after OTP verification)
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, otp } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, phone, email, password",
      });
    }

    // Verify OTP if provided
    if (otp) {
      const otpResult = await OTP.verifyOTP(email, otp, "register");
      if (!otpResult.valid) {
        return res.status(400).json({
          success: false,
          message: otpResult.message,
        });
      }
    }

    // Check if user already exists (by email or phone)
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    // Create new user
    const user = new User({
      name,
      phone,
      email: email.toLowerCase(),
      password,
      isVerified: !!otp, // Mark as verified if OTP was provided
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, name).catch(err => {
      console.error("Failed to send welcome email:", err.message);
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: error.message,
    });
  }
});

// @route   POST /api/users/resend-otp
// @desc    Resend OTP
// @access  Public
router.post("/resend-otp", async (req, res) => {
  try {
    const { email, name, type = "register" } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    // Create new OTP
    const { otp, expiresAt } = await OTP.createOTP(email, type, 5);

    // Send OTP email
    await sendOTPEmail(email, otp, type, name || "Customer");

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: {
        email: email.toLowerCase(),
        expiresAt,
        expiresIn: "5 minutes",
      },
    });
  } catch (error) {
    console.error("Resend OTP error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      error: error.message,
    });
  }
});

// @route   POST /api/users/forgot-password
// @desc    Send OTP for password reset
// @access  Public
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Create OTP for reset password
    const { otp, expiresAt } = await OTP.createOTP(email, "reset-password", 5);

    // Send OTP email
    await sendOTPEmail(email, otp, "reset-password", user.name);

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email",
      data: {
        email: email.toLowerCase(),
        expiresAt,
        expiresIn: "5 minutes",
      },
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send reset OTP",
      error: error.message,
    });
  }
});

// @route   POST /api/users/reset-password
// @desc    Reset password with OTP
// @access  Public
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, OTP, and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Verify OTP
    const otpResult = await OTP.verifyOTP(email, otp, "reset-password");
    if (!otpResult.valid) {
      return res.status(400).json({
        success: false,
        message: otpResult.message,
      });
    }

    // Find user and update password
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message,
    });
  }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email (include password for comparison)
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account has been deactivated. Please contact support.",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          address: user.address,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
});

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { name, phone, avatar, address } = req.body;

    // Fields that can be updated
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (avatar !== undefined) updates.avatar = avatar;
    if (address) updates.address = address;

    // Check if phone is already used by another user
    if (phone) {
      const existingUser = await User.findOne({
        phone,
        _id: { $ne: req.user._id },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Phone number already in use",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put("/change-password", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current password and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: { token },
    });
  } catch (error) {
    console.error("Change password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message,
    });
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users
// @access  Private/Admin
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// @route   PUT /api/users/:id/status (Admin only)
// @desc    Activate/Deactivate user
// @access  Private/Admin
router.put("/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
      data: user,
    });
  } catch (error) {
    console.error("Update user status error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message,
    });
  }
});

// @route   DELETE /api/users/:id (Admin only)
// @desc    Delete user
// @access  Private/Admin
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: { _id: req.params.id },
    });
  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
});

module.exports = router;
