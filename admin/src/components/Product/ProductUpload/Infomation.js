import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { useTheme } from "../../Theme/ThemeContext";
import axios from "axios";
import { formatPriceNumber, convertToVND } from "../../../utils/formatPrice";

function Infomation({ onFormChange }) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    brand: "",
    oldPrice: "",
    price: "",
    countInStock: "",
    isFeatured: false,
    rating: 0,
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/category`);
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch categories");
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categories.find(
        (cat) => cat._id === formData.category
      );
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
      // Reset subcategory if category changes
      if (formData.subcategory) {
        const updatedFormData = { ...formData, subcategory: "" };
        setFormData(updatedFormData);
        onFormChange(updatedFormData);
      }
    } else {
      setSubcategories([]);
    }
  }, [formData.category, categories]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Convert price fields to VND (multiply by 1000)
    if (name === "price" || name === "oldPrice") {
      // If empty, set to empty string (optional field)
      if (value === "" || value === null || value === undefined) {
        processedValue = "";
      } else {
        const converted = convertToVND(value);
        processedValue = converted !== null ? converted : "";
      }
    }

    const updatedFormData = { ...formData, [name]: processedValue };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  // Handle rating changes
  const handleRatingChange = (event, newValue) => {
    const updatedFormData = { ...formData, rating: newValue };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  return (
    <>
      <div className="w-full">
        <div className="lg:col-span-2">
          <div
            className={`p-5 rounded-lg shadow-md delay-[.3s] ${
              theme === "light" ? "bg-white" : "bg-[#1d2f4d]"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Basic Information
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label
                className={`block text-xs font-bold mb-1 uppercase ${
                  theme === "light" ? "text-gray-900" : "text-gray-200"
                }`}
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-gray-700 text-gray-200"
                }`}
                placeholder="Type here"
              />
            </div>
            <div className="mb-4">
              <label
                className={`block text-xs font-bold mb-1 uppercase ${
                  theme === "light" ? "text-gray-900" : "text-gray-200"
                }`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full h-[150px] mb-4 py-[10px] px-[15px] rounded-lg ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-gray-700 text-gray-200"
                }`}
                rows="4"
                placeholder="Type here..."
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full h-[45px] mb-4 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className={`w-full h-[45px] mb-4 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                  disabled={!formData.category}
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                  placeholder="Type here"
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Old Price (x1000 VND)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="oldPrice"
                    onChange={handleChange}
                    className={`w-full h-[45px] mb-1 p-3 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gray-700 text-gray-200"
                    }`}
                    placeholder="VD: 12 = 12.000đ"
                  />
                  {formData.oldPrice > 0 && (
                    <p className="text-xs text-green-600 mb-3">
                      = {formatPriceNumber(formData.oldPrice)}đ
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Price (x1000 VND)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    className={`w-full h-[45px] mb-1 p-3 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gray-700 text-gray-200"
                    }`}
                    placeholder="VD: 12 = 12.000đ"
                  />
                  {formData.price > 0 && (
                    <p className="text-xs text-green-600 mb-3">
                      = {formatPriceNumber(formData.price)}đ
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Product Stock
                </label>
                <input
                  type="number"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleChange}
                  className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                  placeholder="Type here"
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Is Featured
                </label>
                <select
                  name="isFeatured"
                  value={formData.isFeatured}
                  onChange={handleChange}
                  className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Rating
                </label>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  size="large"
                  sx={{
                    color: theme === "light" ? "#f59e0b" : "#facc15",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Infomation;
