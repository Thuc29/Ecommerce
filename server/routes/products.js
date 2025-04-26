const express = require("express");
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");
const multer = require("multer");
const { memoryStorage } = require("multer");
const router = express.Router();
const limit = pLimit(4);
const storage = memoryStorage();
const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find().populate("category");
    if (!productList || productList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res
      .status(200)
      .json({ success: true, count: productList.length, data: productList });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
});

// Upload a single image to Cloudinary
router.post("/upload-image", async (req, res) => {
  try {
    const { image } = req.body; // Expect base64 string or URL
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }
    const result = await cloudinary.uploader.upload(image, {
      folder: "e-commerce/products",
    });
    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (err) {
    console.error("Backend image upload error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to upload image to Cloudinary",
      error: err.message,
    });
  }
});
// Delete a single image from Cloudinary
router.delete("/delete-image", async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res
        .status(400)
        .json({ success: false, message: "No public_id provided" });
    }
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({
      success: true,
      message: "Image deleted from Cloudinary successfully",
    });
  } catch (err) {
    console.error("Backend image deletion error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete image from Cloudinary",
      error: err.message,
    });
  }
});

// Create a new product
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      brand,
      price,
      oldPrice,
      category,
      countInStock,
      rating,
      isFeatured,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !category ||
      !countInStock
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID format" });
    }

    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Validate and upload images to Cloudinary
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    // Upload images concurrently with rate limiting
    const uploadPromises = images.map((image) =>
      limit(() =>
        cloudinary.uploader.upload(image, {
          folder: "e-commerce/products",
        })
      )
    );
    const uploadResults = await Promise.all(uploadPromises);

    // Map upload results to image objects
    const imgInfos = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));
    // Create new product
    const product = new Product({
      name,
      description,
      images: imgInfos,
      brand,
      price,
      oldPrice: oldPrice || 0,
      category,
      countInStock,
      rating: rating || 0,
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

// Update a product
router.put(
  "/:id",
  upload.array("images", 4), // Hỗ trợ tối đa 4 file ảnh
  async (req, res) => {
    try {
      const productId = req.params.id;

      // Validate product ID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid product ID format" });
      }

      // Tìm sản phẩm hiện tại
      const existingProduct = await Product.findById(productId).populate(
        "category"
      );
      if (!existingProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      // Lấy dữ liệu từ req.body
      const {
        name,
        description,
        images: providedImages,
        brand,
        price,
        oldPrice,
        category,
        countInStock,
        rating,
        isFeatured,
      } = req.body;

      // Validation các trường bắt buộc
      if (!name || name.trim() === "") {
        return res
          .status(400)
          .json({ success: false, message: "Product name is required" });
      }
      if (price === undefined || price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price is required and must be non-negative",
        });
      }
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "Category is required" });
      }
      if (countInStock === undefined || countInStock < 0) {
        return res.status(400).json({
          success: false,
          message: "Stock is required and must be non-negative",
        });
      }
      if (rating !== undefined && (rating < 0 || rating > 5)) {
        return res
          .status(400)
          .json({ success: false, message: "Rating must be between 0 and 5" });
      }

      // Validate category
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category ID format" });
      }
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      // Xử lý ảnh
      const imagesToKeep = [];
      const imagesToUpload = [];

      // Xử lý ảnh từ req.body.images
      if (providedImages && Array.isArray(providedImages)) {
        const uniqueImages = [
          ...new Set(providedImages.filter((img) => img !== null)),
        ];
        for (const image of uniqueImages) {
          if (
            typeof image === "string" &&
            (image.startsWith("http") || image.startsWith("https"))
          ) {
            // Kiểm tra nếu URL đã tồn tại trong sản phẩm hiện tại
            const existingImage = existingProduct.images.find(
              (existing) => existing.url === image
            );
            if (existingImage) {
              imagesToKeep.push(existingImage);
            } else {
              // Nếu không tồn tại, thêm vào danh sách upload
              imagesToUpload.push(image);
            }
          } else if (
            typeof image === "string" &&
            image.startsWith("data:image")
          ) {
            // Ảnh base64, thêm vào danh sách upload
            imagesToUpload.push(image);
          }
        }
      }

      // Xử lý file upload từ Multer (nếu có)
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const base64Image = file.buffer.toString("base64");
          const base64String = `data:${file.mimetype};base64,${base64Image}`;
          imagesToUpload.push(base64String);
        });
      }

      // Upload các ảnh mới (bao gồm URL và base64)
      const uploadPromises = imagesToUpload.map((image) =>
        limit(() =>
          cloudinary.uploader
            .upload(image, {
              folder: "e-commerce/products",
            })
            .catch((err) => {
              console.error(`Failed to upload image:`, err.message);
              return null;
            })
        )
      );
      const uploadResults = await Promise.all(uploadPromises);
      const newImages = uploadResults
        .filter((result) => result !== null)
        .map((result) => ({
          url: result.secure_url,
          public_id: result.public_id,
        }));

      // Kết hợp ảnh giữ lại và ảnh mới
      const imgInfos = [...imagesToKeep, ...newImages];

      // Xóa ảnh cũ không còn sử dụng
      const keptPublicIds = new Set(
        imgInfos.map((img) => img.public_id).filter((id) => id)
      );
      const imagesToDelete = existingProduct.images.filter(
        (img) => img.public_id && !keptPublicIds.has(img.public_id)
      );
      const deletePromises = imagesToDelete.map((img) =>
        cloudinary.uploader.destroy(img.public_id).catch((err) => {
          console.error(
            `Failed to delete image ${img.public_id}:`,
            err.message
          );
          return null;
        })
      );
      await Promise.all(deletePromises);

      // Kiểm tra ít nhất một ảnh
      if (imgInfos.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "At least one image is required" });
      }

      // Chuẩn bị dữ liệu cập nhật
      const updates = {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        images: imgInfos,
        brand: brand || existingProduct.brand,
        price: parseFloat(price) || existingProduct.price,
        oldPrice:
          oldPrice !== undefined
            ? parseFloat(oldPrice)
            : existingProduct.oldPrice,
        category: category || existingProduct.category,
        countInStock: parseInt(countInStock) || existingProduct.countInStock,
        rating: parseFloat(rating) || existingProduct.rating,
        isFeatured:
          isFeatured !== undefined ? isFeatured : existingProduct.isFeatured,
        updatedAt: Date.now(),
      };

      // Cập nhật sản phẩm
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updates,
        {
          new: true,
        }
      ).populate("category");

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
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
  }
);

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format" });
    }

    // Tìm và xóa sản phẩm
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Xóa ảnh liên quan trên Cloudinary
    if (deletedProduct.images && deletedProduct.images.length > 0) {
      const deletePromises = deletedProduct.images.map((img) => {
        if (img.public_id) {
          return cloudinary.uploader.destroy(img.public_id).catch((err) => {
            console.error(
              `Failed to delete image ${img.public_id}:`,
              err.message
            );
            return null; // Tiếp tục dù xóa lỗi
          });
        }
        return Promise.resolve(null); // Bỏ qua nếu không có public_id
      });
      await Promise.all(deletePromises);
    }

    res.status(200).json({
      success: true,
      message: "Product and associated images deleted successfully",
      data: { _id: productId }, // Trả về ID để frontend cập nhật
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format" });
    }

    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error.message,
    });
  }
});

module.exports = router;
