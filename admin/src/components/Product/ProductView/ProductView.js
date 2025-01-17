import React from "react";
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
import ProductDescription from "./ProductDescription";
import RatingAnalytics from "./RatingAnalytics";
import CustomerReviews from "./CustomerReviews";
import ReviewReply from "./ReviewReply";
function ProductView() {
  return (
    <>
      <div className=" px-7 w-full">
        <div className="shadow rounded-lg border p-3 my-4 mx-0">
          <p className="font-extrabold text-2xl "> Product View</p>
        </div>
        <div className=" bg-[#1d2f4d] rounded-2xl py-8 px-3">
          {" "}
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-5/12">
              <div className="flex items-center mb-4">
                <h1 className="text-[16px] font-semibold">Product Gallery</h1>
                <hr className="flex-grow border-gray-700 ml-4" />
              </div>
              <img
                src="https://placehold.co/450x450"
                alt="Red suit jacket with patterned inner lining"
                className="w-full mb-4"
              />
              <div className="flex justify-between">
                <img
                  src="https://placehold.co/450x450"
                  alt="Thumbnail of red suit jacket"
                  className="w-[23%] h-auto rounded-md"
                />
                <img
                  src="https://placehold.co/450x450"
                  alt="Thumbnail of red suit jacket"
                  className="w-[23%] h-auto rounded-md"
                />
                <img
                  src="https://placehold.co/450x450"
                  alt="Thumbnail of red suit jacket"
                  className="w-[23%] h-auto rounded-md"
                />
                <img
                  src="https://placehold.co/450x450"
                  alt="Thumbnail of red suit jacket"
                  className="w-[23%] h-auto rounded-md"
                />
              </div>
            </div>

            <div className="lg:w-7/12 lg:pl-8">
              <div className="flex items-center mb-4">
                <h1 className="text-[16px] font-semibold">Product Details</h1>
                <hr className="flex-grow border-gray-700 ml-4" />
              </div>
              <div className="flex flex-col lg:flex-row">
                {" "}
                <div className="space-y-2">
                  <h2 className="text-[22px] font-medium leading-[30px] mb-4">
                    Formal suits for men wedding slim fit 3 piece dress business
                    party jacket
                  </h2>
                  <div className="flex items-center">
                    <MdStore className="mr-3" size={20} />
                    <p className="font-medium text-[15px] w-[90px]">Brand</p>
                    <span className="mr-2 leading-4 opacity-50">:</span>
                    <p className="text-[15px] leading-[18px] capitalize opacity-50">
                      ecstasy
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MdPix className="mr-3" size={20} />
                    <p className="font-medium text-[15px] w-[90px]">Category</p>
                    <span className="mr-2 leading-4 opacity-50">:</span>
                    <p className="text-[15px] leading-[18px] capitalize opacity-50">
                      man's
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MdSettings className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Tags
                    </span>
                    <span className="mr-2 leading-4 opacity-50">
                      :
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        SUITE
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        PARTY
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        DRESS
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        SMART
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        MAN
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        STYLES
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdPalette className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Color
                    </span>
                    <span className="mr-2 leading-4 opacity-50">
                      :
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        RED
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        BLUE
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        GREEN
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        YELLOW
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        PURPLE
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdSummarize className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Size
                    </span>
                    <span className="mr-2 leading-4 opacity-50">
                      :
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        SM
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        MD
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        LG
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        XL
                      </span>
                      <span className="bg-gray-700 px-1 text-xs py-1 rounded ml-2">
                        XXL
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdSell className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Price
                    </span>
                    <span className="mr-2 leading-4 opacity-50">:</span>
                    <p className="text-[15px] leading-[18px] capitalize opacity-50">
                      $37.00
                      <span className="line-through text-red-500 ml-1">
                        $42.00
                      </span>
                    </p>{" "}
                  </div>
                  <div className="flex items-center">
                    <MdShoppingCart className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Stock
                    </span>
                    <span className="mr-2 leading-4 opacity-50">:</span>
                    <span className="text-[15px] leading-[18px] capitalize opacity-50">
                      (68) Piece
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdHotelClass className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Review
                    </span>
                    <span className="mr-2 leading-4 opacity-50">:</span>
                    <span className="text-[15px] leading-[18px] capitalize opacity-50">
                      (03) Review
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdVerified className="mr-3" size={20} />
                    <span className="font-medium text-[15px] w-[90px]">
                      Published
                    </span>
                    <span className="mr-2 leading-4 opacity-50">: </span>
                    <span className="text-[15px] leading-[18px] capitalize opacity-50">
                      02 Feb 2020
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-lg">
            <ProductDescription />
            <RatingAnalytics />
            <CustomerReviews />
            <ReviewReply />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductView;
