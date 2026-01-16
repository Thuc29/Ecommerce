import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaHome, FaIcons, FaPlus } from "react-icons/fa";
import {
  fetchDataFromApi,
  deleteDataFromApi,
  updateDataToApi,
} from "../../utils/api";
import { Link } from "react-router-dom";
import ModalEditCategory from "./ModalEditCategory";
import { IconButton, Pagination } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  showError,
  showDeleteConfirm,
  showSuccessMessages,
  showErrorMessages,
} from "../../utils/sweetAlert";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    image: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDataFromApi("/api/category");
      if (response.success && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Data is not an array or success is false:", response);
        setError("Failed to load categories: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message || "Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!categoryId) {
      showError(
        "Invalid Category ID",
        "Cannot delete category with invalid ID."
      );
      return;
    }

    const result = await showDeleteConfirm(
      "Delete Category?",
      "Are you sure you want to delete this category? This action cannot be undone."
    );

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await deleteDataFromApi(
        `/api/category/${categoryId}`,
        false
      );
      if (response.success) {
        showSuccessMessages.categoryDeleted();
        await getCategories();
      } else {
        showError(
          "Delete Failed",
          response.message || "Failed to delete category"
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      showErrorMessages.categoryDeleteFailed();
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || "",
      color: category.color || "",
      image:
        category.images && category.images.length > 0 ? category.images[0] : "",
      file: null,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCategory(null);
    setFormData({ name: "", color: "", image: "", file: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (!formData.name.trim() || !formData.color.trim()) {
        alert("Name and color cannot be empty!");
        return;
      }

      if (!selectedCategory || !selectedCategory._id) {
        console.error("Selected category or _id is missing:", selectedCategory);
        alert("Cannot update category: Invalid category ID.");
        return;
      }

      let images = [];
      if (formData.file) {
        const reader = new FileReader();
        const base64Image = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(formData.file);
        });
        images = [base64Image];
      } else if (formData.image.trim()) {
        images = [formData.image];
      }

      const updatedData = {
        name: formData.name,
        color: formData.color,
        images,
      };

      const response = await updateDataToApi(
        `/api/category/${selectedCategory._id}`,
        updatedData
      );
      if (response.success) {
        alert("Category updated successfully!");
        await getCategories();
        handleCloseEditModal();
      } else {
        alert("Failed to update category: " + response.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert(
        "Failed to update category: " + (error.message || "Please try again.")
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="px-7 w-full font-[Space_Grotesk]">
      <div className="shadow flex flex-row justify-between items-center lg:items-center rounded-lg border p-4 my-4">
        <p className="font-extrabold text-2xl mb-2 lg:mb-0">List category</p>
        <div className="flex gap-2">
          <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 dark:!text-white !rounded-lg !flex px-2 !items-center !gap-2">
            <FaHome /> Home
          </Button>
          <p className="items-center justify-center py-2">/ </p>
          <Button className="!shadow-sm gap-2 items-center bg-gray-300 dark:bg-gray-400 dark:!text-white !px-2 flex !rounded-lg">
            <FaIcons /> Category
          </Button>
          <p className="items-center justify-center py-2">/ </p>
          <Link to={"/add-a-category"}>
            {" "}
            <Button
              variant="primary"
              className="flex bg-blue-400  dark:bg-blue-500 dark:!text-white p-2 rounded-xl items-center gap-2"
            >
              <FaPlus /> Category
            </Button>
          </Link>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && categories.length === 0 && (
        <p>No categories found.</p>
      )}

      {/* Display categories in a table */}
      {!loading && !error && categories.length > 0 && (
        <div className="shadow flex flex-col justify-between items-center lg:items-center rounded-lg border p-4 my-4">
          <Table className="min-w-full !rounded-lg shadow-lg dark:bg-gray-800 dark:text-white overflow-x-auto">
            <thead className="text-xs text-center text-white uppercase bg-gradient-to-t from-[#0858f7] to-[#2b77e5]">
              <tr>
                <th scope="col" className="px-4 py-3 border min-w-[200px]">
                  Image
                </th>
                <th scope="col" className="px-4 py-3 border min-w-[200px]">
                  {" "}
                  Category
                </th>
                <th scope="col" className="px-4 py-3 border min-w-[200px]">
                  {" "}
                  Color
                </th>
                <th scope="col" className="px-4 py-3 border min-w-[200px]">
                  {" "}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr
                  key={category._id || Math.random().toString(36).substring(2)}
                  className="odd:bg-white items-center border border-gray-300 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="p-2 items-center">
                    <img
                      className="w-[50px] h-[50px] object-contain border rounded-lg mx-auto dark:border-gray-600"
                      src={
                        category.images && category.images.length > 0
                          ? category.images[0]
                          : "https://via.placeholder.com/40"
                      }
                      alt={category.name}
                    />
                  </td>
                  <td className="p-2 items-center"> {category.name}</td>
                  <td className="p-2 items-center"> {category.color}</td>
                  <td className="p-2 items-center">
                    <div className="flex justify-center items-center space-x-2 flex-wrap">
                      <IconButton
                        className="!bg-[#77fc86] hover:!bg-green-400 !p-2 !mb-2 !rounded-lg"
                        onClick={() => handleEditCategory(category)}
                        disabled={!category._id}
                      >
                        <MdEdit size={17} color="white" />
                      </IconButton>
                      <IconButton
                        className="hover:!bg-[#ff042a] !bg-red-400 !p-2 !mb-2 !rounded-lg"
                        onClick={() => handleDeleteCategory(category._id)}
                        disabled={!category._id}
                      >
                        <MdDelete size={17} color="white" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            className=" dark:text-white dark:bg-gray-400 rounded-lg p-1"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </div>
      )}
      <ModalEditCategory
        show={showEditModal}
        onHide={handleCloseEditModal}
        formData={formData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}

export default CategoryList;
