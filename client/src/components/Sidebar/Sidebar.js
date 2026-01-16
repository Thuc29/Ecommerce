import { Checkbox, FormControlLabel, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi, formatCurrency } from "../../services/api";

function Sidebar({ 
  onPriceFilter, 
  onBrandFilter, 
  onRatingFilter,
  currentMinPrice, 
  currentMaxPrice, 
  currentBrands,
  currentRating 
}) {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Price range state (local for slider)
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sliderValue, setSliderValue] = useState([0, 1000000]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [catRes, brandRes] = await Promise.all([
          fetchDataFromApi("/api/category"),
          fetchDataFromApi("/api/products/brands")
        ]);
        
        setCategories(catRes.data || catRes?.data?.data || []);
        setBrands(brandRes.data || brandRes?.data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Sync slider with props
  useEffect(() => {
    if (currentMinPrice !== null && currentMaxPrice !== null) {
      setSliderValue([parseInt(currentMinPrice), parseInt(currentMaxPrice)]);
    }
  }, [currentMinPrice, currentMaxPrice]);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  };

  const handleSliderFinal = (newValue) => {
    if (onPriceFilter) onPriceFilter(newValue);
  };

  const handleToggleBrand = (brandName) => {
    const next = currentBrands.includes(brandName)
      ? currentBrands.filter((b) => b !== brandName)
      : [...currentBrands, brandName];
    if (onBrandFilter) onBrandFilter(next);
  };

  return (
    <div className="sidebar w-[20%] flex-[0_0_20%] hidden lg:block pr-4">
      <div className="filterBox mb-8">
        <h6 className="font-black text-sm text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2bbef9] rounded-full"></span>
          Product Categories
        </h6>
        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/cat/${category._id}`}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                categoryId === category._id 
                  ? "bg-[#2bbef9] text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#2bbef9]"
              }`}
            >
              <span>{category.name}</span>
              {category.subcategories?.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  categoryId === category._id ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {category.subcategories.length}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="filterBox mb-10 bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <h6 className="font-black text-sm text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2bbef9] rounded-full"></span>
          Filter by Price
        </h6>
        <div className="px-2">
          <RangeSlider
            value={sliderValue}
            onInput={handleSliderChange}
            onThumbDragEnd={() => handleSliderFinal(sliderValue)}
            min={0}
            max={2000000}
            step={10000}
          />
          <div className="flex flex-col gap-1 mt-6">
            <div className="flex justify-between text-[11px] text-gray-400 font-bold uppercase">
              <span>Min Price</span>
              <span>Max Price</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-[#2bbef9]">
                {formatCurrency(sliderValue[0])}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-sm font-black text-[#2bbef9]">
                {formatCurrency(sliderValue[1])}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="filterBox mb-8">
        <h6 className="font-black text-sm text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2bbef9] rounded-full"></span>
          Brands ({brands.length})
        </h6>
        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleToggleBrand(brand.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentBrands.includes(brand.name)
                  ? "bg-[#2bbef9]/10 border border-[#2bbef9]/20"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <Checkbox
                checked={currentBrands.includes(brand.name)}
                size="small"
                sx={{
                  padding: 0,
                  color: "#e2e8f0",
                  "&.Mui-checked": { color: "#2bbef9" },
                }}
              />
              <span className={`text-sm font-medium ${
                currentBrands.includes(brand.name) ? "text-[#2bbef9]" : "text-gray-600"
              }`}>
                {brand.name}
              </span>
              <span className="ml-auto text-[10px] font-bold text-gray-400">
                {brand.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="filterBox mb-8">
        <h6 className="font-black text-sm text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2bbef9] rounded-full"></span>
          Filter by Rating
        </h6>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              onClick={() => onRatingFilter(rating)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentRating === rating
                  ? "bg-[#2bbef9]/10 border border-[#2bbef9]/20"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <Rating
                value={rating}
                readOnly
                size="small"
                sx={{ color: "#2bbef9" }}
              />
              <span className={`text-sm font-medium ${
                currentRating === rating ? "text-[#2bbef9]" : "text-gray-600"
              }`}>
                {rating === 5 ? "5 Stars" : `& Up`}
              </span>
            </div>
          ))}
          {currentRating && (
            <button
              onClick={() => onRatingFilter(null)}
              className="text-xs text-red-500 font-bold uppercase tracking-wider mt-2 ml-3 hover:underline"
            >
              Clear Rating
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 rounded-2xl overflow-hidden shadow-lg group">
        <img
          src="https://cdn.create.vista.com/downloads/c7f2b823-e345-4c35-9470-8190110f66bb_360.jpeg"
          className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
          alt="Ad"
        />
      </div>
    </div>
  );
}

export default Sidebar;
