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

const CartButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [
    {
      id: 1,
      name: "miron mahmud",
      time: "now",
      price: 289.0,
      images: [
        "https://dytbw3ui6vsu6.cloudfront.net/media/catalog/product/resize/914x1200/S/a/Sandro_SHPBL00874-50_V_1_1_1.webp",
      ],
      extraImages: 3,
    },
    {
      id: 2,
      name: "tahmina bonny",
      time: "2m",
      price: 78.0,
      images: ["/images/product/01.webp"],
      extraImages: 1,
    },
    {
      id: 3,
      name: "tahmina bonny",
      time: "2m",
      price: 78.0,
      images: ["/images/product/01.webp"],
      extraImages: 1,
    },
    {
      id: 4,
      name: "tahmina bonny",
      time: "2m",
      price: 78.0,
      images: ["/images/product/01.webp"],
      extraImages: 1,
    },
    {
      id: 5,
      name: "tahmina bonny",
      time: "2m",
      price: 78.0,
      images: ["/images/product/01.webp"],
      extraImages: 1,
    },
    // Add other items here...
  ];

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      {/* Cart Button */}
      <IconButton
        className="!rounded-full items-center !bg-slate-200 p-2 shadow-lg transition-all hover:bg-blue-100"
        onClick={handleClick}
      >
        <MdShoppingCart
          className="mx-auto text-black hover:text-blue-500"
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
            maxHeight: 400, // Adjusted height for the menu
            width: "300px",
            marginTop: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div className="px-2 flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">
              Orders ({items.length})
            </h3>
            <button
              onClick={toggleSettings}
              aria-expanded={isSettingsOpen}
              className="flex items-center justify-center rounded-full p-2 transition"
            >
              <i className="material-icons">
                <MdSettings size={20} />
              </i>
            </button>
          </div>
          {isSettingsOpen && (
            <div className="mc-dropdown-paper absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
              <button
                type="button"
                className="mc-dropdown-menu flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <i className="material-icons">
                  {" "}
                  <MdDrafts />
                </i>
                <span>Mark all as read</span>
              </button>
              <button
                type="button"
                className="mc-dropdown-menu flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <i className="material-icons">
                  <MdMarkunread />
                </i>
                <span>Mark all as unread</span>
              </button>
              <button
                type="button"
                className="mc-dropdown-menu flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <i className="material-icons">
                  <MdDelete />
                </i>
                <span>Delete all orders</span>
              </button>
            </div>
          )}
          <Divider className="my-2" />
          {/* Cart Items */}
          <ul className="overflow-y-auto bg-gray-100  max-h-60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
            {" "}
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <MenuItem className="flex transition items-center justify-between ">
                  <a
                    className="flex items-center space-x-4 flex-grow "
                    href="/ecommerce"
                  >
                    <div className="flex items-start relative ">
                      {item.images.map((src, imgIndex) => (
                        <img
                          key={imgIndex}
                          className="w-10 h-10 object-cover rounded-full shadow-md"
                          src={src}
                          alt="product"
                        />
                      ))}
                      <span className="absolute left-[20px] border-2 border-gray-300 bg-gray-100 text-black text-xs rounded-full px-3 py-3">
                        +{item.extraImages}
                      </span>
                    </div>
                    <div className="pl-4">
                      <h4 className="text-xs font-semibold text-gray-800">
                        {item.name}{" "}
                        <time className="text-xs font-medium text-gray-500">
                          ~ {item.time}
                        </time>
                      </h4>
                      <p className="text-sm text-gray-700">
                        ${item.price} total
                      </p>
                    </div>
                  </a>
                  <button className="btn btn-primary hover:bg-gray-200">
                    <i className="material-icons">
                      <MdMoreVert />
                    </i>
                  </button>
                </MenuItem>
                <Divider />
              </React.Fragment>
            ))}
          </ul>
        </div>

        <div className="px-4 py-1 text-center">
          <Button
            variant="contained"
            color="inherit"
            className="w-full !rounded-xl hover:bg-[#2bbef9] hover:text-white"
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
