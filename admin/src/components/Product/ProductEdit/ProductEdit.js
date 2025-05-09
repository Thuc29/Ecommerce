import React, { useState, useEffect } from "react";
import MediaAndPublished from "./MediaAndPublished";
import Infomation from "./Infomation";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import { Button } from "react-bootstrap";
import { FaHome, FaIcons, FaPlus } from "react-icons/fa";

function ProductEdit() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { productId } = useParams(); // Lấy productId từ URL

  // Lấy thông tin sản phẩm cũ
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8888/api/products/${productId}`
        );
        if (response.data.success) {
          const product = response.data.data;
          // Khởi tạo formData với dữ liệu sản phẩm
          setFormData({
            name: product.name || "",
            description: product.description || "",
            category: product.category?._id || product.category || "",
            brand: product.brand || "",
            oldPrice: product.oldPrice || "",
            price: product.price || "",
            countInStock: product.countInStock || "",
            isFeatured: product.isFeatured || false,
            rating: product.rating || 0,
          });
          const oldImages = product.images
            ? product.images.map((url) => ({ url }))
            : [];
          const paddedImages = [
            ...oldImages,
            ...Array(4 - oldImages.length).fill(null),
          ].slice(0, 4); // Đảm bảo mảng images có 4 phần tử
          setImages(paddedImages);
        } else {
          throw new Error(response.data.message || "Failed to fetch product");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
      setError(
        "Please fill in all required fields (Name, Price, Category, Stock)"
      );
      return;
    }
    const uploadedImages = images.filter((img) => img !== null);
    if (uploadedImages.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    try {
      const productData = {
        ...formData,
        images: uploadedImages.map((img) => img.url),
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock),
        rating: formData.rating || 0,
        isFeatured:
          formData.isFeatured === "true" || formData.isFeatured === true,
      };
      const response = await axios.put(
        `http://localhost:8888/api/products/${productId}`,
        productData
      );
      if (response.data.success) {
        window.alert("Product updated successfully!");
        setTimeout(() => navigate("/product-list"), 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
      console.error(err);
    }
  };

  return (
    <>
      <div className="px-7 w-full">
        <div className="shadow rounded-lg justify-between flex border p-3 my-4 mx-0">
          <p className="font-extrabold text-2xl">Edit Product</p>
          <div className="flex gap-2">
            <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 dark:!text-white !rounded-lg !flex px-2 !items-center !gap-2">
              <FaHome /> Dashboard
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Button className="!shadow-sm gap-2 items-center bg-gray-300 dark:bg-gray-400 dark:!text-white !px-2 flex !rounded-lg">
              <FaIcons /> Category
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Link to={"/product-upload"}>
              <Button
                variant="primary"
                className="flex bg-blue-500 dark:bg-blue-600 dark:!text-white p-2 rounded-lg items-center gap-2"
              >
                <FaPlus /> Add Product
              </Button>
            </Link>
          </div>
        </div>
        {loading && (
          <div className="text-center py-4">
            <p>Loading product...</p>
          </div>
        )}
        {!loading && (
          <>
            <Infomation
              onFormChange={handleFormChange}
              initialData={formData}
            />
            <MediaAndPublished
              onImagesChange={handleImagesChange}
              initialImages={images}
            />
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 w-full mt-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              <MdCloudUpload size={25} />
              <span>Update and View</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ProductEdit;
