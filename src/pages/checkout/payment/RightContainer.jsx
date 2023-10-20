import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const RightContainer = ({estimatedCosts}) => {
  return (
    <>
      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
          <div className="sub-total-section flex justify-between my-2 mx-2">
            <span className="text-slate-500 ">Subtotal:</span>
            <span className="text-xl font-bold">{estimatedCosts.subTotal || '-'}</span>
          </div>
          <div className="shipping-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Shipping:</span>
            <span className="text-xl font-bold">{estimatedCosts.shipping || '-'}</span>
          </div>
          <div className="tax-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Tax:</span>
            <span className="text-xl font-bold">{estimatedCosts.tax || '-'}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Discount:</span>
            <span className="text-xl font-bold">{estimatedCosts.discount || '-'}</span>
          </div>
        </div>

        <div className="total-section flex justify-end">
          <span className="text-3xl font-semibold">{estimatedCosts.addedAll}</span>
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
