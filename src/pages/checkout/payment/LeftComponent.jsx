import React, { useEffect, useState } from "react";
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
import { isValidExpiryDate } from "../../../utils/validateDate";
import { json } from "react-router";
import CardDetails from "./CardDetails";
import { useOrders } from "../../../context/OrderContext";
import useCard from "../../../CustomHooks/CardsHooks";
import CardsListPanel from "./CardsListPanel";
import PaymentCardsList from "../../../components/body/checkoutComponents/PaymentCardsList";
import { useSearchParams } from "react-router-dom";
import { Collapse, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const LeftComponent = ({
  setPaymentMethod,
  paymentMethod,
  grantPermission,
}) => {
  const { orderDetails, setOrderDetails } = useOrders();
  const { cards } = useCard();
const [searchParams, setSearchParams] = useSearchParams();
const [save, setSave] = useState();
const [paymentType, setPaymentType] = useState(0);
  const handelPaymentMethod = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevOrderItems =>( { ...prevOrderItems, [name]: value }));
    setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
  };



  return (

  <>
  
        <RadioGroup
          aria-label="paymentMethod"
          name="paymentMethod"
          value={orderDetails.paymentMethod}
          onChange={handelPaymentMethod}
        >
        
        { cards &&
        cards.length > 0 ? (
       
          <CardsListPanel setPaymentMethod={handelPaymentMethod} />
         
        ) : (
          
          <CardDetails
          setPaymentMethod={setPaymentType}
          paymentMethod={paymentType}
          grantPermission={setSave}
        />
      
        )}
        <div className="payment-body-header1 rounded-md bg-white px-6 py-6 shadow-lg border-b-2 border-b-slate-300">
          <div className=" font-bold">

            <FormControlLabel control={<Radio />} value="COD" />
            <label htmlFor="option2"> Pay on Delivery</label>
          </div>
        </div>

        <div className="payment-body-header"></div>
        <div className="payment-body-header"></div>
        </RadioGroup>
   
    </>
  );
};

export default LeftComponent;
