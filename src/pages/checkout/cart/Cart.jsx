import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutlet, useOutletContext } from "react-router";
import "./cart.css";

import CartItems from "./cartItems";
import { OrderPaging } from "../../user/orders/Orders";

import { cartProducts } from "../../../data/cartproducts";
import { connect, useDispatch } from "react-redux";
import RightElement from "./rightElement";
import useCard from "../../../CustomHooks/CardsHooks";
import { useCart } from "../../../CustomHooks/CartHook";
import { noOrderIcon } from "../../../assets/icons/img/randoms/data";
import useWishlist from "../../../CustomHooks/WishListHook";


const Cart = ({ }) => {
  const dispatch = useDispatch();
  const [topcntr] = useOutletContext();
  const { moveAllItemsToWishlist } = useWishlist();
  const { cart, cartInfo } = useCart();

  const [currnetPage, setCurrentPage] = useState(0);
  const totalpages = Math.ceil(cart?.length / 5);
  const startIndex = currnetPage * 5;
  const endIndex = (currnetPage + 1) * 5;
  const [currentOrders, setCurrentOrders] = useState(cart?.slice(startIndex, endIndex))
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();


  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
  };

  const handelRedirect = () => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  const handelMoveAllToCart = () => {
    moveAllItemsToWishlist();
  }





  console.log(cartInfo)

  return (
    <>
      <div className="checkout-pos-left-cntr">
        <div className="checkout-left-top-cntr">{topcntr}</div>

        {cartInfo?.totalItems === 0 ? <div className="cart-empty-cntr" onLoad={handelRedirect}>
          <div className="cart-empty-img-cntr">
            <img src={noOrderIcon} className="cart-empty-img" />

          </div>
        </div>
          :
          <div className="checkout-left-btm-cntr space-y-6">
            <div className="w-full flex justify-end mr-14 ">
              <button className="Btn3" onClick={handelMoveAllToCart}>Move All To WishList</button>

            </div>
            {
              currentOrders &&
              currentOrders?.map((item, index) => (
                <CartItems key={index} itemDetails={item} />
              ))
            }
            <OrderPaging
              currentPage={currnetPage}
              totalpages={totalpages}
              updatePage={handelPageChange}
            />
          </div>
        }
      </div>
      <div className="checkout-pos-right-cntr mt-16 ml-5">
        <RightElement />
      </div>

    </>
  );
};

const reduxCart = (state) => (
  {

  }
)

export default connect(reduxCart)(Cart);
