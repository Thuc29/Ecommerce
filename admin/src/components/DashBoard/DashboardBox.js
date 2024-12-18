/* DashboardBox.js */
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HistoryIcon from "@mui/icons-material/History";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function DashboardBox({ color, icon, grow }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Button
      className="!w-[48%] !h-[170px] !rounded-xl !overflow-hidden !px-4 !py-2 !flex !flex-col !justify-around !text-left !font-['Space_Grotesk'] !relative "
      style={{
        backgroundImage: `linear-gradient(to right, ${color?.[0]}, ${color?.[1]})`,
      }}
    >
      {grow === true ? (
        <span className="chart !opacity-10 !absolute !bottom-3 !left-5 ">
          {" "}
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart !opacity-10 !absolute !bottom-3 !left-5 ">
          <TrendingDownIcon />
        </span>
      )}
      <div className="!flex !w-full">
        <div>
          <p className="!text-lg !text-white !font-medium !capitalize">
            Total Users
          </p>
          <span className="!text-white !text-[35px] !font-bold !leading-[45px]">
            277
          </span>
        </div>
        <div className="!ml-auto">
          <span className="!flex items-center justify-center opacity-70 w-[50px] h-[50px] rounded-lg text-white bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.1)]">
            {icon}
          </span>
        </div>
      </div>
      <div className="!flex !justify-around !items-center !w-full !capitalize !relative">
        <p className="!text-[16px] !text-white !opacity-90">Last Month</p>
        <div className="ml-auto">
          <Button
            onClick={handleClick}
            className="!ml-auto !text-[22px] !text-[rgba(0,0,0,0.5)] !cursor-pointer !min-w-10 !w-10 !h-10 !rounded-full"
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "auto",
                },
              },
            }}
          >
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Day
            </MenuItem>
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              {" "}
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Week
            </MenuItem>
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              {" "}
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Month
            </MenuItem>
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              {" "}
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Year
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Button>
  );
}

export default DashboardBox;
