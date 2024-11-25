import { Rating } from "@mui/material";
import React from "react";
import ProductZoom from "../Product/ProductZoom";
import QuantityBox from "../Product/QuantityBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FaRegHeart } from "react-icons/fa6";

function ProductDetails() {
  return (
    <>
      <section className="py-[30px] my-3 rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full bg-white">
        <div className="container px-10">
          <p className="capitalize font-semibold text-xl">
            Field Roast Chao Cheese Creamy Original
          </p>
          <p className="text-gray-500 mb-7 flex items-center gap-4">
            <span>
              Brand: <span className="font-semibold">ABC</span>
            </span>
            <span>|</span>
            <span className="flex items-center">
              <Rating
                readOnly
                value={5}
                size="small"
                precision={0.5}
                className="pr-1"
              />
              <span className="font-semibold">Review</span>
            </span>
            <span>|</span>
            <span>
              SKU: <span className="font-semibold">ABC</span>
            </span>
          </p>
          <div className="flex flex-col md:flex-row md:space-x-3 md:justify-between items-start my-4">
            {/* Cột 1: Product Image */}
            <div className=" lg:w-5/12 md:w-5/12 sm:w-11/12 flex justify-center md:justify-start">
              <ProductZoom />
            </div>

            {/* Cột 2: Product Details */}
            <div className="w-full lg:w-4/12 md:w-7/12 mt-4 md:mt-0 flex flex-col px-4 md:justify-start pt-4">
              <div className="flex items-center mb-2">
                <span className="text-gray-500 text-xl line-through">
                  $9.35
                </span>
                <span className="text-red-600 text-[26px] font-bold mx-3">
                  $5.12
                </span>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">
                  23% OFF
                </span>
              </div>
              <p className="text-[#00b853] font-semibold mb-4 text-sm bg-[#e5f8ed] rounded-full max-w-[80px] px-3">
                In Stock
              </p>
              <p className="text-gray-600 mb-4">asdkfdsfkjl</p>

              <div className="flex items-center mb-4">
                <QuantityBox />
              </div>

              <div className="flex space-x-4 mb-4">
                <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase">
                  <FaRegHeart className="mr-1" />
                  Add to Wishlist
                </button>
                <button className="text-gray-500 border rounded-full px-5 py-1 flex text-xs items-center uppercase">
                  Compare
                </button>
              </div>

              <div className="pt-4">
                <div className="mb-5">
                  <p>
                    <strong>Type:</strong>
                  </p>
                  <p>
                    <strong>MFG:</strong>
                  </p>
                  <p>
                    <strong>LIFE:</strong> 30 days
                  </p>
                </div>
                <hr />
                <div className="mt-5">
                  <p>
                    <strong>Category:</strong>
                  </p>
                  <p>
                    <strong>Tags:</strong>
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
            <div className="w-full lg:w-3/12 mt-4 md:mt-0 flex flex-col px-4 pt-4">
              <p className="text-sm text-center rounded-md py-2 text-red-600 bg-red-50">
                Covid-19 Info: We keep delivering
              </p>
              <div className="mt-3 text-sm text-center rounded-md p-6 bg-gray-50">
                <ul>
                  <li className="flex flex-1">
                    <div className=" mr-5">
                      <i>
                        {" "}
                        <LocalShippingIcon />
                      </i>
                    </div>
                    <div className="text-start">
                      Free Shipping apply to all orders over $100
                    </div>
                  </li>
                  <li className="flex flex-1 py-5">
                    <div className="mr-5">
                      <i className="">
                        <FastfoodIcon />
                      </i>
                    </div>
                    <div className="text-start">
                      Guranteed 100% Organic from natural farmas
                    </div>
                  </li>
                  <li className="flex flex-1">
                    <div className="mr-5">
                      <i className="">
                        {" "}
                        <LocalAtmIcon />
                      </i>
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
    </>
  );
}

export default ProductDetails;
