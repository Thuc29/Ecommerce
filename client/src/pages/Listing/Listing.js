import React, { useEffect, useState } from "react";
import { Button, Pagination } from "@mui/material";
import { LuMenu } from "react-icons/lu";
import { HiViewGrid } from "react-icons/hi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSearchParams, useParams } from "react-router-dom";
import ProductItem from "../../components/Product/ProductItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import { fetchDataFromApi } from "../../services/api";
import { ListingSkeleton } from "../../components/common";

function Listing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: categoryId } = useParams();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination & Sorting states
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Get values from URL or defaults
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const sortOrder = searchParams.get("sort") || "desc";
  const searchQuery = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const brand = searchParams.get("brand");
  const rating = searchParams.get("rating");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) setProductView("four");
      else if (screenWidth >= 768) setProductView("three");
      else setProductView("two");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products from server based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/api/products?page=${page}&limit=${limit}&sortOrder=${sortOrder}`;
        
        if (categoryId) url += `&category=${categoryId}`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
        if (minPrice) url += `&minPrice=${minPrice}`;
        if (maxPrice) url += `&maxPrice=${maxPrice}`;
        if (brand) url += `&brand=${brand}`;
        if (rating) url += `&rating=${rating}`;

        const response = await fetchDataFromApi(url);
        
        if (response.success) {
          setProducts(response.data);
          setTotalPages(response.pages);
          setTotalProducts(response.total);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, searchQuery, page, limit, sortOrder, minPrice, maxPrice, brand, rating]);

  const handlePageChange = (event, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", value);
    setSearchParams(newParams);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", e.target.value);
    newParams.set("page", "1"); // Reset to page 1 on sort change
    setSearchParams(newParams);
  };

  const handleLimitChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", value);
    newParams.set("page", "1");
    setSearchParams(newParams);
    setAnchorEl(null);
  };

  const handlePriceFilter = (range) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("minPrice", range[0]);
    newParams.set("maxPrice", range[1]);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleBrandFilter = (selectedBrands) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedBrands.length > 0) {
      newParams.set("brand", selectedBrands.join(","));
    } else {
      newParams.delete("brand");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleRatingFilter = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("rating", value);
    } else {
      newParams.delete("rating");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // Show full page skeleton when loading
  if (loading && products.length === 0) {
    return <ListingSkeleton />;
  }

  return (
    <section className="product-listing-page mx-auto w-full md:max-w-[1270px] px-4 py-8">
      <div className="container">
        <div className="productListing md:gap-6 md:flex">
          <Sidebar
            onPriceFilter={handlePriceFilter}
            onBrandFilter={handleBrandFilter}
            onRatingFilter={handleRatingFilter}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
            currentBrands={brand ? brand.split(",") : []}
            currentRating={rating ? parseInt(rating) : null}
          />
          
          <div className="content_right w-full md:w-[80%]">
            <div className="relative mb-8 rounded-2xl overflow-hidden h-[200px] md:h-[250px]">
              <img
                src="/assets/bannerList1.jpeg"
                className="w-full h-full object-cover"
                alt="Listing Banner"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-8">
                <h2 className="text-white text-3xl font-black mb-2">
                  {searchQuery ? `Search results for "${searchQuery}"` : "Our Collection"}
                </h2>
                <p className="text-white/80 font-medium">
                  Showing {products.length} of {totalProducts} products
                </p>
              </div>
            </div>

            <div className="w-full bg-white border border-gray-100 shadow-sm py-3 px-6 rounded-2xl mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {[
                  ["one", LuMenu],
                  ["two", HiViewGrid],
                  ["three", BsGrid3X3GapFill],
                  ["four", TfiLayoutGrid4Alt],
                ].map(([view, Icon]) => (
                  <Button
                    key={view}
                    className={`!min-w-[36px] !h-[36px] !rounded-xl ${
                      productView === view ? "!bg-[#2bbef9] !text-white" : "!text-gray-400 hover:!bg-gray-50"
                    }`}
                    onClick={() => setProductView(view)}
                  >
                    <Icon size={18} />
                  </Button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Show:</span>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="!bg-gray-50 !text-gray-700 !rounded-xl !px-4 !py-1.5 !text-sm !font-bold !normal-case border border-gray-100"
                  >
                    {limit} <FaAngleDown className="ml-2" />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{ className: "!rounded-xl !shadow-xl !border !border-gray-50" }}
                  >
                    {[12, 24, 48].map((count) => (
                      <MenuItem key={count} onClick={() => handleLimitChange(count)} className="!text-sm !font-medium">
                        {count} Products
                      </MenuItem>
                    ))}
                  </Menu>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#2bbef9]/20 transition-all"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {error ? (
              <div className="bg-red-50 text-red-600 p-12 rounded-2xl text-center font-bold">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <>
                <div
                  className={`product-grid grid gap-6 ${
                    productView === "four"
                      ? "grid-cols-2 lg:grid-cols-4"
                      : productView === "three"
                      ? "grid-cols-2 lg:grid-cols-3"
                      : productView === "two"
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {products.map((product) => (
                    <ProductItem
                      key={product._id}
                      layout={productView}
                      product={product}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      className="premium-pagination"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          borderRadius: "12px",
                          fontWeight: "bold",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#2bbef9 !important",
                        },
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Listing;
