import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function DashboardBox(props) {
  return (
    <>
      <div
        className={`w-[48%] h-[170px] rounded-xl overflow-hidden p-4`}
        style={{
          backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
        }}
      >
        <div className="flex w-full">
          <div className="">
            <p typeof="h4" className="text-[20px] text-white font-medium">
              Total Users
            </p>
            <span className="text-white text-3xl font-bold leading-[45px]">
              {" "}
              277{" "}
            </span>
          </div>
          <div className="ml-auto">
            {props.icon ? (
              <span className=" flex items-center justify-center opacity-50 w-[50px] h-[50px] rounded-lg text-[#fff] bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.1)]">
                {props.icon ? props.icon : ""}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardBox;
