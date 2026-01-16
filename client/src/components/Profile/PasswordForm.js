import React from "react";

/**
 * Password change form component
 */
const PasswordForm = ({ passwordData, isLoading, onChange, onSubmit }) => {
  const fields = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
    },
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Change Password
      </h2>
      <form onSubmit={onSubmit} className="max-w-md">
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {field.label}
              </label>
              <input
                type="password"
                name={field.name}
                value={passwordData[field.name]}
                onChange={onChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2bbef9] focus:border-transparent transition-all"
                placeholder={field.placeholder}
                required
                minLength={field.name !== "currentPassword" ? 6 : undefined}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-[#2bbef9] text-white rounded-lg hover:bg-[#1da8e0] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
