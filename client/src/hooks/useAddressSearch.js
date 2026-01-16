import { useState, useRef, useCallback } from "react";
import { searchAddress, getPlaceDetail, parseAddress } from "../services/goong";

/**
 * Custom hook for address autocomplete functionality
 * @param {Function} onAddressSelect - Callback when address is selected
 * @returns {Object} Address search state and handlers
 */
export const useAddressSearch = (onAddressSelect) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef(null);

  // Handle search input change with debounce
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (value.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);

    // Debounce search
    searchTimeout.current = setTimeout(async () => {
      const results = await searchAddress(value);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
      setIsSearching(false);
    }, 300);
  }, []);

  // Handle address selection from suggestions
  const handleAddressSelect = useCallback(
    async (suggestion) => {
      setShowDropdown(false);
      setIsSearching(true);

      try {
        const detail = await getPlaceDetail(suggestion.place_id);

        if (detail?.formatted_address) {
          const addressParts = parseAddress(detail.formatted_address);
          onAddressSelect?.(addressParts);
          setSearchQuery(suggestion.description);
        }
      } catch (error) {
        console.error("Error getting place detail:", error);
        // Fallback: use the description directly
        onAddressSelect?.({
          street: suggestion.description,
          ward: "",
          district: "",
          city: "",
        });
      } finally {
        setIsSearching(false);
      }
    },
    [onAddressSelect]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  }, []);

  // Show dropdown when focusing on input
  const handleFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setShowDropdown(true);
    }
  }, [suggestions.length]);

  return {
    searchQuery,
    suggestions,
    showDropdown,
    isSearching,
    handleSearchChange,
    handleAddressSelect,
    clearSearch,
    handleFocus,
    setShowDropdown,
  };
};

export default useAddressSearch;
