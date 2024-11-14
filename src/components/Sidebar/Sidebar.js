import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [value, setValue] = useState([100, 60000]);
  const [value2, setValue2] = useState(0);
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
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Men"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Women"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Kids"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
              <li className="list-none w-full mb-1">
                {" "}
                <FormControlLabel
                  className="w-full"
                  control={<Checkbox />}
                  label="Beauty"
                />{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox mb-[35px]">
          <h6 className="font-bold text-[15px] mb-4"> FILTER BY PRICE </h6>
          <RangeSlider
            value={value}
            onInput={setValue}
            min={100}
            max={60000}
            step={5}
          />
          <div className="flex py-2">
            <span className="text-xs text-gray-500">
              Price: <strong className="text-gray-700 "> {value[0]}</strong> -{" "}
              <strong className="text-gray-700"> {value[1]}</strong> VND
            </span>
          </div>
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
