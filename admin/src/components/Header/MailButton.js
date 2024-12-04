import React, { useState } from "react";
import { Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MdMailOutline, MdSettings } from "react-icons/md";

const MailButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      text: "Lorem Ipsum has been the...",
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

  return (
    <>
      <IconButton onClick={handleClick} className="!bg-slate-200 !rounded-full">
        <MdMailOutline className="text-black hover:text-blue-500" size={20} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        className="mt-5"
      >
        <div className="px-2 flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">Messages</h3>
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
          <Divider />
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex items-center p-4 border-b hover:bg-gray-50 transition duration-200"
            >
              <div className="relative">
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
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-500">{message.text}</p>
              </div>
              {message.count > 0 && (
                <div className="ml-3">
                  <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-500 rounded-full">
                    {message.count}
                  </span>
                </div>
              )}
              <i className="fas fa-ellipsis-v text-gray-500 ml-3"></i>
            </div>
          ))}
          <div className="px-4 py-1">
            <button className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200">
              VIEW ALL MESSAGES
            </button>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default MailButton;
