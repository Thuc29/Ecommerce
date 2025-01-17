import React, { useState } from "react";
import { Button } from "@mui/material";

function Infomation() {
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (category.trim()) {
      alert(`Category Added: ${category}`);
      setCategory("");
    } else {
      alert("Please enter a category.");
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[#1d2f4d] p-5 rounded-lg shadow-md delay-[.3s]">
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Basic Information
            </h2>
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1 uppercase">
                Title
              </label>
              <input
                type="text"
                className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                placeholder="type here"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1 uppercase">
                Description
              </label>
              <textarea
                className="w-full h-[150px] mb-4 py-[10px] px-[15px] bg-gray-700 rounded-lg"
                rows="4"
                placeholder="Type here..."
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 uppercase">
                  Category
                </label>
                <select className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg">
                  <option>Rickman</option>
                  <option>Lubana</option>
                  <option>Ecstasy</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 uppercase">
                  Brand
                </label>
                <select className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg">
                  <option>Mans</option>
                  <option>Womans</option>
                  <option>Accessory</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 uppercase">
                  Regular Price
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 uppercase">
                  Discount Price
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 uppercase">
                  Shipping Fee
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                  placeholder="type here"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 uppercase">
                  Tax Rate
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                  placeholder="type here"
                />
              </div>
            </div>
            <div className="">
              <label className="block text-xs font-bold mb-1 uppercase">
                Tags
              </label>
              <textarea
                className="w-full h-[150px] mb-4 p-3 bg-gray-700 rounded-lg"
                rows="2"
                placeholder="Type here..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-[#1d2f4d] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Organization
            </h2>
            <div className="flex items-end gap-4 justify-start mb-4">
              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-bold uppercase inline-block text-gray-200 mb-1">
                  Add Category
                </label>
                <input
                  placeholder="Type here"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  className="!h-[42px] !w-full !bg-gray-700 !rounded-lg !p-[0_15px] !text-sm !font-medium !text-ellipsis !whitespace-nowrap"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className="!rounded-lg !text-[13px] !font-semibold !tracking-[.5px] !text-center !uppercase !delay-[.3s] !whitespace-nowrap !flex-shrink-0 !h-[42px] !p-[8px_12px] !w-[90px]"
              >
                Add
              </Button>
            </div>
            <div className="flex items-end gap-4 justify-start mb-4">
              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-bold uppercase inline-block text-gray-200 mb-1">
                  Add Category
                </label>
                <input
                  placeholder="Type here"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  className="!h-[42px] !w-full !bg-gray-700 !rounded-lg !p-[0_15px] !text-sm !font-medium !text-ellipsis !whitespace-nowrap"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className="!rounded-lg !text-[13px] !font-semibold !tracking-[.5px] !text-center !uppercase !delay-[.3s] !whitespace-nowrap !flex-shrink-0 !h-[42px] !p-[8px_12px] !w-[90px]"
              >
                Add
              </Button>
            </div>{" "}
            <div className="flex items-end gap-4 justify-start mb-4">
              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-bold uppercase inline-block text-gray-200 mb-1">
                  Add Brand
                </label>
                <input
                  placeholder="Type here"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  className="!h-[42px] !w-full !bg-gray-700 !rounded-lg !p-[0_15px] !text-sm !font-medium !text-ellipsis !whitespace-nowrap"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className="!rounded-lg !text-[13px] !font-semibold !tracking-[.5px] !text-center !uppercase !delay-[.3s] !whitespace-nowrap !flex-shrink-0 !h-[42px] !p-[8px_12px] !w-[90px]"
              >
                Add
              </Button>
            </div>{" "}
            <div className="flex items-end gap-4 justify-start mb-4">
              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-bold uppercase inline-block text-gray-200 mb-1">
                  Add Color
                </label>
                <input
                  placeholder="Type here"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  className="!h-[42px] !w-full !bg-gray-700 !rounded-lg !p-[0_15px] !text-sm !font-medium !text-ellipsis !whitespace-nowrap"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className="!rounded-lg !text-[13px] !font-semibold !tracking-[.5px] !text-center !uppercase !delay-[.3s] !whitespace-nowrap !flex-shrink-0 !h-[42px] !p-[8px_12px] !w-[90px]"
              >
                Add
              </Button>
            </div>{" "}
            <div className="flex items-end gap-4 justify-start mb-4">
              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-bold uppercase inline-block text-gray-200 mb-1">
                  Add Size
                </label>
                <input
                  placeholder="Type here"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  className="!h-[42px] !w-full !bg-gray-700 !rounded-lg !p-[0_15px] !text-sm !font-medium !text-ellipsis !whitespace-nowrap"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className="!rounded-lg !text-[13px] !font-semibold !tracking-[.5px] !text-center !uppercase !delay-[.3s] !whitespace-nowrap !flex-shrink-0 !h-[42px] !p-[8px_12px] !w-[90px]"
              >
                Add
              </Button>
            </div>
          </div>
          <div className="bg-[#1d2f4d] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Specification
            </h2>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
              <div className="items-start flex flex-col">
                <label className="inline-block text-xs font-bold mb-1 uppercase">
                  Size
                </label>
                <select
                  multiple
                  className="w-full mb-4 bg-gray-700 rounded h-[100px] overflow-y-auto p-[12px_15px] capitalize text-xs font-medium text-ellipsis whitespace-nowrap "
                >
                  <option>Sm</option>
                  <option>Md</option>
                  <option>Lg</option>
                  <option>Xl</option>
                  <option>Xxl</option>
                </select>
              </div>
              <div className="items-start flex flex-col">
                <label className="inline-block text-xs font-bold mb-1 uppercase">
                  Color
                </label>
                <select
                  multiple
                  className="w-full mb-4 bg-gray-700 rounded h-[100px] overflow-y-auto p-[12px_15px] capitalize text-xs font-medium text-ellipsis whitespace-nowrap "
                >
                  <option>Red</option>
                  <option>Green</option>
                  <option>Blue</option>
                  <option>Pink</option>
                  <option>Black</option>
                </select>
              </div>
              <div className="items-start flex flex-col">
                <label className="inline-block text-xs font-bold mb-1 uppercase">
                  Stock
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                  placeholder="type here"
                />
              </div>
              <div className="items-start flex flex-col">
                <label className="inline-block text-xs font-bold mb-1 uppercase">
                  Weight
                </label>
                <input
                  type="text"
                  className="w-full h-[45px] mb-4 p-3 bg-gray-700 rounded-lg"
                  placeholder="type here"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Infomation;
