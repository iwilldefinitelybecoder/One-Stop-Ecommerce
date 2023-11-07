import React, { useState } from "react";
import { shoppingbagIcon } from "../../../assets/icons/png/toolbar1/data";
import CartContainer from "../SideBar/CartContainer";

import { connect, useDispatch } from "react-redux";

function CartBtn({ cartToggle, cartValue }) {
  const dispatch = useDispatch();

  const toggleCart = (e) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_CART" });
  };

  return (
    <>
      <div
        className="profile-icon bg-slate-100 ml-6 shadow-md"
        onClick={toggleCart} 
      >
        {cartValue !== 0 && <div className="alerts">{cartValue}</div>}
        <img src={shoppingbagIcon} alt="" className="user-icon" />
      </div>
    </>
  );
}

const mapCartStateToProps = (state) => ({
  cartToggle: state.cartToggle,
  cartValue: state.cartValue,
});



export default connect(mapCartStateToProps)(CartBtn);
