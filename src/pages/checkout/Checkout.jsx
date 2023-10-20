import React, { useEffect } from "react";
import { Outlet, useMatch } from "react-router";
import "./checkout.css";
import { Link } from "react-router-dom";

const Checkout = () => {

  const [pages, setPages] = React.useState({
    cart: false,
    details: false,
    payment: false,
    review: false,
  });

  const cart = useMatch("/checkout/cart");
  const details = useMatch("/checkout/details");
  const payment = useMatch("/checkout/payment");
  const review = useMatch("/checkout/review");


useEffect(() => {
  if(cart || details || payment || review){
    setPages(prev=>({...prev,cart:true}))
  }else{
    setPages(prev=>({...prev,cart:false}))
  }
  if( details ||payment || review){
    setPages(prev=>({...prev,details:true}))
  }else{
    setPages(prev=>({...prev,details:false}))
  }
  if( payment || review){
    setPages(prev=>({...prev,payment:true}))
  }else{
    setPages(prev=>({...prev,payment:false}))
  }
  if( review){
    setPages(prev=>({...prev,review:true}))
  }else{
    setPages(prev=>({...prev,review:false}))
  }
}
, [cart,details,payment,review])
 

  const topcntr = (
    <div className="checkout-pos-cntr-top">
      <div className="header-cntr">
        <Link to="/checkout/cart">
          <div className={`page-name-cntr ${pages.cart?'bg-light-pink text-white transition-colors':''}`}>
            <button>1.Cart</button>
          </div>
        </Link>
        <div className={`page-cntr-divider ${pages.details?'bg-light-pink transition-colors':''}`}></div>
        <Link to="/checkout/details">
          <div className={`page-name-cntr ${pages.details?'bg-light-pink text-white transition-colors':''}`}>
            <button>2.Details</button>
          </div>
        </Link>
        <div className={`page-cntr-divider ${pages.payment?'bg-light-pink transition-colors':''}`}></div>
        <Link to="/checkout/payment">
          <div className={`page-name-cntr ${pages.payment?'bg-light-pink text-white transition-colors':''}`}>
            <button>3.Payment</button>
          </div>
        </Link>
        <div className={`page-cntr-divider ${pages.review?'bg-light-pink transition-colors':''}`}></div>
        <Link to="/checkout/review">
          <div className={`page-name-cntr ${pages.review?'bg-light-pink text-white transition-colors':''}`}>
            <button>4.Review</button>
          </div>
        </Link>
      </div>
    </div>
  );
  return (
    <>
      <div className="checkout-main-cntr">
        <div className="checkout-pos-cntr">

            <Outlet context={[topcntr]} />
   
        </div>
      </div>
    </>
  );
};

export default Checkout;
