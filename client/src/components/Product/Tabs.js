import React, { useState, useContext } from "react";
import { Rating, Button, TextField, Avatar } from "@mui/material";
import { MyContext } from "../../App";
import { postDataToApi } from "../../services/api";
import Swal from "sweetalert2";

function Tabs({ product, onReviewSubmit }) {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const context = useContext(MyContext);
  const { isLogin, user } = context;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to submit a review.",
      });
      return;
    }

    if (rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a rating!",
      });
      return;
    }

    if (!comment.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a comment!",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await postDataToApi(`/api/products/${product._id}/reviews`, {
        rating,
        comment,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Thank you for your feedback!",
        });
        setRating(0);
        setComment("");
        if (onReviewSubmit) onReviewSubmit();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to submit review",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An error occurred while submitting your review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="px-8 py-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product?.description || "No description available."}
            </p>
          </div>
        );
      case "additional_information":
        return (
          <div className="px-8 py-4">
            <table className="w-full max-w-2xl border-collapse border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <tbody>
                <tr className="bg-gray-50">
                  <th className="border border-gray-100 p-4 text-left font-bold text-gray-700 w-1/3">
                    Brand
                  </th>
                  <td className="border border-gray-100 p-4 text-gray-600">
                    {product?.brand || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-100 p-4 text-left font-bold text-gray-700">
                    Category
                  </th>
                  <td className="border border-gray-100 p-4 text-gray-600">
                    {product?.category?.name || "N/A"}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-gray-100 p-4 text-left font-bold text-gray-700">
                    Stock Status
                  </th>
                  <td className="border border-gray-100 p-4 text-gray-600">
                    {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "reviews":
        return (
          <div className="px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Reviews List */}
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  Customer Reviews
                  <span className="text-sm font-bold bg-[#2bbef9]/10 text-[#2bbef9] px-3 py-1 rounded-full">
                    {product?.numReviews || 0}
                  </span>
                </h2>
                
                <div className="space-y-8">
                  {product?.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <Avatar 
                          src={review.user?.avatar} 
                          alt={review.name}
                          sx={{ width: 50, height: 50, bgcolor: "#2bbef9" }}
                        >
                          {review.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              <p className="text-xs text-gray-400 font-medium">
                                {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Recent"}
                              </p>
                            </div>
                            <Rating value={review.rating} readOnly size="small" />
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed italic">
                            "{review.comment}"
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">No reviews yet. Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Review Form */}
              <div className="lg:w-1/3">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 sticky top-4">
                  <h3 className="text-xl font-black text-gray-900 mb-2">Write a Review</h3>
                  <p className="text-sm text-gray-500 mb-6">Your feedback helps other customers make better choices.</p>
                  
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Rating*</label>
                      <Rating
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        size="large"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Review*</label>
                      <TextField
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="What did you like or dislike about this product?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "16px",
                            backgroundColor: "#f9fafb",
                          }
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={submitting}
                      sx={{
                        bgcolor: "#2bbef9",
                        color: "white",
                        borderRadius: "16px",
                        py: 1.5,
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "16px",
                        boxShadow: "0 10px 20px -5px rgba(43, 190, 249, 0.4)",
                        "&:hover": {
                          bgcolor: "#1ea8e0",
                        }
                      }}
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-12 rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm lg:max-w-[1270px] mx-auto w-full">
      <div className="border-b border-gray-100 px-8">
        <ul className="flex gap-8">
          {[
            { id: "description", label: "Description" },
            { id: "additional_information", label: "Additional Info" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer py-6 text-sm font-black uppercase tracking-wider transition-all relative ${
                activeTab === tab.id
                  ? "text-[#2bbef9] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#2bbef9] after:rounded-t-full"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="min-h-[300px]">{renderContent()}</div>
    </div>
  );
}

export default Tabs;
