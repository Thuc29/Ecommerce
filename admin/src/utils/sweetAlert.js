import Swal from "sweetalert2";

// Success alerts
export const showSuccess = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonText: "OK",
    confirmButtonColor: "#2bbef9",
    timer: 3000,
    timerProgressBar: true,
  });
};

// Error alerts
export const showError = (title, text = "") => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: text,
    confirmButtonText: "OK",
    confirmButtonColor: "#dc3545",
  });
};

// Warning alerts
export const showWarning = (title, text = "") => {
  return Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    confirmButtonText: "OK",
    confirmButtonColor: "#ffc107",
  });
};

// Info alerts
export const showInfo = (title, text = "") => {
  return Swal.fire({
    icon: "info",
    title: title,
    text: text,
    confirmButtonText: "OK",
    confirmButtonColor: "#17a2b8",
  });
};

// Loading alerts
export const showLoading = (title = "Loading...", text = "Please wait") => {
  return Swal.fire({
    title: title,
    text: text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Close loading
export const closeLoading = () => {
  Swal.close();
};

// Confirmation dialogs
export const showConfirm = (
  title,
  text = "",
  confirmText = "Yes",
  cancelText = "No"
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#2bbef9",
    cancelButtonColor: "#6c757d",
  });
};

// Delete confirmation
export const showDeleteConfirm = (
  title = "Are you sure?",
  text = "You won't be able to revert this!"
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
  });
};

// Custom toast notifications
export const showToast = (type, title, text = "") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: type,
    title: title,
    text: text,
  });
};

// API error handler
export const handleApiError = (error) => {
  console.error("API Error:", error);

  let title = "Error";
  let text = "Something went wrong!";

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        title = "Bad Request";
        text = data.message || "Invalid request data";
        break;
      case 401:
        title = "Unauthorized";
        text = "Please login to continue";
        break;
      case 403:
        title = "Forbidden";
        text = "You do not have permission to perform this action";
        break;
      case 404:
        title = "Not Found";
        text = data.message || "Resource not found";
        break;
      case 413:
        title = "File Too Large";
        text = data.message || "The file you are trying to upload is too large";
        break;
      case 500:
        title = "Server Error";
        text = "Internal server error. Please try again later";
        break;
      default:
        title = `Error ${status}`;
        text = data.message || "An error occurred";
    }
  } else if (error.request) {
    // Network error
    title = "Network Error";
    text = "Please check your internet connection";
  } else {
    // Other error
    text = error.message || "An unexpected error occurred";
  }

  return showError(title, text);
};

// Success messages for admin actions
export const showSuccessMessages = {
  productCreated: () =>
    showSuccess("Product Created!", "Product has been created successfully"),
  productUpdated: () =>
    showSuccess("Product Updated!", "Product has been updated successfully"),
  productDeleted: () =>
    showSuccess("Product Deleted!", "Product has been deleted successfully"),
  categoryCreated: () =>
    showSuccess("Category Created!", "Category has been created successfully"),
  categoryUpdated: () =>
    showSuccess("Category Updated!", "Category has been updated successfully"),
  categoryDeleted: () =>
    showSuccess("Category Deleted!", "Category has been deleted successfully"),
  subcategoryCreated: () =>
    showSuccess(
      "Subcategory Created!",
      "Subcategory has been created successfully"
    ),
  subcategoryUpdated: () =>
    showSuccess(
      "Subcategory Updated!",
      "Subcategory has been updated successfully"
    ),
  subcategoryDeleted: () =>
    showSuccess(
      "Subcategory Deleted!",
      "Subcategory has been deleted successfully"
    ),
  imageUploaded: () =>
    showSuccess("Image Uploaded!", "Image has been uploaded successfully"),
  dataSaved: () =>
    showSuccess("Data Saved!", "Your changes have been saved successfully"),
  loginSuccess: () =>
    showSuccess("Login Successful!", "Welcome to the admin panel"),
  logoutSuccess: () =>
    showSuccess("Logged Out!", "You have been logged out successfully"),
};

// Error messages for admin actions
export const showErrorMessages = {
  productCreateFailed: () =>
    showError("Failed to Create Product", "Could not create product"),
  productUpdateFailed: () =>
    showError("Failed to Update Product", "Could not update product"),
  productDeleteFailed: () =>
    showError("Failed to Delete Product", "Could not delete product"),
  categoryCreateFailed: () =>
    showError("Failed to Create Category", "Could not create category"),
  categoryUpdateFailed: () =>
    showError("Failed to Update Category", "Could not update category"),
  categoryDeleteFailed: () =>
    showError("Failed to Delete Category", "Could not delete category"),
  subcategoryCreateFailed: () =>
    showError("Failed to Create Subcategory", "Could not create subcategory"),
  subcategoryUpdateFailed: () =>
    showError("Failed to Update Subcategory", "Could not update subcategory"),
  subcategoryDeleteFailed: () =>
    showError("Failed to Delete Subcategory", "Could not delete subcategory"),
  imageUploadFailed: () =>
    showError("Failed to Upload Image", "Could not upload image"),
  dataSaveFailed: () =>
    showError("Failed to Save Data", "Could not save your changes"),
  loginFailed: () =>
    showError("Login Failed", "Invalid credentials. Please try again"),
  networkError: () =>
    showError("Network Error", "Please check your internet connection"),
  serverError: () =>
    showError("Server Error", "Something went wrong on our end"),
  validationError: (message) =>
    showError("Validation Error", message || "Please check your input"),
  permissionDenied: () =>
    showError(
      "Permission Denied",
      "You don't have permission to perform this action"
    ),
};
