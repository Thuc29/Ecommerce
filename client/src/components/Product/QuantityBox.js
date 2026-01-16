import React from "react";

function QuantityBox({
  quantity = 1,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
  size = "default", // "small" | "default"
}) {
  const handleDecrease = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max && !disabled) {
      onQuantityChange(value);
    }
  };

  const buttonClass =
    size === "small"
      ? "text-sm font-semibold px-2 py-0.5 items-center border rounded-full bg-gray-200 hover:bg-[#2bbef9] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      : "text-lg font-semibold px-[11px] py-[1px] items-center border rounded-full bg-gray-200 hover:bg-[#2bbef9] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed";

  const inputClass =
    size === "small"
      ? "w-10 text-center text-sm border border-gray-300 rounded mx-1"
      : "w-12 text-center border border-gray-300 rounded mx-2";

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={buttonClass}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className={inputClass}
        aria-label="Quantity"
      />
      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={buttonClass}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityBox;
