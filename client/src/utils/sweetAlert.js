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

// Success messages for common actions
export const showSuccessMessages = {
  productAdded: () =>
    showSuccess("Product Added!", "Product has been added to cart"),
  productRemoved: () =>
    showSuccess("Product Removed!", "Product has been removed from cart"),
  productUpdated: () =>
    showSuccess("Product Updated!", "Product has been updated successfully"),
  productDeleted: () =>
    showSuccess("Product Deleted!", "Product has been deleted successfully"),
  orderPlaced: () =>
    showSuccess("Order Placed!", "Your order has been placed successfully"),
  profileUpdated: () =>
    showSuccess(
      "Profile Updated!",
      "Your profile has been updated successfully"
    ),
  passwordChanged: () =>
    showSuccess(
      "Password Changed!",
      "Your password has been changed successfully"
    ),
  imageUploaded: () =>
    showSuccess("Image Uploaded!", "Image has been uploaded successfully"),
};

// Error messages for common actions
export const showErrorMessages = {
  productAddFailed: () =>
    showError("Failed to Add Product", "Could not add product to cart"),
  productRemoveFailed: () =>
    showError("Failed to Remove Product", "Could not remove product from cart"),
  productUpdateFailed: () =>
    showError("Failed to Update Product", "Could not update product"),
  productDeleteFailed: () =>
    showError("Failed to Delete Product", "Could not delete product"),
  orderPlaceFailed: () =>
    showError("Failed to Place Order", "Could not place your order"),
  profileUpdateFailed: () =>
    showError("Failed to Update Profile", "Could not update your profile"),
  passwordChangeFailed: () =>
    showError("Failed to Change Password", "Could not change your password"),
  imageUploadFailed: () =>
    showError("Failed to Upload Image", "Could not upload image"),
  networkError: () =>
    showError("Network Error", "Please check your internet connection"),
  serverError: () =>
    showError("Server Error", "Something went wrong on our end"),
};
