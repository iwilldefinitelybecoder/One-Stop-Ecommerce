import React, { useEffect } from "react";
import "./orders.css";
import {
  ShoppingBag3Icon,
  rightArrowIcon2,
} from "../../../assets/icons/png/user-page-icons/data";
import { rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { ordersList } from "../../../data/orderList";
import { noOrderIcon } from "../../../assets/icons/img/randoms/data";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useOrders } from "../../../context/OrderContext";
import { formatDateFromTimestamp } from "../../../utils/DisplayFormatters";
function Orders() {
  // const [orders, setOrders] = React.useState(ordersList);
  const {orders,setOrders,get} = useOrders();
  const [currnetPage, setCurrentPage] = React.useState(0);
  const totalpages = Math.ceil(orders?.length / 5);
    const startIndex = currnetPage * 5;
    const endIndex = (currnetPage + 1) * 5;
    const currentOrders = orders?.slice(startIndex, endIndex);

  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
  };

  console.log(orders)
  const getOrderStatusClass = (status) => {
    status = status?.toLowerCase();
    switch (status) {
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      case "pending":
        return "bg-yellow-200 bg-opacity-75 text-yellow-600";
      default:
        return "bg-yellow-200 text-yellow-600";
    }
  };

  return (
    <>
   
      <div className="orders-main-cntr">
        {orders?.length !== 0 ? (
        <div className="orders-top-cntr">
          <div className="orders-pg-header ">
            <img src={ShoppingBag3Icon} className=" h-6 mt-2 mr-2" />
            <span className=" font-semibold ">My Orders</span>
          </div>
          <div className="orders-table-header text-slate-500 pl-5">
            <div className="orders-table-title ">
              <span>Order&nbsp;#</span>
            </div>
      
            
            <div className="orders-table-title">
              <span>Status&nbsp;</span>
            </div>
            <div className="orders-table-title">
              <span>Date Purchases&nbsp;</span>
            </div>
            <div className="orders-table-title">
              <span>Total&nbsp;</span>
            </div>
          </div>
          <div className="order-table-rows-cntr">
            {currentOrders?.map((order, index) => (
              <Link to={`/user/orders/${order.orderId}` } key={index}>
              <div className="order-table-rows shadow-md py-7 pl-5" >
                <div className="order-table-row">
                  <span className="font-semibold text-lg text-slate-600">{order.generatedOrderId}</span>
                </div>
                <div className="order-table-row">
                  <span
                    className={`${getOrderStatusClass(
                      order.orderStatus
                    )} px-3 py-1.5 rounded-2xl `}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="order-table-row">
                  <span>{formatDateFromTimestamp(order?.orderDate)}</span>
                </div>
                <div className="order-table-row">
                  <span>&#8377;{order?.grandTotal}</span>
                </div>
                <div className="order-table-row-btn">
                  <img src={rightArrowIcon2} className="order-tbl-ar-icon h-5" />
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
        ) : (
          <div className="orders-empty-cntr">
           
           <div className="orders-top-cntr">
          <div className="orders-pg-header ">
            <img src={ShoppingBag3Icon} className=" h-6 mt-2 mr-2" />
            <span className=" font-semibold ">My Orders</span>
          </div>
          </div>

            <div className="orders-empty-img-cntr flex justify-center">
              <img src={noOrderIcon} className="  mt-2 mr-2" />
            </div>
            <div className="orders-empty-text-cntr flex justify-end">
              <span className="text-slate-500 font-semibold text-2xl">
                You haven't placed any orders yet.
              </span>
              <div className="rotating-text  ">
              <span className="text-slate-500 font-semibold text-2xl  ">??</span>

              </div>
            </div>
          </div>
        )  
        }
        <OrderPaging
          currentPage={currnetPage}
          totalpages={totalpages}
          updatePage={handelPageChange}
        />
      </div>
     
    </>
  );
}

export const OrderPaging = ({ currentPage, totalpages, updatePage }) => {

  const pagenumbers = Array.from({ length: totalpages }, (_, i) => i + 1);


  return (
    <div className="order-pg-pagation h-12 ">
      <div
        className="order-pn-l-arrow bg-white ring-1  ring-light-pink px-2 py-2 rounded-full mr-3 hover:bg-light-pink transition-all"
        onClick={() => updatePage(currentPage - 1)}
      >
        <img src={rightArrowIcon} className="h-3 rotate-180" />
      </div>
      {pagenumbers.length > 0 &&
        pagenumbers.map((page, index) => (
          <div
            className={`${
              currentPage + 1 === page
                ? "bg-light-pink text-white px-4 py-2"
                : "bg-white px-3 py-1"
            }  ring-1  ring-light-pink  rounded-full hover:cursor-pointer active:cursor-pointer mx-2 transition-all `}
            key={index}
            onClick={() => updatePage(index)}
          >
            <span>{page}</span>
          </div>
        ))}
      <div
        className="order-pn-r-arrow  bg-white ring-1  ring-light-pink px-2 py-2 rounded-full ml-3  hover:bg-light-pink transition-all "
        onClick={() => updatePage(currentPage + 1)}
      >
        <img src={rightArrowIcon} className="h-3" />
      </div>
    </div>
  );
};

export default Orders;
