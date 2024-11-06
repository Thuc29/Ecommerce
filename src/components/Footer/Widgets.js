import React from "react";
import Widget from "./Widget";

const Widgets = () => {
  return (
    <div className=" py-8 bg-gray-100">
      <div className="container mx-auto px-4 lg:max-w-[1270px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-6">
          <Widget
            title="FRUIT & VEGETABLES"
            menuItems={[
              "Fresh Vegetables",
              "Herbs & Seasonings",
              "Fresh Fruits",
              "Cuts & Sprouts",
              "Exotic Fruits & Veggies",
              "Packaged Produce",
              "Party Trays",
            ]}
          />
          <Widget
            title="Breakfast & Dairy"
            menuItems={[
              "Milk & Flavoured Milk",
              "Butter and Margarine",
              "Cheese",
              "Eggs Substitutes",
              "Honey",
              "Marmalades",
              "Sour Cream and Dips",
              "Yogurt",
            ]}
          />
          <Widget
            title="Meat & Seafood"
            menuItems={[
              "Breakfast Sausage",
              "Dinner Sausage",
              "Beef",
              "Chicken",
              "Sliced Deli Meat",
              "Shrimp",
              "Wild Caught Fillets",
              "Crab and Shellfish",
              "Farm Raised Fillets",
            ]}
          />
          <Widget
            title="Beverages"
            menuItems={[
              "Water",
              "Sparkling Water",
              "Soda & Pop",
              "Coffee",
              "Milk & Plant-Based Milk",
              "Tea & Kombucha",
              "Drink Boxes & Pouches",
              "Craft Beer",
              "Wine",
            ]}
          />
          <Widget
            title="Breads & Bakery"
            menuItems={[
              " Milk & Flavoured Milk",
              "Butter and Margarine",
              "Cheese",
              "Eggs Substitutes",
              "Honey",
              "Marmalades",
              "Sour Cream and Dips",
              "Yogurt",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
