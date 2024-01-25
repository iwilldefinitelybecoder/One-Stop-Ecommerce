import React, { useEffect, useRef, useState } from "react";

import "./cart.css";
import {
  TshirtIcon,
  minusIcon,
  plusIcon,
} from "../../../assets/icons/img/products/data";
import { useDispatch } from "react-redux";
import { useCart } from "../../../CustomHooks/CartHook";
import { Collapse } from "@mui/material";
import useWishlist from "../../../CustomHooks/WishListHook";
import useCoupons from "../../../CustomHooks/CouponHook";
import useMessageHandler from "../../../components/body/Messages/NewMessagingComponent";

const CartItems = ({itemDetails}) => {

  const {cartInfo,removeItem,updateItem,loading} = useCart();
  const {fetchAllCoupons} = useCoupons();
  const {handleMessage,getMessageComponents} = useMessageHandler();
  const { moveAllItemsToWishlist,moveItemToWishlist } = useWishlist();
    const [itemDetail, setItemDetail] = useState(itemDetails);
    const [open, setOpen] = useState(true);
  
    const buttonDisableRef = useRef(null);
  
    const handelAddQuantity = () => {
      if(itemDetail?.stock <= itemDetail.productQuantity){
          handleMessage(`can't add More of ${itemDetail?.productName}`,'success')
          return;
      }
      const total = itemDetail.productQuantity + 1;
   
      const cases = "ADD";
   
      calulateTotal(total, cases);
    };


    useEffect(() => {
      setItemDetail(itemDetails);
    }, [itemDetails]);
   
    const handelMinusQuantity = () => {
      if (itemDetail.productQuantity > 1) {
        // buttonDisableRef.current.disabled = true;
        const total = itemDetail.productQuantity - 1;
       
        const cases = "MINUS";
        calulateTotal(total, cases);
      }
    };
  
    const calulateTotal = async(total, cases) => {
      const itemTotal = itemDetail.salePrice >0 ?  itemDetail.salePrice * total: itemDetail.regularPrice * total;
      const formattedTotal = parseFloat(itemTotal.toFixed(2));
      const cartItem = {
        ...itemDetail,
        productQuantity: total,
        productTotal: formattedTotal,
      };
      const cartItemInfo  ={
         cartId: cartInfo?.cartId,
         productId: cartItem.productId,
         quantity: total,
         cartItemId: cartItem.cartItemsId
      }
      setItemDetail(cartItem);
      await updateItem(cartItemInfo);
   
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
  
      setItemDetail({ ...itemDetail, productQuantity: values });
      calulateTotal(values, cases);
    };
  
    const handelMoveToWishlist = () => {
      const productId = itemDetail.productId;
      const cartItemId = itemDetail.cartItemsId;

      moveItemToWishlist(cartItemId,productId);
    };


  return (
    <>
    <Collapse in={open} timeout={600}>
      {getMessageComponents()}
    <div className={`"checkout-left-btm-prdct-cntr flex justify-start ${loading?"bg-slate-100":"bg-white"} px-5 py-5  rounded-md shadow-md `}>
            <div className="checkout-product-image">
              <img src={itemDetail?.productImageURL[0]} className="h-28 ml-3" />
            </div>
            <div className="product-info-cntr  ml-10 w-full">
              <div className="product-top-cntr flex justify-between font-bold text-xl">
                <div className="product-name-cntr">
                  <div className="product-name ">{itemDetail.productName}</div>
                </div>
                <div className="product-delete-cntr">
                  <button onClick={e=>{removeItem(itemDetail.cartItemsId);setOpen(false)}}>
                  <div className="product-price flex justify-center items-center hover:cursor-pointer h-8 w-8 hover:bg-slate-100 rounded-full">x</div>
                  </button>
                </div>
              </div>
              <div className="product-btm-cntr flex justify-between font-semibold">
                <div className="product-qty-cntr flex">
                  <div className="product-qty text-slate-500">
                    <span className="mr-1 ">{itemDetail.salePrice || itemDetails.regularPrice}</span>
        
                    <span >x </span>
                
                    <span className="font-semibold">{itemDetail.productQuantity}</span>
                  </div>
                  <div className="product-price text-light-pink">&nbsp;&nbsp;&nbsp;&nbsp;&#8377;{itemDetail.productTotal}</div>
                </div>

                <div className="cart-quantity space-x-2">
                  <button className="Btn2 mr-5" onClick={handelMoveToWishlist}>
                    Move To Wishlist
                  </button>
                
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
                      value={itemDetail?.productQuantity}
                      onChange={(e) => {
                        handleChange(e, itemDetail?.productQuantity);
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
          </Collapse>
    </>
  )
}

export default CartItems