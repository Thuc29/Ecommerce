import React, { useState, useEffect } from "react";
import { Button, IconButton, Table } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  MdDelete,
  MdDownload,
  MdEdit,
  MdRemoveRedEye,
  MdStar,
  MdStarBorder,
  MdStarHalf,
} from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatPriceVND } from "../../utils/formatPrice";

function Selling() {
  // State for menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";
  // State for products, filters, and pagination
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Menu handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch all products from the backend
  const getAllProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      if (response.data.success && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        throw new Error(
          response.data.message || "Invalid data format from API"
        );
      }
    } catch (err) {
      console.error("Fetch products error:", err.response?.data || err.message);
      setError(
        "Failed to fetch products: " +
          (err.response?.data?.message || err.message)
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from the backend
  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/category`);
      if (response.data.success && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error("Fetch categories error:", err.message);
    }
  };

  // Fetch brands (giả sử bạn có API endpoint cho brands)
  const getBrands = async () => {
    try {
      // Nếu không có API riêng cho brands, lấy từ products
      const uniqueBrands = [
        ...new Set(products.map((item) => item.brand).filter(Boolean)),
      ];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error("Fetch brands error:", err.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);

  // Update brands when products change
  useEffect(() => {
    getBrands();
  }, [products]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery, itemsPerPage]);

  // Filter products
  const filteredProducts = products.filter((item) => {
    // Category filter
    const categoryName =
      typeof item.category === "object" && item.category?.name
        ? item.category.name
        : typeof item.category === "string"
        ? item.category
        : "";
    const categoryMatch = selectedCategory
      ? categoryName.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    // Brand filter
    const brandMatch = selectedBrand
      ? item.brand?.toLowerCase() === selectedBrand.toLowerCase()
      : true;

    // Search filter
    const searchMatch = searchQuery
      ? item._id?.$oid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return categoryMatch && brandMatch && searchMatch;
  });

  // Calculate total pages and current products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Pagination handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `${API_URL}/api/products/${productId}`
      );
      if (response.data.success) {
        setProducts(
          products.filter((item) => (item._id?.$oid || item._id) !== productId)
        );
        window.alert("Product deleted successfully!");
      } else {
        throw new Error(response.data.message || "Failed to delete product");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
      console.error(err);
    }
  };
  return (
    <div className="!flex py-4 px-2 flex-col !justify-around !w-full !capitalize !relative">
      {/* Header */}
      <div className="flex flex-wrap items-center">
        <p className="!text-xl font-extrabold">Best Selling Products</p>
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
              <MdDelete className="mr-3" fontSize="small" />
              Delete
            </MenuItem>
            <MenuItem onClick={handleClose} className="!text-xs !py-1">
              <MdDownload className="mr-3" fontSize="small" />
              Downloads
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Error and Loading States */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && (
        <div className="text-center py-4">
          <p>Loading products...</p>
        </div>
      )}

      {/* Table and Filters */}
      {!loading && (
        <div className="relative overflow-x-auto sm:rounded-lg">
          {/* Filters */}
          <div className="flex flex-wrap space-y-4 md:space-y-0 py-4">
            <div className="lg:w-4/12 md:w-4/12 sm:w-6/12 w-full">
              <label className="block mb-1 font-bold">CATEGORY BY</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-200 !text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option
                    key={category._id?.$oid || category.name}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:w-4/12 md:w-4/12 sm:w-6/12 w-full">
              <label className="block mb-1 font-bold">BRAND BY</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-gray-200 !text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:w-4/12 md:w-4/12 sm:w-6/12 w-full">
              <label className="block mb-1 font-bold">SEARCH BY</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-200 !text-gray-800 p-3 w-[93%] border border-gray-300 rounded-lg"
                placeholder="id / name / category / brand"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <Table className="min-w-full !rounded-lg shadow-lg dark:bg-gray-800 dark:text-white overflow-x-auto">
              <thead className="text-xs text-center text-white uppercase bg-gradient-to-t from-[#0858f7] to-[#2b77e5]">
                <tr>
                  <th scope="col" className="px-4 py-3 border min-w-[200px]">
                    PRODUCT
                  </th>
                  <th scope="col" className="px-4 py-3 border min-w-[120px]">
                    CATEGORY
                  </th>
                  <th scope="col" className="px-4 py-3 border min-w-[100px]">
                    BRAND
                  </th>
                  <th scope="col" className="px-4 py-3 border min-w-[100px]">
                    PRICE
                  </th>
                  <th scope="col" className="px-4 py-3 border min-w-[80px]">
                    RATING
                  </th>
                  <th scope="col" className="px-4 py-3 border min-w-[150px]">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((item, index) => (
                    <tr
                      key={item._id?.$oid || index}
                      className="odd:bg-white items-center border border-gray-300 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                    >
                      <td className="p-2 items-center">
                        <div className="flex items-center md:px-4">
                          <img
                            src={
                              item.images?.[0]?.url ||
                              "https://placehold.co/50x50?text=Product"
                            }
                            alt="Product image"
                            className="w-10 h-10 rounded-lg mx-2"
                          />
                          <div className="max-w-[150px]">
                            <div className="font-bold mt-2">
                              {item.name || "N/A"}
                            </div>
                            <div
                              className="text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap"
                              title={item.description || "N/A"}
                            >
                              {item.description || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        {typeof item.category === "object" &&
                        item.category?.name
                          ? item.category.name
                          : typeof item.category === "string"
                          ? item.category
                          : item.category?.$oid || "N/A"}
                      </td>
                      <td className="p-2 text-center">
                        <p className="bg-gray-300 !text-gray-800 w-fit px-2 rounded-lg">
                          {item.brand || "N/A"}
                        </p>
                      </td>
                      <td className="p-2 text-center">
                        <div>
                          {item.oldPrice > 0 && (
                            <div className="line-through text-gray-500 mr-1 text-xs">
                              {formatPriceVND(item.oldPrice)}
                            </div>
                          )}
                          <div className="text-red-500 font-semibold">
                            {item.price ? formatPriceVND(item.price) : "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 items-center">
                        <div className="flex justify-center items-center space-x-1">
                          {item.rating ? (
                            [...Array(5)].map((_, index) => {
                              const ratingValue = item.rating || 0;
                              if (index < Math.floor(ratingValue)) {
                                return (
                                  <MdStar
                                    key={index}
                                    size={18}
                                    color="#FFC107"
                                  />
                                );
                              } else if (
                                index < ratingValue &&
                                ratingValue % 1 !== 0
                              ) {
                                return (
                                  <MdStarHalf
                                    key={index}
                                    size={18}
                                    color="#FFC107"
                                  />
                                );
                              } else {
                                return (
                                  <MdStarBorder
                                    key={index}
                                    size={18}
                                    color="#FFC107"
                                  />
                                );
                              }
                            })
                          ) : (
                            <span>N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 items-center">
                        <div className="flex justify-center items-center space-x-2 flex-wrap">
                          {item._id ? (
                            <>
                              <Link to={`/product-view/${item._id}`}>
                                <IconButton className="!bg-[#e559fd] !p-2 !mb-2 !rounded-lg">
                                  <MdRemoveRedEye size={17} color="white" />
                                </IconButton>
                              </Link>
                              <Link to={`/product-edit/${item._id}`}>
                                <IconButton className="!bg-[#1dff37] !p-2 !mb-2 !rounded-lg">
                                  <MdEdit size={17} color="white" />
                                </IconButton>
                              </Link>
                              <IconButton
                                onClick={() => handleDelete(item._id)}
                                className="!bg-[#ff042a] !p-2 !mb-2 !rounded-lg"
                              >
                                <MdDelete size={17} color="white" />
                              </IconButton>
                            </>
                          ) : (
                            <p className="text-red-500">Invalid product ID</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            <div className="pt-4 flex flex-wrap justify-between">
              <div>
                Showing{" "}
                <span className="font-semibold">
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold">{filteredProducts.length}</span>{" "}
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
      )}
    </div>
  );
}

export default Selling;
