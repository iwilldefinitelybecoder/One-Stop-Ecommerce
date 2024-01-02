import React from "react";

import { useOrders } from "../../../context/OrderContext";
import { Link } from "react-router-dom";
import { flashIcon } from "../../../assets/icons/png/Rareicons/data";
import { formatOrderedDate, truncateString } from "../../../utils/DisplayFormatters";
import TrackingShipment from "./TrackShipment";

const OrderProducts = ({ orderDetails }) => {
  console.log(orderDetails);
  const productCntrRef = React.useRef(null);



  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const handleScrollToTop = () => {
  productCntrRef.current.scrollTop = 0;
}
  return (
    <>
      <div className=" flex w-full justify-around bg-slate-200 px-4 py-5 rounded-lg shadow-md my-5 ">
        <div>
          {" "}
          <span className="text-slate-500">Order ID: </span>
          <span className=" span-text">#156165</span>
        </div>
        <div>
          {" "}
          <span className=" text-slate-500 span-label">Order Placed On: </span>
          <span className=" span-text">{formatOrderedDate(1703765315684)}</span>
        </div>
      </div>
      <div className=" relative">

      <div className=" order-product-cntr  overflow-scroll  " ref={productCntrRef}>
        {arr?.map((productId, index) => (
          <OrderedProductList key={index} data={productId} />
          ))}
        <div className=" absolute top-[600px] left-10 ">
          <button 
          className="Btn3 shadow-lg"
          onClick={handleScrollToTop}
          >Back To Top</button>
        </div>
          </div>
      </div>
    </>
  );
};

const OrderedProductList = ({ data }) => {
  const variation = {
    color: "red",
    size: "XL",
    material: "cotton",
  };
  const [open, setOpen] = React.useState(false);
  // const {getProductById} = useProd();


  const handleTrackShipment = () => {
    setOpen(!open);
  }

  const sampleTrackingData = {
    '2023-12-30': [
      { time: '09:00 AM', place: 'Facility A', action: 'Received' },
      { time: '11:30 AM', place: 'Facility B', action: 'In transit' },
      { time: '02:45 PM', place: 'Destination City', action: 'Out for delivery' },
      // ... more updates for the day
    ],
    '2023-12-31': [
      { time: '10:00 AM', place: 'Facility C', action: 'Processing' },
      { time: '01:20 PM', place: 'Facility D', action: 'Sorting' },
      // ... more updates for the day
    ],
    '2023-12-29': [
      { time: '10:00 AM', place: 'Facility C', action: 'Processing' },
      { time: '01:20 PM', place: 'Facility D', action: 'Sorting' },
      { time: '01:20 PM', place: 'Facility D', action: 'Sorting' },
      { time: '01:20 PM', place: 'Facility D', action: 'Sorting' },
      { time: '01:20 PM', place: 'Facility D', action: 'Sorting' },
      { time: '01:20 PM', place: 'Facility D', action: 'Sorting' },
      // ... more updates for the day
    ],
    // ... more days with their respective updates
  };
  

  return (
    <div className="product-List-Cntr flex items-center justify-between my-6 border-b-2 py-8 px-8  bg-white rounded-md shadow-md ">
      <div className="product-detail flex items-center space-x-3">
        <div className="product-img p-3 w-40 h-40  flex items-center justify-center bg-slate-200">
          <img
            src={flashIcon}
            alt={data.productName}
            className="object-cover"
          />
        </div>
        <div className="max-w-[150px]">
          <Link to={`/product/${12}`}>
          <p className="font-semibold hover:underline hover:cursor-pointer break-words">
            {
              truncateString("dawdawdadaddadadddddddddddddd d wwwwwwwwww wd dad adaw w awd wdawdddd dw aw a wad awdwadddada",90)
            
            }
          </p>
          </Link>
          <span className="text-slate-400">
            <span>price</span> x <span>quantity</span>
          </span>
        </div>
      </div>
      <div className="product-properties w-[150px] text-center">
        <span className=" text-slate-400">Product Properties</span>
        <br />
        <div
          style={{ display: "block" }}
          className="  text-slate-400 font-semibold text-center "
        >
          {Object.entries(variation).map(([key, value]) => (
            <>
              <span className=" text-slate-500 mr-2" key={key}>
                {key} : {value}
              </span>
              <br />
            </>
          ))}
        </div>
      </div>
      <TrackingShipment open={open} handleClose={handleTrackShipment} trackingData={sampleTrackingData} />
      <div className="flex-column space-y-4">
        <Link to={`/product/write-review/${12}`}>
          <button className="Btn w-full">Give FeedBack</button>
        </Link>
       
          <button className="Btn w-full" onClick={handleTrackShipment}>Track Order</button>
    
        {"delivered" === "delivered" ? (
          <Link to={`/product/write-review/${12}`}>
            <button className="Btn w-full">Return</button>
          </Link>
        ) : (
          <Link to={`/product/write-review/${12}`}>
            <button className="Btn w-full">Cancel</button>
          </Link>

        )}
      </div>
    </div>
  );
};

export default OrderProducts;
