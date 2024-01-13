import React from "react";
import PlaceOrder from "./PlaceOrder";
import ConfirmationDialog from "../../../components/body/UtilsComponent/CondirmationDialog";
import { useOutletContext } from "react-router";
import { padlockIcon } from "../../../assets/icons/png/Rareicons/data";
import OrderSummary from "./OrderSummary";

const Review = () => {
  const message =
    "Are you sure you want to leave? Your changes may not be saved.";
  const [topcntr] = useOutletContext();
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

        <div className="flex items-center space-x-3 mt-3">
          <span className=" text-slate-600 text-lg font-semibold  tracking-widest">Grand Total</span>
          <span className=" text-black text-2xl font-bold  tracking-widest float-right">₹ 1000</span>
         
        </div>
        <span className="  text-white text-sm mb-4 font-poppins   ">Shipping and Tax Are Included</span>
        <PlaceOrder />
        </div>
      </div>
    </>
  );
};

export default Review;
