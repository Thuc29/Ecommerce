import { useState, useRef, useCallback, useEffect } from "react";
import {
  searchAddress,
  getPlaceDetail,
  reverseGeocode,
  parseAddress,
  GOONG_MAPTILES_KEY,
} from "../services/goong";

/**
 * Custom hook for map-based location picker
 * @param {Function} onLocationSelect - Callback when location is selected
 * @returns {Object} Map picker state and handlers
 */
export const useMapPicker = (onLocationSelect) => {
  const [showModal, setShowModal] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 21.0285, lng: 105.8542 }); // Default: Hanoi
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const searchTimeout = useRef(null);

  // Open modal and try to get current location
  const openModal = useCallback(() => {
    setShowModal(true);
    setSelectedLocation(null);
    setSearchQuery("");
    setSuggestions([]);

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        () => setIsLoading(false)
      );
    }
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedLocation(null);
    setSearchQuery("");
    setSuggestions([]);
  }, []);

  // Handle map click
  const handleMapClick = useCallback(
    async (lat, lng) => {
      setIsLoading(true);
      setSelectedLocation({ lat, lng });

      try {
        const result = await reverseGeocode(lat, lng);
        if (result?.formatted_address) {
          const addressParts = parseAddress(result.formatted_address);
          onLocationSelect?.(addressParts);
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onLocationSelect]
  );

  // Get current GPS location
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMapCenter({ lat, lng });
        setSelectedLocation({ lat, lng });

        try {
          const result = await reverseGeocode(lat, lng);
          if (result?.formatted_address) {
            const addressParts = parseAddress(result.formatted_address);
            onLocationSelect?.(addressParts);
          }
        } catch (error) {
          console.error("Error getting address:", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLoading(false);
      }
    );
  }, [onLocationSelect]);

  // Handle search input
  const handleSearch = useCallback((value) => {
    setSearchQuery(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      const results = await searchAddress(value);
      setSuggestions(results);
    }, 300);
  }, []);

  // Select search result
  const selectSearchResult = useCallback(
    async (suggestion) => {
      setSuggestions([]);
      setSearchQuery(suggestion.description);
      setIsLoading(true);

      try {
        const detail = await getPlaceDetail(suggestion.place_id);
        if (detail?.geometry) {
          const lat = detail.geometry.location.lat;
          const lng = detail.geometry.location.lng;
          setMapCenter({ lat, lng });
          setSelectedLocation({ lat, lng });

          if (detail.formatted_address) {
            const addressParts = parseAddress(detail.formatted_address);
            onLocationSelect?.(addressParts);
          }
        }
      } catch (error) {
        console.error("Error getting place detail:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onLocationSelect]
  );

  // Confirm location selection
  const confirmLocation = useCallback(() => {
    if (selectedLocation) {
      closeModal();
    }
  }, [selectedLocation, closeModal]);

  // Initialize map when modal opens
  useEffect(() => {
    if (!showModal || mapRef.current) return;

    const loadGoongMap = () => {
      if (window.goongjs) {
        initializeMap();
        return;
      }

      // Load CSS
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href =
        "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css";
      document.head.appendChild(linkEl);

      // Load JS
      const scriptEl = document.createElement("script");
      scriptEl.src =
        "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js";
      scriptEl.onload = () => initializeMap();
      document.body.appendChild(scriptEl);
    };

    const initializeMap = () => {
      if (!window.goongjs || !document.getElementById("goong-map")) return;

      window.goongjs.accessToken = GOONG_MAPTILES_KEY;

      const map = new window.goongjs.Map({
        container: "goong-map",
        style: "https://tiles.goong.io/assets/goong_map_web.json",
        center: [mapCenter.lng, mapCenter.lat],
        zoom: 15,
      });

      mapRef.current = map;

      // Add draggable marker
      const marker = new window.goongjs.Marker({
        draggable: true,
        color: "#2bbef9",
      })
        .setLngLat([mapCenter.lng, mapCenter.lat])
        .addTo(map);

      markerRef.current = marker;

      // Handle marker drag
      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        handleMapClick(lngLat.lat, lngLat.lng);
      });

      // Handle map click
      map.on("click", (e) => {
        const { lat, lng } = e.lngLat;
        marker.setLngLat([lng, lat]);
        handleMapClick(lat, lng);
      });
    };

    loadGoongMap();

    return () => {
      if (!showModal && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [showModal, mapCenter.lat, mapCenter.lng, handleMapClick]);

  // Update map center
  useEffect(() => {
    if (mapRef.current && showModal) {
      mapRef.current.flyTo({
        center: [mapCenter.lng, mapCenter.lat],
        zoom: 15,
      });
      if (markerRef.current) {
        markerRef.current.setLngLat([mapCenter.lng, mapCenter.lat]);
      }
    }
  }, [mapCenter, showModal]);

  return {
    showModal,
    mapCenter,
    selectedLocation,
    isLoading,
    searchQuery,
    suggestions,
    openModal,
    closeModal,
    getCurrentLocation,
    handleSearch,
    selectSearchResult,
    confirmLocation,
  };
};

export default useMapPicker;
