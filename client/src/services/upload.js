import axios from "axios";
import { handleApiError } from "../utils/sweetAlert";
import { API_BASE_URL, getAuthHeaders } from "./http";

// Upload single image
export const uploadImage = async (file, showErrorAlert = true) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      `${API_BASE_URL}/api/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(),
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// Upload multiple images
export const uploadImages = async (files, showErrorAlert = true) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await axios.post(
      `${API_BASE_URL}/api/upload/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(),
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// Delete image by public_id
export const deleteImage = async (publicId, showErrorAlert = true) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/api/upload/${publicId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.error("Delete Error:", error.response?.data || error.message);

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};
