# SweetAlert2 Usage Guide for Admin Panel

## Overview
SweetAlert2 has been integrated into the admin panel to replace all `alert()`, `confirm()`, and `console.log` notifications with beautiful, modern alerts.

## Import SweetAlert2 Functions

```javascript
import { 
  showSuccess, 
  showError, 
  showWarning, 
  showInfo, 
  showLoading, 
  closeLoading,
  showConfirm, 
  showDeleteConfirm,
  showToast,
  handleApiError,
  showSuccessMessages,
  showErrorMessages
} from "../utils/sweetAlert";
```

## Basic Usage

### Success Alerts
```javascript
// Simple success
showSuccess("Success!", "Operation completed successfully");

// Using predefined messages
showSuccessMessages.productCreated();
showSuccessMessages.categoryUpdated();
```

### Error Alerts
```javascript
// Simple error
showError("Error!", "Something went wrong");

// Using predefined messages
showErrorMessages.productCreateFailed();
showErrorMessages.networkError();
```

### Warning Alerts
```javascript
showWarning("Warning!", "Please check your input");
```

### Info Alerts
```javascript
showInfo("Information", "Here's some useful information");
```

### Loading Alerts
```javascript
// Show loading
const loadingAlert = showLoading("Processing...", "Please wait");

// Close loading
closeLoading();
```

### Confirmation Dialogs
```javascript
// Basic confirmation
const result = await showConfirm("Are you sure?", "This action cannot be undone");
if (result.isConfirmed) {
  // User clicked "Yes"
}

// Delete confirmation
const result = await showDeleteConfirm("Delete Item?", "This will permanently delete the item");
if (result.isConfirmed) {
  // User confirmed deletion
}
```

### Toast Notifications
```javascript
showToast("success", "Item saved!", "Your changes have been saved");
showToast("error", "Failed!", "Could not save changes");
showToast("warning", "Warning!", "Please check your input");
showToast("info", "Info", "Here's some information");
```

## API Error Handling

### Automatic Error Handling
```javascript
// API calls automatically show error alerts
const response = await fetchDataFromApi("/api/products");
const response = await postDataToApi("/api/products", data);
const response = await updateDataToApi("/api/products/1", data);
const response = await deleteDataFromApi("/api/products/1");
```

### Manual Error Handling
```javascript
try {
  const response = await someApiCall();
} catch (error) {
  handleApiError(error); // Shows appropriate error message
}
```

### Disable Automatic Error Handling
```javascript
// Disable error alerts for specific API calls
const response = await fetchDataFromApi("/api/products", false);
const response = await postDataToApi("/api/products", data, false);
```

## Predefined Messages

### Success Messages
- `showSuccessMessages.productCreated()`
- `showSuccessMessages.productUpdated()`
- `showSuccessMessages.productDeleted()`
- `showSuccessMessages.categoryCreated()`
- `showSuccessMessages.categoryUpdated()`
- `showSuccessMessages.categoryDeleted()`
- `showSuccessMessages.subcategoryCreated()`
- `showSuccessMessages.subcategoryUpdated()`
- `showSuccessMessages.subcategoryDeleted()`
- `showSuccessMessages.imageUploaded()`
- `showSuccessMessages.dataSaved()`
- `showSuccessMessages.loginSuccess()`
- `showSuccessMessages.logoutSuccess()`

### Error Messages
- `showErrorMessages.productCreateFailed()`
- `showErrorMessages.productUpdateFailed()`
- `showErrorMessages.productDeleteFailed()`
- `showErrorMessages.categoryCreateFailed()`
- `showErrorMessages.categoryUpdateFailed()`
- `showErrorMessages.categoryDeleteFailed()`
- `showErrorMessages.subcategoryCreateFailed()`
- `showErrorMessages.subcategoryUpdateFailed()`
- `showErrorMessages.subcategoryDeleteFailed()`
- `showErrorMessages.imageUploadFailed()`
- `showErrorMessages.dataSaveFailed()`
- `showErrorMessages.loginFailed()`
- `showErrorMessages.networkError()`
- `showErrorMessages.serverError()`
- `showErrorMessages.validationError(message)`
- `showErrorMessages.permissionDenied()`

## Examples

### Form Submission
```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await postDataToApi("/api/products", formData, false);
    if (response.success) {
      showSuccessMessages.productCreated();
      navigate("/product-list");
    }
  } catch (error) {
    showErrorMessages.productCreateFailed();
  }
};
```

### Delete Confirmation
```javascript
const handleDelete = async (id) => {
  const result = await showDeleteConfirm(
    "Delete Product?",
    "Are you sure you want to delete this product? This action cannot be undone."
  );
  
  if (result.isConfirmed) {
    try {
      await deleteDataFromApi(`/api/products/${id}`, false);
      showSuccessMessages.productDeleted();
      // Refresh data
    } catch (error) {
      showErrorMessages.productDeleteFailed();
    }
  }
};
```

### Loading States
```javascript
const handleLongOperation = async () => {
  const loadingAlert = showLoading("Processing...", "This may take a few moments");
  
  try {
    await someLongOperation();
    closeLoading();
    showSuccess("Complete!", "Operation completed successfully");
  } catch (error) {
    closeLoading();
    showError("Failed!", "Operation failed");
  }
};
```

### Validation
```javascript
const validateForm = (formData) => {
  if (!formData.name) {
    showError("Validation Error", "Name is required");
    return false;
  }
  
  if (!formData.email) {
    showError("Validation Error", "Email is required");
    return false;
  }
  
  return true;
};
```

## Customization

All SweetAlert2 configurations can be customized in `admin/src/utils/sweetAlert.js`. The current configuration uses:

- **Success**: Blue theme (#2bbef9)
- **Error**: Red theme (#dc3545)
- **Warning**: Yellow theme (#ffc107)
- **Info**: Blue theme (#17a2b8)
- **Auto-close**: 3 seconds for success messages
- **Toast position**: Top-end
- **Timer progress bar**: Enabled

## Migration from alert()

### Before
```javascript
alert("Success!");
alert("Error occurred");
if (confirm("Are you sure?")) {
  // action
}
```

### After
```javascript
showSuccess("Success!");
showError("Error occurred");
const result = await showConfirm("Are you sure?");
if (result.isConfirmed) {
  // action
}
```

## Best Practices

1. **Use predefined messages** when possible for consistency
2. **Disable automatic error handling** when you want custom error handling
3. **Always close loading alerts** after operations complete
4. **Use appropriate alert types** (success, error, warning, info)
5. **Provide clear, actionable messages** to users
6. **Use confirmation dialogs** for destructive actions
7. **Use toast notifications** for non-critical updates
