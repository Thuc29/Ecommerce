import React from "react";

const SubscribeSection = () => {
  return (
    <div className="footer-subscribe pt-[5%] bg-[#233a95]">
      <div className="container mx-auto px-4 max-w-[1270px]">
        <div className="flex flex-wrap justify-between ">
          <div className="w-full lg:w-5/12">
            <div className="subscribe-content">
              <h6 className="entry-subtitle text-lg text-white font-semibold">
                $20 discount for your first order
              </h6>
              <h3 className="entry-title text-2xl text-white font-bold">
                Join our newsletter and get...
              </h3>
              <p className="entry-teaser text-sm text-white mb-4">
                Join our email subscription now to get updates on promotions and
                coupons.
              </p>
              <div className="form-wrapper">
                <form id="mc4wp-form-1" className="mc4wp-form">
                  <div className="mc4wp-form-fields flex space-x-4">
                    <input
                      className="subscribe-input py-2 px-4 w-full rounded-md"
                      type="email"
                      name="EMAIL"
                      placeholder="Your email address"
                      required
                    />
                    <input
                      type="submit"
                      value="Subscribe"
                      className="py-2 px-4 bg-green-500 text-white rounded-md cursor-pointer"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-5/12">
            <div className="subscribe-image">
              <img
                src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/coupon.png"
                alt="subscribe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
