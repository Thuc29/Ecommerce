import { IconButton, Menu, MenuItem, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import {
  MdClose,
  MdCollections,
  MdDelete,
  MdDownload,
  MdEdit,
  MdMoreHoriz,
} from "react-icons/md";
import { useTheme } from "../../Theme/ThemeContext";
import axios from "axios";

function MediaAndPublished({ onImagesChange }) {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [images, setImages] = useState(Array(4).fill(null));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Array(4).fill(false));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedLoading = [...loading];
        updatedLoading[index] = true;
        setLoading(updatedLoading);

        const base64 = await fileToBase64(file);
        console.log("Base64 data:", base64.substring(0, 100));
        const response = await axios.post(
          "https://ecommerce-u7gm.onrender.com/api/products/upload-image",
          {
            image: base64,
          }
        );
        if (response.data.success) {
          const newImage = response.data.data;
          const updatedImages = [...images];
          updatedImages[index] = newImage;
          setImages(updatedImages);
          onImagesChange(updatedImages);
        } else {
          throw new Error(response.data.message || "Failed to upload image");
        }
      } catch (err) {
        console.error("Image upload error:", err.response?.data || err.message);
        setError(
          "Failed to upload image: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        const updatedLoading = [...loading];
        updatedLoading[index] = false;
        setLoading(updatedLoading);
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("image/")) {
        reject(new Error("Selected file is not an image"));
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) =>
        reject(new Error("Failed to convert file to base64: " + error));
    });
  };

  return (
    <>
      <div
        className={`bg-[#1d2f4d] mt-4 shadow rounded-lg p-5
        ${theme === "light" ? "bg-white" : "bg-[#1d2f4d]"}`}
      >
        <div className="flex justify-between items-center pb-3">
          <h4 className="text-lg font-semibold">Media and Published</h4>
          <div>
            <IconButton onClick={handleClick}>
              <MdMoreHoriz color="gray" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                style: {
                  marginTop: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: theme === "light" ? "#fff" : "#333",
                  color: theme === "light" ? "#000" : "#fff",
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <MdEdit className="mr-2" /> Edit
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <MdDelete className="mr-2" /> Delete
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <MdDownload className="mr-2" /> Downloads
              </MenuItem>
            </Menu>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] auto-rows-[1fr]">
          {images.map((image, index) => (
            <div key={index} className="relative cursor-pointer group">
              {loading[index] ? (
                <div className="border-2 border-gray-300 rounded-md drop-shadow-lg w-full h-full flex items-center justify-center">
                  <CircularProgress size={40} />
                </div>
              ) : image ? (
                <img
                  src={image.url}
                  alt="Product"
                  className="border-2 hover:border-dashed hover:border-blue-500 rounded-md drop-shadow-lg w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:border-blue-600"
                />
              ) : (
                <div className="border-2 border-gray-300 hover:border-dashed hover:border-blue-500 rounded-md drop-shadow-lg w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:border-blue-600">
                  <input
                    type="file"
                    id={`product-${index}`}
                    className="hidden"
                    onChange={(e) => handleImageUpload(index, e)}
                    accept="image/*"
                  />
                  <label
                    htmlFor={`product-${index}`}
                    className="flex items-center justify-center flex-col w-full h-full p-4 text-center rounded-lg cursor-pointer"
                  >
                    <MdCollections size={70} className="!opacity-45" />
                    <span className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
                      Image upload
                    </span>
                  </label>
                </div>
              )}
              {image && !loading[index] && (
                <button
                  onClick={() => {
                    const updatedImages = [...images];
                    updatedImages[index] = null;
                    setImages(updatedImages);
                    onImagesChange(updatedImages);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition duration-300"
                >
                  <MdClose size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MediaAndPublished;
