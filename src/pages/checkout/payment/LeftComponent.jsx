import React, { useEffect } from "react";
import MessagesBox from "../../../components/body/Messages/MessagesBox";
import {
  americanExpressIcon,
  cardIcon,
  creditCardIcon,
  cvvIcon,
  mastercardIcon,
  rupayIcon,
  visaIcon,
} from "../../../assets/icons/png/cardIcons/data";
import { isValidExpiryDate, } from "../../../utils/validateDate";
import { json } from "react-router";
import CardDetails from "./CardDetails";

const LeftComponent = ({ setPaymentMethod, paymentMethod,grantPermission }) => {
  
  const handelPaymentMethod = (e, index) => {
    setPaymentMethod(index);
  };

  return (
      
      <>
      <form className="payment-body">
        
        <CardDetails grantPermission={grantPermission} paymentMethod={paymentMethod} setPaymentMethod={handelPaymentMethod}/>
          <div className="payment-body-header1 rounded-md bg-white px-6 py-6 shadow-lg border-b-2 border-b-slate-300">
            <div className=" font-bold">
              <input
                type="radio"
                name="payment"
                id="option2"
                onClick={(e) => {
                  handelPaymentMethod(e, 1);
                }}
              />
              <label htmlFor="option2"> Pay on Delivery</label>
            </div>
          </div>
        
        <div className="payment-body-header"></div>
        <div className="payment-body-header"></div>
      </form>
    </>
  );
};

export default LeftComponent;
