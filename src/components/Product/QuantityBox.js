import React, { useState } from "react";

function QuantityBox() {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  return (
    <>
      <button
        onClick={() => handleQuantityChange(-1)}
        className="text-lg font-semibold px-[11px] border rounded-full bg-gray-200 hover:bg-[#2bbef9] hover:text-white"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        className="w-12 text-center border border-gray-300 rounded mx-2"
        readOnly
      />
      <button
        onClick={() => handleQuantityChange(1)}
        className="text-lg font-semibold px-[11px] border rounded-full bg-gray-200 hover:bg-[#2bbef9] hover:text-white"
      >
        +
      </button>
      <button className="ml-4 hover:bg-[#2bbef9] hover:text-white border border-[#2bbef9] text-[#2bbef9] font-semibold px-10 py-3 rounded-full">
        Add to cart
      </button>
    </>
  );
}

export default QuantityBox;