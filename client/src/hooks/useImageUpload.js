import { useState, useRef, useCallback } from "react";
import { uploadImage } from "../services/upload";
import Swal from "sweetalert2";

/**
 * Custom hook for handling image upload functionality
 * @param {Function} onUploadSuccess - Callback when upload succeeds
 * @returns {Object} Upload state and handlers
 */
export const useImageUpload = (onUploadSuccess) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Trigger file input click
  const openFileSelector = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Reset preview
  const clearPreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please select an image file",
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Image size should be less than 5MB",
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload image
      setIsUploading(true);
      try {
        const response = await uploadImage(file);
        if (response.success) {
          onUploadSuccess?.(response.data.url);
          Swal.fire({
            icon: "success",
            title: "Image Uploaded",
            text: "Your image has been uploaded successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        setPreviewImage(null);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: error.message || "Failed to upload image",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadSuccess]
  );

  return {
    isUploading,
    previewImage,
    fileInputRef,
    openFileSelector,
    clearPreview,
    handleFileSelect,
  };
};

export default useImageUpload;
