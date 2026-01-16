import axios from "axios";
import { handleApiError } from "../utils/sweetAlert";

// API Base URL configuration - Auto detect environment
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:9000"
    : "https://ecommerce-u7gm.onrender.com");

// Client URL - Auto detect for payment redirects
export const CLIENT_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://ecommerce-rho-taupe.vercel.app";

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Handle token expiration
const handleTokenExpiration = () => {
  const currentPath = window.location.pathname;

  if (currentPath === "/login" || currentPath === "/register") {
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// GET request
export const fetchDataFromApi = async (url, showErrorAlert = true) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}${url}`, {
      headers: getAuthHeaders(),
    });
    return data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      handleTokenExpiration();
    }

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// POST request
export const postDataToApi = async (url, payload, showErrorAlert = true) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      handleTokenExpiration();
    }

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// PUT request
export const updateDataToApi = async (url, payload, showErrorAlert = true) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return data;
  } catch (error) {
    console.error("PUT Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      handleTokenExpiration();
    }

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// DELETE request
export const deleteDataFromApi = async (url, showErrorAlert = true) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}${url}`, {
      headers: getAuthHeaders(),
    });
    return data;
  } catch (error) {
    console.error("DELETE Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      handleTokenExpiration();
    }

    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};
