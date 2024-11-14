import React from "react";
import Widget from "./Widget";

const Widgets = () => {
  return (
    <div className=" py-8 bg-gray-100">
      <div className="container mx-auto px-4 lg:max-w-[1270px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-6">
          <Widget
            title="MEN'S CLOTHING"
            menuItems={["Shirts", "Pants", "Jackets", "Shoes", "Accessories"]}
          />
          <Widget
            title="WOMEN'S CLOTHING"
            menuItems={["Dresses", "Tops", "Skirts", "Shoes", "Handbags"]}
          />
          <Widget
            title="KIDS' CLOTHING"
            menuItems={["T-Shirts", "Shorts", "Dresses", "Shoes", "Outerwear"]}
          />
          <Widget
            title="ACCESSORIES"
            menuItems={["Hats", "Belts", "Scarves", "Jewelry", "Sunglasses"]}
          />
          <Widget
            title="FOOTWEAR"
            menuItems={[
              "Sneakers",
              "Boots",
              "Sandals",
              "Formal Shoes",
              "Slippers",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
