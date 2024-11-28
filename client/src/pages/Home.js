import React from "react";
import Banner from "../components/Body/Banner";
import HomeCat from "../components/Body/HomeCat";
import Seller from "../components/Body/Seller";
import NewPro from "../components/Body/NewPro";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Banner />
      <HomeCat />
      <Seller />
      <NewPro />
    </>
  );
};

export default Home;
