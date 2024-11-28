const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Sử dụng dotenv đúng cách

// Middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

// Routes
const categoryRoutes = require("./routes/categories");
app.use(`/api/category`, categoryRoutes);

// Database Connection
mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    // Start Server
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });
