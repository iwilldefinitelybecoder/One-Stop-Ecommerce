import React, { useContext, useEffect } from "react";
import InfoBar from "./infobar/InfoBar";
import Toolbar from "./toolbar/Toolbar";
import NavBar from "./navbar/NavBar";
import "./index.css";
import CartContainer from "./SideBar/CartContainer";
import LoginUI from "../body/login/loginUI";
import { AccountContext } from "../../context/AccountProvider";
import { LinearProgress } from "@mui/material";
import { useComponent } from "../../context/ComponentProvider";

const Index = () => {

  const {loadProgress,setLoadProgress} = useComponent();
  const{account,showLoginButton,setShowLoginButton} = useContext(AccountContext);

  useEffect(() => {
    if(loadProgress >= 100){
      setLoadProgress(0);
      }
  }
  , [loadProgress]);
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
          <div className=" profile-btn-login ">
          <div className="cart-bg-container " onClick={()=>setShowLoginButton(false)}></div>
          <LoginUI />
        </div>
        }
      </div>
      <div>
        {
          loadProgress > 0 && 
          <LinearProgress variant="determinate"  value={loadProgress} className="h-1 bg-light-pink" />
        }
      
      </div>
    </>
  );
};

export default Index;
