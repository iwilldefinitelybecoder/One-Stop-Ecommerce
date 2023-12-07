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
import { isValidExpiryDate } from "../../../utils/validateDate";
import { json } from "react-router";
import CardDetails from "./CardDetails";
import { useOrders } from "../../../context/OrderContext";
import useCard from "../../../CustomHooks/CardsHooks";
import CardsListPanel from "./CardsListPanel";
import PaymentCardsList from "../../../components/body/checkoutComponents/PaymentCardsList";
import { useSearchParams } from "react-router-dom";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const LeftComponent = ({
  setPaymentMethod,
  paymentMethod,
  grantPermission,
}) => {
  const { ordersDetails, setOrderDetails } = useOrders();
  const { cards } = useCard();
const [searchParams, setSearchParams] = useSearchParams();
  const handelPaymentMethod = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...ordersDetails, [name]: value });
    setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
  };


  return (
    <>
      <form className="payment-body">
        <RadioGroup
          aria-label="paymentMethod"
          name="paymentMethod"
          value={ordersDetails?.paymentMethod}
          onChange={handelPaymentMethod}
        >

        {cards.length > 0 ? (
          <CardsListPanel setPaymentMethod={handelPaymentMethod} />
        ) : (
          <CardDetails
            grantPermission={grantPermission}
            paymentMethod={paymentMethod}
            setPaymentMethod={handelPaymentMethod}
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
      </form>
    </>
  );
};

export default LeftComponent;
