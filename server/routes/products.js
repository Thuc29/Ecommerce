const express = require("express");
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");

const router = express.Router();
const limit = pLimit(2);

// **1: Get all products**
router.get("/", async (req, res) => {
  try {
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
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing images",
      });
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
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product",
      error: error.message,
    });
  }
});

//**3: delete Product */
router.delete("/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

//**4: get product by id */
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found by ID",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product found",
    data: product,
  });
});

// **5: Update product**
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate Product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    // Find the existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

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
    let imgUrls = existingProduct.images;
    if (images && Array.isArray(images) && images.length > 0) {
      const uploadPromises = images.map((image) =>
        limit(() =>
          cloudinary.uploader.upload(image).catch((err) => {
            console.error("Cloudinary upload error:", err);
            throw new Error(`Image upload failed for ${image}`);
          })
        )
      );

      const uploadResults = await Promise.all(uploadPromises);
      imgUrls = uploadResults.map((result) => result.secure_url);
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        images: imgUrls,
        brand: brand || existingProduct.brand,
        price: price || existingProduct.price,
        category: category || existingProduct.category,
        countInStock: countInStock || existingProduct.countInStock,
        rating: rating || existingProduct.rating,
        numReviews: numReviews || existingProduct.numReviews,
        isFeatured: isFeatured || existingProduct.isFeatured,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
});

module.exports = router;
