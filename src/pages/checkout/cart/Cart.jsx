import React, { useEffect, useRef, useState } from "react";
import { useOutlet, useOutletContext } from "react-router";
import "./cart.css";

import CartItems from "./cartItems";
import { OrderPaging } from "../../user/orders/Orders";

import { cartProducts } from "../../../data/cartproducts";
import { connect, useDispatch } from "react-redux";
import RightElement from "./rightElement";


const Cart = ({itemDetail,estimateCost}) => {
  const dispatch = useDispatch();
  const [topcntr] = useOutletContext();

  const [currnetPage, setCurrentPage] = useState(0);
  const totalpages = Math.ceil(itemDetail.length / 5);
    const startIndex = currnetPage * 5;
    const endIndex = (currnetPage + 1) * 5;
    const [currentOrders, setCurrentOrders] = useState(itemDetail.slice(startIndex, endIndex))
    const [cartTotal, setCartTotal] = useState(0);
   
    const [estimatedCosts, setEstimatedCosts] = useState(
    estimateCost
    );

    useEffect(() => {
      dispatch({type:'estimatedCosts',payload:estimatedCosts})
    }, []);
      
  useEffect(() => {
    setCurrentOrders(itemDetail.slice(startIndex, endIndex));
  }, [currnetPage, itemDetail]);


  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    const total = itemDetail.reduce(
      (sum, item) => sum + item.price * item.itemQuantity,
      0
    );
    const formattedTotal = parseFloat(total.toFixed(2));
    setCartTotal(formattedTotal);
  }, [itemDetail]);

  useEffect(() => {
    setEstimatedCosts((prev) => {
      const estiCosts = {
      ...prev,
      subTotal: cartTotal,
      addedAll:
        cartTotal + prev.shipping + prev.tax - prev.discount,
  }
  dispatch({type:'estimatedCosts',payload:estiCosts})
    return estiCosts;
});
  }, [cartTotal]);

  const handelItemDelete = (index)=>{
    dispatch({type:'REMOVE_ITEM',payload:index})
  }
  return (
    <>
      <div className="checkout-pos-left-cntr">
        <div className="checkout-left-top-cntr">{topcntr}</div>
        <div className="checkout-left-btm-cntr space-y-6">
          {
            currentOrders &&
          currentOrders?.map((item, index) => (
        <CartItems key={index} itemDetails = {item} index = {index} deleteItem={handelItemDelete}/>
          ))
        }
           <OrderPaging
        currentPage={currnetPage}
        totalpages={totalpages}
        updatePage={handelPageChange}
        />
        </div>
      </div>
      <div className="checkout-pos-right-cntr mt-16 ml-5">
        <RightElement estimatedCosts = {estimatedCosts}/>
      </div>
     
    </>
  );
};

 const reduxCart = (state) => (
  {
    itemDetail:state.cartItems,
    estimateCost:state.estimate
  }
 )

export default connect(reduxCart)(Cart);
