const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load Environment Variables
dotenv.config();

if (!process.env.CONNECTION || !process.env.PORT) {
  console.error("Missing required environment variables in .env file");
  process.exit(1); // Exit the application if essential variables are missing
}

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Routes
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

app.use(`/api/category`, categoryRoutes);
app.use(`/api/products`, productRoutes);
// Database Connection
mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to the database successfully!");

    // Start Server
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Exit the app if the database connection fails
  });

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});
