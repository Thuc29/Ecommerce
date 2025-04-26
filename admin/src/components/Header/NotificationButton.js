import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  MdDrafts,
  MdMarkunread,
  MdDelete,
  MdMoreVert,
  MdSettings,
  MdNotifications,
} from "react-icons/md";
import { useTheme } from "../Theme/ThemeContext";

const NotificationsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState(null);
  const [openMoreOptionsId, setOpenMoreOptionsId] = useState(null);
  const openMoreOptions = Boolean(moreOptionsAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsSettingsOpen(false);
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
  const { theme } = useTheme();
  const notifications = [
    {
      id: 1,
      imgSrc: "https://placehold.co/40x40",
      name: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather Belt Steve Madden",
      time: "few seconds ago",
    },
    {
      id: 2,
      imgSrc: "https://placehold.co/40x40",
      name: "Labonno",
      action: "leave her comment to",
      item: "Dressni Breathable Female Dress",
      time: "25 minutes ago",
    },
    {
      id: 3,
      imgSrc: "https://placehold.co/40x40",
      name: "Tahmina",
      action: "announce to 50% discount",
      item: "New Exclusive Long Kurti",
      time: "12 hours ago",
    },
    {
      id: 4,
      imgSrc: "https://placehold.co/40x40",
      name: "Tahmina",
      action: "announce to 50% discount",
      item: "New Exclusive Long Kurti",
      time: "12 hours ago",
    },
    {
      id: 5,
      imgSrc: "https://placehold.co/40x40",
      name: "Tahmina",
      action: "announce to 50% discount",
      item: "New Exclusive Long Kurti",
      time: "12 hours ago",
    },
    {
      id: 6,
      imgSrc: "https://placehold.co/40x40",
      name: "Tahmina",
      action: "announce to 50% discount",
      item: "New Exclusive Long Kurti",
      time: "12 hours ago",
    },
    {
      id: 7,
      imgSrc: "https://placehold.co/40x40",
      name: "Tahmina",
      action: "announce to 50% discount",
      item: "New Exclusive Long Kurti",
      time: "12 hours ago",
    },
  ];

  return (
    <>
      <IconButton
        className={`!rounded-full items-center p-2 shadow-lg transition-all ${
          theme === "light" ? "!bg-slate-200" : "!bg-gray-700"
        }`}
        onClick={handleClick}
      >
        <MdNotifications
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
            width: "350px",
            marginTop: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme === "light" ? "#fff" : "#333", // Light mode background
            color: theme === "light" ? "#000" : "#fff", // Dark mode text color
          },
        }}
      >
        {/* Header */}
        <div className="px-2 flex-grow">
          <div className="flex items-center justify-between">
            <h3
              className={`font-bold text-lg ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Notifications ({notifications.length})
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
                <span>Delete all messages</span>
              </button>
            </div>
          )}
        </div>
        <Divider />

        {/* Notification List */}
        <Box className={`overflow-y-auto max-h-60 scroll `}>
          {notifications.map(({ id, imgSrc, name, action, item, time }) => (
            <React.Fragment key={id}>
              <MenuItem
                className={`!flex !items-start hover:!rounded-xl !justify-between !py-1 ${
                  theme === "light"
                    ? "!bg-gray-100 hover:!bg-slate-200 !text-black"
                    : "!bg-gray-800 hover:!bg-gray-600 !text-white"
                }`}
              >
                <div className="flex flex-grow space-x-4">
                  <img
                    src={imgSrc}
                    alt={`${name}'s profile`}
                    className="w-10 h-10 items-center !mt-2 justify-center rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <Typography
                      variant="body2"
                      className="font-medium !m-0 !text-xs !font-['Space_Grotesk'] text-gray-800 break-words whitespace-pre-wrap"
                    >
                      {name} {action}{" "}
                      <Typography
                        component="span"
                        className="!font-bold !font-['Space_Grotesk'] !text-sm"
                      >
                        {item}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="primary"
                      className="!font-medium break-words !mt-0 whitespace-pre-wrap"
                    >
                      {time}
                    </Typography>
                  </div>
                </div>

                <button
                  className="flex items-center justify-center rounded-full p-2 transition"
                  onClick={handleMoreOptionsClick}
                  aria-expanded={openMoreOptions}
                >
                  <MdMoreVert className="hover:text-blue-600" />
                </button>

                <Menu
                  id={`menu-${notifications.id}`}
                  anchorEl={moreOptionsAnchorEl}
                  open={
                    openMoreOptions && openMoreOptionsId === notifications.id
                  }
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
                    className={`flex items-center space-x-2 w-full px-4 py-2 transition ${
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
              <Divider className="!m-0" />
            </React.Fragment>
          ))}
        </Box>

        <Divider />

        {/* Footer */}
        <Box className="px-4 py-2">
          <Button
            variant="contained"
            fullWidth
            className={`w-full !rounded-xl ${
              theme === "light"
                ? "!bg-[#2bbef9] !text-white hover:!bg-slate-200 hover:!text-gray-800"
                : "hover:!bg-[#2bbef9] hover:!text-white !bg-slate-200 !text-gray-800"
            }`}
            onClick={() => console.log("View All Notifications")}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationsButton;
