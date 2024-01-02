import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../CustomHooks/CartHook";
import { Box, Collapse, Typography } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import { ArrowDropDown, ArrowDropDownCircle } from "@material-ui/icons";
import { applyCouponCode } from "../../../service/CustomerServices/OrderServices";
import { LoadingButton } from "@mui/lab";
import { ArrowRightAltSharp, SwipeLeftAltSharp, SwipeRightAltRounded } from "@mui/icons-material";
import useMessageHandler from "../../../components/body/Messages/NewMessagingComponent";

const RightElement = () => {
  const { estimatedCosts } = useCart();
  const cartEstimate = estimatedCosts();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="checkout-right-sub-cntr bg-white rounded-md px-4 py-5 flex-col shadow-md">
        <Collapse in={!open}>
          <div className="calaulate-info-sec flex-col border-b-2 border-b-slate-100">
            <div className="sub-total-section flex justify-between my-2 mx-2">
              <span className="text-slate-500 ">Subtotal:</span>
              <span className="text-xl font-bold">
                {cartEstimate.cartTotal}
              </span>
            </div>
            <div className="shipping-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Shipping:</span>
              <span className="text-xl font-bold">
                {`${cartEstimate.shipping * 100}%` || "-"}
              </span>
            </div>
            <div className="tax-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Tax:</span>
              <span className="text-xl font-bold">
                {cartEstimate.tax || "-"}
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">Discount:</span>
              <span className="text-xl font-bold">
                {cartEstimate.discount || "-"}
              </span>
            </div>
            <div className="discount-section flex justify-between  my-2 mx-2">
              <span className="text-slate-500 ">GrandTotal:</span>
              <span className="text-xl font-bold">
                {cartEstimate.grandTotal || "-"}
              </span>
            </div>
          </div>
        </Collapse>

        <Collapse in={open}>
          <VoucherContainer handelCntrClose={handleClose} />
        </Collapse>

        <div>
          <input type="text" placeholder="Voucher" />
        </div>
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

const VoucherContainer = ({handelCntrClose}) => {
  const [display, setDisplay] = React.useState("main");
  const [coupon, setCoupon] = React.useState([1, 2, 3, 4, 5]);
  const [loading,setLoading] = React.useState(false)
  const [displayCoupon, setDisplayCoupon] = React.useState(
    Array(coupon.length).fill(false)
  );
  const cuponsRef = coupon.map(()=> React.useRef(null));

    const applyCoupon = () => {
      setLoading(true)
      const response = applyCouponCode(coupon?.cuoponId);

      if (response === "ok") {
      } else if(response ==="invalid"){
      }else if(response ==="expired"){
      }else if(response ==="already used"){
      }else if(response ==="not applicable"){
      }
      setLoading(false)

    }


  const [height, setHeight] = React.useState(300);
    
  const {handleMessage,getMessageComponents:messages} = useMessageHandler();
   

    const handelClick = (index) => {
      
      if(displayCoupon[index]){
        handelCouponClose(index);
      }else{
        handelCouponOpen(index);
      }
    }

    const handelCouponOpen = (index) => {
      handleMessage("This is a test mesdawdawdawdawdawdsage", "info");
    let arr = [...displayCoupon];
    arr.fill(false);

    arr[index] = true;
    setDisplayCoupon(arr);
    setHeight(500);
    if(cuponsRef[index].current){
      cuponsRef[index].current.scrollIntoView({behavior:"smooth",block:"center"});
    }
  }

  const handelCouponClose = (index) => {
    handleMessage("This is a tesdawdawdawt message", "error");
    let arr = [...displayCoupon];
    arr.fill(false);
    setDisplayCoupon(arr);
    setHeight(300);
  }
  return (
    <>
      <div className="">
        <div className="">
          {messages()}
          <h2 className=" font-semibold text-2xl mb-5">
            <div className=" flex space-x-2 items-center " onClick={handelCntrClose}>
              <div className=" p-0.5 hover:bg-slate-200 hover:cursor-pointer rounded-full transition-all">

           <SwipeLeftAltSharp fontSize="large"/>
              </div>

            <span>Avaiable Coupons</span>
            </div>

          </h2>
        </div>

        <div className="  h-[300px] relative overflow-scroll space-y-6 px-2"
        style={{height:height,transition:"height 0.5s ease-in-out"}}
        >
          {coupon.map((item, index) => (
            
            <div key={index} ref={cuponsRef[index]} className="bg-white border border-gray-300 p-4 rounded-md shadow-md  menu">
              <div className="cursor-pointer">
                <h3 className="text-lg font-bold mb-2">Coupon Code</h3>
                <p className="text-gray-600 mb-4">Use code: </p>
                <div className=" flex w-full ml-auto space-x-2 items-center" onClick={()=>handelClick(index)}>
                <ArrowDropDownCircle  />
                <Typography variant="h6" fontSize={18} component="h6" className="text-gray-600">
                  View Details
                </Typography>
                </div>
                <Collapse in={displayCoupon[index]}>
                  <div className="bg-gray-100 rounded-md p-4 mb-4">
                    <div className="mb-2">
                      <p className="text-sm font-semibold">Description:</p>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-semibold">Rules:</p>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-semibold">Expires:</p>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Applies To:</p>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>
                </Collapse>
                <div className="flex items-center justify-between">
                  <p className="text-green-600 font-bold">51% OFF</p>
                  <LoadingButton 
                   onClick={applyCoupon}
                   loading={loading}
                  
                   loadingPosition="end"
                   variant="contained"
                   >
                    <span className=" mr-5">Apply</span>
                   </LoadingButton>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightElement;
