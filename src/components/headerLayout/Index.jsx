import React, { useContext } from "react";
import InfoBar from "./infobar/InfoBar";
import Toolbar from "./toolbar/Toolbar";
import NavBar from "./navbar/NavBar";
import "./index.css";
import CartContainer from "./SideBar/CartContainer";
import LoginUI from "../body/login/loginUI";
import { AccountContext } from "../../context/AccountProvider";

const Index = () => {
  const{account,showLoginButton,setShowLoginButton} = useContext(AccountContext);
  return (
    <>
      <div className=" toolbar-main-cntr shadow-md bg-white ">
        <InfoBar />

        <div className=" rounded-md  py-2 z-20 ">
          <Toolbar />
          <NavBar />
        </div>

        <CartContainer />
        {
          showLoginButton && !account  && 
          <div className=" profile-btn-login">
          <div className="cart-bg-container " onClick={()=>setShowLoginButton(false)}></div>
          <LoginUI />
        </div>
        }
      </div>
    </>
  );
};

export default Index;
