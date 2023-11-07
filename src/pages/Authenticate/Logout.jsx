import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/AccountProvider";
import { removeData } from "../../utils/encryptData";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const {
    setAccount,
    setShowLoginButton,
    setShowLogoutButton,
    showLogoutButton,
  } = useContext(AccountContext);

  const handleConfirmLogout = () => {
    removeData("account");
    setAccount();
    setShowLoginButton(false);
    console.clear();
    Cookies.remove("JWT");
    setShowLogoutButton(false);
    navigate("/");
  };

  const handleSessionExpired = () => {
    removeData("account");
    setAccount();
    setShowLoginButton(false);
    console.clear();    
    Cookies.remove("JWT");
    setShowLogoutButton(false);
    navigate("/login");
  };
  
  const denyLogout = () => {
    navigate("/");
    setShowLogoutButton(false);
    setShowLoginButton(false);
  }

  return (
    <div
      className=" space-y-2"
      style={{
        backgroundColor: "#f7f9fd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {showLogoutButton === null ? (
        <>
          <h1 style={{ fontWeight: 500, color: "#333", fontSize: "35px" }}>
            Logged Out
          </h1>
          <p style={{ color: "#333", fontSize: "20px" }}>
            Unexpected Error Occured. Please log in again.
          </p>
          <div className="  flex space-x-20 ">
            <button
              style={{
                backgroundColor: "#e94560",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleSessionExpired}
            >
              Login
            </button>

            <button
              className=" hover:bg-gray-300 px-5 py-2.5 rounded cursor-pointer bg-slate-300 hover:bg-slate-400, hover:text-white"
              onClick={handleConfirmLogout}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {showLogoutButton ? (
            <>
              <h1 style={{ fontWeight: 500, color: "#333", fontSize: "35px" }}>
                Confirm Logout
              </h1>
              <p style={{ color: "#333", fontSize: "20px" }}>
                Are you sure you want to log out?
              </p>
              <div className="  flex space-x-20 ">
                <button
                  style={{
                    backgroundColor: "#e94560",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleConfirmLogout}
                >
                  Logout
                </button>
                
                  <button className="
                   hover:bg-gray-300 px-5 py-2.5 rounded cursor-pointer bg-slate-300 hover:bg-slate-400, hover:text-white"
                   onClick={denyLogout}>
                    Cancel
                  </button>
                
              </div>
            </>
          ) : (
            <>
              <h1 style={{ fontWeight: 500, color: "#333", fontSize: "35px" }}>
                Session Expired
              </h1>
              <p style={{ color: "#333", fontSize: "20px" }}>
                Your session has expired. Please log in again.
              </p>
              <div className="  flex space-x-20 ">
                <button
                  style={{
                    backgroundColor: "#e94560",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleSessionExpired}
                >
                  Login
                </button>

                <button
                  className=" hover:bg-gray-300 px-5 py-2.5 rounded cursor-pointer bg-slate-300 hover:bg-slate-400, hover:text-white"
                  onClick={handleConfirmLogout}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Logout;
