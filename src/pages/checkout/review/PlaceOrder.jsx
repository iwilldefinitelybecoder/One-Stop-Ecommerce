import React, { useCallback, useContext, useEffect, useState } from "react";
import { useOrders } from "../../../context/OrderContext";
import { processPayment } from "../../../utils/processPayment";
import { useCart } from "../../../CustomHooks/CartHook";
import {
  AccountContext,
} from "../../../context/AccountProvider";

import { useMatch, useNavigate, useOutletContext, } from "react-router";
import { padlockIcon } from "../../../assets/icons/png/Rareicons/data";
import { CircularProgress } from "@mui/material";
import Lottie from "react-lottie-player";
import { checkMark2Gif, errorCheckMarkGif } from "../../../assets/icons/json/data";


const PlaceOrder = () => {
  const { orderDetails, setOrderDetails, createOrders, resetOrderDetails,loading,message,setMessage } =
    useOrders();

  const { account } = useContext(AccountContext);
  const [topcntr] = useOutletContext();
  const path = useMatch("/checkout/review");
  const [token, setToken] = useState("");
  const { cart ,getAllCartItemss} = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (orderDetails.paymentDetails !== "") {
      createOrders();
    }
  }, [orderDetails]);

 


  useEffect(() => {
    let  timer;

    if(message.type === "success"){
      timer = setTimeout(() => {
      setMessage({ type: "", message: "" });
      getAllCartItemss();
      navigate("/user/orders");
    }, 3000);
    }else if(message.type === "error")
    {setTimeout(() => {
     timer =  setMessage({ type: "", message: "" });
    }, 3000);

  }

    return () => clearTimeout(timer);
  }, [message]);

  const handlePayment = (e) => {

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

          setErrors(response.status === 'error' ? { status: 'FAILED' } : null);
          setOrderDetails(prevOrderItems => ({
            ...prevOrderItems,
            paymentProcessId: response.status === 'error' ? null : response.id,
            paymentDetails: { status: paymentStatus },
            customerId: account?.email
          }));
        };

      getPaymentToken();
    }
  };



  const placeOrderResponse = useCallback(() => {
    if(loading){
      return(
        <CircularProgress sx={{ color:"white"}} size={20} className="ml-3" />
        )
      }else if(message?.type === "success"){
        return(
          <Lottie play loop={false} animationData={checkMark2Gif} className=" h-6 ml-2 " />
          )
        }else if(message?.type === "error"){
          return(
            <Lottie play loop={false} animationData={errorCheckMarkGif} className=" h-7 ml-3" />
            )
          }
            else{
              return(
              <img src={padlockIcon} className=" h-5 ml-3" />
              )
            }

    }, [loading, message]);

  return (
    <>
   <button onClick={handlePayment} className=" bg-black rounded-full px-5 py-2 flex items-center text-white text-lg font-semibold tracking-widest shadow-lg hover:bg-slate-800 hover:text-slate-200  transition-all  ">
            ORDER

            {placeOrderResponse()}  
        </button>
        {
          message?.message !== "" &&
          <span className={`text-${message?.type === "success" ? "green" : "slate"}-500   text-sm ml-3 animate-pulse font-semibold`}>{message?.message}</span>
          
          
        }
        
    </>
  );
};

export default PlaceOrder;
