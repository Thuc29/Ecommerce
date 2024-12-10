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
import { useTheme } from "../Header/ThemeContext";
function Sidebar() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };

  const textColor =
    theme === "light"
      ? "!text-gray-700 hover:!bg-slate-200"
      : "!text-gray-200 hover:!bg-slate-700";

  return (
    <>
      <div
        className={`w-[20%] h-[100vh] fixed top-[70px] left-0 bg-white hover:border-r-2 hover:border-blue-500`}
      >
        <ul className="mb-0 ">
          <li className="list-none">
            <Link to="/">
              <Button
                className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 0 ? "active" : ""} ${textColor}`}
              >
                {" "}
                <span
                  className={`flex items-center justify-center w-[25px] h-[25px] mr-[10px] `}
                >
                  <MdDashboard
                    color="#000"
                    opacity={0.8}
                    fontSize={22}
                    className={` ${textColor} `}
                  />
                </span>
                DashBoard
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Button
              onClick={() => isOpenSubmenu(1)}
              className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 1 ? "active" : ""} ${textColor}`}
            >
              <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                <FaProductHunt
                  color="#000"
                  opacity={0.8}
                  fontSize={22}
                  className={` ${textColor} `}
                />
              </span>
              Products
              <span className="ml-auto flex items-center justify-center w-[25px] h-[25px]">
                <FaAngleRight className={` ${textColor} `} />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 1 && isToggleSubmenu ? "open" : "close"
              } ${theme === "light" ? "!text-gray-700" : "!text-gray-200"}`}
            >
              <ul className="submenu px-[45px] py-0 relative">
                {["Product List", "Product View", "Product Upload"].map(
                  (item, index) => (
                    <li
                      key={index}
                      className={`w-full list-none`}
                      style={{
                        transitionDelay: `${index * 0.1}s`, // Stagger effect
                      }}
                    >
                      <Link
                        to="#"
                        className={` block py-1 px-0 rounded-xl !text-sm !font-medium !transition-all !duration-300 hover:!text-blue-600 ${
                          theme === "light"
                            ? "!text-gray-500"
                            : "!text-gray-400"
                        }`}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 2 ? "active" : ""} ${textColor}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdAddShoppingCart
                    color="#000"
                    opacity={0.8}
                    fontSize={22}
                    className={` ${textColor} `}
                  />
                </span>
                Order
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Button
              onClick={() => isOpenSubmenu(3)}
              className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 3 ? "active" : ""} ${textColor}`}
            >
              {" "}
              <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                <FaFileInvoice
                  color="#000"
                  opacity={0.8}
                  fontSize={22}
                  className={` ${textColor} `}
                />
              </span>
              Invoices
              <span className="ml-auto flex items-center justify-center w-[25px] h-[25px]">
                <FaAngleRight className={` ${textColor} `} />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 3 && isToggleSubmenu ? "open" : "close"
              } ${theme === "light" ? "!text-gray-700" : "!text-gray-200"}`}
            >
              <ul className="submenu px-[45px] py-0 relative">
                {["Invoice List", "Invoice Details"].map((item, index) => (
                  <li
                    key={index}
                    className={`w-full list-none`}
                    style={{
                      transitionDelay: `${index * 0.1}s`, // Stagger effect
                    }}
                  >
                    <Link
                      to="#"
                      className={` block py-1 px-0 rounded-xl !text-sm !font-medium !transition-all !duration-300 hover:!text-blue-600 ${
                        theme === "light" ? "!text-gray-500" : "!text-gray-400"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="list-none">
            <Button
              onClick={() => isOpenSubmenu(4)}
              className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 4 ? "active" : ""} ${textColor}`}
            >
              {" "}
              <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                <FaUsers
                  color="#000"
                  opacity={0.8}
                  fontSize={22}
                  className={` ${textColor} `}
                />
              </span>
              Users
              <span className="ml-auto flex items-center justify-center w-[25px] h-[25px]">
                <FaAngleRight className={` ${textColor} `} />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 4 && isToggleSubmenu ? "open" : "close"
              } ${theme === "light" ? "!text-gray-700" : "!text-gray-200"}`}
            >
              <ul className="submenu px-[45px] py-0 relative">
                {["User List", "User View", "My Accout"].map((item, index) => (
                  <li
                    key={index}
                    className={`w-full list-none`}
                    style={{
                      transitionDelay: `${index * 0.1}s`, // Stagger effect
                    }}
                  >
                    <Link
                      to="#"
                      className={` block py-1 px-0 rounded-xl !text-sm !font-medium !transition-all !duration-300 hover:!text-blue-600 ${
                        theme === "light" ? "!text-gray-500" : "!text-gray-400"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 5 ? "active" : ""} ${textColor}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdMessage
                    color="#000"
                    opacity={0.8}
                    fontSize={22}
                    className={` ${textColor} `}
                  />
                </span>
                Messages
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 6 ? "active" : ""} ${textColor}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdNotifications
                    color="#000"
                    opacity={0.8}
                    fontSize={22}
                    className={` ${textColor} `}
                  />
                </span>
                Notifications
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 7 ? "active" : ""} ${textColor}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdSettings
                    color="#000"
                    opacity={0.8}
                    fontSize={22}
                    className={` ${textColor} `}
                  />
                </span>
                Settings
              </Button>
            </Link>
          </li>
          <li className="list-none">
            <Link to={"/"}>
              <Button
                className={`button !w-full hover:!rounded-2xl  !font-['Space_Grotesk'] !text-[16px] !text-black !justify-start !py-3 !px-4 !items-center !capitalize !font-medium
              ${activeTab === 8 ? "active" : ""} ${textColor}`}
              >
                {" "}
                <span className="flex items-center justify-center w-[25px] h-[25px] mr-[10px]">
                  <MdLogin
                    color="#000"
                    opacity={0.8}
                    fontSize={22}
                    className={` ${textColor} `}
                  />
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
              <MdLogout size={18} className={`mr-2 `} /> Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
