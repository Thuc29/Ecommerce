import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoSearch, IoClose, IoTimeOutline } from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi, formatCurrency } from "../../services/api";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        console.error("Error parsing search history:", e);
      }
    }
  }, []);

  // Save search to history
  const saveToHistory = (query) => {
    if (!query.trim()) return;
    
    const newHistory = [
      query.trim(),
      ...searchHistory.filter((item) => item.toLowerCase() !== query.toLowerCase()),
    ].slice(0, 8); // Keep max 8 items
    
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // Debounced search for suggestions
  const fetchSuggestions = useCallback(async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchDataFromApi(
        `/api/products?search=${encodeURIComponent(query)}&limit=6`
      );
      if (response.success && response.data) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle input change with debounce
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Debounce search
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      saveToHistory(searchQuery);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    saveToHistory(product.name);
    navigate(`/product/${product._id}`);
    setSearchQuery("");
    setShowDropdown(false);
    setSuggestions([]);
  };

  // Handle history item click
  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    saveToHistory(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setShowDropdown(false);
  };

  // Remove item from history
  const removeFromHistory = (e, query) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((item) => item !== query);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const totalItems = suggestions.length + (searchQuery ? 0 : searchHistory.length);
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      if (searchQuery && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else if (!searchQuery && searchHistory[selectedIndex]) {
        handleHistoryClick(searchHistory[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const showSuggestions = searchQuery.length >= 2 && suggestions.length > 0;
  const showHistory = !searchQuery && searchHistory.length > 0;

  return (
    <div ref={searchRef} className="flex-grow w-full md:max-w-2xl relative">
      <form
        onSubmit={handleSearch}
        className="flex items-center h-[40px] md:h-[44px] bg-[#f3f4f7] border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#2bbef9] focus-within:ring-2 focus-within:ring-[#2bbef9]/20 transition-all"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products ..."
          className="bg-transparent border-none outline-none text-sm md:text-[15px] w-full h-full px-2 md:px-4 text-gray-700"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        
        {/* Clear button */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            className="p-2 hover:text-[#2bbef9] transition-colors"
          >
            <IoClose size={18} />
          </button>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="px-2">
            <CircularProgress size={18} sx={{ color: "#2bbef9" }} />
          </div>
        )}
        
        <Button
          type="submit"
          className="h-[40px] md:h-[44px] !min-w-[40px] md:!min-w-[45px] hover:bg-[#2bbef9] hover:text-white transition-colors"
          style={{
            borderRadius: "0",
            minWidth: "40px",
          }}
        >
          <IoSearch color="#555" size={20} />
        </Button>
      </form>

      {/* Dropdown */}
      {showDropdown && (showSuggestions || showHistory) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeIn">
          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FiTrendingUp size={14} />
                Products
              </div>
              {suggestions.map((product, index) => (
                <div
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                    selectedIndex === index
                      ? "bg-[#2bbef9]/10"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={
                      product.images?.[0]?.url ||
                      "https://via.placeholder.com/40x40?text=No+Image"
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.brand && `${product.brand} • `}
                      <span className="text-red-500 font-semibold">
                        {formatCurrency(product.price)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
              
              {/* View all results */}
              <div
                onClick={handleSearch}
                className="px-4 py-3 text-center text-sm font-medium text-[#2bbef9] hover:bg-[#2bbef9]/5 cursor-pointer border-t border-gray-100"
              >
                View all results for "{searchQuery}"
              </div>
            </div>
          )}

          {/* Search History */}
          {showHistory && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IoTimeOutline size={14} />
                  Recent Searches
                </span>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-red-400 hover:text-red-600 font-medium"
                >
                  Clear All
                </button>
              </div>
              {searchHistory.map((query, index) => (
                <div
                  key={index}
                  onClick={() => handleHistoryClick(query)}
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                    selectedIndex === index
                      ? "bg-[#2bbef9]/10"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IoTimeOutline className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-700">{query}</span>
                  </div>
                  <button
                    onClick={(e) => removeFromHistory(e, query)}
                    className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
