import React, { useState } from "react";
import {
  MdDelete,
  MdDrafts,
  MdMarkunread,
  MdMoreVert,
  MdSettings,
  MdShoppingCart,
} from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useTheme } from "./ThemeContext";

const CartButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState(null);
  const [openMoreOptionsId, setOpenMoreOptionsId] = useState(null);
  const { theme } = useTheme();

  const open = Boolean(anchorEl);
  const openMoreOptions = Boolean(moreOptionsAnchorEl);

  const items = [
    {
      id: 1,
      name: "Miron Mahmud",
      time: "now",
      price: 289.0,
      images: [
        "https://dytbw3ui6vsu6.cloudfront.net/media/catalog/product/resize/914x1200/S/a/Sandro_SHPBL00874-50_V_1_1_1.webp",
      ],
      extraImages: 3,
    },
    {
      id: 2,
      name: "Tahmina Bonny",
      time: "2m",
      price: 78.0,
      images: ["/images/product/01.webp"],
      extraImages: 1,
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsSettingsOpen(false); // Close settings when menu is closed
  };

  const handleMoreOptionsClick = (event, id) => {
    setMoreOptionsAnchorEl(event.currentTarget);
    setOpenMoreOptionsId(id);
  };

  const handleMoreOptionsClose = () => {
    setMoreOptionsAnchorEl(null);
    setOpenMoreOptionsId(null);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      {/* Cart Button */}
      <IconButton
        className={`!rounded-full items-center p-2 shadow-lg transition-all ${
          theme === "light" ? "!bg-slate-200" : "!bg-gray-700 "
        }`}
        onClick={handleClick}
      >
        <MdShoppingCart
          className={`mx-auto ${
            theme === "light"
              ? "text-black hover:text-red-400"
              : "text-white hover:text-red-400"
          }`}
          size={20}
        />
      </IconButton>

      {/* Cart Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: "300px",
            marginTop: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme === "light" ? "#fff" : "#333", // Light mode background
            color: theme === "light" ? "#000" : "#fff", // Dark mode text color
          },
        }}
      >
        <div className="px-2 flex-grow">
          <div className="flex items-center justify-between">
            <h3
              className={`font-bold text-lg ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Orders ({items.length})
            </h3>
            <button
              onClick={toggleSettings}
              aria-expanded={isSettingsOpen ? "true" : "false"}
              className="flex items-center justify-center rounded-full p-2 transition"
            >
              <MdSettings size={20} />
            </button>
          </div>

          {/* Toggle Settings */}
          {isSettingsOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 z-10 rounded-lg shadow-lg ${
                theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              <button
                type="button"
                className={`flex items-center space-x-2 w-full px-4 py-2 transition ${
                  theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-500"
                }`}
              >
                <MdDrafts />
                <span>Mark all as read</span>
              </button>
              <button
                type="button"
                className={`flex items-center space-x-2 w-full px-4 py-2 transition ${
                  theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-500"
                }`}
              >
                <MdMarkunread />
                <span>Mark all as unread</span>
              </button>
              <button
                type="button"
                className={`flex items-center space-x-2 w-full px-4 py-2 transition ${
                  theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-500"
                }`}
              >
                <MdDelete />
                <span>Delete all orders</span>
              </button>
            </div>
          )}

          <Divider className="my-2" />

          {/* Cart Items */}
          <ul
            className={`overflow-y-auto max-h-60 bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full ${
              theme === "light"
                ? "!bg-white !text-black"
                : "!bg-gray-800 !text-white "
            }`}
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <MenuItem
                  className={`flex hover:!rounded-xl transition items-center justify-between${
                    theme === "light"
                      ? "bg-white text-black  hover:!bg-gray-100"
                      : "bg-gray-800 text-white hover:!bg-gray-700"
                  }`}
                >
                  <a
                    className={`flex items-center space-x-4 flex-grow `}
                    href="/ecommerce"
                  >
                    <div className="flex items-start relative">
                      {item.images.map((src, imgIndex) => (
                        <img
                          key={imgIndex}
                          className="w-10 h-10 object-cover rounded-full shadow-md"
                          src={src}
                          alt="product"
                        />
                      ))}
                      <span
                        className={`absolute left-[20px] border-2 border-gray-300 bg-gray-100 text-black text-xs rounded-full px-3 py-3 ${
                          theme === "light"
                            ? "bg-white text-black"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        +{item.extraImages}
                      </span>
                    </div>
                    <div className="pl-4">
                      <h4 className="text-xs font-semibold text-gray-800">
                        {item.name}{" "}
                        <time className="text-xs font-medium text-gray-400">
                          ~ {item.time}
                        </time>
                      </h4>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </a>
                  <button
                    className="btn btn-primary hover:bg-gray-200 rounded-lg"
                    onClick={(e) => handleMoreOptionsClick(e, item.id)} // Pass item id for specific control
                    aria-expanded={
                      openMoreOptions && openMoreOptionsId === item.id
                        ? "true"
                        : "false"
                    }
                    aria-controls={`menu-${item.id}`}
                  >
                    <MdMoreVert className="hover:text-blue-600" />
                  </button>
                  <Menu
                    id={`menu-${item.id}`}
                    anchorEl={moreOptionsAnchorEl}
                    open={openMoreOptions && openMoreOptionsId === item.id}
                    onClose={handleMoreOptionsClose}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    PaperProps={{
                      style: {
                        backgroundColor: theme === "light" ? "#fff" : "#333", // Light mode background
                        color: theme === "light" ? "#000" : "#fff", // Dark mode text color
                      },
                    }}
                  >
                    <MenuItem
                      onClick={handleMoreOptionsClose}
                      className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                        theme === "light"
                          ? "hover:!bg-slate-200 text-black"
                          : "hover:!bg-gray-500 text-white"
                      }`}
                    >
                      <MdDrafts />
                      <span>Mark as read</span>
                    </MenuItem>
                    <MenuItem
                      onClick={handleMoreOptionsClose}
                      className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                        theme === "light"
                          ? "hover:!bg-slate-200 text-black"
                          : "hover:!bg-gray-500 text-white"
                      }`}
                    >
                      <MdMarkunread />
                      <span>Mark as unread</span>
                    </MenuItem>
                    <MenuItem
                      onClick={handleMoreOptionsClose}
                      className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                        theme === "light"
                          ? "hover:!bg-slate-200 text-black"
                          : "hover:!bg-gray-500 text-white"
                      }`}
                    >
                      <MdDelete />
                      <span>Delete</span>
                    </MenuItem>
                  </Menu>
                </MenuItem>
                <Divider />
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* View All Orders Button */}
        <div className="px-4 py-1 text-center">
          <Button
            variant="contained"
            color="inherit"
            className={`w-full !rounded-xl ${
              theme === "light"
                ? "!bg-[#2bbef9] !text-white hover:!bg-slate-200 hover:!text-gray-800"
                : "hover:!bg-[#2bbef9] hover:!text-white !bg-slate-200 !text-gray-800"
            }`}
            onClick={() => console.log("View All Orders")}
          >
            View All Orders
          </Button>
        </div>
      </Menu>
    </>
  );
};

export default CartButton;
