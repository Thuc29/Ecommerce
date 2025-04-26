import { Button, Dialog } from "@mui/material";
import * as React from "react";
import { Form } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CountryDropDown() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const context = React.useContext(MyContext);
  const [selectedTab, setSelectedTab] = React.useState(null);
  const [countryList, setCountryList] = React.useState([]);

  const selectCountry = (index, country) => {
    setSelectedTab(index);
    setIsOpenModal(false);
    context.setSelectedCountry(country);
  };

  React.useEffect(() => {
    setCountryList(context.countryList);
  }, []);

  const filterList = (e) => {
    if (!context.countryList) return;

    const keyword = e.target.value.toLowerCase();
    const list = context.countryList.filter((item) => {
      return item.name.common.toLowerCase().includes(keyword);
    });

    setCountryList(list);
  };
  return (
    <>
      <Button
        className="w-[170px] h-[50px] text-left color-[#000]"
        style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}
        onClick={() => setIsOpenModal(true)}
      >
        <div className="flex flex-col p-[10px] ">
          <span className="text-[12px] capitalize text-[rgba(0,0,0,0.4)] leading-4">
            Your Location
          </span>
          <span className="text-[14px] capitalize text-[#233a95] font-bold leading-4">
            {context.selectedCountry !== ""
              ? context.selectedCountry?.substr(0, 15)
              : "Select Location"}
          </span>
        </div>
        <span className="ml-auto opacity-[7px]">
          <FaAngleDown />
        </span>
      </Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        TransitionComponent={Transition}
      >
        <h3 className="text-[18px] font-medium">
          {" "}
          Choose your Delivery Location
        </h3>
        <p className="text-[14px] text-[rgba(0,0,0,0.51)]">
          Enter your address and we will specify the offer for your area.
        </p>
        <Button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#000",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
          onClick={() => setIsOpenModal(false)}
        >
          <MdClose size={20} />
        </Button>
        <div className="flex items-center h-[40px] md:h-[44px] bg-[#f3f4f7] border border-gray-300 rounded-lg">
          <Button
            className="h-[35px] md:h-[35px] [&media(min-width:768px)]:min-w-[45px]"
            style={{
              borderRadius: "50%",
              minWidth: "35px",
            }}
          >
            <IoSearch color="#000" size={20} />
          </Button>
          <Form.Control
            type="text"
            onChange={filterList}
            placeholder="Search your area..."
            className="bg-transparent border-none outline-none text-sm md:text-[15px] w-full h-full px-2 md:px-4"
          />
        </div>

        <ul className="mb-0 mt-5 max-h-[400px] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
          {countryList?.map((items, index) => (
            <li
              key={index}
              onClick={() => selectCountry(index, items.name.common)}
              className={`w-full list-none ${
                selectedTab === index ? "bg-gray-100" : ""
              }`}
            >
              <Button
                style={{
                  width: "100%",
                  textTransform: "capitalize",
                  color: "#000",
                  justifyContent: "flex-start",
                }}
                className="relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#2bbef9] after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {items.name.common}
              </Button>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}

export default CountryDropDown;
