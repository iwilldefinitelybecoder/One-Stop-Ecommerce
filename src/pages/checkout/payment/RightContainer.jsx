import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../../CustomHooks/CartHook";
import { useOrders } from "../../../context/OrderContext";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { CheckBox, Label } from "@mui/icons-material";
import { pink } from "@mui/material/colors";


const RightContainer = () => {

    const {estimatedCosts} = useCart();
    const {orderDetails,orderSummary,setOrderDetails, } = useOrders();
    const {cartInfo,discountedSummary} = useCart();
    const [estimatedCost,setEstimatedCosts] = useState();
    useEffect(()=>{

      if(orderDetails.buyNow){
       setEstimatedCosts(orderSummary)
      }else{
  
        setEstimatedCosts(estimatedCosts());
      }
      
    },[])
  

    const handelUseWallet = (e)=>{
      const {checked} = e.target
      setOrderDetails(prev=>({...prev,useWallet:checked}));
    }
  return (
    <>
      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
          {
            orderDetails?.couponId !==""?(
              <>
              <div className="sub-total-section flex justify-between my-2 mx-2">
              <span className="text-slate-500 ">Subtotal:</span>
              <span className="text-xl font-bold">&#8377;
                {estimatedCost?.cartTotal}
              </span>
            </div>
            <div className="shipping-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Shipping:</span>
              <span className="text-xl font-bold">
                {`${estimatedCost?.shipping }` || "-"}
              </span>
            </div>
            <div className="tax-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Tax:</span>
              <span className="text-xl font-bold">
                {estimatedCost?.tax || "-"}
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Discount:</span>
              <span className="text-xl font-bold">&#8377;
                {discountedSummary?.discountAmount.toFixed(2) || "-"}
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Before Discount:</span>
              <span className="text-xl font-bold text-green-600">
                <span className="text-blue-500 font-normal line-through">&#8377;{discountedSummary?.totalBeforeDiscount.toFixed(2)}</span>
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">GrandTotal:</span>
              <span className="text-xl font-bold text-green-600">&#8377;
                {discountedSummary?.grandTotal.toFixed(2) || "-"}
              </span>
            </div>
            </>
            )
            :
            (
              <>
              <div className="sub-total-section flex justify-between my-2 mx-2">
            <span className="text-slate-500 ">Subtotal:</span>
            <span className="text-xl font-bold">{estimatedCost?.cartTotal || '-'}</span>
          </div>
          <div className="shipping-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Shipping:</span>
            <span className="text-xl font-bold">{estimatedCost?.shipping || '-'}</span>
          </div>
          <div className="tax-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Tax:</span>
            <span className="text-xl font-bold">{estimatedCost?.tax  || '-'}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Discount:</span>
            <span className="text-xl font-bold">{estimatedCost?.discount.toFixed(2) || '-'}</span>
          </div>
        

        <div className="total-section flex justify-end">
          <span className="text-3xl font-semibold">{estimatedCost?.grandTotal?.toFixed(2)}</span>
        </div>
        </>
            )
  }
  </div>
{/*        wallet code
      <div>
      <div className="discount-section flex justify-between items-center  my-2 mx-2">
        <div>
            <span className="text-slate-500">Wallet Balance:</span>
            <span className=" font-semibold text-light-pink">&#8377;{cartInfo.wallet}</span>
        </div>
        <FormControlLabel 
        labelPlacement="start"
        control={
        <Checkbox
        checked={orderDetails?.useWallet}  // Controlled by state
        onChange={handelUseWallet}  // Controlled by handler function
        color="primary"
        inputProps={{ 'aria-label': 'controlled-checkbox' }}
      />
        }
        label="Use Wallet"
        />
          
          </div>
      </div> */}
       
      </div>
    </>
  );
};


const reduxCart = (state) => (
    {
      itemDetail:state.cartItems,
      estimatedCosts:state.estimate
    }
   )

export default connect(reduxCart)(RightContainer);
