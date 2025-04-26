import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import DashboardBox from "../components/DashBoard/DashboardBox";
import { Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Selling from "../components/DashBoard/Selling";

const data = [
  { name: "SAT", uv: 2000 },
  { name: "SUN", uv: 3000 },
  { name: "MON", uv: 2000 },
  { name: "TUE", uv: 2800 },
  { name: "WED", uv: 1890 },
  { name: "THU", uv: 2390 },
  { name: "FRI", uv: 3490 },
];

function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className=" px-7 w-full">
      <div className="shadow rounded-lg border   p-3 my-4 mx-0">
        <p className="font-extrabold text-2xl "> Ecommerce</p>
      </div>

      <div className="row-auto mb-4 flex gap-5">
        {/* Left Section */}
        <div className="md:w-8/12">
          <div className="flex flex-wrap gap-[20px]">
            <DashboardBox
              color={["#1da256", "#48d483"]}
              icon={<AccountCircleIcon fontSize="large" />}
              grow={true}
            />
            <DashboardBox
              color={["#c012e2", "#eb64fe"]}
              icon={<ShoppingCartIcon fontSize="large" />}
            />
            <DashboardBox
              color={["#2c78e5", "#60aff5"]}
              icon={<ShoppingBagIcon fontSize="large" />}
            />
            <DashboardBox
              color={["#e1950e", "#f3cd29"]}
              icon={<StarHalfIcon fontSize="large" />}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-4/12 pl-0">
          <div className="w-full bg-gradient-to-t to-[#1a50b5] from-[#2a6ff7] h-full rounded-lg ">
            <div className="flex justify-between items-center w-full capitalize relative py-3 px-5">
              <p className="text-lg text-white font-medium">Total Sales</p>

              <Button
                onClick={handleClick}
                className="text-white cursor-pointer w-10 h-10 rounded-full"
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="long-menu"
                MenuListProps={{ "aria-labelledby": "long-button" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "auto",
                  },
                }}
              >
                {["Last Day", "Last Week", "Last Month", "Last Year"].map(
                  (label) => (
                    <MenuItem
                      onClick={handleClose}
                      className="text-xs py-1"
                      key={label}
                    >
                      <HistoryIcon className="mr-3" fontSize="small" />
                      {label}
                    </MenuItem>
                  )
                )}
              </Menu>
            </div>
            <div className=" px-5">
              <div className="flex ">
                <p className="text-white text-3xl font-bold ">$3,787,681.00</p>
                <p className="text-green-500 text-lg font-semibold items-center pt-2 px-1 text-center">
                  40.63%
                  <TrendingUpIcon fontSize="small" />
                </p>
              </div>
              <p className=" text-gray-200 text-sm mt-2">
                $3,578.90 in last month
              </p>
            </div>
            {/* Điều chỉnh kích thước biểu đồ */}
            <div className="!w-full !h-full !max-h-[220px] !mt-3 !overflow-hidden !opacity-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={600}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="1 3" />
                  <XAxis dataKey="name" hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "5px",
                      color: "white",
                      border: "none",
                      fontWeight: 500,
                    }}
                    labelStyle={{ color: "white" }}
                    labelFormatter={(label) => `${label}`}
                    formatter={(value) => [`Sales: $${value}`]}
                    cursor={{ stroke: "#2a6ff7", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#b4b4b4"
                    fill="#b4b4b4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow rounded-lg border p-3 my-4 mx-0 flex-shrink-0 mt-[var(--bs-gutter-y)] max-w-full pl-[calc(var(--bs-gutter-x)*.5)] pr-[calc(var(--bs-gutter-x)*.5)] w-full">
        <Selling />
      </div>
    </div>
  );
}

export default Dashboard;
