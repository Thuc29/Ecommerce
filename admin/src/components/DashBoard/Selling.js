import React, { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Button, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  MdDelete,
  MdDownload,
  MdEdit,
  MdRemoveRedEye,
  MdStar,
} from "react-icons/md";
import { Link } from "react-router-dom";
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

  const products = [
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
    {
      uid: "#6",
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
      uid: "#7",
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
      uid: "#8",
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
      uid: "#9",
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
      uid: "#10",
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
      uid: "#11",
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
      uid: "#12",
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
      uid: "#13",
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
      uid: "#14",
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
      uid: "#15",
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
      uid: "#16",
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
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

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
                {currentProducts.map((item, index) => (
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
                        <div className="font-bold mt-2">{item.product}</div>
                        <div className="text-sm text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-center">{item.category}</td>
                    <td className="p-2 text-center">{item.brand}</td>
                    <td className="p-2 text-center">
                      <div>
                        {item.oldPrice && (
                          <div className="line-through text-gray-400 mr-1">
                            {item.oldPrice}
                          </div>
                        )}
                        <div className="text-red-500">{item.price}</div>
                      </div>
                    </td>
                    <td className="p-2 text-center">{item.stock}</td>
                    <td className="p-2 items-center">
                      <div className="flex">
                        <MdStar size={18} color="#FFC107" />
                        <div className="font-bold">{item.rating}</div>
                        <div className="text-gray-400 ml-1">
                          ({item.ratingCount})
                        </div>{" "}
                      </div>
                    </td>
                    <td className="p-2 text-center">{item.order}</td>
                    <td className="p-2 text-center">{item.sales}</td>
                    <td className="p-2 flex space-x-2">
                      <Link to={"/product-view"}>
                        <IconButton className="!bg-[#e559fd] !p-2 !mb-2 !rounded-lg">
                          <MdRemoveRedEye size={17} color="white" />
                        </IconButton>
                      </Link>
                      <Link to={"/product-upload"}>
                        <IconButton className="!bg-[#1dff37] !p-2 !mb-2 !rounded-lg">
                          <MdEdit size={17} color="white" />
                        </IconButton>
                      </Link>
                      <IconButton className="!bg-[#ff042a] !p-2 !mb-2 !rounded-lg">
                        <MdDelete size={17} color="white" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pt-4 flex justify-between">
              <div className="">
                Showing {""}
                <span className="font-semibold">
                  {" "}
                  {Math.min(startIndex + itemsPerPage, products.length)}
                </span>{" "}
                of <span className="font-semibold">{products.length}</span>{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Selling;
