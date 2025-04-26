import React, { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="mx-7">
            <p className="text-gray-700">
              Quisque varius diam vel metus mattis, id aliquam diam rhoncus.
              Proin vitae magna in dui finibus malesuada et at nulla.
            </p>
          </div>
        );
      case "additional_information":
        return (
          <div>
            <table className="min-w-[90%] border-collapse mx-auto border border-gray-200">
              <tbody>
                <tr>
                  <th className="border text-[16px] border-gray-200 p-2">
                    Brands
                  </th>
                  <td className="border text-[16px] border-gray-200 p-2">
                    Welch's
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "reviews":
        return (
          <div className="mx-8">
            <h2 className="text-xl font-semibold">
              1 review for All Natural Italian-Style Chicken Meatballs
            </h2>
            <div className="flex items-center my-7">
              <img
                src="https://secure.gravatar.com/avatar/dd28514c9a8cfba334e05f21703be28e?s=60"
                alt="User "
                className="h-16 w-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-[16px] my-2 items-center flex font-semibold">
                  admin{" "}
                  <p className="text-[12px] pt-1 text-gray-500">
                    {" "}
                    - May 1, 2021
                  </p>
                </h3>{" "}
                <p className="text-gray-600">
                  Sed perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-[16px] my-3 font-semibold">Add a Review</h2>
              <hr />
              <form className="mt-4">
                <div className="mb-5">
                  <p className="mt-[33px] mb-[21px]">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                  <label className="block mb-2 text-gray-700">
                    Your rating*
                  </label>

                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`text-2xl ${
                          star <= (hover || rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-gray-700">
                    Your review*
                  </label>
                  <textarea
                    className="border rounded bg-gray-300 w-full p-2"
                    rows="8"
                    required
                  ></textarea>
                </div>
                <div className="mb-5">
                  <label className="block text-gray-700">Name*</label>
                  <input
                    type="text"
                    className="border bg-gray-300 rounded w-full p-2"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-gray-700">Email*</label>
                  <input
                    type="email"
                    className="border bg-gray-300 rounded w-full p-2"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input type="checkbox" />
                  <label className="ml-2">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </div>
                <button
                  type="submit"
                  className="hover:text-white hover:bg-[#2bbef9] text-[#2bbef9] border border-[#2bbef9] rounded-lg px-4 py-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" my-5 rounded-md px-0 lg:max-w-[1270px] md:max-w-[800px] sm:max-w-[500px] mx-auto w-full border bg-white">
      <div className="container px-7">
        <ul className="flex justify-start space-x-8 border-b border-gray-200 my-4 py-3">
          <li
            className={`cursor-pointer text-[16px] uppercase ${
              activeTab === "description"
                ? "font-bold text-black border-b-2 border-[#2bbef9]"
                : "text-gray-400 hover:text-[#2bbef9]"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </li>
          <li
            className={`cursor-pointer text-[16px] uppercase ${
              activeTab === "additional_information"
                ? "font-bold text-black border-b-2 border-[#2bbef9]"
                : "text-gray-400 hover:text-[#2bbef9]"
            }`}
            onClick={() => setActiveTab("additional_information")}
          >
            Additional Information
          </li>
          <li
            className={`cursor-pointer text-[16px] uppercase ${
              activeTab === "reviews"
                ? "font-bold text-black border-b-2 border-[#2bbef9]"
                : "text-gray-400 hover:text-[#2bbef9]"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="my-5">{renderContent()}</div>
    </div>
  );
}

export default Tabs;
