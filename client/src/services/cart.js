import {
  fetchDataFromApi,
  postDataToApi,
  updateDataToApi,
  deleteDataFromApi,
} from "./http";

// Local storage key for guest cart
const CART_STORAGE_KEY = "guest_cart";

// Get cart from localStorage (for guests)
export const getLocalCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : { items: [], totalItems: 0, totalPrice: 0 };
  } catch (error) {
    console.error("Error reading local cart:", error);
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
};

// Save cart to localStorage (for guests)
export const saveLocalCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving local cart:", error);
  }
};

// Clear local cart
export const clearLocalCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing local cart:", error);
  }
};

// Calculate cart totals
export const calculateCartTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

// API calls for authenticated users
export const cartApi = {
  // Get user's cart from server
  getCart: async () => {
    const response = await fetchDataFromApi("/api/cart", false);
    return response;
  },

  // Add item to cart
  addItem: async (productId, quantity = 1) => {
    const response = await postDataToApi(
      "/api/cart/add",
      { productId, quantity },
      false
    );
    return response;
  },

  // Update item quantity
  updateItem: async (productId, quantity) => {
    const response = await updateDataToApi(
      "/api/cart/update",
      { productId, quantity },
      false
    );
    return response;
  },

  // Remove item from cart
  removeItem: async (productId) => {
    const response = await deleteDataFromApi(
      `/api/cart/remove/${productId}`,
      false
    );
    return response;
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await deleteDataFromApi("/api/cart/clear", false);
    return response;
  },

  // Sync local cart with server (after login)
  syncCart: async (items) => {
    const response = await postDataToApi("/api/cart/sync", { items }, false);
    return response;
  },

  // Get cart count
  getCount: async () => {
    const response = await fetchDataFromApi("/api/cart/count", false);
    return response;
  },
};
