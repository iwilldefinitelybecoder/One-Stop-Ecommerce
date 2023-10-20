import React from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router";
import RightElement from "../cart/rightElement";
import Container1 from "./Container1";
import Conteiner2 from "./Conteiner2";
import { Link } from "react-router-dom";
import { rightArrowIcon2 } from "../../../assets/icons/png/user-page-icons/data";


const Details = () => {
  const [topcntr] = useOutletContext();
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const [moveToNextPage, setMoveToNextPage] = React.useState(false);

  const handelPushBtn = () => { 
    ref1.current.click();
  }

  return (
    <>
   
      <div className="checkout-pos-left-cntr">
        <div className="checkout-left-top-cntr">{topcntr}</div>
        <div className="checkout-left-btm-cntr ">
          <div className="btm-cntr1">
            <Container1 forwardRef={ref1} grantPermision={setMoveToNextPage} />
          </div>
          <div className=" btm-cntr2 mt-5">
            <Conteiner2 forwardRef={ref2} />
          </div>
        </div>
        <div className=" flex px-7 w-full justify-between">
          <Link to="/checkout/cart">
          <div className="Btn2 flex space-x-2 items-center ">
            <img src={rightArrowIcon2} className="h-5 rotate-180"/>
            <button>Back to Cart</button>
          </div>
          </Link>
        <Link to={moveToNextPage?'/checkout/payment':''}>
          <div className="Btn3 flex space-x-2 items-center" onClick={handelPushBtn}>
            <button>Proceed to Payment</button>
            <img src={rightArrowIcon2} className="right-arrow h-5"/>
          </div>
        </Link>
        </div>
      </div>
      <div className="checkout-pos-right-cntr mt-16 ml-5"></div>
    </>
  );
};

const reduxCart = (state) => ({
  itemDetail: state.cartItems,
});

export default connect(reduxCart)(Details);
