import React, { useContext, useEffect } from "react";
import Header from "./header/Header";

import FooterLayout from "./footer/FooterLayout";
import { Outlet, useNavigate } from "react-router";
import { AccountContext } from "../context/AccountProvider";
import { getData } from "../utils/encryptData";
import Cookies from "js-cookie";
import { Authenticate } from "../service/AuthenticateServices";

function Layout({ children }) {
  const { account, setShowLogoutButton } = useContext(AccountContext);

  const navigate = useNavigate();

  const token = Cookies.get("JWT");

  useEffect(() => {
    async function verifyToken() {
      const token = Cookies.get("JWT");
      const auth = await Authenticate({ token });
      if (auth.success) {
      } else {
        setShowLogoutButton(false);
        navigate("/logout");
      }
    }
    setTimeout(() => {
    if (token !== undefined) verifyToken();
    }, 2000);
  }, [account,token]);

  useEffect(() => {
    function verifyToken() {
      const token = Cookies.get("JWT");
      
      if (token !== account?.token) {
        navigate("/logout");
        setShowLogoutButton(false);
      }
      if (token && !account) {
      
        navigate("/logout");
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
