import React from "react";
import InfoBar from "./infobar/InfoBar";
import Toolbar from "./toolbar/Toolbar";
import NavBar from "./navbar/NavBar";
import "./index.css";
import CartContainer from "./SideBar/CartContainer";

const Index = () => {
  return (
    <>
      <InfoBar />

      <div className=" shadow-md rounded-md px-5 py-2">
        <Toolbar />
        <NavBar />
      </div>

      <CartContainer />

      <button className="Btn">Click Me</button>
    </>
  );
};

export default Index;
