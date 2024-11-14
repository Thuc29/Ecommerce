import React from "react";
import Sidebar from "../Sidebar/Sidebar";

function Listing() {
  return (
    <>
      <section className="product-lissting-page mx-auto w-full md:max-w-[1270px] px-0 sm:px-4 py-[5%] md:py-[5%] rounded-xl">
        <div className="container">
          <div className="productListing md:gap-[20px] md:flex">
            <Sidebar />
            <div className="content_right w-full sm:w-full md:w-[80%] flex-[0_0_80%] sm:pl-[43px] md:pl-[50px] text-center">
              <img
                src="/assets/bannerList1.jpeg"
                className="w-full sm:w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Listing;
