import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { LuMenu } from "react-icons/lu";
import { HiViewGrid } from "react-icons/hi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "../../components/Product/ProductItem";
import Sidebar from "../../components/Sidebar/Sidebar";

function Listing() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const [productsPerPage, setProductsPerPage] = useState(9);
  const openDropDown = Boolean(anchorEl);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setProductView("four");
      } else if (screenWidth >= 768) {
        setProductView("three");
      } else {
        setProductView("two");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (value) => {
    if (value) setProductsPerPage(value);
    setAnchorEl(null);
  };

  return (
    <section className="product-listing-page mx-auto w-full md:max-w-[1270px] px-4 py-8 rounded-xl">
      <div className="container">
        <div className="productListing md:gap-6 md:flex">
          <Sidebar />
          <div className="content_right w-full md:w-[80%] text-center">
            <img
              src="/assets/bannerList1.jpeg"
              className="w-full h-auto rounded-xl"
              alt="Listing Banner"
            />
            <div className="w-full bg-gray-100 py-2 px-6 rounded-lg my-6 flex items-center">
              <div className="flex items-center">
                {[
                  ["one", LuMenu],
                  ["two", HiViewGrid],
                  ["three", BsGrid3X3GapFill],
                  ["four", TfiLayoutGrid4Alt],
                ].map(([view, Icon], index) => (
                  <Button
                    key={index}
                    className="!min-w-[30px] !h-[30px] !rounded-full"
                    onClick={() => setProductView(view)}
                  >
                    <Icon
                      className={`text-gray-500 hover:text-black ${
                        productView === view ? "text-blue-400" : ""
                      }`}
                      size={15}
                    />
                  </Button>
                ))}
              </div>
              <div className="ml-auto flex items-center">
                <p className="text-gray-500 mr-2">Show:</p>
                <Button
                  onClick={handleDropdownClick}
                  className="flex items-center"
                >
                  <span className="text-black">{productsPerPage}</span>
                  <FaAngleDown className="text-black ml-1" />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={() => handleDropdownClose(null)}
                >
                  {[9, 12, 24].map((count) => (
                    <MenuItem
                      key={count}
                      onClick={() => handleDropdownClose(count)}
                    >
                      {count}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
            <div
              className={`product-grid grid gap-2 ${
                productView === "four"
                  ? "grid-cols-4"
                  : productView === "three"
                  ? "grid-cols-3"
                  : productView === "two"
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {[...Array(productsPerPage)].map((_, i) => (
                <ProductItem key={i} layout={productView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Listing;
