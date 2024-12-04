const express = require("express");
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
const mongoose = require("mongoose");
const Category = require("../models/category"); // Ensure correct import of Category model
const Product = require("../models/product"); // Ensure correct import of Product model

const router = express.Router();
const limit = pLimit(2); // Limit concurrent uploads

// **1: Get all products**
router.get("/", async (req, res) => {
  try {
    // Fetch all products and populate the category details
    const productList = await Product.find().populate("category");

    if (!productList || productList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      count: productList.length,
      data: productList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
});

// **2: Create a new product**
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }

    // Check if category exists
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Validate images array
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing images",
      });
    }

    // Upload images to Cloudinary
    const uploadPromises = images.map((image) =>
      limit(() =>
        cloudinary.uploader.upload(image).catch((err) => {
          console.error("Cloudinary upload error:", err);
          throw new Error(`Image upload failed for ${image}`);
        })
      )
    );

    const uploadResults = await Promise.all(uploadPromises);

    // Extract Cloudinary URLs
    const imgUrls = uploadResults.map((result) => result.secure_url);

    // Create and save the product
    const product = new Product({
      name,
      description,
      images: imgUrls,
      brand,
      price,
      category,
      countInStock,
      rating: rating || 0,
      numReviews: numReviews || 0,
      isFeatured: isFeatured || false,
    });

    const savedProduct = await product.save();

    // Respond with the created product
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    // Handle server errors
    console.error("Error creating product:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product",
      error: error.message,
    });
  }
});

module.exports = router;
