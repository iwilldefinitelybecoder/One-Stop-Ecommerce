import React, { useContext, useEffect, useState } from "react";
import { useOrders } from "../../../context/OrderContext";
import { processPayment } from "../../../utils/processPayment";
import { useCart } from "../../../CustomHooks/CartHook";
import {
  AccountContext,
} from "../../../context/AccountProvider";

import { useMatch, useOutletContext, } from "react-router";
import { padlockIcon } from "../../../assets/icons/png/Rareicons/data";


const PlaceOrder = () => {
  const { orderDetails, setOrderDetails, createOrders, resetOrderDetails } =
    useOrders();
  const { account } = useContext(AccountContext);
  const [topcntr] = useOutletContext();
  const path = useMatch("/checkout/review");
  const [token, setToken] = useState("");
  const { cart } = useCart();
  const [errors, setErrors] = useState({});
  console.log(path);

  useEffect(() => {
    if (orderDetails.paymentDetails !== "") {
      createOrders();
    }
  }, [orderDetails]);

  console.log(path);

  useEffect(() => {
    if (path.pathname !== "/checkout/review") {
      resetOrderDetails();
    }
  }, [path.pathname]);

  const handlePayment = (e) => {
    console.log(orderDetails);
    if (
      orderDetails?.paymentMethod === "COD"
    ) {
      setOrderDetails((prevOrderItems) => ({
        ...prevOrderItems,
        paymentDetails: { status: "PENDING" },
        products: cart,
        customerId: account?.email,
      }));
      } else if (['DEBITCARD', 'UPI'].includes(orderDetails?.paymentMethod)) {
        const getPaymentToken = async () => {
          const response = await processPayment(orderDetails?.cardId);
          const paymentStatus = response.status === 'error' ? 'FAILED' : response;
          console.log(response)

          setErrors(response.status === 'error' ? { status: 'FAILED' } : null);
          setOrderDetails(prevOrderItems => ({
            ...prevOrderItems,
            paymentProcessId: response.status === 'error' ? null : response.id,
            paymentDetails: { status: paymentStatus },
            products: cart,
            customerId: account?.email
          }));
        };

      getPaymentToken();
    }
  };

  return (
    <>
   <button onClick={handlePayment} className=" bg-black rounded-full px-5 py-2 text-white text-lg font-semibold tracking-widest shadow-lg hover:bg-slate-800 hover:text-slate-200 flex items-start transition-all  ">
            ORDER
            <img src={padlockIcon} className=" h-5 ml-3" />
        </button>
    </>
  );
};

export default PlaceOrder;
