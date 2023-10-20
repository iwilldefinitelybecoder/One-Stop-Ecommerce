import React, { useEffect, useRef, useState } from "react";

import "./cart.css";
import {
  TshirtIcon,
  minusIcon,
  plusIcon,
} from "../../../assets/icons/img/products/data";
import { useDispatch } from "react-redux";

const CartItems = ({itemDetails, index, deleteItem}) => {


    const [itemDetail, setItemDetail] = useState(itemDetails);
    const dispatch = useDispatch();
  
    const buttonDisableRef = useRef(null);
  
    const handelAddQuantity = () => {
      const total = itemDetail.itemQuantity + 1;
      const cases = "ADD";
      calulateTotal(total, cases);
    };


    useEffect(() => {
      setItemDetail(itemDetails);
    }, [itemDetails]);
   
    const handelMinusQuantity = () => {
      if (itemDetail.itemQuantity > 1) {
        // buttonDisableRef.current.disabled = true;
        const total = itemDetail.itemQuantity - 1;
        const cases = "MINUS";
        calulateTotal(total, cases);
      }
    };
  
    const calulateTotal = (total, cases) => {
      setItemDetail((prevItemDetail) => {
        const itemTotal = prevItemDetail.price * total;
        const formattedTotal = parseFloat(itemTotal.toFixed(2));
        const cartItem = {
          ...prevItemDetail,
          itemQuantity: total,
          itemTotal: formattedTotal,
        };
        dispatch({ type: "UPDATE_ITEM", payload: { index,cartItem} });

        return cartItem;
      });
    };
  
  
    const handleChange = (e, quantity) => {
      let value = e.target.value;
  
      value = value.replace(/\D/g, "").slice(0, 2);
      if (value === "" || value === "0") {
        value = 1;
      }
      const values = parseInt(value, 10);
      let cases;
  
      if (quantity < values) {
        cases = "ADD";
      } else {
        cases = "MINUS";
      }
  
      setItemDetail({ ...itemDetail, itemQuantity: values });
      calulateTotal(values, cases);
    };
  


  return (
    <>
         <div className="checkout-left-btm-prdct-cntr flex justify-start bg-white px-5 py-5  rounded-md shadow-md">
            <div className="checkout-product-image">
              <img src={itemDetail.image} className="h-28 ml-3" />
            </div>
            <div className="product-info-cntr  ml-10 w-full">
              <div className="product-top-cntr flex justify-between font-bold text-xl">
                <div className="product-name-cntr">
                  <div className="product-name ">{itemDetail.name}</div>
                </div>
                <div className="product-delete-cntr">
                  <button onClick={e=>{deleteItem(index)}}>
                  <div className="product-price flex justify-center items-center hover:cursor-pointer h-8 w-8 hover:bg-slate-100 rounded-full">x</div>
                  </button>
                </div>
              </div>
              <div className="product-btm-cntr flex justify-between font-semibold">
                <div className="product-qty-cntr flex">
                  <div className="product-qty text-slate-500">
                    <span className="mr-1 ">{itemDetail.price}</span>
        
                    <span >x </span>
                
                    <span className="font-semibold">{itemDetail.itemQuantity}</span>
                  </div>
                  <div className="product-price text-light-pink">&nbsp;&nbsp;&nbsp;&nbsp;&#8377;{itemDetail.itemTotal}</div>
                </div>

                <div className="cart-quantity">
                  <div className="quantity-checkout space-x-2">
                  <button
                      className={`quantity-btn ring-1  ring-light-pink rounded-md p-1 hover:bg-light-pink hover:text-white transition-colors`}
                      onClick={handelMinusQuantity}
                      ref={buttonDisableRef}
                    >
                      <img src={minusIcon} alt="" className="quantity-icon" />
                    </button>
                   
                    {/* <span className=" font-semibold ml-2.5 focus:ring-1 focus:ring-light-pink">{itemDetail.itemQuantity}</span> */}
                    <input
                      type="number"
                      className="quantity-input w-7 py-1 rounded-lg font-semibold text-center focus:ring-1 focus:ring-light-pink  "
                      pattern="[0-9]{0,1}"
                      maxLength={1}
                      value={itemDetail?.itemQuantity}
                      onChange={(e) => {
                        handleChange(e, itemDetail?.quantity);
                      }}
                    />
                   <button
                      className="quantity-btn  ring-1 ring-light-pink rounded-md p-1 hover:bg-light-pink hover:text-white transition-colors"
                      onClick={handelAddQuantity}
                    >
                      <img src={plusIcon} alt="" className="quantity-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
    </>
  )
}

export default CartItems