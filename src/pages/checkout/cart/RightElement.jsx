import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../CustomHooks/CartHook";
import { Collapse } from "@mui/material";


const RightElement = () => {

  const {estimatedCosts} =  useCart();
   const cartEstimate = estimatedCosts();
   const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <Collapse in={!open}>
        <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
          <div className="sub-total-section flex justify-between my-2 mx-2">
            <span className="text-slate-500 ">Subtotal:</span>
            <span className="text-xl font-bold">{cartEstimate.cartTotal}</span>
          </div>
          <div className="shipping-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Shipping:</span>
            <span className="text-xl font-bold">{`${cartEstimate.shipping *100 }%`|| '-'}</span>
          </div>
          <div className="tax-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Tax:</span>
            <span className="text-xl font-bold">{cartEstimate.tax || '-'}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">Discount:</span>
            <span className="text-xl font-bold">{cartEstimate.discount || '-'}</span>
          </div>
          <div className="discount-section flex justify-between  my-2 mx-2">
            <span className="text-slate-500 ">GrandTotal:</span>
            <span className="text-xl font-bold">{cartEstimate.grandTotal || '-'}</span>
          </div>
        </div>
        </Collapse>

        <Collapse in={open}>
        
        <div>
          
        </div>
        </Collapse>

        <div>
          <input type="text" placeholder="Voucher"/>
        </div>
        <button className="Btn2 w-full" onClick={(e)=>{setOpen(true)}}>
          <div>
            <span>Apply Voucher</span>
          </div>
        </button>
        <Link to="/checkout/details">
        <button className="Btn3 w-full" >
          <div>
            <span>Checkout</span>
          </div>
        </button>
        </Link>
      </div>
    </>
  );
};

export default RightElement;
