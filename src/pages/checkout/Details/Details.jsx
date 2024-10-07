import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext } from "react-router";
import RightElement from "../cart/RightElement";
import Container1 from "./Container1";
import Conteiner2 from "./Conteiner2";
import { Link, useSearchParams } from "react-router-dom";
import { rightArrowIcon2 } from "../../../assets/icons/png/user-page-icons/data";
import useAddresses from "../../../CustomHooks/AddressHooks";
import SelectAddress from "./SelectAddress.jsx";
import { useOrders } from "../../../context/OrderContext.jsx";


const Details = () => {
  const [topcntr] = useOutletContext();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const { addresses } = useAddresses();
  const [moveToNextPage, setMoveToNextPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [addNewCard, setAddnewCard] = useState(false);
  const forwardRef = useRef();
  const {orderDetails} = useOrders();
  const [save, setSave] = useState();

  const handelPushBtn = () => {
    ref1?.current?.click();

  }

  const shippingAddress1 = searchParams.get("shippingAddressId") || orderDetails?.shippingAddressId;
  const billingAddress = searchParams.get("billingAddressId") || orderDetails?.billingAddressId;
  useEffect(() => {
    if (shippingAddress1 && billingAddress) {
      setMoveToNextPage(true);
      searchParams.set("shippingAddressId", shippingAddress1);
      searchParams.set("billingAddressId", billingAddress);
      setSearchParams(searchParams);
    }

  }
    , [shippingAddress1, billingAddress]);

  return (
    <>

      <div className="checkout-pos-left-cntr">
        <div className="checkout-left-top-cntr">{topcntr}</div>
        <div className="checkout-left-btm-cntr ">
          {addresses.length === 0 ?

            <div className="btm-cntr1">
              <Container1 forwardRef={forwardRef} grantPermission={setSave} setAddNewCard={setAddnewCard} addnewCard={addNewCard} />
            </div>
            :
            <div className=" btm-cntr2 mt-5">
              <SelectAddress />
            </div>

          }
        </div>
        <div className=" flex px-7 w-full justify-between">
          <Link to="/checkout/cart">
            <div className="Btn2 flex space-x-2 items-center ">
              <img src={rightArrowIcon2} className="h-5 rotate-180" />
              <button>Back to Cart</button>
            </div>
          </Link>
          <Link to={moveToNextPage ? '/checkout/payment' : ''}>
            <div className="Btn3 flex space-x-2 items-center" onClick={handelPushBtn}>
              <button>Proceed to Payment</button>
              <img src={rightArrowIcon2} className="right-arrow h-5" />
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
