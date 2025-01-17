import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MdDelete,
  MdDrafts,
  MdMailOutline,
  MdMarkunread,
  MdMoreVert,
  MdSettings,
} from "react-icons/md";
import { useTheme } from "../Theme/ThemeContext";

const MailButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState(null);
  const [openMoreOptionsId, setOpenMoreOptionsId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { theme } = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoreOptionsClick = (event, id) => {
    setMoreOptionsAnchorEl(event.currentTarget);
    setOpenMoreOptionsId(id);
  };

  const handleMoreOptionsClose = () => {
    setMoreOptionsAnchorEl(null);
    setOpenMoreOptionsId(null);
  };

  const messages = [
    {
      name: "Miron Mahmud",
      time: "Now",
      text: "Lorem Ipsum has been the...",
      count: 3,
      img: "https://placehold.co/50x50",
      online: true,
    },
    {
      name: "Tahmina Bonny",
      time: "24s",
      text: "Lorem Ipsum has been the...",
      count: 1,
      img: "https://placehold.co/50x50",
      online: true,
    },
    {
      name: "Labonno Khan",
      time: "18m",
      text: "Now, you can use this custom class in your MailButton component. Here’s how you can do it:",
      count: 9,
      img: "https://placehold.co/50x50",
      online: true,
    },
    {
      name: "Shipu Shikdar",
      time: "23h",
      text: "Lorem Ipsum has been the...",
      count: 2,
      img: "https://placehold.co/50x50",
      online: true,
    },
    {
      name: "Rabeya Akter",
      time: "13d",
      text: "Lorem Ipsum has been the...",
      count: 0,
      img: "https://placehold.co/50x50",
      online: true,
    },
  ];

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const openMoreOptions = Boolean(moreOptionsAnchorEl);

  return (
    <>
      <IconButton
        onClick={handleClick}
        className={`!rounded-full items-center p-2 shadow-lg transition-all ${
          theme === "light" ? "!bg-slate-200" : "!bg-gray-700"
        }`}
      >
        <MdMailOutline
          className={`mx-auto ${
            theme === "light"
              ? "text-black hover:text-blue-500"
              : "text-white hover:text-blue-500"
          }`}
          size={20}
        />
      </IconButton>
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
              Messages
            </h3>
            <button
              onClick={toggleSettings}
              aria-expanded={isSettingsOpen}
              className="flex items-center justify-center rounded-full p-2 transition"
            >
              <MdSettings
                className={theme === "light" ? "text-black" : "text-white"}
                size={20}
              />
            </button>
          </div>
          {isSettingsOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 z-10  !shadow-lg ${
                theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              <button
                type="button"
                className={`flex items-center space-x-2 w-full px-4 py-1 hover:!rounded-xl transition ${
                  theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-500"
                }`}
              >
                <MdDrafts />
                <span>Mark all as read</span>
              </button>
              <button
                type="button"
                className={`flex items-center space-x-2 w-full px-4 py-1 hover:!rounded-xl transition ${
                  theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-500"
                }`}
              >
                <MdMarkunread />
                <span>Mark all as unread</span>
              </button>
              <button
                type="button"
                className={`flex items-center space-x-2 w-full px-4 py-1 hover:!rounded-xl transition ${
                  theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-500"
                }`}
              >
                <MdDelete />
                <span>Delete all messages</span>
              </button>
            </div>
          )}
          <Divider />
          <Box className={`overflow-y-auto max-h-60 scroll `}>
            {" "}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center hover:rounded-xl px-2 py-1 transition duration-200 ${
                  theme === "light"
                    ? "bg-white text-black  hover:bg-gray-100"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                <div className="relative ">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={message.img}
                    alt={`Profile picture of ${message.name}`}
                  />
                  {message.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold">{message.name}</h3>
                    <span className="text-xs text-gray-500">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {message.text}
                  </p>
                </div>
                {message.count > 0 && (
                  <div className="ml-3 mb-5">
                    <span className="flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-blue-500 rounded-full">
                      {message.count}
                    </span>
                  </div>
                )}

                <button
                  className={`btn btn-primary hover:bg-gray-200 rounded-lg ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                  onClick={handleMoreOptionsClick}
                  aria-expanded={openMoreOptions}
                >
                  <MdMoreVert
                    className={theme === "light" ? "text-black" : "text-white"}
                  />
                </button>
                <Menu
                  id={`menu-${message.id}`}
                  anchorEl={moreOptionsAnchorEl}
                  open={openMoreOptions && openMoreOptionsId === message.id}
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
                    className={`flex items-center space-x-2 hover:!rounded-xl px-4 py-2 transition-all ${
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
                    className={`flex items-center space-x-2 hover:!rounded-xl px-4 py-2 transition-all ${
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
                    className={`flex items-center space-x-2 hover:!rounded-xl px-4 py-2 transition-all ${
                      theme === "light"
                        ? "hover:!bg-slate-200 text-black"
                        : "hover:!bg-gray-500 text-white"
                    }`}
                  >
                    <MdDelete />
                    <span>Delete</span>
                  </MenuItem>
                </Menu>
              </div>
            ))}
          </Box>

          <div className="px-4 py-1">
            <Button
              variant="contained"
              color="inherit"
              className={`w-full !rounded-xl !font-['Space_${
                theme === "light"
                  ? "!bg-[#2bbef9] !text-white hover:!bg-slate-200 hover:!text-gray-800"
                  : "hover:!bg-[#2bbef9] hover:!text-white !bg-slate-200 !text-gray-800"
              }`}
              onClick={() => console.log("View All Messages")}
            >
              View All Messages
            </Button>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default MailButton;
