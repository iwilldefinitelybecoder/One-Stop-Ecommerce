import React, { Suspense, useEffect } from "react";
import {
  ShoppingBag3Icon,
  emptyCartIcon2,
  rightArrowIcon2,
} from "../../../assets/icons/png/user-page-icons/data";
import { rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { ordersList } from "../../../data/orderList";
import { noOrderIcon } from "../../../assets/icons/img/randoms/data";
import { Link, Outlet } from "react-router-dom";
import { OrderPaging } from "../../user/orders/Orders";
import { getVendorProductList } from "../../../service/vendorServices";
import { CircularProgress } from "@mui/material";

function ProductList() {
  const [orders, setOrders] = React.useState([]);
  const [currnetPage, setCurrentPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const totalpages = Math.ceil(orders.length / 5);
    const startIndex = currnetPage * 5;
    const endIndex = (currnetPage + 1) * 5;
    const currentOrders = orders.slice(startIndex, endIndex);

  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
  };



  useEffect(() => {
   async function fetchData(){
    const data = await getVendorProductList();
    console.log(data)
    if(data.length > 0)
    setOrders(data)
    setLoading(false)
    }
    fetchData()
  }
  ,[])
console.log(orders)

  const getOrderStatusClass = (status) => {
    status = status.toLowerCase();
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
    {loading ? <CircularProgress/> : 
      <div className="orders-main-cntr">
        {orders.length !== 0 ? 
        ( <Suspense fallback={<div>Loading...</div>}>
        <ProductList2 currentOrders={currentOrders}/>
        </Suspense> 
        ): (
          <div className="orders-empty-cntr">
           
           <div className="orders-top-cntr">
          <div className="orders-pg-header ">
            <img src={ShoppingBag3Icon} className=" h-6 mt-2 mr-2" />
            <span className=" font-semibold ">Product List</span>
          </div>
          </div>

            <div className="orders-empty-img-cntr flex justify-center">
              <img src={noOrderIcon} className="  mt-2 mr-2" />
            </div>
            <div className="orders-empty-text-cntr flex justify-end">
              <span className="text-slate-500 font-semibold text-2xl">
                You haven't Added any Products Yet.
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
  }
    </>
  );
}

const ProductList2 = ({currentOrders})=>{

  const subStringName = (name) => {
    if (name.length > 10) {
      return name.substring(0, 10) + "...";
    } else {
      return name;
    }
  };


  return(
    (
      <div className="orders-top-cntr">
        <div className="orders-pg-header ">
          <img src={ShoppingBag3Icon} className=" h-6 mt-2 mr-2" />
          <span className=" font-semibold ">Product List</span>
        </div>
        <div className="orders-table-header text-slate-500 pl-5">
          <div className="orders-table-title ">
            <span>Name&nbsp;</span>
          </div>
    
          
          <div className="orders-table-title">
            <span>Regular Price&nbsp;</span>
          </div>
          <div className="orders-table-title">
            <span>Inn Date&nbsp;</span>
          </div>
          <div className="orders-table-title">
            <span>Quantity&nbsp;</span>
          </div>
          <div className="orders-table-title">
            <span>Sale Price&nbsp;</span>
          </div>
        </div>
        <div className="order-table-rows-cntr">
          {currentOrders.map((order, index) => (
            <Link to={`/vendor/products/${order.productId}` } key={index}>
            <div className="order-table-rows shadow-md py-7 pl-5" >
              <div className="order-table-row flex space-x-2 ml-[-5px]">
                {/* <img src={emptyCartIcon2} className=" h-8"  /> */}
                <span className="font-semibold text-lg text-slate-600">{subStringName(order.name)}</span>
              </div>
              <div className="order-table-row">
                <span
                  className={`px-3 py-1.5 rounded-2xl `}
                >
                  {order.regularPrice}
                </span>
              </div>
              <div className="order-table-row">
                <span>{order.innDate|| "---"}</span>
              </div>
              <div className="order-table-row">
                <span>{order.stock}</span>
              </div>
              <div className="order-table-row">
                <span>{order.salePrice || "---"}</span>
              </div>
              <div className="order-table-row-btn">
                <img src={rightArrowIcon2} className="order-tbl-ar-icon h-5" />
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
      )
  )
}


export default ProductList;