import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../Theme/ThemeContext";
import { postDataToApi } from "../../utils/api";
import { FaCloudUploadAlt, FaHome } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
function CategoryAdd() {
  const { theme } = useTheme();
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    color: "",
  });
  const [imageType, setImageType] = useState("url");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");
    try {
      console.log("Sending data:", formFields);
      const response = await postDataToApi("/api/category/create", formFields);
      console.log("Response from API:", response);
      window.alert("✅ Thêm danh mục thành công!");
      setFormFields({ name: "", images: [], color: "" });
      navigate("/category-list");
    } catch (error) {
      window.alert("❌ Thêm danh mục thất bại. Vui lòng thử lại.");
      console.error("Failed to add category:", error.response || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unknown error occurred"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormFields((prev) => ({
        ...prev,
        images: value ? [value] : [],
      }));
    } else {
      setFormFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormFields((prev) => ({
          ...prev,
          images: [reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
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
        <p className="font-extrabold text-2xl">Add Category</p>
        <div className="flex gap-2">
          <Button className="!shadow-sm bg-gray-300 !rounded-lg !flex px-2 !items-center !gap-2">
            <FaHome /> Home
          </Button>
          /
          <Button className="!shadow-sm bg-gray-300 !px-2 flex !rounded-lg">
            Category
          </Button>
          /
          <Button className="shadow-sm bg-gray-100 px-2 rounded-lg" disabled>
            Add Category
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
              {/* Category Name */}
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Category Name
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

              {/* Image section */}
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Image
                </label>
                <div className="mb-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="url"
                      checked={imageType === "url"}
                      onChange={() => setImageType("url")}
                    />
                    URL
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="upload"
                      checked={imageType === "upload"}
                      onChange={() => setImageType("upload")}
                    />
                    Upload
                  </label>
                </div>

                {imageType === "url" && (
                  <input
                    type="url"
                    className={`w-full h-[45px] mb-4 p-3 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gray-700 text-gray-200"
                    }`}
                    placeholder="https://example.com/image.jpg"
                    name="images"
                    value={formFields.images[0] || ""}
                    onChange={handleInputChange}
                  />
                )}

                {imageType === "upload" && (
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full mb-4"
                    onChange={handleFileUpload}
                  />
                )}

                {formFields.images[0] && (
                  <img
                    src={formFields.images[0]}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Color */}
              <div className="mb-4">
                <label
                  className={`block text-xs font-bold mb-1 uppercase ${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Color
                </label>
                <input
                  type="text"
                  className={`w-full h-[45px] p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-700 text-gray-200"
                  }`}
                  placeholder="Type here (e.g., #FF0000)"
                  name="color"
                  value={formFields.color}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="!w-full py-2 flex items-center justify-center gap-2 flex-row bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                <FaCloudUploadAlt size={23} /> Add Category
              </button>

              {/* Status */}
              {submitStatus === "success" && (
                <p className="mt-4 text-green-500">
                  ✅ Category added successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-4 text-red-500">
                  ❌ Failed to add category: {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryAdd;
