const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.CONNECTION || !process.env.PORT) {
  console.error(
    "Missing required environment variables in .env file (CONNECTION or PORT)"
  );
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

// Log connection string for debugging
console.log("Connecting to:", process.env.CONNECTION);

mongoose
  .connect(process.env.CONNECTION) // Removed useNewUrlParser and useUnifiedTopology
  .then(() => {
    console.log("✅ Connected to the database successfully!");
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});
