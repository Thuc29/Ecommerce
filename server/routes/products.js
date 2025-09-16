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

    // Check if image is base64 string
    if (typeof image === "string" && image.startsWith("data:image")) {
      // Validate base64 image size (approximately 10MB limit)
      const base64Size = (image.length * 3) / 4;
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      if (base64Size > maxSize) {
        return res.status(413).json({
          success: false,
          message: "Image size too large. Maximum size is 10MB.",
        });
      }
    }

    // Upload to Cloudinary with optimized settings
    const result = await cloudinary.uploader.upload(image, {
      folder: "e-commerce/products",
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
      ],
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (err) {
    console.error("Backend image upload error:", err);

    // Handle specific Cloudinary errors
    if (err.http_code === 413) {
      return res.status(413).json({
        success: false,
        message: "Image file too large for upload",
        error: err.message,
      });
    }

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
      subcategory,
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
    // Validate subcategory ID if provided
    if (subcategory) {
      if (!mongoose.Types.ObjectId.isValid(subcategory)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid subcategory ID format" });
      }
      const foundSubcategory = foundCategory.subcategories.id(subcategory);
      if (!foundSubcategory) {
        return res
          .status(404)
          .json({ success: false, message: "Subcategory not found" });
      }
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
          resource_type: "auto",
          quality: "auto",
          fetch_format: "auto",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
          ],
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
      subcategory: subcategory || null,
      countInStock,
      rating: rating || 0,
      isFeatured: isFeatured || false,
      // Timestamps sẽ được tự động tạo bởi mongoose schema với { timestamps: true }
      // Nhưng chúng ta có thể set thủ công nếu cần
      createdAt: new Date(),
      updatedAt: new Date(),
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
        subcategory,
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

      // Validate subcategory if provided
      let subcategoryId = subcategory;
      if (subcategory) {
        if (!mongoose.Types.ObjectId.isValid(subcategory)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid subcategory ID format" });
        }
        const foundSubcategory = foundCategory.subcategories.id(subcategory);
        if (!foundSubcategory) {
          return res
            .status(404)
            .json({ success: false, message: "Subcategory not found" });
        }
      } else {
        subcategoryId = null;
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
              resource_type: "auto",
              quality: "auto",
              fetch_format: "auto",
              transformation: [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
              ],
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
        subcategory: subcategoryId,
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

// Get best selling products
router.get("/best-sellers", async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const bestSellers = await Product.find({ salesCount: { $gt: 0 } })
      .populate("category")
      .sort({ salesCount: -1 })
      .limit(parseInt(limit));

    if (!bestSellers || bestSellers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No best selling products found",
        data: [],
        count: 0,
      });
    }

    res.status(200).json({
      success: true,
      count: bestSellers.length,
      data: bestSellers,
    });
  } catch (error) {
    console.error("Error fetching best sellers:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching best sellers",
      error: error.message,
    });
  }
});

