import React, { useEffect } from "react";
import { useOrders } from "../../../context/OrderContext";
import PaymentCardsList from "../../../components/body/checkoutComponents/PaymentCardsList";
import useCard from "../../../CustomHooks/CardsHooks";
import { Collapse, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  americanExpressIcon,
  cardIcon,
  creditCardIcon,
  cvvIcon,
  mastercardIcon,
  rupayIcon,
  visaIcon,
} from "../../../assets/icons/png/cardIcons/data";

const CardsListPanel = ({ setPaymentMethod }) => {
  const { setOrderDetails, orderDetails } = useOrders();
  const { cards, loading } = useCard();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(orderDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const paymentMethod = searchParams.get("paymentMethod");
  const cardId = searchParams.get("cardId");


  useEffect(() => {
    if (cardId) {
      setOrderDetails((prev) => ({ ...prev, cardId, paymentMethod }));
    }
    }, [cardId, paymentMethod]);


  return (
    <div className={` ${paymentMethod === "DEBITCARD?"?'h-[105px]':'h-auto'} max-h-[370px]  bg-white rounded-md pt-3 px-5 overflow-hidden space-y-6 border-b-4`}>
      <div className="option-cntr space-x-3 font-bold flex justify-between items-center ">
        <div className=" ">
        <FormControlLabel control={<Radio />} id="option" value="DEBITCARD" />
          <label htmlFor="option">Credit or Debit Card</label>
        </div>

        <div className="option-img-icons flex items-center space-x-4">
          <img src={cardIcon} className="h-9 " />
          <img src={visaIcon} className="h-9" />
          <img src={mastercardIcon} className="h-6 object-fill" />
          <img src={americanExpressIcon} className="h-9" />
          <img src={rupayIcon} className="h-9" />
        </div>
      </div>
      <Collapse in={paymentMethod === "DEBITCARD"}>
      <div
        className={` user-card-list px-3  shadow-lg  overflow-scroll  `}
      >
        <RadioGroup
          aria-label="cards"
          name="cardId"
          value={orderDetails.cardId}
          onChange={handleChange}
        >
          {cards?.map((card, index) => (
            <div
              className="  flex justify-center items-center py-2 border-b-2 px-3  rounded-md  bg-main-bg"
              key={index}
            >
              <PaymentCardsList card={card} loading={loading} />
            </div>
          ))}
        </RadioGroup>
      </div>
    </Collapse>
    </div>
  );
};

export default CardsListPanel;
