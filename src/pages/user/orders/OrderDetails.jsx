import React from "react";
import ShipmentStatus from "./ShipmentStatus";

import OrderInfo from "./OrderInfo";
import { humanIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../../context/OrderContext";

import OrderProducts from "./OrderProducts";
import { CircularProgress } from "@mui/material";

const OrderDetails = () => {
  const { orders, loading,getOrderDetails,getTrackingData } = useOrders();
  const [orderDetails, setOrderDetails] = React.useState({});
  const orderId = useParams().id;

console.log("orderDetails", orderDetails)

  React.useEffect(() => {
    async function fetchOrderDetaisl() {
   const response = await getOrderDetails(orderId);
    setOrderDetails(response);
      }
      fetchOrderDetaisl()
  }
  ,[orderId])



  
  return (
    <div className=" my-5">
      <div className="ad-prdct-hdr">
        <div className="ad-prdct-title flex">
          <img src={humanIcon} className="h-8 mr-3" />
          <span className="text-2xl font-bold ">Edit Profile</span>
        </div>
        <div className="back-btn">
          <Link to="/user/orders">
            <button className="Btn">Back to order List</button>
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-96">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div>
            <ShipmentStatus orderDetail = {orderDetails} />
          </div>
          <div>
            <OrderProducts  orderDetails = {orderDetails} getTrackingData = {getTrackingData} />
          </div>
          <div>
            <OrderInfo orderDetails = {orderDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
