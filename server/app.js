const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Check env
if (!process.env.CONNECTION) {
  console.error("❌ Missing CONNECTION string in environment variables");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in environment variables");
  process.exit(1);
}

// Cho phép nhiều origin (Vercel client + admin nếu có)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://ecommerce-u7gm.onrender.com",
  "https://ecommerce-five-lime-99.vercel.app/",
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép requests không có origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const uploadRoutes = require("./routes/upload");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const couponRoutes = require("./routes/coupons");

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    console.log("✅ Connected to the database successfully!");

    // Render sẽ tự inject PORT, fallback 9000 khi chạy local
    const PORT = process.env.PORT || 9000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}`);
      console.log(`🌐 On Render:https://ecommerce-u7gm.onrender.com`); // in thêm URL Render
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});
