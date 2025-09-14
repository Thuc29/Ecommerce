import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import { Link } from "react-router-dom";

function Sidebar() {
  const [value, setValue] = useState([100, 60000]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({
    minPrice: 100,
    maxPrice: 60000,
  });
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
    const fetchPriceRange = async () => {
      try {
        setPriceLoading(true);
        const response = await axios.get(
          "http://localhost:8888/api/products/price-range"
        );
        const { minPrice, maxPrice } = response.data.data;
        setPriceRange({ minPrice, maxPrice });
        setValue([minPrice, maxPrice]);
        setPriceLoading(false);
      } catch (error) {
        console.error("Error fetching price range:", error);
        setPriceLoading(false);
      }
    };
    fetchPriceRange();
  }, []);

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
              {/* Hiển thị giá min/max thực tế từ sản phẩm */}
              <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">
                  Available Price Range:
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-green-600">
                    Min: {priceRange.minPrice.toLocaleString()} VND
                  </span>
                  <span className="text-red-600">
                    Max: {priceRange.maxPrice.toLocaleString()} VND
                  </span>
                </div>
              </div>

              <RangeSlider
                value={value}
                onInput={setValue}
                min={priceRange.minPrice}
                max={priceRange.maxPrice}
                step={Math.max(
                  1,
                  Math.floor((priceRange.maxPrice - priceRange.minPrice) / 100)
                )}
              />

              {/* Hiển thị giá trị đang chọn */}
              <div className="flex py-2">
                <span className="text-xs text-gray-500">
                  Selected:{" "}
                  <strong className="text-gray-700">
                    {value[0].toLocaleString()}
                  </strong>{" "}
                  -{" "}
                  <strong className="text-gray-700">
                    {value[1].toLocaleString()}
                  </strong>{" "}
                  VND
                </span>
              </div>

              {/* Hiển thị tỷ lệ phần trăm so với range */}
              <div className="text-xs text-gray-400 mt-1">
                {Math.round(
                  ((value[0] - priceRange.minPrice) /
                    (priceRange.maxPrice - priceRange.minPrice)) *
                    100
                )}
                % -{" "}
                {Math.round(
                  ((value[1] - priceRange.minPrice) /
                    (priceRange.maxPrice - priceRange.minPrice)) *
                    100
                )}
                % of range
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
          <h6 className="font-bold text-[15px] mb-4"> BRANDS </h6>
          <div
            className="scroll pl-2 max-h-[200px] overflow-y-auto overflow-x-hidden
  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-thumb]:rounded-xl
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300
  "
          >
            <ul>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Gucci"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Charle "
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Gucci"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Charle "
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Gucci"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Charle "
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Gucci"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Charle "
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Gucci"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Charle "
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Gucci"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Charle "
                />{" "}
              </li>
            </ul>
          </div>
        </div>
        <Link to={"#"}>
          <img
            src="https://cdn.create.vista.com/downloads/c7f2b823-e345-4c35-9470-8190110f66bb_360.jpeg"
            className="w-full"
          />
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
