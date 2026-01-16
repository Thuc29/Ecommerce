import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import {
  cartApi,
  getLocalCart,
  saveLocalCart,
  clearLocalCart,
  calculateCartTotals,
} from "../services/cart";
import { showToast } from "../utils/sweetAlert";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch cart from server (for authenticated users)
  const fetchServerCart = useCallback(async () => {
    try {
      const response = await cartApi.getCart();
      if (response.success) {
        setCart({
          items: response.data.items || [],
          totalItems: response.data.totalItems || 0,
          totalPrice: response.data.totalPrice || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Fall back to local cart on error
      setCart(getLocalCart());
    }
  }, []);

  // Sync local cart to server after login
  const syncLocalCartToServer = useCallback(async () => {
    const localCart = getLocalCart();
    if (localCart.items.length > 0) {
      try {
        const itemsToSync = localCart.items.map((item) => ({
          productId: item.product._id || item.product,
          quantity: item.quantity,
        }));

        const response = await cartApi.syncCart(itemsToSync);
        if (response.success) {
          clearLocalCart(); // Clear local cart after successful sync
          return response.data;
        }
      } catch (error) {
        console.error("Error syncing cart:", error);
      }
    }
    return null;
  }, []);

  // Initialize cart based on auth state
  useEffect(() => {
    const initCart = async () => {
      if (authLoading) return;

      setIsLoading(true);
      try {
        if (isAuthenticated) {
          // First sync any local cart items, then fetch server cart
          await syncLocalCartToServer();
          await fetchServerCart();
        } else {
          // Load from localStorage for guests
          setCart(getLocalCart());
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
        setCart(getLocalCart());
      } finally {
        setIsLoading(false);
      }
    };

    initCart();
  }, [isAuthenticated, authLoading, fetchServerCart, syncLocalCartToServer]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    setIsUpdating(true);
    try {
      if (isAuthenticated) {
        // API call for authenticated users
        const response = await cartApi.addItem(product._id, quantity);
        if (response.success) {
          setCart({
            items: response.data.items || [],
            totalItems: response.data.totalItems || 0,
            totalPrice: response.data.totalPrice || 0,
          });
          showToast("success", "Added to cart!");
          return { success: true };
        }
        showToast("error", response.message || "Failed to add to cart");
        return { success: false, message: response.message };
      } else {
        // Local storage for guests
        const localCart = getLocalCart();
        const existingItemIndex = localCart.items.findIndex(
          (item) =>
            (item.product._id || item.product) === product._id
        );

        if (existingItemIndex > -1) {
          localCart.items[existingItemIndex].quantity += quantity;
        } else {
          localCart.items.push({
            product: {
              _id: product._id,
              name: product.name,
              images: product.images,
              price: product.price,
              oldPrice: product.oldPrice,
              countInStock: product.countInStock,
              rating: product.rating,
              brand: product.brand,
            },
            quantity,
            price: product.price,
          });
        }

        const totals = calculateCartTotals(localCart.items);
        const updatedCart = { ...localCart, ...totals };
        saveLocalCart(updatedCart);
        setCart(updatedCart);
        showToast("success", "Added to cart!");
        return { success: true };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", error.message || "Failed to add to cart");
      return { success: false, message: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    setIsUpdating(true);
    try {
      if (isAuthenticated) {
        const response = await cartApi.updateItem(productId, quantity);
        if (response.success) {
          setCart({
            items: response.data.items || [],
            totalItems: response.data.totalItems || 0,
            totalPrice: response.data.totalPrice || 0,
          });
          return { success: true };
        }
        showToast("error", response.message || "Failed to update cart");
        return { success: false, message: response.message };
      } else {
        const localCart = getLocalCart();
        const itemIndex = localCart.items.findIndex(
          (item) => (item.product._id || item.product) === productId
        );

        if (itemIndex > -1) {
          if (quantity <= 0) {
            localCart.items.splice(itemIndex, 1);
          } else {
            localCart.items[itemIndex].quantity = quantity;
          }

          const totals = calculateCartTotals(localCart.items);
          const updatedCart = { ...localCart, ...totals };
          saveLocalCart(updatedCart);
          setCart(updatedCart);
          return { success: true };
        }
        return { success: false, message: "Item not found in cart" };
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      showToast("error", error.message || "Failed to update cart");
      return { success: false, message: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    setIsUpdating(true);
    try {
      if (isAuthenticated) {
        const response = await cartApi.removeItem(productId);
        if (response.success) {
          setCart({
            items: response.data.items || [],
            totalItems: response.data.totalItems || 0,
            totalPrice: response.data.totalPrice || 0,
          });
          showToast("success", "Item removed from cart");
          return { success: true };
        }
        showToast("error", response.message || "Failed to remove item");
        return { success: false, message: response.message };
      } else {
        const localCart = getLocalCart();
        localCart.items = localCart.items.filter(
          (item) => (item.product._id || item.product) !== productId
        );

        const totals = calculateCartTotals(localCart.items);
        const updatedCart = { ...localCart, ...totals };
        saveLocalCart(updatedCart);
        setCart(updatedCart);
        showToast("success", "Item removed from cart");
        return { success: true };
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      showToast("error", error.message || "Failed to remove item");
      return { success: false, message: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    setIsUpdating(true);
    try {
      if (isAuthenticated) {
        const response = await cartApi.clearCart();
        if (response.success) {
          setCart({
            items: [],
            totalItems: 0,
            totalPrice: 0,
          });
          return { success: true };
        }
        return { success: false, message: response.message };
      } else {
        clearLocalCart();
        setCart({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
        return { success: true };
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, message: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  // Get quantity of specific item in cart
  const getItemQuantity = (productId) => {
    const item = cart.items.find(
      (item) => (item.product._id || item.product) === productId
    );
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cart.items.some(
      (item) => (item.product._id || item.product) === productId
    );
  };

  const value = {
    cart,
    items: cart.items,
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    isLoading,
    isUpdating,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    refreshCart: fetchServerCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
