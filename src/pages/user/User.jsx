import React from "react";
import {  Outlet, useMatch} from "react-router";
import { Link } from "react-router-dom";
import "./user.css";
import { ShoppingbagIcon2, creditcardIcon, likeIcon, locationIcon, profileIcon } from "../../assets/icons/png/user-page-icons/data";
import { ordersList } from "../../data/orderList";
const User = ({ children }) => {

    const orders  = useMatch("/user/orders");
    const wishlist  = useMatch("/user/Wishlist");
    const profile  = useMatch("/user/profile");
    const payment  = useMatch("/user/Payment-methods");
    const address  = useMatch("/user/address");
  
  return (

    <>
      <div className="user-pg-cntr">
        <div className="user-bd-sub-cntr">
          <div className="user-pg-left-cntr">
            <div className="user-left-sub-cntr shadow-md ">
              <div className="user-dashboard-cntr font-semibold">
                <div className="user-dashbord-title px-7 pt-6">
                  <span className=" text-slate-500 font-bold">Dashbord</span>
                </div>
                <Link to={`/user/orders`}>
                <div className={`user-dashboard-items ${orders?'user-dashboard-items-active':''}  flex justify-between`} >
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={ShoppingbagIcon2} alt="" className="dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Orders</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{ordersList.length}</span>
                  </div>
                </div>
                </Link>
                <Link to={`/user/Wishlist`}>
                <div className={`user-dashboard-items ${wishlist?'user-dashboard-items-active':''} flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={likeIcon} alt="" className=" dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>WishList</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{-2}</span>
                  </div>
                </div>
                </Link>
                {/* <Link to={`/user/profile`}>
                <div className="user-dashboard-items  flex justify-between  ">
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={ShoppingbagIcon2} alt="" className=" dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Support Ticket</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{-2}</span>
                  </div>
                </div>
                </Link> */}
              </div>

              <div className="user-dashboard-cntr font-semibold mt-5">
                <div className="user-dashbord-title px-7 pt-6">
                  <span className=" text-slate-500 font-bold">Dashbord</span>
                </div>
                <Link to={`/user/profile`}>
                <div className={`user-dashboard-items ${profile?'user-dashboard-items-active':''}  flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={profileIcon} alt="" className="dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Profile Info</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{-2}</span>
                  </div>
                </div>
                </Link>
                <Link to={`/user/Payment-methods`}>
                <div className={`user-dashboard-items ${payment?'user-dashboard-items-active':''}  flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={creditcardIcon} alt="" className=" dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Payment Methods</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{-2}</span>
                  </div>
                </div>
                </Link>
                <Link to={`/user/address`}>
                <div className={`user-dashboard-items ${address?'user-dashboard-items-active':''}  flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={locationIcon} alt="" className="  dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Address</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{-2}</span>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="user-pg-right-cntr ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
