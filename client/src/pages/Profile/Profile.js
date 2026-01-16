import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { MyContext } from "../../App";
import { updateDataToApi, formatCurrency } from "../../services/api";
import Swal from "sweetalert2";
import {
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaCheckCircle,
  FaSpinner,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

// Import Profile components
import {
  ProfileHeader,
  ProfileSidebar,
  AddressSearch,
  AddressForm,
  MapModal,
  PasswordForm,
  EmptyState,
} from "../../components/Profile";

// Import custom hooks
import { useImageUpload, useAddressSearch, useMapPicker } from "../../hooks";

const Profile = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Wishlist and Cart hooks
  const {
    items: wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();
  const { addToCart, isInCart } = useCart();

  // Set active tab from URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam &&
      ["profile", "orders", "wishlist", "password"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    email: "",
    avatar: "",
    address: {
      street: "",
      ward: "",
      district: "",
      city: "",
    },
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle address update from hooks
  const handleAddressUpdate = useCallback((addressParts) => {
    setProfileData((prev) => ({
      ...prev,
      address: addressParts,
    }));
  }, []);

  // Handle avatar update
  const handleAvatarUpdate = useCallback((url) => {
    setProfileData((prev) => ({
      ...prev,
      avatar: url,
    }));
  }, []);

  // Custom hooks
  const imageUpload = useImageUpload(handleAvatarUpdate);
  const addressSearch = useAddressSearch(handleAddressUpdate);
  const mapPicker = useMapPicker(handleAddressUpdate);

  // Redirect if not logged in
  useEffect(() => {
    if (!context.isLogin) {
      navigate("/signIn");
    }
  }, [context.isLogin, navigate]);

  // Initialize profile data from context
  useEffect(() => {
    if (context.user) {
      setProfileData({
        name: context.user.name || "",
        phone: context.user.phone || "",
        email: context.user.email || "",
        avatar: context.user.avatar || "",
        address: {
          street: context.user.address?.street || "",
          ward: context.user.address?.ward || "",
          district: context.user.address?.district || "",
          city: context.user.address?.city || "",
        },
      });
    }
  }, [context.user]);

  // Handle profile input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setProfileData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await updateDataToApi(
        "/api/users/profile",
        {
          name: profileData.name,
          phone: profileData.phone,
          avatar: profileData.avatar,
          address: profileData.address,
        },
        false
      );

      if (response.success) {
        context.setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsEditing(false);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirm password do not match",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateDataToApi(
        "/api/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        false
      );

      if (response.success) {
        localStorage.setItem("token", response.data.token);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been changed successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Change Failed",
        text: error.message || "Failed to change password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    imageUpload.clearPreview();
    addressSearch.clearSearch();

    if (context.user) {
      setProfileData({
        name: context.user.name || "",
        phone: context.user.phone || "",
        email: context.user.email || "",
        avatar: context.user.avatar || "",
        address: {
          street: context.user.address?.street || "",
          ward: context.user.address?.ward || "",
          district: context.user.address?.district || "",
          city: context.user.address?.city || "",
        },
      });
    }
  };

  if (!context.isLogin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <ProfileHeader
          name={profileData.name}
          email={profileData.email}
          avatar={profileData.avatar}
          previewImage={imageUpload.previewImage}
          isUploading={imageUpload.isUploading}
          onAvatarClick={imageUpload.openFileSelector}
          fileInputRef={imageUpload.fileInputRef}
          onFileChange={imageUpload.handleFileSelect}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-[#2bbef9] shadow-sm p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2bbef9] text-white rounded-lg hover:bg-[#1da8e0] transition-colors"
                      >
                        <FaEdit size={14} />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <FaTimes size={14} />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-4 py-2 bg-[#2bbef9] text-white rounded-lg hover:bg-[#1da8e0] transition-colors disabled:opacity-50"
                        >
                          <FaSave size={14} />
                          <span>{isLoading ? "Saving..." : "Save"}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2bbef9] focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                          <FaUserCircle className="text-gray-400" />
                          <span>{profileData.name || "Not set"}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                        <MdEmail className="text-gray-400" />
                        <span>{profileData.email || "Not set"}</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-white bg-emerald-500 px-2 py-0.5 rounded">
                          <FaCheckCircle className="text-white" />
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2bbef9] focus:border-transparent transition-all"
                          placeholder="Enter your phone"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                          <MdPhone className="text-gray-400" />
                          <span>{profileData.phone || "Not set"}</span>
                        </div>
                      )}
                    </div>

                    {/* Avatar Upload */}
                    {isEditing && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Profile Picture
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            {imageUpload.previewImage || profileData.avatar ? (
                              <img
                                src={
                                  imageUpload.previewImage || profileData.avatar
                                }
                                alt="Avatar"
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                <FaUserCircle className="text-gray-400 text-2xl" />
                              </div>
                            )}
                            {imageUpload.isUploading && (
                              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                <FaSpinner className="animate-spin text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <button
                              type="button"
                              onClick={imageUpload.openFileSelector}
                              disabled={imageUpload.isUploading}
                              className="px-4 py-2 bg-[#2bbef9] text-white text-sm rounded-lg hover:bg-[#1da8e0] transition-colors disabled:opacity-50"
                            >
                              {imageUpload.isUploading
                                ? "Uploading..."
                                : "Upload"}
                            </button>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, PNG or GIF. Max 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Address Section */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <MdLocationOn className="text-[#2bbef9]" />
                      Shipping Address
                    </h3>

                    {/* Address Search */}
                    {isEditing && (
                      <AddressSearch
                        searchQuery={addressSearch.searchQuery}
                        suggestions={addressSearch.suggestions}
                        showDropdown={addressSearch.showDropdown}
                        isSearching={addressSearch.isSearching}
                        onSearchChange={addressSearch.handleSearchChange}
                        onAddressSelect={addressSearch.handleAddressSelect}
                        onClear={addressSearch.clearSearch}
                        onFocus={addressSearch.handleFocus}
                        onOpenMap={mapPicker.openModal}
                      />
                    )}

                    {/* Address Form */}
                    <AddressForm
                      address={profileData.address}
                      isEditing={isEditing}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <EmptyState
                  icon={FaShoppingBag}
                  title="My Orders"
                  message="You haven't placed any orders yet"
                  buttonText="Start Shopping"
                />
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      My Wishlist ({wishlistItems.length} items)
                    </h2>
                    {wishlistItems.length > 0 && (
                      <button
                        onClick={() => {
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
                        }}
                        className="text-sm border py-1 px-3 rounded-xl flex items-center gap-2 text-red-500 hover:text-red-50 border-red-500 hover:bg-red-600 transition-colors"
                      > <FaTrash className="mr-2"/>
                        Clear All
                      </button>
                    )}
                  </div>

                  {wishlistItems.length === 0 ? (
                    <EmptyState
                      icon={FaHeart}
                      message="Your wishlist is empty"
                      buttonText="Browse Products"
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.map((item) => (
                        <div
                          key={item._id}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#2bbef9] transition-all duration-300"
                        >
                          {/* Product Image */}
                          <Link to={`/product/${item._id}`}>
                            <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                              <img
                                src={
                                  item.images?.[0]?.url ||
                                  "https://via.placeholder.com/300x300.png?text=No+Image"
                                }
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                              {item.oldPrice && item.price < item.oldPrice && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                  -
                                  {Math.round(
                                    ((item.oldPrice - item.price) /
                                      item.oldPrice) *
                                      100
                                  )}
                                  %
                                </span>
                              )}
                            </div>
                          </Link>

                          {/* Product Info */}
                          <Link to={`/product/${item._id}`}>
                            <h3 className="font-semibold text-gray-800 hover:text-[#2bbef9] transition-colors line-clamp-2 mb-2">
                              {item.name}
                            </h3>
                          </Link>

                          {/* Rating */}
                          {item.rating && (
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.round(item.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-xs text-gray-500">
                                ({item.rating})
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-base font-bold text-red-500">
                              {formatCurrency(item.price)}
                            </span>
                            {item.oldPrice > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatCurrency(item.oldPrice)}
                              </span>
                            )}
                          </div>

                          {/* Stock Status */}
                          <p
                            className={`text-xs font-medium mb-3 ${
                              item.countInStock > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {item.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </p>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                if (item.countInStock > 0) {
                                  addToCart(item, 1);
                                }
                              }}
                              disabled={item.countInStock <= 0}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                                item.countInStock <= 0
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : isInCart(item._id)
                                  ? "bg-emerald-500 text-white"
                                  : "bg-[#2bbef9] text-white hover:bg-[#1da8e0]"
                              }`}
                            >
                              <FaShoppingCart size={14} />
                              {isInCart(item._id) ? "In Cart" : "Add to Cart"}
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item._id)}
                              className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                              title="Remove from wishlist"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Change Password Tab */}
              {activeTab === "password" && (
                <PasswordForm
                  passwordData={passwordData}
                  isLoading={isLoading}
                  onChange={handlePasswordChange}
                  onSubmit={handleChangePassword}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <MapModal
        isOpen={mapPicker.showModal}
        onClose={mapPicker.closeModal}
        searchQuery={mapPicker.searchQuery}
        suggestions={mapPicker.suggestions}
        isLoading={mapPicker.isLoading}
        address={profileData.address}
        onSearch={mapPicker.handleSearch}
        onSearchSelect={mapPicker.selectSearchResult}
        onGetCurrentLocation={mapPicker.getCurrentLocation}
        onConfirm={mapPicker.confirmLocation}
      />
    </div>
  );
};

export default Profile;
