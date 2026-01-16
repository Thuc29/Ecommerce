import React from "react";
import { FaSearch, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";
import { MdClose, MdMyLocation, MdMap } from "react-icons/md";

/**
 * Map modal for location selection
 */
const MapModal = ({
  isOpen,
  onClose,
  searchQuery,
  suggestions,
  isLoading,
  address,
  onSearch,
  onSearchSelect,
  onGetCurrentLocation,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const hasAddress = address?.street || address?.district || address?.city;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-2 border-b">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MdMap className="text-[#2bbef9]" />
            Choose Location from Map
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdClose size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2bbef9] focus:border-transparent"
              placeholder="Search location on map..."
            />

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.place_id || index}
                    type="button"
                    onClick={() => onSearchSelect(suggestion)}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <FaMapMarkerAlt className="text-[#2bbef9] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 line-clamp-1">
                      {suggestion.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="relative" style={{ height: "400px" }}>
          <div id="goong-map" className="w-full h-full" />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                <FaSpinner className="animate-spin text-[#2bbef9]" />
                <span className="text-gray-600">Loading...</span>
              </div>
            </div>
          )}

          {/* Get Current Location Button */}
          <button
            onClick={onGetCurrentLocation}
            className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="Get current location"
          >
            <MdMyLocation size={24} className="text-[#2bbef9]" />
          </button>

          {/* Map Instructions */}
          <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow text-sm text-gray-600">
            Click on map or drag marker to select location
          </div>
        </div>

        {/* Selected Address Preview */}
        {hasAddress && (
          <div className="px-2 py-1 bg-gray-50 flex items-center border-t">
            <p className="text-sm text-gray-600 mx-1">SA:</p>
            <p className="text-gray-800 font-medium">
              {[address.street, address.ward, address.district, address.city]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!hasAddress}
            className="px-6 py-2.5 bg-[#2bbef9] text-white rounded-lg hover:bg-[#1da8e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
