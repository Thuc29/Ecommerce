import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { showToast } from "../utils/sweetAlert";

const WishlistContext = createContext(null);

// Local storage key
const WISHLIST_STORAGE_KEY = "wishlist";

// Helper functions for local storage
const getLocalWishlist = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveLocalWishlist = (wishlist) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize wishlist from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const localWishlist = getLocalWishlist();
      setWishlist(localWishlist);
    } catch (error) {
      console.error("Error initializing wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add item to wishlist
  const addToWishlist = useCallback((product) => {
    if (!product || !product._id) return { success: false };

    setWishlist((prev) => {
      // Check if already in wishlist
      const exists = prev.items.some((item) => item._id === product._id);
      if (exists) {
        showToast("info", "Already in wishlist");
        return prev;
      }

      const newItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        images: product.images,
        rating: product.rating,
        countInStock: product.countInStock,
        brand: product.brand,
        addedAt: new Date().toISOString(),
      };

      const updated = {
        items: [...prev.items, newItem],
      };

      saveLocalWishlist(updated);
      showToast("success", "Added to wishlist!");
      return updated;
    });

    return { success: true };
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const updated = {
        items: prev.items.filter((item) => item._id !== productId),
      };
      saveLocalWishlist(updated);
      showToast("success", "Removed from wishlist");
      return updated;
    });

    return { success: true };
  }, []);

  // Toggle wishlist (add if not exists, remove if exists)
  const toggleWishlist = useCallback(
    (product) => {
      if (!product || !product._id) return { success: false };

      const exists = wishlist.items.some((item) => item._id === product._id);

      if (exists) {
        return removeFromWishlist(product._id);
      } else {
        return addToWishlist(product);
      }
    },
    [wishlist.items, addToWishlist, removeFromWishlist]
  );

  // Check if item is in wishlist
  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.items.some((item) => item._id === productId);
    },
    [wishlist.items]
  );

  // Clear entire wishlist
  const clearWishlist = useCallback(() => {
    setWishlist({ items: [] });
    saveLocalWishlist({ items: [] });
    showToast("success", "Wishlist cleared");
    return { success: true };
  }, []);

  // Get wishlist count
  const wishlistCount = wishlist.items.length;

  const value = {
    wishlist,
    items: wishlist.items,
    wishlistCount,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export default WishlistContext;
