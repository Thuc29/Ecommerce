import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductZoom from "./ProductZoom";
import QuantityBox from "./QuantityBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Tabs from "./Tabs";
import RelatedProduct from "./RelatedProduct";
import RecentlyViewPro from "./RecentlyViewPro";
import { useParams } from "react-router-dom";
import { fetchDataFromApi, formatCurrency } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams(); // Assumes product ID is passed via URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchDataFromApi(`/api/products/${id}`);
        setProduct(response.data || response?.data?.data || response); // Tương thích nhiều dạng response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchDataFromApi("/api/category");
        setCategories(response.data || response?.data?.data || []); // Assumes API returns { data: [...] }
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  const discount =
    product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <>
      <section className="py-[30px] my-3 rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full bg-white">
        <div className="container px-10">
          <p className="capitalize font-semibold text-xl">{product.name}</p>
          <p className="text-gray-500 mb-7 flex items-center gap-4">
            <span>
              Brand:{" "}
              <span className="font-semibold">{product.brand || "N/A"}</span>
            </span>
            <span>|</span>
            <span className="flex items-center">
              <Rating
                readOnly
                value={product.rating || 0}
                size="small"
                precision={0.5}
                className="pr-1"
              />
              <span className="font-semibold">
                Review ({product.rating || 0})
              </span>
            </span>
            <span>|</span>
            <span>
              SKU: <span className="font-semibold">{product._id}</span>
            </span>
          </p>
          <div className="flex flex-col md:flex-row md:space-x-3 md:justify-between items-start my-4">
            {/* Cột 1: Product Image */}
            <div className="lg:w-5/12 md:w-5/12 sm:w-11/12 flex justify-center md:justify-start">
              <ProductZoom images={product.images || []} discount={discount} />
            </div>

            {/* Cột 2: Product Details */}
            <div className="w-full lg:w-4/12 md:w-7/12 mt-4 md:mt-0 flex flex-col px-4 md:justify-start pt-4">
              <div className="flex items-center mb-2">
                {product.oldPrice > 0 && (
                  <span className="text-gray-500 text-base line-through">
                    {formatCurrency(product.oldPrice)}
                  </span>
                )}
                <span className="text-red-600 text-[22px] font-bold mx-3">
                  {formatCurrency(product.price)}
                </span>
                {discount > 0 && (
                  <span className="bg-blue flex gap-1 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    {discount}% <p> OFF </p>
                  </span>
                )}
              </div>
              <p className="text-[#00b853] font-semibold mb-4 text-sm bg-[#e5f8ed] rounded-full max-w-[80px] px-3">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-gray-600 mb-4">
                {product.description || "No description available"}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <QuantityBox
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={product.countInStock || 99}
                  disabled={product.countInStock <= 0}
                />
                <button
                  onClick={async () => {
                    if (product.countInStock <= 0) return;
                    setIsAddingToCart(true);
                    try {
                      await addToCart(product, quantity);
                      setQuantity(1);
                    } finally {
                      setIsAddingToCart(false);
                    }
                  }}
                  disabled={isAddingToCart || product.countInStock <= 0}
                  className={`flex items-center justify-center font-semibold py-2 px-6 rounded-full transition-colors ${
                    product.countInStock <= 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : isInCart(product._id)
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-[#2bbef9] text-white hover:bg-[#1ea8e0]"
                  } disabled:opacity-50`}
                >
                  <FaShoppingCart className="mr-2" />
                  {isAddingToCart
                    ? "Adding..."
                    : product.countInStock <= 0
                    ? "Out of Stock"
                    : isInCart(product._id)
                    ? `In Cart (${getItemQuantity(product._id)})`
                    : "Add to Cart"}
                </button>
              </div>

              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`border rounded-full px-5 py-2 flex text-xs items-center uppercase transition-all duration-300 ${
                    isInWishlist(product._id)
                      ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                      : "text-gray-500 border-gray-300 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  {isInWishlist(product._id) ? (
                    <>
                      <FaHeart className="mr-1" />
                      In Wishlist
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="mr-1" />
                      Add to Wishlist
                    </>
                  )}
                </button>
                <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase hover:border-[#2bbef9] hover:text-[#2bbef9] transition-all duration-300">
                  Compare
                </button>
              </div>

              <div className="pt-4">
                <div className="mb-5">
                  <p>
                    <strong>Type:</strong> N/A
                  </p>
                  <p>
                    <strong>MFG:</strong> N/A
                  </p>
                  <p>
                    <strong>LIFE:</strong> 30 days
                  </p>
                </div>
                <hr />
                <div className="mt-5">
                  <p>
                    <strong>Category:</strong>{" "}
                    {categories.find(
                      (cat) => cat._id === product.category?.["_id"]
                    )?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Tags:</strong> N/A
                  </p>
                </div>
                <div className="mt-7 py-2.5">
                  <FacebookIcon fontSize="large" className="text-blue-500" />
                  <XIcon fontSize="large" className="text-gray-800" />
                  <PinterestIcon fontSize="large" className="text-red-600" />
                  <LinkedInIcon fontSize="large" className="text-[#0077b5]" />
                  <RedditIcon fontSize="large" className="text-[#ff4500]" />
                  <WhatsAppIcon fontSize="large" className="text-[#25d366]" />
                </div>
              </div>
            </div>

            {/* Cột 3: Additional Information */}
            <div className="w-full lg:w-3/12 md:w-1/2 mt-4 md:mt-0 flex flex-col px-4 pt-4">
              <p className="text-sm text-center rounded-md py-2 text-red-600 bg-red-50">
                Covid-19 Info: We keep delivering
              </p>
              <div className="mt-3 text-sm text-center rounded-md p-6 bg-gray-50">
                <ul>
                  <li className="flex flex-1">
                    <div className="mr-5">
                      <LocalShippingIcon />
                    </div>
                    <div className="text-start">
                      Free Shipping apply to all orders over $100
                    </div>
                  </li>
                  <li className="flex flex-1 py-5">
                    <div className="mr-5">
                      <FastfoodIcon />
                    </div>
                    <div className="text-start">
                      Guaranteed 100% Organic from natural farms
                    </div>
                  </li>
                  <li className="flex flex-1">
                    <div className="mr-5">
                      <LocalAtmIcon />
                    </div>
                    <div className="text-start">
                      1 Day Returns if you change your mind
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tabs product={product} />
      <RelatedProduct categoryId={product.category?.["$oid"]} />
      <RecentlyViewPro productId={product._id?.["$oid"]} />
    </>
  );
}

export default ProductDetails;
