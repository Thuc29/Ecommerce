import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { MdPerson } from "react-icons/md";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonAdd from "@mui/icons-material/PersonAdd";

const ProfileButton = () => {
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
      <Button onClick={(e) => handleClick(e, "profile")}>
        <div className="overflow-hidden h-10 w-10 cursor-pointer relative">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="rounded-full border border-blue-500 object-cover w-full"
          />
        </div>
        <div className="md:flex flex-col items-start space-y-[0.5px] pl-2 hidden">
          <h3 className="text-sm font-semibold text-gray-800">Rinku Verma</h3>
          <p className="text-[10px] text-gray-500">@Rinkuv37</p>
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Typography className="px-4 py-2 font-bold text-lg">Profile</Typography>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileButton;
