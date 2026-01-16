import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../services/api";
import EmptyState from "./EmptyState";

const ProfileWishlist = () => {
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleClearWishlist = () => {
    Swal.fire({
      title: "Clear Wishlist?",
      text: "Are you sure you want to remove all items from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear all",
    }).then((result) => {
      if (result.isConfirmed) {
        clearWishlist();
      }
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <EmptyState
        icon={FaHeart}
        title="Wishlist is Empty"
        message="Your wishlist is empty. Start adding products you love!"
        buttonText="Browse Products"
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          My Wishlist ({wishlistItems.length} items)
        </h2>
        <button
          onClick={handleClearWishlist}
          className="text-sm border py-1.5 px-4 rounded-xl flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium"
        >
          <FaTrash size={12} />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2bbef9] transition-all duration-300 group relative overflow-hidden"
          >
            {/* Discount Badge */}
            {item.oldPrice && item.price < item.oldPrice && (
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
              </div>
            )}

            {/* Product Image */}
            <Link to={`/product/${item._id}`}>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
                <img
                  src={item.images?.[0]?.url || "https://via.placeholder.com/300x300.png?text=No+Image"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            {/* Product Info */}
            <div className="space-y-2">
              <Link to={`/product/${item._id}`}>
                <h3 className="font-semibold text-gray-800 hover:text-[#2bbef9] transition-colors line-clamp-2 text-sm h-10">
                  {item.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.round(item.rating || 0) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">({item.rating || 0})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-red-600">
                  {formatCurrency(item.price)}
                </span>
                {item.oldPrice > item.price && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatCurrency(item.oldPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full ${item.countInStock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`text-[10px] font-medium ${item.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {item.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => item.countInStock > 0 && addToCart(item, 1)}
                  disabled={item.countInStock <= 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    item.countInStock <= 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isInCart(item._id)
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-[#2bbef9] text-white hover:bg-[#1da8e0] shadow-sm hover:shadow-md"
                  }`}
                >
                  <FaShoppingCart size={12} />
                  {isInCart(item._id) ? "In Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-100"
                  title="Remove from wishlist"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileWishlist;
