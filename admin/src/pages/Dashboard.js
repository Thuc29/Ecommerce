import React from "react";
import DashboardBox from "../components/DashBoard/DashboardBox";
import {
  AccountCircleIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  StarHalfIcon,
} from "@mui/icons-material";

function Dashboard() {
  return (
    <div className="py-7 px-7 w-full">
      <div className="row-auto flex gap-5">
        {/* Left Section */}
        <div className="md:w-8/12">
          <div className="flex flex-wrap gap-[20px]">
            <DashboardBox
              color={["#1da256", "#48d483"]}
              icon={<AccountCircleIcon fontSize="large" />}
            />
            <DashboardBox
              color={["#c012e2", "#eb64fe"]}
              icon={<ShoppingCartIcon />}
            />
            <DashboardBox
              color={["#2c78e5", "#60aff5"]}
              icon={<ShoppingBagIcon />}
            />
            <DashboardBox
              color={["#e1950e", "#f3cd29"]}
              icon={<StarHalfIcon />}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-4/12">
          <div className="w-full h-full bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