// Get new products (created within specified days)
router.get("/new", async (req, res) => {
  try {
    const { limit = 10, days = 30 } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days));

    const newProducts = await Product.find({
      createdAt: { $gte: daysAgo },
    })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    if (!newProducts || newProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No new products found in the last ${days} days`,
        data: [],
        count: 0,
        timeRange: {
          from: daysAgo.toISOString(),
          to: new Date().toISOString(),
          days: parseInt(days),
        },
      });
    }

    // Add time information to each product
    const productsWithTimeInfo = newProducts.map((product) => ({
      ...product.toObject(),
      timeInfo: {
        createdAt: product.createdAt,
        daysAgo: Math.floor(
          (new Date() - product.createdAt) / (1000 * 60 * 60 * 24)
        ),
        hoursAgo: Math.floor(
          (new Date() - product.createdAt) / (1000 * 60 * 60)
        ),
        isNew: new Date() - product.createdAt < 24 * 60 * 60 * 1000, // Less than 24 hours
      },
    }));

    res.status(200).json({
      success: true,
      count: newProducts.length,
      data: productsWithTimeInfo,
      timeRange: {
        from: daysAgo.toISOString(),
        to: new Date().toISOString(),
        days: parseInt(days),
      },
    });
  } catch (error) {
    console.error("Error fetching new products:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching new products",
      error: error.message,
    });
  }
});

// Get products by time range
router.get("/by-time", async (req, res) => {
  try {
    const {
      limit = 10,
      startDate,
      endDate,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    let query = {};

    // Build date range query
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const products = await Product.find(query)
      .populate("category")
      .sort(sort)
      .limit(parseInt(limit));

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for the specified time range",
        data: [],
        count: 0,
        query: {
          startDate: startDate || null,
          endDate: endDate || null,
          sortBy,
          sortOrder,
        },
      });
    }

    // Add time information to each product
    const productsWithTimeInfo = products.map((product) => ({
      ...product.toObject(),
      timeInfo: {
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        daysAgo: Math.floor(
          (new Date() - product.createdAt) / (1000 * 60 * 60 * 24)
        ),
        hoursAgo: Math.floor(
          (new Date() - product.createdAt) / (1000 * 60 * 60)
        ),
        isNew: new Date() - product.createdAt < 24 * 60 * 60 * 1000, // Less than 24 hours
        isRecent: new Date() - product.createdAt < 7 * 24 * 60 * 60 * 1000, // Less than 7 days
      },
    }));

    res.status(200).json({
      success: true,
      count: products.length,
      data: productsWithTimeInfo,
      query: {
        startDate: startDate || null,
        endDate: endDate || null,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("Error fetching products by time:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products by time",
      error: error.message,
    });
  }
});

// Get recently added products (last 24 hours)
router.get("/recent", async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    const recentProducts = await Product.find({
      createdAt: { $gte: oneDayAgo },
    })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    if (!recentProducts || recentProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No recent products found in the last 24 hours",
        data: [],
        count: 0,
      });
    }

    // Add time information to each product
    const productsWithTimeInfo = recentProducts.map((product) => ({
      ...product.toObject(),
      timeInfo: {
        createdAt: product.createdAt,
        hoursAgo: Math.floor(
          (new Date() - product.createdAt) / (1000 * 60 * 60)
        ),
        minutesAgo: Math.floor((new Date() - product.createdAt) / (1000 * 60)),
        isVeryNew: new Date() - product.createdAt < 60 * 60 * 1000, // Less than 1 hour
      },
    }));

    res.status(200).json({
      success: true,
      count: recentProducts.length,
      data: productsWithTimeInfo,
      timeRange: {
        from: oneDayAgo.toISOString(),
        to: new Date().toISOString(),
        hours: 24,
      },
    });
  } catch (error) {
    console.error("Error fetching recent products:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching recent products",
      error: error.message,
    });
  }
});

// Update product sales count (for when orders are placed)
router.put("/:id/update-sales", async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { salesCount: quantity } },
      { new: true }
    ).populate("category");

    res.status(200).json({
      success: true,
      message: "Sales count updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating sales count:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating sales count",
      error: error.message,
    });
  }
});

// Get trending products (based on sales count and rating)
router.get("/trending", async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get trending products based on sales count, rating, and recent activity
    const trendingProducts = await Product.find({
      $or: [
        { salesCount: { $gt: 0 } }, // Products with sales
        { rating: { $gte: 4 } }, // High-rated products
        { isFeatured: true }, // Featured products
      ],
    })
      .populate("category")
      .sort({
        salesCount: -1, // Sort by sales count first
        rating: -1, // Then by rating
        createdAt: -1, // Then by creation date
      })
      .limit(parseInt(limit));

    if (!trendingProducts || trendingProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No trending products found",
        data: [],
        count: 0,
      });
    }

    // Add trending score calculation
    const productsWithTrendingScore = trendingProducts.map((product) => {
      const trendingScore =
        product.salesCount * 0.4 +
        product.rating * 0.3 +
        (product.isFeatured ? 10 : 0) +
        (new Date() - product.createdAt < 7 * 24 * 60 * 60 * 1000 ? 5 : 0); // Bonus for recent products

      return {
        ...product.toObject(),
        trendingScore: Math.round(trendingScore * 100) / 100,
      };
    });

    // Sort by trending score
    productsWithTrendingScore.sort((a, b) => b.trendingScore - a.trendingScore);

    res.status(200).json({
      success: true,
      count: productsWithTrendingScore.length,
      data: productsWithTrendingScore,
    });
  } catch (error) {
    console.error("Error fetching trending products:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching trending products",
      error: error.message,
    });
  }
});

// Get featured products (isFeatured = true)
router.get("/featured", async (req, res) => {
  try {
    const { limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query;
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const featured = await Product.find({ isFeatured: true })
      .populate("category")
      .sort(sort)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      count: featured.length,
      data: featured,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching featured products",
      error: error.message,
    });
  }
});

// Get distinct brands from products
router.get("/brands", async (req, res) => {
  try {
    const brands = await Product.aggregate([
      {
        $group: {
          _id: {
            $toUpper: { $trim: { input: "$brand" } },
          },
          count: { $sum: 1 },
        },
      },
      { $match: { _id: { $ne: null } } },
      { $sort: { _id: 1 } },
    ]);

    const data = brands.map((b) => ({ name: b._id, count: b.count }));

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching brands",
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
