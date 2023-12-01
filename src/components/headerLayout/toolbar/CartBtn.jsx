import React, { useState } from "react";
import { shoppingbagIcon } from "../../../assets/icons/png/toolbar1/data";
import CartContainer from "../SideBar/CartContainer";

import { connect, useDispatch } from "react-redux";
import {useCart} from "../../../CustomHooks/CartHook";

function CartBtn({ cartToggle }) {
  const dispatch = useDispatch();
  const { cartTotal, totalItems, cart } = useCart();
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
        {totalItems() !== 0 && <div className="alerts">{totalItems()}</div>}
        <img src={shoppingbagIcon} alt="" className="user-icon" />
      </div>
    </>
  );
}

const mapCartStateToProps = (state) => ({
  cartToggle: state.cartToggle,
});



export default connect(mapCartStateToProps)(CartBtn);
