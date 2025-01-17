import React from "react";

function RatingAnalytics() {
  return (
    <>
      <div className="flex items-center py-3">
        <h1 className="text-[16px] font-semibold">Rating Analytics</h1>
        <hr className="flex-grow border-gray-700 ml-4" />
      </div>
      <div className="lg:flex justify-center items-center mb-6 gap-[100px]">
        <div className="md:w-12/12">
          <div className="flex items-center mb-2 gap-3 justify-center">
            <span className="text-[15px] tracking-[.3px] whitespace-nowrap capitalize opacity-55">
              5 Star
            </span>
            <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-2">
              <div
                className="h-full bg-yellow-500"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span>(22)</span>
          </div>
          <div className="flex items-center mb-2 gap-3 justify-center">
            <span className="text-[15px] tracking-[.3px] whitespace-nowrap capitalize opacity-55">
              4 Star
            </span>
            <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-2">
              <div
                className="h-full bg-yellow-500"
                style={{ width: "60%" }}
              ></div>
            </div>
            <span>(06)</span>
          </div>
          <div className="flex items-center mb-2 gap-3 justify-center">
            <span className="text-[15px] tracking-[.3px] whitespace-nowrap capitalize opacity-55">
              3 Star
            </span>
            <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-2">
              <div
                className="h-full bg-yellow-500"
                style={{ width: "50%" }}
              ></div>
            </div>
            <span>(05)</span>
          </div>
          <div className="flex items-center mb-2 gap-3 justify-center">
            <span className="text-[15px] tracking-[.3px] whitespace-nowrap capitalize opacity-55">
              2 Star
            </span>
            <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-2">
              <div
                className="h-full bg-yellow-500"
                style={{ width: "30%" }}
              ></div>
            </div>
            <span>(03)</span>
          </div>
          <div className="flex items-center mb-2 gap-3 justify-center">
            <span className="text-[15px] tracking-[.3px] whitespace-nowrap capitalize opacity-55">
              1 Star
            </span>
            <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-2">
              <div
                className="h-full bg-yellow-500"
                style={{ width: "10%" }}
              ></div>
            </div>
            <span>(02)</span>
          </div>
        </div>
        <div className="text-center md:w-12/12">
          <div className="text-xl mb-5 font-medium capitalize opacity-55">
            {" "}
            Total review (38)
          </div>
          <div className="text-[80px] font-extrabold tracking-[-1px] leading-[60px] mb-5">
            4.9
          </div>
          <div className="flex justify-center items-center mt-2 gap-1">
            <i className="material-icons text-yellow-500">star</i>
            <i className="material-icons text-yellow-500">star</i>
            <i className="material-icons text-yellow-500">star</i>
            <i className="material-icons text-yellow-500">star</i>
            <i className="material-icons text-yellow-500">star_half</i>
          </div>
          <div className="mt-2 text-[16px] capitalize opacity-55">
            Your Average Rating Star
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingAnalytics;
