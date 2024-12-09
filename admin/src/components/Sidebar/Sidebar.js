import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  MdAddShoppingCart,
  MdDashboard,
  MdLogin,
  MdLogout,
  MdMessage,
  MdNotifications,
  MdSettings,
} from "react-icons/md";
import {
  FaAngleRight,
  FaFileInvoice,
  FaProductHunt,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };

  return (
    <>
      <div className="w-[20%] h-[100vh] fixed top-[70px] left-0 bg-white">
        <ul className="mb-0 ">
          <li className="list-none">
            <Link to="/">
              <Button
                className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 0 ? "active" : ""}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdDashboard color="#000" opacity={0.8} fontSize={22} />
                </span>
                DashBoard
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Button
              onClick={() => isOpenSubmenu(1)}
              className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 1 ? "active" : ""}`}
            >
              <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                <FaProductHunt color="#000" opacity={0.8} fontSize={22} />
              </span>
              Products
              <span className="ml-auto flex items-center justify-center w-[25px] h-[25px]">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 1 && isToggleSubmenu === true ? "open" : "close"
              }`}
            >
              <ul className="submenu px-[45px] py-0 relative ">
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    Product List{" "}
                  </Link>
                </li>
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    Product View{" "}
                  </Link>
                </li>
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    Product Upload{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 2 ? "active" : ""}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdAddShoppingCart color="#000" opacity={0.8} fontSize={22} />
                </span>
                Order
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Button
              onClick={() => isOpenSubmenu(3)}
              className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 3 ? "active" : ""}`}
            >
              {" "}
              <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                <FaFileInvoice color="#000" opacity={0.8} fontSize={22} />
              </span>
              Invoices
              <span className="ml-auto flex items-center justify-center w-[25px] h-[25px]">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 3 && isToggleSubmenu === true ? "open" : "close"
              }`}
            >
              <ul className="submenu px-[45px] py-0 relative ">
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    Invoice List{" "}
                  </Link>
                </li>
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    Invoice Details{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="list-none">
            <Button
              onClick={() => isOpenSubmenu(4)}
              className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 4 ? "active" : ""}`}
            >
              {" "}
              <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                <FaUsers color="#000" opacity={0.8} fontSize={22} />
              </span>
              Users
              <span className="ml-auto flex items-center justify-center w-[25px] h-[25px]">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 4 && isToggleSubmenu === true ? "open" : "close"
              }`}
            >
              <ul className="submenu px-[45px] py-0 relative ">
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    User List{" "}
                  </Link>
                </li>
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    User Profile{" "}
                  </Link>
                </li>
                <li className="w-full list-none">
                  <Link
                    to="#"
                    className="text-[#5e5d72] block py-[5px] px-0 text-sm font-medium transition-all duration-300 hover:text-blue-600
                "
                  >
                    My Account{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 5 ? "active" : ""}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdMessage color="#000" opacity={0.8} fontSize={22} />
                </span>
                Messages
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 6 ? "active" : ""}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdNotifications color="#000" opacity={0.8} fontSize={22} />
                </span>
                Notifications
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 7 ? "active" : ""}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdSettings color="#000" opacity={0.8} fontSize={22} />
                </span>
                Settings
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl hover:!bg-slate-200 !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 8 ? "active" : ""}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdLogin color="#000" opacity={0.8} fontSize={22} />
                </span>
                Login
              </Button>
            </Link>
          </li>
        </ul>
        <br />
        <div className="px-6">
          <div className="box w-full h-[130px] p-6 bg-[#bcd2fd] rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
            <Button variant="contained" className="!text-[14px] !font-medium ">
              <MdLogout className="mr-2" size={18} /> Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
