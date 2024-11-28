const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
const Category = require("../models/category");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

// Fetch All Categories
router.get(`/`, async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList.length) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }
    res.status(200).json({ success: true, data: categoryList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create Category with Cloudinary Image Upload
router.post("/create", async (req, res) => {
  const limit = pLimit(2); // Limit concurrent uploads to 2
  try {
    // Validate request body
    const { images, name, color } = req.body;
    if (!images || !Array.isArray(images) || !images.length) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid images array. Provide a non-empty array of image URLs.",
      });
    }
    if (!name || !color) {
      return res.status(400).json({
        success: false,
        message: "Name and color are required fields.",
      });
    }

    // Upload images to Cloudinary
    const uploadPromises = images.map((image) =>
      limit(() => cloudinary.uploader.upload(image))
    );
    const uploadResults = await Promise.all(uploadPromises);

    // Extract secure URLs
    const imgUrls = uploadResults.map((result) => result.secure_url);

    // Create new category
    const category = new Category({
      name,
      images: imgUrls,
      color,
    });

    const savedCategory = await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: err.message,
    });
  }
});

// Fetch Single Category by ID
router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id.trim(); // Trim the ID to remove any unwanted whitespace/newlines
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "The category with the given ID was not found.",
      });
    }
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: err.message,
    });
  }
});

// Delete Category by ID
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id.trim(); // Trim the ID to remove any unwanted whitespace/newlines
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: err.message,
    });
  }
});

module.exports = router;
