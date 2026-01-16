// Format price to VND currency
export const formatPriceVND = (price) => {
  if (price === null || price === undefined || price === "") return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// Format price without currency symbol (for display in tables)
export const formatPriceNumber = (price) => {
  if (price === null || price === undefined || price === "") return "";
  return new Intl.NumberFormat("vi-VN").format(price);
};

// Convert input value to actual price (multiply by 1000)
// E.g., input 12 -> 12000 VND
export const convertToVND = (value) => {
  // Return null/undefined for empty values (allows optional fields)
  if (value === "" || value === null || value === undefined) return null;
  const num = Number(value);
  if (isNaN(num)) return null;
  return num * 1000;
};

// Convert actual price to display value (divide by 1000)
// E.g., 12000 VND -> display 12
export const convertFromVND = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const num = Number(value);
  if (isNaN(num)) return "";
  return num / 1000;
};
