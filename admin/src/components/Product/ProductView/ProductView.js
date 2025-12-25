import React, { useEffect, useState } from "react";
import {
  MdHotelClass,
  MdPalette,
  MdPix,
  MdSell,
  MdSettings,
  MdShoppingCart,
  MdStore,
  MdSummarize,
  MdVerified,
} from "react-icons/md";
import { format } from "date-fns";
import ProductDescription from "./ProductDescription";
import RatingAnalytics from "./RatingAnalytics";
import CustomerReviews from "./CustomerReviews";
import ReviewReply from "./ReviewReply";
import { useTheme } from "../../Theme/ThemeContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaHome, FaIcons, FaPlus } from "react-icons/fa";

function ProductView() {
  const { theme } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ backend
    axios
      .get(` https://ecommerce-u7gm.onrender.com/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product");
        setLoading(false);
        console.error("Error fetching product:", err);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  // Render product details
  if (!product) {
    return <div>No product found.</div>;
  }
  return (
    <>
      <div
        className={`px-7 w-full ${
          theme === "light"
            ? "bg-white text-gray-900 border-gray-200"
            : "bg-gray-800 text-gray-200 border-gray-700"
        }`}
      >
        <div className="shadow rounded-lg flex justify-between border p-3 my-4 mx-0">
          <p className="font-extrabold text-2xl "> Product View</p>
          <div className="flex gap-2">
            <Button className="!shadow-sm bg-gray-300 dark:bg-gray-400 dark:!text-white !rounded-lg !flex px-2 !items-center !gap-2">
              <FaHome /> Dashboard
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Button className="!shadow-sm gap-2 items-center bg-gray-300 dark:bg-gray-400 dark:!text-white !px-2 flex !rounded-lg">
              <FaIcons /> Category
            </Button>
            <p className="items-center justify-center py-2">/ </p>
            <Link to={"/product-upload"}>
              <Button
                variant="primary"
                className="flex bg-blue-500 dark:bg-blue-600 dark:!text-white p-2 rounded-lg items-center gap-2"
              >
                <FaPlus /> Add Product
              </Button>
            </Link>
          </div>
        </div>
        <div
          className={`${
            theme === "light" ? "bg-gray-100" : "bg-[#1d2f4d]"
          } rounded-2xl py-8 px-3`}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-5/12">
              <div className="flex items-center mb-4">
                <h1 className="text-[16px] font-semibold opacity-80">
                  Product Gallery
                </h1>
                <hr
                  className={`flex-grow ${
                    theme === "light" ? "border-gray-300" : "border-gray-700"
                  } ml-4`}
                />
              </div>
              <img
                src={product.images[0]?.url || "https://placehold.co/450x450"}
                alt={product.name}
                className="w-full mb-4"
              />
              <div className="flex justify-between">
                {product.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image.url || "https://placehold.co/450x450"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-[23%] h-auto rounded-md"
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-7/12 lg:pl-8">
              <div className="flex items-center mb-4">
                <h1 className="text-[16px] font-semibold opacity-80">
                  Product Details
                </h1>
                <hr
                  className={`flex-grow ${
                    theme === "light" ? "border-gray-300" : "border-gray-700"
                  } ml-4`}
                />
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="space-y-2">
                  <h2 className="text-[22px] font-medium leading-[30px] mb-4 opacity-80">
                    {product.name}
                  </h2>
                  <div className="flex items-center">
                    <MdStore className="mr-3 opacity-80" size={20} />
                    <p className="font-medium text-[15px] w-[90px] opacity-80">
                      Brand
                    </p>
                    <span className="mr-2 leading-4 opacity-70">:</span>
                    <p className="text-[15px] leading-[18px] capitalize opacity-70">
                      {product.brand}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MdPix className="mr-3 opacity-80" size={20} />
                    <p className="font-medium text-[15px] w-[90px] opacity-80">
                      Category
                    </p>
                    <span className="mr-2 leading-4 opacity-70">:</span>
                    <p className="text-[15px] leading-[18px] capitalize opacity-70">
                      {product.category?.name}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <MdSell className="mr-3 opacity-80" size={20} />
                    <span className="font-medium text-[15px] w-[90px] opacity-80">
                      Price
                    </span>
                    <span className="mr-2 leading-4 opacity-70">:</span>
                    <p className="text-[15px] leading-[18px] capitalize opacity-70">
                      ${product.price}
                      {product.oldPrice && (
                        <span className="line-through text-red-500 ml-1">
                          ${product.oldPrice}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MdShoppingCart className="mr-3 opacity-80" size={20} />
                    <span className="font-medium text-[15px] w-[90px] opacity-80">
                      Stock
                    </span>
                    <span className="mr-2 leading-4 opacity-70">:</span>
                    <span className="text-[15px] leading-[18px] capitalize opacity-70">
                      ({product.countInStock}) Piece
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdHotelClass className="mr-3 opacity-80" size={20} />
                    <span className="font-medium text-[15px] w-[90px] opacity-80">
                      Review
                    </span>
                    <span className="mr-2 leading-4 opacity-70">:</span>
                    <span className="text-[15px] leading-[18px] capitalize opacity-70">
                      ({product.numReviews || 0}) Review
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdVerified className="mr-3 opacity-80" size={20} />
                    <span className="font-medium text-[15px] w-[90px] opacity-80">
                      Published
                    </span>
                    <span className="mr-2 leading-4 opacity-70">: </span>
                    <span className="text-[15px] leading-[18px] capitalize opacity-70">
                      {product.createdAt &&
                      !isNaN(new Date(product.createdAt).getTime())
                        ? new Date(product.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-lg">
            <ProductDescription description={product.description} />
            <RatingAnalytics
              reviews={product.reviews}
              rating={product.rating}
            />
            <CustomerReviews reviews={product.reviews} />
            <ReviewReply productId={productId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductView;
