import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import { Link } from "react-router-dom";

function Sidebar({ onPriceFilter, onBrandFilter }) {
  const [value, setValue] = useState([100, 60000]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [error, setError] = useState(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/category");
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setPriceLoading(true);
        const response = await axios.get("http://localhost:8888/api/products");
        const list = response.data.data || [];
        setProducts(list);
        setFilteredProducts(list);

        // Tính min/max giá từ dataset
        if (list.length > 0) {
          const prices = list.map((p) => p.price || 0);
          const minP = Math.min(...prices);
          const maxP = Math.max(...prices);
          setMinPrice(minP);
          setMaxPrice(maxP);
          setValue([minP, maxP]);
          if (onPriceFilter) onPriceFilter([minP, maxP]);
        } else {
          setMinPrice(0);
          setMaxPrice(0);
          setValue([0, 0]);
          if (onPriceFilter) onPriceFilter([0, 0]);
        }
        setLoading(false);
        setPriceLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Failed to load products");
        setLoading(false);
        setPriceLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8888/api/products/brands"
        );
        setBrands(res.data.data || []);
      } catch (err) {
        console.error("Error fetching brands:", err.message);
      }
    };
    fetchBrands();
  }, []);

  const handleToggleBrand = (brandName) => {
    setSelectedBrands((prev) => {
      const exists = prev.includes(brandName);
      const next = exists
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName];
      if (onBrandFilter) onBrandFilter(next);
      return next;
    });
  };

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    if (onPriceFilter) onPriceFilter(newValue);
  };

  return (
    <>
      <div className="sidebar w-[20%] flex-[0_0_20%] hidden md:block">
        <div className="filterBox ">
          <h6 className="font-bold text-[15px] mb-4"> PRODUCT CATEGORIES </h6>
          <div
            className="scroll pl-2 max-h-[200px] overflow-y-auto overflow-x-hidden
  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-thumb]:rounded-xl
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300
  "
          >
            <ul>
              {categories.map((category) => (
                <li className="list-none w-full mb-1" key={category.id}>
                  {" "}
                  <FormControlLabel
                    className="w-full !font-[Space_Grotesk]"
                    control={<Checkbox />}
                    label={category.name}
                  />{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="filterBox mb-[35px]">
          <h6 className="font-bold text-[15px] mb-4"> FILTER BY PRICE </h6>
          {priceLoading ? (
            <div className="text-center text-gray-500 py-4">
              Loading price range...
            </div>
          ) : (
            <>
              <RangeSlider
                value={value}
                onInput={handleSliderChange}
                min={minPrice}
                max={maxPrice}
                step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
              />

              {/* Hiển thị giá trị đang chọn */}
              <div className="flex py-2 justify-between items-center">
                <span className="text-xs text-gray-500">
                  Selected:{" "}
                  <strong className="text-gray-700">
                    {value[0].toLocaleString()}
                  </strong>{" "}
                  -{" "}
                  <strong className="text-gray-700">
                    {value[1].toLocaleString()}
                  </strong>{" "}
                  $
                </span>

                {/* Hiển thị tỷ lệ phần trăm so với range */}
                <div className="text-xs text-gray-400">
                  {Math.round(
                    ((value[0] - minPrice) / (maxPrice - minPrice)) * 100
                  )}
                  % -{" "}
                  {Math.round(
                    ((value[1] - minPrice) / (maxPrice - minPrice)) * 100
                  )}
                  %
                </div>
              </div>
            </>
          )}
        </div>
        <div className="filterBox ">
          <h6 className="font-bold text-[15px] mb-4"> PRODUCT STATUS </h6>
          <div className="scroll pl-2 max-h-[200px]">
            <ul>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="In Stock"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="On Sale"
                />{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox ">
          <h6 className="font-bold text-[15px] mb-4">
            {" "}
            BRANDS ({brands.length})
          </h6>
          <div
            className="scroll cursor-pointer pl-2 max-h-[200px] overflow-y-auto overflow-x-hidden
  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-thumb]:rounded-xl
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300
  font-[Space_Grotesk]
  "
          >
            <ul>
              {brands.map((brand) => (
                <li key={brand.name} className="list-none w-full mb-1">
                  <FormControlLabel
                    className="w-full cursor-pointer"
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => handleToggleBrand(brand.name)}
                      />
                    }
                    label={`${brand.name} (${brand.count})`}
                  />
                </li>
              ))}
              {brands.length === 0 && (
                <li className="text-gray-500 text-sm">No brands found</li>
              )}
            </ul>
          </div>
        </div>
        <Link to={"#"}>
          <img
            src="https://cdn.create.vista.com/downloads/c7f2b823-e345-4c35-9470-8190110f66bb_360.jpeg"
            className="w-full pt-6"
          />
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
