import axios from "axios";
import { handleApiError } from "./sweetAlert";

// Sử dụng biến môi trường để chuyển đổi giữa local và production
// Local: http://localhost:8888
// Production: https://ecommerce-u7gm.onrender.com
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8888";

// Hàm GET
export const fetchDataFromApi = async (url, showErrorAlert = true) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// Hàm POST
export const postDataToApi = async (url, payload, showErrorAlert = true) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// Hàm PUT (Update)
export const updateDataToApi = async (url, payload, showErrorAlert = true) => {
  try {
    console.log(`Sending PUT request to: ${API_BASE_URL}${url}`, payload);
    const { data } = await axios.put(`${API_BASE_URL}${url}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("PUT request successful:", data);
    return data;
  } catch (error) {
    console.error("PUT Error:", error.response?.data || error.message);
    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};

// Hàm DELETE
export const deleteDataFromApi = async (url, showErrorAlert = true) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("DELETE Error:", error.response?.data || error.message);
    if (showErrorAlert) {
      handleApiError(error);
    }
    throw error.response?.data || error;
  }
};
