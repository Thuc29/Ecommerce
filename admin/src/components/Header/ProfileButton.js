import React, { useState } from "react";
import { Menu, MenuItem, ListItemIcon, Button } from "@mui/material";
import { MdPerson } from "react-icons/md";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isLogin, setIsLogin] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLogin !== true ? (
        <Link to={"/login"}>
          <Button className="!bg-blue-500 !text-white !font-['Space_Grotesk'] !rounded-3xl !w-[100px]">
            {" "}
            Sign In
          </Button>
        </Link>
      ) : (
        <div>
          <Button onClick={(e) => handleClick(e, "profile")}>
            <div className="overflow-hidden h-10 w-10 cursor-pointer relative">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-full border border-blue-500 object-cover w-full"
              />
            </div>
            <div className="md:flex flex-col items-start space-y-[0.5px] pl-2 hidden">
              <h3 className="text-sm !font-['Space_Grotesk'] font-semibold text-gray-800">
                Rinku Verma
              </h3>
              <p className="text-[10px] !font-['Space_Grotesk'] text-gray-500">
                @Rinkuv37
              </p>
            </div>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              My account
            </MenuItem>
            <MenuItem onClick={handleClose} className="!my-1">
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" className="text-red-600" />
              </ListItemIcon>
              <p className="text-red-600">Logout</p>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
