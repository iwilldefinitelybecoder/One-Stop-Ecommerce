import React from "react";
import InfoBar from "./infobar/InfoBar";
import Toolbar from "./toolbar/Toolbar";
import NavBar from "./navbar/NavBar";
import "./index.css";
import CartContainer from "./SideBar/CartContainer";

const Index = () => {
  return (
    <>
      <div className=" toolbar-main-cntr shadow-md bg-white ">
        <InfoBar />

        <div className=" rounded-md  py-2 z-20 ">
          <Toolbar />
          <NavBar />
        </div>

        <CartContainer />
      </div>
    </>
  );
};

export default Index;
