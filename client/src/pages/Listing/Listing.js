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
import axios from "axios";

function Listing() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState("none"); // 'asc' | 'desc' | 'none'
  const [priceFilter, setPriceFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState([]);

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

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-6ssp.onrender.com/api/products");
        const list = response.data.data || [];
        setProducts(list);
        setFilteredProducts(list);

        // Tính min/max giá từ dataset
        if (list.length > 0) {
          const prices = list.map((p) => p.price || 0);
          setMinPrice(Math.min(...prices));
          setMaxPrice(Math.max(...prices));
        } else {
          setMinPrice(0);
          setMaxPrice(0);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cập nhật danh sách theo filter giá + brand
  useEffect(() => {
    let list = products;
    if (priceFilter && list.length > 0) {
      const [minP, maxP] = priceFilter;
      list = list.filter(
        (p) => (p.price || 0) >= minP && (p.price || 0) <= maxP
      );
    }
    if (brandFilter && brandFilter.length > 0) {
      const setBrands = new Set(
        brandFilter.map((b) =>
          String(b || "")
            .trim()
            .toUpperCase()
        )
      );
      list = list.filter((p) =>
        setBrands.has(
          String(p.brand || "")
            .trim()
            .toUpperCase()
        )
      );
    }
    setFilteredProducts(list);
  }, [priceFilter, brandFilter, products]);

  const handlePriceFilter = (range) => {
    setPriceFilter(range);
  };

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
          <Sidebar
            onPriceFilter={handlePriceFilter}
            onBrandFilter={setBrandFilter}
          />
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
                  <span className="text-black ">{productsPerPage}</span>
                  <FaAngleDown className="text-black ml-1" />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={() => handleDropdownClose(null)}
                >
                  {[8, 12, 24].map((count) => (
                    <MenuItem
                      key={count}
                      onClick={() => handleDropdownClose(count)}
                    >
                      {count}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div className="ml-4 flex items-center ">
                <p className="text-gray-500 mr-2">Sort by:</p>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border !rounded-xl py-1 text-sm "
                >
                  <option value="none">Default</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
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
              {loading && (
                <div className="col-span-full text-center text-gray-600">
                  Loading...
                </div>
              )}
              {error && (
                <div className="col-span-full text-center text-red-500">
                  {error}
                </div>
              )}
              {!loading &&
                !error &&
                [...filteredProducts]
                  .sort((a, b) => {
                    if (sortOrder === "asc")
                      return (a.price || 0) - (b.price || 0);
                    if (sortOrder === "desc")
                      return (b.price || 0) - (a.price || 0);
                    return 0;
                  })
                  .slice(0, productsPerPage)
                  .map((product, index) => (
                    <ProductItem
                      key={index}
                      layout={productView}
                      product={product}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Listing;
