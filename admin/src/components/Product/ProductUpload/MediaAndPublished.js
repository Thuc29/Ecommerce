import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import {
  MdClose,
  MdCloudUpload,
  MdCollections,
  MdDelete,
  MdDownload,
  MdEdit,
  MdMoreHoriz,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../Theme/ThemeContext";
function MediaAndPublished() {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemoveImage = (index) => {
    // Logic to remove the image by index
    console.log(`Remove image at index: ${index}`);
  };

  return (
    <>
      {" "}
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
                  backgroundColor: theme === "light" ? "#fff" : "#333", // Light mode background
                  color: theme === "light" ? "#000" : "#fff", // Dark mode text color
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
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] auto-rows-[1fr]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative cursor-pointer group">
              <img
                src="/assets/images/01.webp"
                alt="Product"
                className="border-2 hover:border-dashed hover:border-blue-500 rounded-md drop-shadow-lg w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:border-blue-600"
              />
              {/* Remove Icon */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition duration-300"
              >
                <MdClose size={15} />
              </button>
            </div>
          ))}
          <div className="relative cursor-pointer group">
            <div className="border-2 border-gray-300 hover:border-dashed hover:border-blue-500 rounded-md drop-shadow-lg w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:border-blue-600">
              <input
                type="file"
                id="product"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="product"
                className="flex items-center justify-center flex-col w-full h-full p-4 text-center rounded-lg cursor-pointer"
              >
                <MdCollections size={70} className="!opacity-45" />
                <span className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {fileName || "Image upload"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <Link
          to={"/product-upload"}
          className="flex items-center justify-center gap-2 w-full mt-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <MdCloudUpload size={25} />
          <span>Publish and View</span>
        </Link>
      </div>
    </>
  );
}

export default MediaAndPublished;
