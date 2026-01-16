import axios from "axios";

// Goong API configuration
const GOONG_API_KEY =
  process.env.REACT_APP_GOONG_API_KEY ||
  "qpYtLIopHu6JSSJTaomrkvMCqyMsGHQb7ZGUEKqf";
export const GOONG_MAPTILES_KEY =
  process.env.REACT_APP_GOONG_MAPTILES_KEY ||
  "583pwhoMrfD38ejRdHd365oV9URRwJspPhDLTHEy";

// Get Goong API key
export const getGoongApiKey = () => GOONG_API_KEY;

// Autocomplete address search
export const searchAddress = async (input) => {
  try {
    if (!input || input.length < 2) return [];

    const { data } = await axios.get(
      "https://rsapi.goong.io/Place/AutoComplete",
      {
        params: {
          api_key: GOONG_API_KEY,
          input: input,
          limit: 10,
        },
      }
    );
    return data.predictions || [];
  } catch (error) {
    console.error("Goong Autocomplete Error:", error.message);
    return [];
  }
};

// Get place details by place_id
export const getPlaceDetail = async (placeId) => {
  try {
    const { data } = await axios.get("https://rsapi.goong.io/Place/Detail", {
      params: {
        api_key: GOONG_API_KEY,
        place_id: placeId,
      },
    });
    return data.result || null;
  } catch (error) {
    console.error("Goong Place Detail Error:", error.message);
    return null;
  }
};

// Reverse geocoding - get address from coordinates
export const reverseGeocode = async (lat, lng) => {
  try {
    const { data } = await axios.get("https://rsapi.goong.io/Geocode", {
      params: {
        api_key: GOONG_API_KEY,
        latlng: `${lat},${lng}`,
      },
    });
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Goong Reverse Geocode Error:", error.message);
    return null;
  }
};

// Parse Vietnamese address into components
export const parseAddress = (formattedAddress) => {
  if (!formattedAddress)
    return { street: "", ward: "", district: "", city: "" };

  const parts = formattedAddress.split(", ");
  let street = "";
  let ward = "";
  let district = "";
  let city = "";

  if (parts.length >= 4) {
    street = parts[0] || "";
    ward = parts[1] || "";
    district = parts[2] || "";
    city = parts.slice(3).join(", ") || "";
  } else if (parts.length === 3) {
    street = parts[0] || "";
    district = parts[1] || "";
    city = parts[2] || "";
  } else if (parts.length === 2) {
    district = parts[0] || "";
    city = parts[1] || "";
  } else {
    city = parts[0] || "";
  }

  return { street, ward, district, city };
};
