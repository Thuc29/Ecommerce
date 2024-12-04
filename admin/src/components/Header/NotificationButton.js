import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MdNotifications } from "react-icons/md";

const NotificationsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} className="!bg-slate-200 !rounded-full">
        <MdNotifications className="text-black hover:text-blue-500" size={20} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Typography className="px-4 py-2 font-semibold">
          Notifications
        </Typography>
        <MenuItem onClick={handleClose}>View All</MenuItem>
        <MenuItem onClick={handleClose}>Clear All</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsButton;
