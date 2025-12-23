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

app.use(
  cors({
    origin: "https://ecommerce-6ssp.onrender.com",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    console.log("✅ Connected to the database successfully!");

    // Render sẽ tự inject PORT, fallback 9000 khi chạy local
    const PORT = process.env.PORT || 9000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}`);
      console.log(`🌐 On Render: https://ecommerce-u7gm.onrender.com`); // in thêm URL Render
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
