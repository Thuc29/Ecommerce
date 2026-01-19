import React from "react";

const Widget = ({ title, menuItems }) => {
  return (
    <div className="klbfooterwidget">
      <h4 className="widget-title text-xl font-semibold mb-4">{title}</h4>
      <ul className="menu space-y-2">
        {menuItems.map((item, index) => {
          const { label, href } =
            typeof item === "string"
              ? { label: item, href: "/" }
              : {
                  label: item?.label || item?.title || "Item",
                  href: item?.href || item?.to || "/",
                };

          return (
            <li key={index}>
              <a
                href={href || "/"}
                className="text-sm text-gray-500 hover:text-[#2bbef9]"
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Widget;
