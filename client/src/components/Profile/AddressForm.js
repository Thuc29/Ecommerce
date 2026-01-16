import React from "react";

/**
 * Address form fields component
 */
const AddressForm = ({ address, isEditing, onChange }) => {
  const fields = [
    { name: "street", label: "Street Address", placeholder: "Enter street address" },
    { name: "ward", label: "Ward", placeholder: "Enter ward" },
    { name: "district", label: "District", placeholder: "Enter district" },
    { name: "city", label: "City", placeholder: "Enter city" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {field.label}
          </label>
          {isEditing ? (
            <input
              type="text"
              name={`address.${field.name}`}
              value={address[field.name] || ""}
              onChange={onChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2bbef9] focus:border-transparent transition-all"
              placeholder={field.placeholder}
            />
          ) : (
            <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
              {address[field.name] || "Not set"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressForm;
