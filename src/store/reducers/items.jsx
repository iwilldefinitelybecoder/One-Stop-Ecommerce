import React from "react";
import { cartProducts } from "../../data/cartproducts";
import { getAllCartItems } from "../../service/CustomerServices/CartServices";

const cart = await getAllCartItems() 
const initialState = cart || [];
console.log(initialState)
const items = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item, index) => index !== action.payload);
    case "UPDATE_ITEM":
      return state.map((item, index) => {
        if (index === action.payload.index) {
          return { ...action.payload.cartItem };
        }
 
        return item;
      });
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export default items;
