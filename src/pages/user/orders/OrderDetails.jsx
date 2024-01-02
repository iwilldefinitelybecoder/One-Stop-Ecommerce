import React from "react";
import ShipmentStatus from "./ShipmentStatus";

import OrderInfo from "./OrderInfo";
import { humanIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { Link } from "react-router-dom";
import { useOrders } from "../../../context/OrderContext";
import { CircularProgress } from "@material-ui/core";
import OrderProducts from "./OrderProducts";

const OrderDetails = () => {
  const { orders, loading } = useOrders();



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
            <ShipmentStatus orderDetail = {orders} />
          </div>
          <div>
            <OrderProducts  orderDetails = {orders} />
          </div>
          <div>
            <OrderInfo orderDetails = {orders} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
