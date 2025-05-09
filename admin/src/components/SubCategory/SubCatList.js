import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaHome, FaIcons, FaPlus } from "react-icons/fa";
import { fetchDataFromApi, deleteDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";

function SubCatList() {
  const [categories, setCategories] = useState([]);
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

  const handleDeleteSubcategory = async (categoryId, subId) => {
    if (!categoryId || !subId) {
      alert("Invalid category or subcategory ID. Cannot delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteDataFromApi(
        `/api/category/${categoryId}/subcategories/${subId}`
      );
      if (response.success) {
        alert("Subcategory deleted successfully!");
        await getCategories(); // Refresh the list
      } else {
        alert("Failed to delete subcategory: " + response.message);
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      alert(
        "Failed to delete subcategory: " +
          (error.message || "Please try again.")
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="px-7 w-full font-[Space_Grotesk]">
      <div className="flex flex-row justify-between items-center rounded-lg border p-4 my-4">
        <p className="font-extrabold text-2xl mb-2 lg:mb-0">Subcategory List</p>
        <div className="flex gap-2">
          <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 dark:!text-white !rounded-lg !flex px-2 !items-center !gap-2">
            <FaHome /> Dashboard
          </Button>
          <p className="items-center justify-center py-2">/ </p>
          <Button className="!shadow-sm items-center bg-gray-300 gap-2 dark:bg-gray-400 dark:!text-white !px-2 flex !rounded-lg">
            <FaIcons /> Category
          </Button>
          <p className="items-center justify-center py-2">/ </p>
          <Link to={"/add-sub-category"}>
            <Button
              variant="primary"
              className="flex bg-blue-500 dark:bg-blue-600 dark:!text-white p-2 rounded-lg items-center gap-2"
            >
              <FaPlus /> <p className=""> Add Sub</p>
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

      {/* Display categories and subcategories in a table */}
      {!loading && !error && categories.length > 0 && (
        <div className="flex flex-col justify-between items-center rounded-lg border p-4 my-4">
          <Table className="min-w-full !rounded-lg shadow-lg dark:bg-gray-800 dark:text-white overflow-x-auto">
            <thead className="text-xs text-center text-white uppercase bg-gradient-to-t from-[#0858f7] to-[#2b77e5]">
              <tr>
                <th className="px-6 py-2 border uppercase text-sm font-semibold tracking-wider">
                  Category Image
                </th>
                <th className="p-2 border uppercase text-sm font-semibold tracking-wider">
                  Category
                </th>
                <th className="p-2 border uppercase text-sm font-semibold tracking-wider">
                  Subcategory
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id || Math.random().toString(36).substring(2)}
                  className="odd:bg-white items-center border border-gray-300 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                >
                  <td className="p-2 items-center">
                    <img
                      className="w-[50px] h-[50px] object-contain border rounded-lg mx-auto"
                      src={
                        category.images && category.images.length > 0
                          ? category.images[0]
                          : "https://via.placeholder.com/40"
                      }
                      alt={category.name}
                    />
                  </td>
                  <td className="p-2 text-center text-[16px] font-medium">
                    {category.name}
                  </td>
                  <td className="p-2 items-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      {category.subcategories &&
                      category.subcategories.length > 0 ? (
                        category.subcategories.map((sub) => (
                          <Button
                            key={sub._id}
                            className="bg-blue-500 text-white !px-2 !py-[2px] !rounded-lg flex items-center"
                            onClick={() =>
                              handleDeleteSubcategory(category._id, sub._id)
                            }
                          >
                            {sub.name} <span className="ml-1">✕</span>
                          </Button>
                        ))
                      ) : (
                        <span>No subcategories</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default SubCatList;
