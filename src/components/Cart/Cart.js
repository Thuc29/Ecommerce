import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import QuantityBox from "../Product/QuantityBox";
import { IoIosClose } from "react-icons/io";

function Cart() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1270px] px-4 py-3 lg:py-3 rounded-xl">
        <div className="container">
          <div className="md:w-8/12">
            <div className="text-lg mb-0">Your Cart</div>
            <p>
              There are <b>23</b> product in your cart
            </p>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
              <table class="w-full text-sm text-left rtl:text-right dark:text-gray-800">
                <thead class="text-xs uppercase bg-gray-100 ">
                  <tr className="text-center">
                    <th scope="col" className="px-6  py-3">
                      Product
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Subtotal
                    </th>
                    <th scope="col" class="w-[4%]"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr class="bg-white border-b">
                    <th
                      scope="row"
                      class="px-3 py-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/product/1`}>
                        <div className="flex items-center ">
                          <div className="w-[100px] overflow-hidden ">
                            <img
                              src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-60-600x600.jpg"
                              className="h-[80px] w-[100px]"
                            />
                          </div>
                          <div className="hover:decoration-black">
                            <p className="hover:text-[#2bbef9]">
                              {" "}
                              Apple MacBook Pro 17"
                            </p>
                            <Rating
                              name="read-only"
                              value={4.5}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                          </div>
                        </div>
                      </Link>
                    </th>
                    <td class="px-6 py-4">Silver</td>
                    <td class="px-6 py-4">
                      <QuantityBox />
                    </td>
                    <td class="px-6 py-4">$2999</td>
                    <td class="px-6 py-4">
                      <IoIosClose size={27} />
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <th
                      scope="row"
                      class="px-3 py-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/product/1`}>
                        <div className="flex items-center ">
                          <div className="w-[100px] overflow-hidden ">
                            <img
                              src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-60-600x600.jpg"
                              className="h-[80px] w-[100px]"
                            />
                          </div>
                          <div className="hover:decoration-black">
                            <p className="hover:text-[#2bbef9]">
                              {" "}
                              Apple MacBook Pro 17"
                            </p>
                            <Rating
                              name="read-only"
                              value={4.5}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                          </div>
                        </div>
                      </Link>
                    </th>
                    <td class="px-6 py-4">Silver</td>
                    <td class="px-6 py-4">
                      <QuantityBox />
                    </td>
                    <td class="px-6 py-4">$2999</td>
                    <td class="px-6 py-4">
                      <IoIosClose size={27} />
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <th
                      scope="row"
                      class="px-3 py-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/product/1`}>
                        <div className="flex items-center ">
                          <div className="w-[100px] overflow-hidden ">
                            <img
                              src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-60-600x600.jpg"
                              className="h-[80px] w-[100px]"
                            />
                          </div>
                          <div className="hover:decoration-black">
                            <p className="hover:text-[#2bbef9]">
                              {" "}
                              Apple MacBook Pro 17"
                            </p>
                            <Rating
                              name="read-only"
                              value={4.5}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                          </div>
                        </div>
                      </Link>
                    </th>
                    <td class="px-6 py-4">Silver</td>
                    <td class="px-6 py-4">
                      <QuantityBox />
                    </td>
                    <td class="px-6 py-4">$2999</td>
                    <td class="px-6 py-4">
                      <IoIosClose size={27} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-4/12"></div>
        </div>
      </section>
    </>
  );
}

export default Cart;
