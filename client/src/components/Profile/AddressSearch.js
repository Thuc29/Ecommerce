import React from "react";
import { FaSearch, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";
import { MdClose, MdMap } from "react-icons/md";

/**
 * Address search component with autocomplete
 */
const AddressSearch = ({
  searchQuery,
  suggestions,
  showDropdown,
  isSearching,
  onSearchChange,
  onAddressSelect,
  onClear,
  onFocus,
  onOpenMap,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Search Address
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onFocus}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2bbef9] focus:border-transparent transition-all"
            placeholder="Type to search address..."
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <MdClose size={18} />
            </button>
          )}
          {isSearching && (
            <FaSpinner className="absolute right-10 top-1/2 -translate-y-1/2 text-[#2bbef9] animate-spin" />
          )}

          {/* Address Suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.place_id || index}
                  type="button"
                  onClick={() => onAddressSelect(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <FaMapMarkerAlt className="text-[#2bbef9] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">
                      {suggestion.structured_formatting?.main_text ||
                        suggestion.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {suggestion.structured_formatting?.secondary_text || ""}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Button */}
        <button
          type="button"
          onClick={onOpenMap}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2bbef9] text-white rounded-lg hover:bg-[#1da8e0] transition-colors whitespace-nowrap"
        >
          <MdMap size={18} />
          <span className="hidden sm:inline">Map</span>
        </button>
      </div>
    </div>
  );
};

export default AddressSearch;
