import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const UnauthorizedPage = () => {
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
      <AiOutlineExclamationCircle
        style={{
          fontSize: "6rem",
          animationName: "unauthspin",
          animationDuration: "1s",
          color: "#e94560",
          animationIterationCount: "infinite",
          animationDirection: "alternate-reverse",
          animationTimingFunction: "linear",
        }}
      />
      <h1 style={{ fontWeight: 500, color: "#333" }}>UnAuthorized Access</h1>
      <p style={{ color: "#333" }}>
        You do not have permission to access this page.
      </p>
      <Link to="/">
        <button
          style={{
            backgroundColor: "#e94560",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
