import React from "react";
import { connect } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import RightElement from "../cart/rightElement";
import { Link, useSearchParams } from "react-router-dom";
import { rightArrowIcon2 } from "../../../assets/icons/png/user-page-icons/data";
import RightContainer from "./RightContainer";
import LeftComponent from "./LeftComponent";
import "./payment.css";

const Payment = () => {
  const [topcntr] = useOutletContext();
  const navigate  = useNavigate();
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [moveToNextPage, setMoveToNextPage] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState();


  const paymentMethod1 = searchParams.get("paymentMethod");
  const cardId = searchParams.get("cardId");
  React.useEffect(() => {
    if (paymentMethod1) {
      setPaymentMethod(paymentMethod1);
    }
  }, [paymentMethod1]);

  const goBack = () => {
    navigate(-1);
  }
  
  return (
    <>
      <div className="checkout-pos-left-cntr">
        <div className="checkout-left-top-cntr">{topcntr}</div>
        <div className="checkout-left-btm-cntr ">
          <div className="btm-cntr1">
            <LeftComponent setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} grantPermission= {setMoveToNextPage}/>
          </div>
        </div>
        <div className=" flex px-7 w-full justify-between">
         
          <div className="Btn2 flex space-x-2 items-center ">
            <img src={rightArrowIcon2} className="h-5 rotate-180"/>
            <button onClick={goBack}>Back to Addresses</button>
          </div>
          
        {
          paymentMethod !== undefined ? 
          <Link to={moveToNextPage?'/checkout/review':''}>
          <div className=" flex space-x-2 items-center" >
            {
              paymentMethod === "DEBITCARD" ?
               cardId === null ?<button disabled className="Btndisabled">Select A Card</button>:
               <Link to="/checkout/review">
               <button className="Btn3">Review Order</button>
                </Link>
               :
               <Link to="/checkout/review">
            <button className="Btn3">{paymentMethod === "COD"?'Review Order':'Proceed And pay '}</button>
            </Link>
            }
            <img src={rightArrowIcon2} className="right-arrow h-5"/>
          </div>
        </Link>
        :
        <Link to={moveToNextPage?'/checkout/review':''}>
          <div className="Btndisabled flex space-x-2 items-center" >
            <button disabled>Select Payment Method</button>
       
          </div>
        </Link>
        }
        </div>
      </div>
      <div className="checkout-pos-right-cntr mt-16 ml-5">
        <RightContainer  />
      </div>
    </>
  );
};

const reduxCart = (state) => ({
  itemDetail: state.cartItems,
});

export default connect(reduxCart)(Payment);
