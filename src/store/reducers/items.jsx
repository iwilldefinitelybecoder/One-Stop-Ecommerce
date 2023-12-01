import React from "react";
import { cartProducts } from "../../data/cartproducts";
import { addCartItem, deleteCartItem, emptyCart, getAllCartItems, updateCartItem } from "../../service/CustomerServices/CartServices";
import { addCardItem } from "../../service/CustomerServices/CardServices";
import { useDispatch } from "react-redux";


const initialState = [];
console.log(initialState)
const items = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return [];
    case "SET_CART" :
      return [...state,action.payload] || [];

    default:
      return state;
  }
};


export default items;
