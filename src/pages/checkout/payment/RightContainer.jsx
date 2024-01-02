import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../../CustomHooks/CartHook";


const RightContainer = () => {

    const {estimatedCosts} = useCart();
    
    const estimatedCost = estimatedCosts();
    console.log(estimatedCost)
  return (
    <>
      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
          <div className="sub-total-section flex justify-between my-2 mx-2">
            <span className="text-slate-500 ">Subtotal:</span>
            <span className="text-xl font-bold">{estimatedCost.cartTotal || '-'}</span>
          </div>
          <div className="shipping-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Shipping:</span>
            <span className="text-xl font-bold">{estimatedCost.shipping *100 || '-'}</span>
          </div>
          <div className="tax-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Tax:</span>
            <span className="text-xl font-bold">{estimatedCost.tax * 100 || '-'}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Discount:</span>
            <span className="text-xl font-bold">{estimatedCost.discount || '-'}</span>
          </div>
        </div>

        <div className="total-section flex justify-end">
          <span className="text-3xl font-semibold">{estimatedCost.grandTotal?.toFixed(2)}</span>
        </div>

       
       
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
