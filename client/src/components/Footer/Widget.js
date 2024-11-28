import React from "react";

const Widget = ({ title, menuItems }) => {
  return (
    <div className="klbfooterwidget">
      <h4 className="widget-title text-xl font-semibold mb-4">{title}</h4>
      <ul className="menu space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href="#" className="text-sm text-gray-500 hover:text-[#2bbef9]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Widget;
