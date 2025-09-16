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
const limit = pLimit(4);

// **1. Create Category**
router.post("/create", async (req, res) => {
  try {
    const { name, images, color } = req.body;

    if (!name || !color) {
      return res
        .status(400)
        .json({ success: false, message: "Name and color are required" });
    }

    let imgUrls = [];
    if (images && Array.isArray(images) && images.length > 0) {
      const uploadPromises = images.map((image) =>
        limit(() => {
          if (image.startsWith("data:image")) {
            // Base64 image: upload directly
            return cloudinary.uploader
              .upload(image, {
                folder: "categories",
              })
              .catch((err) => {
                console.error("Cloudinary upload error (base64):", err);
                throw new Error(`Image upload failed: ${err.message}`);
              });
          }
          if (image.startsWith("http")) {
            // URL: upload to Cloudinary
            return cloudinary.uploader
              .upload(image, {
                folder: "categories",
              })
              .catch((err) => {
                console.error("Cloudinary upload error (URL):", err);
                throw new Error(`Image upload failed: ${err.message}`);
              });
          }
          throw new Error(`Invalid image data: ${image.substring(0, 20)}...`);
        })
      );
      const uploadResults = await Promise.all(uploadPromises);
      imgUrls = uploadResults.map((result) => result.secure_url);
    }

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
      message:
        err.name === "MongoServerError" && err.code === 11000
          ? "Category name already exists"
          : `Failed to create category: ${err.message}`,
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
    console.error("Error fetching categories:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: err.message,
    });
  }
});

// Get categories with product counts
router.get("/with-count", async (req, res) => {
  try {
    const Product = require("../models/product");
    const results = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          productCount: { $sum: 1 },
        },
      },
    ]);

    // Fetch categories to map names/images
    const categories = await Category.find();
    const countMap = new Map(
      results.map((r) => [String(r._id), r.productCount])
    );

    const data = categories.map((c) => ({
      _id: c._id,
      name: c.name,
      images: c.images,
      color: c.color,
      productCount: countMap.get(String(c._id)) || 0,
    }));

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error fetching categories with counts:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories with counts",
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
    console.error("Error fetching category:", err.message);
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
    if (!name || !color) {
      return res
        .status(400)
        .json({ success: false, message: "Name and color are required" });
    }

    let imgUrls = [];
    if (images && Array.isArray(images) && images.length > 0) {
      const uploadPromises = images.map((image) =>
        limit(() => {
          if (image.startsWith("data:image")) {
            // Base64 image: upload directly
            return cloudinary.uploader
              .upload(image, {
                folder: "categories",
              })
              .catch((err) => {
                console.error("Cloudinary upload error (base64):", err);
                throw new Error(`Image upload failed: ${err.message}`);
              });
          }
          if (image.startsWith("http")) {
            // URL: upload to Cloudinary
            return cloudinary.uploader
              .upload(image, {
                folder: "categories",
              })
              .catch((err) => {
                console.error("Cloudinary upload error (URL):", err);
                throw new Error(`Image upload failed: ${err.message}`);
              });
          }
          throw new Error(`Invalid image data: ${image.substring(0, 20)}...`);
        })
      );
      const uploadResults = await Promise.all(uploadPromises);
      imgUrls = uploadResults.map((result) => result.secure_url);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, color, images: imgUrls },
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
    console.error("Error updating category:", err.message);
    return res.status(500).json({
      success: false,
      message:
        err.name === "MongoServerError" && err.code === 11000
          ? "Category name already exists"
          : `Failed to update category: ${err.message}`,
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
    console.error("Error deleting category:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: err.message,
    });
  }
});

// **6. Create Subcategory within a Category**
router.post("/:id/subcategories", async (req, res) => {
  const categoryId = req.params.id.trim();
  if (!isValidObjectId(categoryId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category ID" });
  }

  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory name is required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Check for duplicate subcategory name within the category
    if (category.subcategories.some((sub) => sub.name === name)) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name already exists in this category",
      });
    }

    const newSubcategory = { name };
    category.subcategories.push(newSubcategory);
    const updatedCategory = await category.save();

    const addedSubcategory =
      updatedCategory.subcategories[updatedCategory.subcategories.length - 1];

    return res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      data: addedSubcategory,
    });
  } catch (err) {
    console.error("Error creating subcategory:", err.message);
    return res.status(500).json({
      success: false,
      message: `Failed to create subcategory: ${err.message}`,
      error: err.message,
    });
  }
});

// **7. Update Subcategory within a Category**
router.put("/:id/subcategories/:subId", async (req, res) => {
  const categoryId = req.params.id.trim();
  const subId = req.params.subId.trim();
  if (!isValidObjectId(categoryId) || !isValidObjectId(subId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category or subcategory ID" });
  }

  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory name is required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subcategory = category.subcategories.id(subId);
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    // Check for duplicate subcategory name (excluding the current subcategory)
    if (
      category.subcategories.some(
        (sub) => sub.name === name && sub._id.toString() !== subId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name already exists in this category",
      });
    }

    subcategory.name = name;

    const updatedCategory = await category.save();

    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: subcategory,
    });
  } catch (err) {
    console.error("Error updating subcategory:", err.message);
    return res.status(500).json({
      success: false,
      message: `Failed to update subcategory: ${err.message}`,
      error: err.message,
    });
  }
});

// **8. Delete Subcategory within a Category**
router.delete("/:id/subcategories/:subId", async (req, res) => {
  const categoryId = req.params.id.trim();
  const subId = req.params.subId.trim();
  if (!isValidObjectId(categoryId) || !isValidObjectId(subId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category or subcategory ID" });
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subcategory = category.subcategories.id(subId);
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    category.subcategories.pull(subId);
    await category.save();

    return res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      data: subcategory,
    });
  } catch (err) {
    console.error("Error deleting subcategory:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete subcategory",
      error: err.message,
    });
  }
});

module.exports = router;
