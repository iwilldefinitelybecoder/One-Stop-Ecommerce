import React, { useContext, useEffect } from "react";
import Header from "./header/Header";

import FooterLayout from "./footer/FooterLayout";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router";
import { AccountContext } from "../context/AccountProvider";
import { getData } from "../utils/encryptData";
import Cookies from "js-cookie";
import { Authenticate } from "../service/AuthenticateServices";
import {jwtDecode} from "jwt-decode"
import { useOrders } from "../context/OrderContext";
const tokens = Cookies.get("JWT");





function Layout({ children }) {
  const { account, setShowLogoutButton,setAuthErrors,authErrors } = useContext(AccountContext);
  const location = useLocation();
  const {resetOrderDetails} = useOrders();
  const { pathname,search } = location;

  const navigate = useNavigate();
  const page  = useMatch('/checkout/*');
  const page2  = useMatch('/product/:id');

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

  useEffect(()=>{
    if(page2?.pathnameBase === "/product"||page?.pathnameBase ==="/checkout")return;
    resetOrderDetails();
  },[page?.pathnameBase,page2?.pathnameBase])


 

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
