import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../Theme/ThemeContext";
import { postDataToApi, fetchDataFromApi } from "../../utils/api";
import { FaCloudUploadAlt, FaHome, FaIcons, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SubCategoryAdd() {
  const { theme } = useTheme();
  const [formFields, setFormFields] = useState({
    name: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch categories for the dropdown
  const getCategories = async () => {
    try {
      const response = await fetchDataFromApi("/api/category");
      if (response.success && Array.isArray(response.data)) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorMessage(
        error.message || "Failed to load categories. Please try again."
      );
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");
    try {
      const { name, categoryId } = formFields;
      if (!name || !categoryId) {
        throw new Error("Subcategory name and category are required.");
      }

      const response = await postDataToApi(
        `/api/category/${categoryId}/subcategories`,
        { name }
      );
      window.alert("✅ Thêm danh mục phụ thành công!");
      setFormFields({ name: "", categoryId: "" });
      navigate("/sub-category-list");
    } catch (error) {
      window.alert("❌ Thêm danh mục phụ thất bại. Vui lòng thử lại.");
      console.error(
        "Failed to add subcategory:",
        error.response || error.message
      );
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unknown error occurred"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCategories();
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div className="px-7 w-full font-[Space_Grotesk]">
      <div className="shadow flex flex-row justify-between items-center rounded-lg border p-4 my-4">
        <p className="font-extrabold text-2xl">Add Subcategory</p>
        <div className="flex gap-2">
          <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 !rounded-lg !flex px-2 !items-center !gap-2">
            <FaHome /> Home
          </Button>
          /
          <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 !rounded-lg !flex px-2 !items-center !gap-2">
            <FaIcons /> Category
          </Button>
          /
          <Button
            className="shadow-sm flex items-center gap-2 bg-gray-100 dark:bg-gray-400 px-2 rounded-lg"
            disabled
          >
            <FaPlus /> Subcategory
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className={`p-5 rounded-lg shadow-md transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-[#1d2f4d]"
            }`}
          >
            <form onSubmit={handleAdd}>
              {/* Parent Category Selection */}
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Parent Category
                </label>
                <select
                  className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                  name="categoryId"
                  value={formFields.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Name */}
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Subcategory Name
                </label>
                <input
                  type="text"
                  className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                  placeholder="Type here"
                  name="name"
                  value={formFields.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="!w-full py-2 flex items-center justify-center gap-2 flex-row bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                <FaCloudUploadAlt size={23} /> Add Subcategory
              </button>

              {/* Status */}
              {submitStatus === "success" && (
                <p className="mt-4 text-green-500">
                  ✅ Subcategory added successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-4 text-red-500">
                  ❌ Failed to add subcategory: {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryAdd;
