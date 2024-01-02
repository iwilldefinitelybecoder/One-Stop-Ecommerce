import React, { useContext, useEffect } from "react";
import Header from "./header/Header";

import FooterLayout from "./footer/FooterLayout";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AccountContext } from "../context/AccountProvider";
import { getData } from "../utils/encryptData";
import Cookies from "js-cookie";
import { Authenticate } from "../service/AuthenticateServices";
import {jwtDecode} from "jwt-decode"
const tokens = Cookies.get("JWT");





function Layout({ children }) {
  const { account, setShowLogoutButton,setAuthErrors,authErrors } = useContext(AccountContext);
  const location = useLocation();
  const { pathname,search } = location;

  const navigate = useNavigate();

  const token = Cookies.get("JWT");

  useEffect(() => {
    async function verifyToken() {
      const token = Cookies.get("JWT");

      const decodeToken = (token) => {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
         
          if (decodedToken.exp < currentTime) {
            return true;
          }
          return false;
          
        } catch (error) {
          return null;
        }
      };
      if (decodeToken(token)) {
        setShowLogoutButton(false);
        setAuthErrors({...authErrors,tokenExpired:true})
        navigate("/logout");
      }
    }
    verifyToken();
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }
    , [pathname,search]);


 

  useEffect(() => {
    function verifyToken() {
      const token = Cookies.get("JWT");
      
      if (token !== account?.token) {
        navigate("/logout");
        setShowLogoutButton(false);
        setAuthErrors({...authErrors,invalidToken:true})
      }
      if (token && !account) {
      
        navigate("/logout");
        setAuthErrors({...authErrors,noUserData:true})
        setShowLogoutButton(null);
      }
    }
    
    if (token !== undefined && account!==undefined) verifyToken();
  }, [account, token]);

  return (
    <>
      <div className="the-main-container bg-main-bg">
        <Header />
        <Outlet />
        <FooterLayout />
      </div>
    </>
  );
}

export default Layout;
