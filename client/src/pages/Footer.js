import React from "react";
import SubscribeSection from "../components/Footer/SubscribeSection";
import IconBoxes from "../components/Footer/IconBoxes";
import Widgets from "../components/Footer/Widgets";
import Contacts from "../components/Footer/Contacts";
import Bottom from "../components/Footer/Bottom";

const Footer = () => {
  return (
    <footer className="">
      <SubscribeSection />
      <IconBoxes />
      <Widgets />
      <Contacts />
      <Bottom />
    </footer>
  );
};

export default Footer;
