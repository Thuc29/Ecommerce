import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

import StoreIcon from "@mui/icons-material/Store";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import Selling from "../../DashBoard/Selling";
import DashboardBoxProduct from "../../DashBoard/DashboardBoxProduct";
import { Button } from "react-bootstrap";
import { FaHome, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductList() {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`px-7 w-full ${
          theme === "light"
            ? "bg-white text-gray-900 border-gray-200"
            : "bg-gray-800 text-gray-200 border-gray-700"
        }`}
      >
        <div className="shadow rounded-lg flex justify-between border p-3 my-4 mx-0">
          <p className="font-extrabold text-2xl "> Product List</p>
          <div className="flex gap-2">
            <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 dark:!text-white !rounded-lg !flex px-2 !items-center !gap-2">
              <FaHome /> Dashboard
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Button className="!shadow-sm items-center bg-gray-300 dark:bg-gray-400 dark:!text-white !px-2 flex !rounded-lg">
              Category
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Link to={"/product-upload"}>
              <Button
                variant="primary"
                className="flex bg-blue-500 dark:bg-blue-600 dark:!text-white p-2 rounded-lg items-center gap-2"
              >
                <FaPlus /> Add Product
              </Button>
            </Link>
          </div>
        </div>
        <div className="row-auto gap-5 flex overflow-x-auto">
          {/* Left Section */}
          <div className="w-full flex gap-[20px]">
            <DashboardBoxProduct
              color={["#0858f7", "#2b77e5"]}
              icon={<StoreIcon />}
              grow={true}
              type="products"
              className="flex-shrink-0 "
            />
            <DashboardBoxProduct
              color={["#e559fd", "#ff042a"]}
              icon={<BrandingWatermarkIcon />}
              grow={false}
              type="brands"
              className="flex-shrink-0 "
            />
          </div>
        </div>

        <div className="shadow rounded-lg border w-full max-w-full p-3 my-4 mx-0">
          <Selling />
        </div>
      </div>
    </>
  );
}

export default ProductList;
