import React, { useEffect, useState } from "react";
import PlaceOrder from "./PlaceOrder";
import ConfirmationDialog from "../../../components/body/UtilsComponent/CondirmationDialog";
import { useOutletContext } from "react-router";
import { padlockIcon } from "../../../assets/icons/png/Rareicons/data";
import OrderSummary from "./OrderSummary";
import { useOrders } from "../../../context/OrderContext";
import { useCart } from "../../../CustomHooks/CartHook";

const Review = () => {
  const message =
    "Are you sure you want to leave? Your changes may not be saved.";
  const [topcntr] = useOutletContext();
  const {estimatedCosts,discountedSummary,cartInfo} = useCart();
  const {orderDetails} = useOrders();
  const [estimatedCost,setEstimatedCost] = useState();



  useEffect(()=>{
      if(orderDetails.couponId !== "")
      {
        if(orderDetails.useWallet){
             
            handelUseWallet(discountedSummary.grandTotal);
            return
        }
        setEstimatedCost(discountedSummary);
      }else{
        if(orderDetails.useWallet){
          handelUseWallet(estimatedCosts().grandTotal)
          return;
        }
        setEstimatedCost(estimatedCosts())
      }
  },[])

  const handelUseWallet = (grandTotal) => {
    const remainingTotal = makeNonNegative(cartInfo?.wallet - grandTotal);
    const newGrandTotal = grandTotal > cartInfo?.wallet ? remainingTotal : 0;

    const newObj = { ...discountedSummary, grandTotal: newGrandTotal };
    setEstimatedCost(newObj);
};

function makeNonNegative(x) {
    return Math.max(0, x);
}
  
  
  return (
    <>
    <div className="checkout-pos-left-cntr">
        <div className="checkout-left-top-cntr">{topcntr}</div>
        
        <div className="checkout-left-btm-cntr review-pg-left-cntr shadow-xl ">
          <div className="btm-cntr1">
          <OrderSummary />
          </div>
        </div>
       </div>
      <div className="checkout-pos-right-cntr review-pg-right-cntr shadow-xl  ">
        <div className="bg-black w-60 h-1.5 rounded-full mb-10"></div>
        <div className="flex-column flex items-center justify-center">

        <div className="flex-column space-y-3 mb-3 items-center space-x-3 mt-3">
          <span className=" text-slate-600 text-lg font-semibold  tracking-widest text-center">Nett Payable Amount</span>
          <span className=" text-black text-2xl font-bold  tracking-widest float-right">₹{estimatedCost?.grandTotal?.toFixed(2)}</span>
         
        </div>
        <span className="  text-white text-sm mb-4 font-poppins   ">Shipping and Tax Are Included</span>
        <PlaceOrder />
          </div>
      </div>
    </>
  );
};

export default Review;
