const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
const Category = require("../models/category");
const mongoose = require("mongoose");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const limit = pLimit(2);
// **1. Create Category**
router.post("/create", async (req, res) => {
  try {
    const { name, images, color } = req.body;

    if (!images || !Array.isArray(images) || !images.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid images array" });
    }
    if (!name || !color) {
      return res
        .status(400)
        .json({ success: false, message: "Name and color are required" });
    }
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

    // Create Category
    const category = new Category({ name, images: imgUrls, color });
    const savedCategory = await category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (err) {
    console.error("Error creating category:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: err.message,
    });
  }
});

// **2. Get All Categories**
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories.length) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }
    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: err.message,
    });
  }
});

// **3. Get Category by ID**
router.get("/:id", async (req, res) => {
  const categoryId = req.params.id.trim();
  if (!isValidObjectId(categoryId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category ID" });
  }
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: err.message,
    });
  }
});

// **4. Update Category by ID**
router.put("/:id", async (req, res) => {
  const categoryId = req.params.id.trim();
  if (!isValidObjectId(categoryId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category ID" });
  }

  try {
    const { name, color, images } = req.body;
    if (!name || !color || !images || !Array.isArray(images)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, color, images },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: err.message,
    });
  }
});

// **5. Delete Category by ID**
router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id.trim();
  if (!isValidObjectId(categoryId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category ID" });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: err.message,
    });
  }
});

module.exports = router;
