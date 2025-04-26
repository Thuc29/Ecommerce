import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HistoryIcon from "@mui/icons-material/History";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function DashboardBoxProduct({ color, icon, grow, type }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  // Menu handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch data based on type (products or brands)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        if (type === "products") {
          const response = await axios.get(
            "http://localhost:8888/api/products"
          );
          if (response.data.success && Array.isArray(response.data.data)) {
            setData(response.data.data.length); // Total products
          } else {
            throw new Error("Invalid data format from API");
          }
        } else if (type === "brands") {
          const response = await axios.get(
            "http://localhost:8888/api/products"
          );
          if (response.data.success && Array.isArray(response.data.data)) {
            const uniqueBrands = [
              ...new Set(
                response.data.data.map((item) => item.brand).filter(Boolean)
              ),
            ];
            setData(uniqueBrands.length); // Total brands
          } else {
            throw new Error("Invalid data format from API");
          }
        }
      } catch (err) {
        console.error(`Fetch ${type} error:`, err.message);
        setError(`Failed to fetch ${type}`);
        setData(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return (
    <Button
      className="!w-[48%] !h-[170px] !rounded-xl !overflow-hidden !px-4 !py-2 !flex !flex-col !justify-around !text-left !font-['Space_Grotesk'] !relative"
      style={{
        backgroundImage: `linear-gradient(to right, ${color?.[0]}, ${color?.[1]})`,
      }}
    >
      {grow === true ? (
        <span className="chart !opacity-10 !absolute !bottom-3 !left-5">
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart !opacity-10 !absolute !bottom-3 !left-5">
          <TrendingDownIcon />
        </span>
      )}
      <div className="!flex !w-full !lg:w-4/12 !sm:w-6/12">
        <div>
          <p className="!text-lg !text-white !font-medium !capitalize">
            {type === "products" ? "Total Products" : "Total Brands"}
          </p>
          <span className="!text-white !text-[35px] !font-bold !leading-[45px]">
            {loading ? "..." : error ? "N/A" : data}
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
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Week
            </MenuItem>
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Month
            </MenuItem>
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              <HistoryIcon className="mr-3" fontSize="small" />
              Last Year
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Button>
  );
}

export default DashboardBoxProduct;
