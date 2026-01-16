const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");
const { verifyToken, optionalAuth } = require("../middleware/auth");

// GET /api/cart - Get user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.getOrCreateCart(req.user._id);

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
});

// POST /api/cart/add - Add item to cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.countInStock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.countInStock} items available in stock`,
      });
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if adding would exceed stock
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    const currentQty = existingItem ? existingItem.quantity : 0;
    if (currentQty + quantity > product.countInStock) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more. Only ${product.countInStock - currentQty} more available`,
      });
    }

    // Add item to cart
    await cart.addItem(productId, quantity, product.price);

    // Populate and return updated cart
    const updatedCart = await Cart.getOrCreateCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
});

// PUT /api/cart/update - Update item quantity
router.put("/update", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    // Check stock if increasing quantity
    if (quantity > 0) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (quantity > product.countInStock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.countInStock} items available in stock`,
        });
      }
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.updateItemQuantity(productId, quantity);

    const updatedCart = await Cart.getOrCreateCart(req.user._id);

    res.status(200).json({
      success: true,
      message: quantity > 0 ? "Cart updated" : "Item removed from cart",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
});

// DELETE /api/cart/remove/:productId - Remove item from cart
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.removeItem(productId);

    const updatedCart = await Cart.getOrCreateCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
});

// DELETE /api/cart/clear - Clear entire cart
router.delete("/clear", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.clearCart();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
});

// POST /api/cart/sync - Sync local cart with server (for when user logs in)
router.post("/sync", verifyToken, async (req, res) => {
  try {
    const { items } = req.body; // Array of { productId, quantity }

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Items array is required",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Merge local items with server cart
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product && product.countInStock >= item.quantity) {
        const existingItem = cart.items.find(
          (cartItem) => cartItem.product.toString() === item.productId
        );

        if (existingItem) {
          // Keep the higher quantity (user intent)
          existingItem.quantity = Math.max(existingItem.quantity, item.quantity);
          existingItem.price = product.price;
        } else {
          cart.items.push({
            product: item.productId,
            quantity: item.quantity,
            price: product.price,
          });
        }
      }
    }

    await cart.save();

    const updatedCart = await Cart.getOrCreateCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart synced successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error syncing cart",
      error: error.message,
    });
  }
});

// GET /api/cart/count - Get cart item count (quick endpoint)
router.get("/count", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    res.status(200).json({
      success: true,
      data: {
        count: cart ? cart.totalItems : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart count",
      error: error.message,
    });
  }
});

module.exports = router;
