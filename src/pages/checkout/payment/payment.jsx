import React from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router";
import RightElement from "../cart/rightElement";
import { Link } from "react-router-dom";
import { rightArrowIcon2 } from "../../../assets/icons/png/user-page-icons/data";
import RightContainer from "./RightContainer";
import LeftComponent from "./LeftComponent";
import "./payment.css";

const Payment = () => {
  const [topcntr] = useOutletContext();
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const [moveToNextPage, setMoveToNextPage] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState();


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
          <Link to="/checkout/details">
          <div className="Btn2 flex space-x-2 items-center ">
            <img src={rightArrowIcon2} className="h-5 rotate-180"/>
            <button>Back to Addresses</button>
          </div>
          </Link>
        {
          paymentMethod !== undefined ? 
          <Link to={moveToNextPage?'/checkout/review':''}>
          <div className="Btn3 flex space-x-2 items-center" >
            <button>{paymentMethod?'Finish Ordering':'Proceed And Pay'}</button>
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
        <RightContainer />
      </div>
    </>
  );
};

const reduxCart = (state) => ({
  itemDetail: state.cartItems,
});

export default connect(reduxCart)(Payment);
