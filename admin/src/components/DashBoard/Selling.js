import React, { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  MdDelete,
  MdDownload,
  MdEdit,
  MdRemove,
  MdRemoveRedEye,
  MdStar,
  MdViewArray,
} from "react-icons/md";
function Selling() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="!flex py-4 px-2 flex-col !justify-around !w-full !capitalize !relative">
        <div className="flex">
          <p className="!text-xl font-extrabold ">best selling products</p>
          <div className="ml-auto">
            <Button
              onClick={handleClick}
              className="!ml-auto !text-[22px] !text-[rgba(0,0,0,0.5)] !cursor-pointer !min-w-10 !w-10 !h-10 !rounded-full"
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "auto",
                  },
                },
              }}
            >
              <MenuItem onClick={handleClose} className="!text-xs !py-1">
                <MdEdit className="mr-3" fontSize="small" />
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} className="!text-xs !py-1">
                {" "}
                <MdDelete className="mr-3" fontSize="small" />
                Delete
              </MenuItem>
              <MenuItem onClick={handleClose} className="!text-xs !py-1">
                {" "}
                <MdDownload className="mr-3" fontSize="small" />
                Downlloads
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
          <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
            <div className="w-3/12">
              <label className="block mb-1 font-bold">SHOW BY</label>
              <select className="bg-gray-200 text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg z-10 divide-y divide-gray-100 -lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <option>12 Row</option>
                <option>24 Row</option>
                <option>36 Row</option>
              </select>
            </div>
            <div className="w-3/12">
              <label className="block mb-1 font-bold">CATEGORY BY</label>
              <select className="bg-gray-200 text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg z-10 divide-y divide-gray-100 -lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <option>Mans</option>
                <option>Womans</option>
                <option>Kid</option>
                <option>Accessory</option>
              </select>
            </div>
            <div className="w-3/12">
              <label className="block mb-1 font-bold">BRAND BY</label>
              <select className="bg-gray-200 text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg z-10 divide-y divide-gray-100 -lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <option>Ecstasy</option>
                <option>Freeland</option>
                <option>Rongdhono</option>
              </select>
            </div>
            <div className="w-3/12">
              <label className="block mb-1 font-bold">SEARCH BY</label>
              <input
                type="text"
                className="bg-gray-200 text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg z-10 divide-y divide-gray-100 -lg shadow dark:bg-gray-700 dark:divide-gray-600"
                placeholder="id / name / category / brand"
              />
            </div>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right">
              <thead class="text-xs text-white uppercase bg-gradient-to-t from-[#0858f7] to-[#2b77e5]">
                <tr>
                  <th scope="col" class=" p-3">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <p className="pl-2"> UID</p>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3">
                    PRODUCT
                  </th>
                  <th scope="col" class="px-6 py-3">
                    CATEGORY
                  </th>
                  <th scope="col" class="px-6 py-3">
                    BRAND
                  </th>
                  <th scope="col" class="px-6 py-3">
                    PRICE
                  </th>
                  <th scope="col" class="px-6 py-3">
                    STOCK
                  </th>
                  <th scope="col" class="px-6 py-3">
                    RATING
                  </th>
                  <th scope="col" class="px-6 py-3">
                    ORDER
                  </th>
                  <th scope="col" class="px-6 py-3">
                    SALES
                  </th>
                  <th scope="col" class="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    uid: "#1",
                    product: "Tops and skirt set for Fem...",
                    description: "Women's exclusive summer ...",
                    category: "womans",
                    brand: "richman",
                    price: "$19.00",
                    oldPrice: "$21.00",
                    stock: 30,
                    rating: 4.9,
                    ratingCount: 16,
                    order: 380,
                    sales: "$38k",
                    image: "https://placehold.co/50x50?text=Skirt",
                  },
                  {
                    uid: "#2",
                    product: "Leather belt steve madde...",
                    description: "Steve madden men's dress ...",
                    category: "mans",
                    brand: "lubana",
                    price: "$14.00",
                    oldPrice: "",
                    stock: 23,
                    rating: 4.5,
                    ratingCount: 38,
                    order: 189,
                    sales: "$9k",
                    image: "https://placehold.co/50x50?text=Belt",
                  },
                  {
                    uid: "#3",
                    product: "Existing product name",
                    description: "Nemo enim ipsam voluptate...",
                    category: "womans",
                    brand: "ecstasy",
                    price: "$33.00",
                    oldPrice: "44.00",
                    stock: 30,
                    rating: 4.1,
                    ratingCount: 69,
                    order: 380,
                    sales: "$38k",
                    image: "https://placehold.co/50x50?text=Product",
                  },
                  {
                    uid: "#4",
                    product: "Existing product name",
                    description: "Nemo enim ipsam voluptate...",
                    category: "kidz",
                    brand: "ecstasy",
                    price: "$33.00",
                    oldPrice: "",
                    stock: 30,
                    rating: 4.4,
                    ratingCount: 47,
                    order: 380,
                    sales: "$38k",
                    image: "https://placehold.co/50x50?text=Product",
                  },
                  {
                    uid: "#5",
                    product: "Existing product name",
                    description: "Nemo enim ipsam voluptate...",
                    category: "accessory",
                    brand: "ecstasy",
                    price: "$33.00",
                    oldPrice: "",
                    stock: 30,
                    rating: 5,
                    ratingCount: 47,
                    order: 380,
                    sales: "$38k",
                    image: "https://placehold.co/50x50?text=Product",
                  },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <p className="pl-2"> {item.uid}</p>
                      </div>
                    </td>

                    <td className="p-2 flex items-center">
                      <img
                        src={item.image}
                        alt="Product image"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <div className="font-bold">{item.product}</div>
                        <div className="text-sm text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.brand}</td>
                    <td className="p-2">
                      {item.oldPrice && (
                        <span className="line-through text-gray-400 mr-1">
                          {item.oldPrice}
                        </span>
                      )}
                      <span className="text-red-500">{item.price}</span>
                    </td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2 flex items-center">
                      <MdStar size={18} color="#FFC107" />
                      <span className="font-bold">{item.rating}</span>
                      <span className="text-gray-400 ml-1">
                        ({item.ratingCount})
                      </span>
                    </td>
                    <td className="p-2">{item.order}</td>
                    <td className="p-2">{item.sales}</td>
                    <td className="p-2 flex space-x-2">
                      <button className="bg-[#fbe5ff] p-2 rounded">
                        <MdRemoveRedEye color="#be0ee1" />
                      </button>
                      <button className="bg-[#ddfbe9] p-2 rounded">
                        <MdEdit color="#1a9f53" />
                      </button>
                      <button className="bg-[#ffdfe4] p-2 rounded">
                        <MdDelete color="#f11133" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Selling;
