import React, { useState } from "react";
import MediaAndPublished from "./MediaAndPublished";
import Infomation from "./Infomation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import { Button } from "react-bootstrap";
import { FaHome, FaIcons, FaPlus } from "react-icons/fa";
import {
  showSuccess,
  showError,
  showSuccessMessages,
  showErrorMessages,
} from "../../../utils/sweetAlert";

function ProductUpload() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleImagesChange = (images) => {
    setImages(images);
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.countInStock
    ) {
      showError(
        "Validation Error",
        "Please fill in all required fields (Name, Price, Category, Stock)"
      );
      return;
    }
    const uploadedImages = images.filter((img) => img !== null); // Lọc bỏ các ô chưa có ảnh
    if (uploadedImages.length === 0) {
      showError("Validation Error", "Please upload at least one image");
      return;
    }

    try {
      setError("");
      setSuccess("");
      const productData = {
        ...formData,
        images: uploadedImages.map((img) => img.url), // Chỉ gửi URL của các ảnh đã tải lên
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock),
        rating: formData.rating || 0,
        isFeatured:
          formData.isFeatured === "true" || formData.isFeatured === true,
        // Timestamps sẽ được tự động tạo bởi MongoDB schema
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await axios.post(
        "https://ecommerce-u7gm.onrender.com/api/products/create",
        productData
      );
      if (response.data.success) {
        showSuccessMessages.productCreated();
        setTimeout(() => navigate("/product-list"), 1000); // Chuyển hướng sau 1 giây
      }
    } catch (err) {
      showErrorMessages.productCreateFailed();
      setError(err.response?.data?.message || "Failed to create product");
      console.error(err);
    }
  };

  return (
    <>
      <div className="px-7 w-full">
        <div className="shadow rounded-lg flex justify-between border p-3 my-4 mx-0">
          <p className="font-extrabold text-2xl">Product Upload</p>
          <div className="flex gap-2">
            <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 dark:!text-white !rounded-lg !flex px-2 !items-center !gap-2">
              <FaHome /> Dashboard
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Button className="!shadow-sm gap-2 items-center bg-gray-300 dark:bg-gray-400 dark:!text-white !px-2 flex !rounded-lg">
              <FaIcons /> Category
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            {/* <Link to={"/product-upload"}> */}
            <Button
              variant="primary"
              className="flex bg-gray-200 dark:bg-gray-500 dark:!text-white p-2 rounded-lg items-center gap-2"
            >
              <FaPlus /> Add Product
            </Button>
            {/* </Link> */}
          </div>
        </div>

        <Infomation onFormChange={handleFormChange} />
        <MediaAndPublished onImagesChange={handleImagesChange} />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 w-full mt-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <MdCloudUpload size={25} />
          <span>Publish and View</span>
        </button>
      </div>
    </>
  );
}

export default ProductUpload;
