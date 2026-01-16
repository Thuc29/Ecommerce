import React from "react";
import { FaUserCircle, FaShoppingBag, FaHeart, FaLock } from "react-icons/fa";

const TABS = [
  { id: "profile", label: "Profile", icon: FaUserCircle },
  { id: "orders", label: "My Orders", icon: FaShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: FaHeart },
  { id: "password", label: "Change Password", icon: FaLock },
];

/**
 * Profile sidebar with navigation tabs
 */
const ProfileSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                activeTab === tab.id
                  ? "bg-[#2bbef9] text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span
                className={activeTab === tab.id ? "text-white" : "text-gray-500"}
              >
                <Icon />
              </span>
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSidebar;
