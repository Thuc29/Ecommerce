import React from "react";

function ProductDescription({ description }) {
  return (
    <>
      <div>
        <div className="flex items-center mb-4">
          <h1 className="text-[16px] font-semibold opacity-80">
            Product Description
          </h1>
          <hr className="flex-grow border-gray-700 ml-4" />
        </div>
        <div className="p-[0_10px_10px]">
          <p className="leading-[30px] text-[15px] opacity-70">
            {description || "No description available."}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductDescription;
