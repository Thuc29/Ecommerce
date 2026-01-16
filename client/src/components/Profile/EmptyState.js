import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Empty state component for orders/wishlist
 */
const EmptyState = ({ icon: Icon, title, message, buttonText }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center py-12">
        <Icon className="mx-auto text-6xl text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">{message}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#2bbef9] text-white rounded-lg hover:bg-[#1da8e0] transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
