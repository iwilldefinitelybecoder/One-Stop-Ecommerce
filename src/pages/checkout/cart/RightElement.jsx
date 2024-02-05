import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../CustomHooks/CartHook";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { CSSTransition } from "react-transition-group";

import { applyCouponCode } from "../../../service/CustomerServices/OrderServices";
import { LoadingButton } from "@mui/lab";
import {
  ArrowDropDownCircle,
  ArrowRightAltSharp,
  SwipeLeftAltSharp,
  SwipeRightAltRounded,
} from "@mui/icons-material";
import useMessageHandler from "../../../components/body/Messages/NewMessagingComponent";
import useCoupons from "../../../CustomHooks/CouponHook";
import {
  formatOrderedDate,
  truncateString,
} from "../../../utils/DisplayFormatters";
import ConfettiAnimation from "../../../components/body/UtilsComponent/ConfettiAnimation";
import { useOrders } from "../../../context/OrderContext";

const RightElement = () => {
  const { estimatedCosts,discountedSummary,cartInfo } = useCart();
  let cartEstimate = estimatedCosts();
  const {orderDetails,setOrderDetails} = useOrders();
  const [open, setOpen] = React.useState(false);

useEffect(()=>{
    cartEstimate = estimatedCosts();
})
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelRemoveCoupon = (couponId) => {
    setOrderDetails({ ...orderDetails, couponId: "" });
  }


  return (
    <>
      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <Collapse in={!open}>
          {
            orderDetails.couponId !== "" ? (

                <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
                  <div className="sub-total-section flex justify-between my-2 mx-2">
                    <span className="text-slate-500 ">Subtotal:</span>
                    <span className="text-xl font-bold">&#8377;
                      {cartEstimate?.cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="shipping-section flex justify-between  my-2 mx-2">
                    <span className="text-slate-500 ">Shipping:</span>
                    <span className="text-xl font-bold">
                      {`${cartEstimate?.shipping.toFixed(2) }` || "-"}
                    </span>
                  </div>
                  <div className="tax-section flex justify-between  my-2 mx-2">
                    <span className="text-slate-500 ">Tax:</span>
                    <span className="text-xl font-bold">
                      {cartEstimate?.tax.toFixed(2) || "-"}
                    </span>
                  </div>
                  <div className="discount-section flex justify-between  my-2 mx-2">
                    <span className="text-slate-500 ">Discount:</span>
                    <span className="text-xl font-bold">&#8377;
                      {discountedSummary?.discountAmount.toFixed(2) || "-"}
                    </span>
                  </div>
                  <div className="discount-section flex justify-between  my-2 mx-2">
                    <span className="text-slate-500 ">Before Discount:</span>
                    <span className="text-xl font-bold text-green-600">
                      <span className="text-blue-500 font-normal line-through">&#8377;{discountedSummary?.totalBeforeDiscount.toFixed(2)}</span>
                    </span>
                  </div>
                  <div className="discount-section flex justify-between  my-2 mx-2">
                    <span className="text-slate-500 ">GrandTotal:</span>
                    <span className="text-xl font-bold text-green-600">&#8377;
                      {discountedSummary?.grandTotal.toFixed(2) || "-"}
                    </span>
                  </div>
                
                </div>

            ) : (
          <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
            <div className="sub-total-section flex justify-between my-2 mx-2">
              <span className="text-slate-500 ">Subtotal:</span>
              <span className="text-xl font-bold">&#8377;
                {cartEstimate?.cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="shipping-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Shipping:</span>
              <span className="text-xl font-bold">
                {`${cartEstimate?.shipping.toFixed(2) }` || "-"}
              </span>
            </div>
            <div className="tax-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Tax:</span>
              <span className="text-xl font-bold">
                {cartEstimate?.tax.toFixed(2) || "-"}
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Discount:</span>
              <span className="text-xl font-bold">
                {cartEstimate?.discount.toFixed(2) || "-"}
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">GrandTotal:</span>
              <span className="text-xl font-bold">&#8377;
                {cartEstimate?.grandTotal?.toFixed(2) || "-"}
              </span>
            </div>
           

          </div>
            )
          }
        </Collapse>

        <Collapse in={open}>
          <VoucherContainer handelCntrClose={handleClose} />
        </Collapse>
{
  orderDetails.couponId === "" ?
        <div>
          <input type="text" placeholder="Voucher" />
        </div>
        :
        <div className="discount-section flex justify-between  my-2 mx-2">
        <span className="text-slate-500 "></span>
        <span className="text-xl font-bold">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handelRemoveCoupon(orderDetails.couponId)}

          >Remove Coupon</Button>
        </span>
      </div>
}
        {!open ? (
          <button
            className="Btn2 w-full"
            onClick={(e) => {
              setOpen(true);
            }}
          >
            <div>
              <span>View Coupons</span>
            </div>
          </button>
        ) : (
          <button
            className="Btn2 w-full"
            onClick={(e) => {
              handleClose(e);
            }}
          >
            <div>
              <span>Apply Coupons </span>
            </div>
          </button>
        )}
        <Link to="/checkout/details">
          <button className="Btn3 w-full">
            <div>
              <span>Checkout</span>
            </div>
          </button>
        </Link>
      </div>
    </>
  );
};

const VoucherContainer = ({ handelCntrClose }) => {
  const [display, setDisplay] = useState("main");
  const [loadings, setLoadings] = useState(false);
  const { orderDetails, setOrderDetails } = useOrders();
  const { calculateDiscountedSummary,cartInfo} = useCart();
  const [success, setSuccess] = useState(false);

  const { coupons, loading, applyDiscount,findCoupon,fetchAllCoupons } = useCoupons();
  const [displayCoupon, setDisplayCoupon] = useState(
    Array(coupons.length).fill(false)
  );
  
  const cuponsRef = useRef([]);
  const { handleMessage, getMessageComponents: messages } = useMessageHandler();

  useEffect(()=>{
      fetchAllCoupons();
  },[cartInfo])
  
  const applyCoupon = async (couponId) => {
    setLoadings(true);
    const response = await applyDiscount(couponId);


    if (response === "COUPON_VALID") {
      let timerId;
      clearTimeout(timerId);
      handleMessage("the coupon is applied", "success");
      setOrderDetails({ ...orderDetails, couponId: couponId });
      const coupon = findCoupon(couponId);
 
      setSuccess(true);
      calculateDiscountedSummary(coupon.discountPercentage, coupon.maximumDiscountAmount);
      timerId = setTimeout(() => {
        setSuccess(false);
      }, 6000);
    } else if (response === "COUPON_NOT_VALID") {
      handleMessage("", "error");
      setSuccess(false);
    } else if (response === "COUPON_NOT_VALID_FOR_CART") {
      handleMessage("Add More Items To Use Coupon", "error");
      setSuccess(false);
    } else if (response === "COUPON_ALREADY_USED") {
      handleMessage("the coupon is already used", "error");
      setSuccess(false);
    } else if (response === "not applicable") {
      handleMessage("the coupon is not applicable", "error");
      setSuccess(false);
    }
    else if(response === "COUPON_EXPIRED"){
      handleMessage("the coupon is expired", "error");
      setSuccess(false);
    }
    setLoadings(false);
  };

  const handelRemoveCoupon = (couponId) => {
    setLoadings(true);
    setOrderDetails({ ...orderDetails, couponId: "" });
    handleMessage("the coupon is removed", "success");
    setLoadings(false);
  };

  const [height, setHeight] = React.useState(300);

  const handelClick = (index) => {
    if (displayCoupon[index]) {
      handelCouponClose(index);
    } else {
      handelCouponOpen(index);
    }
  };

  const handelCouponOpen = (index) => {
    handleMessage("This is a test mesdawdawdawdawdawdsage", "info");
    let arr = [...displayCoupon];
    arr.fill(false);

    arr[index] = true;
    setDisplayCoupon(arr);
    setHeight(500);
    if (cuponsRef[index].current) {
      cuponsRef[index].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handelCouponClose = (index) => {
    
    let arr = [...displayCoupon];
    arr.fill(false);
    setDisplayCoupon(arr);
    setHeight(300);
  };
  return (
    <>
      <div className="">
        <ConfettiAnimation success={success} />
        <div className="">
          {messages()}
          <h2 className=" font-semibold text-2xl mb-5">
            <div
              className=" flex space-x-2 items-center "
              onClick={handelCntrClose}
            >
              <div className=" p-0.5 hover:bg-slate-200 hover:cursor-pointer rounded-full transition-all">
                <SwipeLeftAltSharp fontSize="large" />
              </div>
              <span>Available Coupons</span>
            </div>
          </h2>
        </div>

        <div
          className="  h-[300px] relative overflow-scroll space-y-6 px-2"
          style={{ height: height, transition: "height 0.5s ease-in-out" }}
        >
          { coupons.length !== 0 ? (
          coupons.map((item, index) =>
            item.couponCode === orderDetails.couponId ? (
<div key={index} ref={cuponsRef[index]} className="bg-blue-100 border border-blue-400 p-4 rounded-md shadow-md menu">
    <div className="cursor-pointer">
        <h3 className="text-blue-800 font-semibold mb-2">Coupon: <span className="text-lg text-black font-bold mb-2">{item.name}</span>{}</h3>
        <p className="text-gray-600 mb-4">Code: <span className="text-lg text-black font-bold mb-2">{truncateString(item.couponCode, 20)}</span></p>

        <div className="flex w-full ml-auto space-x-2 items-center" onClick={() => handelClick(index)}>
            <ArrowDropDownCircle/>
            <Typography variant="h6" fontSize={18} component="h6" className="text-gray-600">
                View Details
            </Typography>
        </div>

        <Collapse in={displayCoupon[index]}>
            <div className="bg-white rounded-md p-4 mb-4 shadow-md">
                <div className="mb-2">
                    <p className="text-sm font-semibold">Description:</p>
                    <p className="text-sm text-gray-800">{item.couponDescription}</p>
                </div>
                <div className="mb-2">
                    <p className="text-sm font-semibold">Expiry Date: <br />{formatOrderedDate(item?.couponExpiryDate)}</p>
                    <p className="text-sm text-gray-800">{/* Convert item.couponExpiryDate to readable date format */}</p>
                </div>
                <div className="mb-2">
                    <p className="text-sm font-semibold">Minimum Purchase: <br />&#8377;{item?.minimumPurchaseAmount}</p>
                    <p className="text-sm text-gray-800">{/* Convert item.couponExpiryDate to readable date format */}</p>
                </div>
                <div className="mb-2">
                    <p className="text-sm font-semibold">Maximum Discount: <br />&#8377;{item?.maximumDiscountAmount}</p>
                    <p className="text-sm text-gray-800">{/* Convert item.couponExpiryDate to readable date format */}</p>
                </div>
            </div>
        </Collapse>

        <div className="flex items-center justify-between">
            {/* Other coupon details */}
            <p className="text-blue-600 font-bold">{item.discountPercentage}% OFF</p>
            {/* Button for applying coupon */}
            <LoadingButton
                onClick={() => handelRemoveCoupon(item.couponCode)}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color="primary" // Use your primary color class here
            >
                <span className="mr-5">Remove</span>
            </LoadingButton>
        </div>
        <span className="text-xs font-semibold text-center text-gray-600">{item.message}</span>
    </div>
</div>



            ) : (
              <div
                key={index}
                ref={cuponsRef[index]}
                className="bg-white border border-gray-300 p-4 rounded-md shadow-md  menu"
              >
                <div className="cursor-pointer">
                  <h3 className="text-slate-400 font-semibold mb-2">
                    Coupon Code:{" "}
                    <span className="text-lg text-black font-bold mb-2">
                      {item.name}
                    </span>
                    {}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Use code:{" "}
                    <span className="text-lg text-black font-bold mb-2">
                      {" "}
                      {truncateString(item.couponCode, 20)}
                    </span>
                  </p>

                  <div
                    className=" flex w-full ml-auto space-x-2 items-center"
                    onClick={() => handelClick(index)}
                  >
                    <ArrowDropDownCircle />
                    <Typography
                      variant="h6"
                      fontSize={18}
                      component="h6"
                      className="text-gray-600"
                    >
                      View Details
                    </Typography>
                  </div>

                  <Collapse in={displayCoupon[index]}>
                    <div className="bg-gray-100 rounded-md p-4 mb-4">
                      <div className="mb-2">
                        <p className="text-sm font-semibold">Description:</p>
                        <p className="text-sm text-gray-600">
                          {item.couponDescription}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold">
                          Use Before: <br />
                          {formatOrderedDate(item?.couponExpiryDate)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {/* Convert item.couponExpiryDate to readable date format */}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold">
                          Minimum Purchase: <br /> &#8377;
                          {item?.minimumPurchaseAmount}
                        </p>
                        <p className="text-sm text-gray-600">
                          {/* Convert item.couponExpiryDate to readable date format */}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold">
                          Maximum Discount: <br />
                          &#8377;{item?.maximumDiscountAmount}
                        </p>
                        <p className="text-sm text-gray-600">
                          {/* Convert item.couponExpiryDate to readable date format */}
                        </p>
                      </div>
                    </div>
                  </Collapse>

                  <div className="flex items-center justify-between">
                    {/* Other coupon details */}
                    <p className="text-green-600 font-bold">
                      {item.discountPercentage}% OFF
                    </p>
                    {/* Button for applying coupon */}
                    <LoadingButton
                      onClick={() => applyCoupon(item.couponCode)}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                    >
                      <span className=" mr-5">Apply</span>
                    </LoadingButton>
                  </div>
                  <span className=" text-xs font-semibold text-center">
                    {item.message}
                  </span>
                </div>
              </div>
            )
          )
          ):(
            <div className="text-center text-gray-500 font-semibold text-lg">No Coupons Available</div>
          )
        }
        </div>
      </div>
    </>
  );
};

export default RightElement;
