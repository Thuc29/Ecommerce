import React from "react";
import { FaCamera, FaSpinner } from "react-icons/fa";

/**
 * Profile header component with avatar and user info
 */
const ProfileHeader = ({
  name,
  email,
  avatar,
  previewImage,
  isUploading,
  onAvatarClick,
  fileInputRef,
  onFileChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#2bbef9] to-[#764ba2] rounded-2xl p-6 mb-6 text-white">
      <div className="flex items-center gap-4">
        <div className="relative">
          {previewImage || avatar ? (
            <img
              src={previewImage || avatar}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
              <span className="text-3xl font-bold">
                {name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={onAvatarClick}
            disabled={isUploading}
            className="absolute bottom-0 right-0 bg-white text-[#2bbef9] p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
          >
            {isUploading ? (
              <FaSpinner size={12} className="animate-spin" />
            ) : (
              <FaCamera size={12} />
            )}
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name || "User"}</h1>
          <p className="text-white/80">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
