import React from "react";
import {  Outlet, useMatch} from "react-router";
import { Link } from "react-router-dom";
import "./user.css";
import { ShoppingbagIcon2, creditcardIcon, likeIcon, locationIcon, profileIcon } from "../../assets/icons/png/user-page-icons/data";
import { ordersList } from "../../data/orderList";
import useWishlist from "../../CustomHooks/WishListHook";
import { useOrders } from "../../context/OrderContext";
import useCard from "../../CustomHooks/CardsHooks";
import useAddresses from "../../CustomHooks/AddressHooks";
const User = ({ children }) => {

    const order  = useMatch("/user/orders");
    const wishlist  = useMatch("/user/Wishlist");
    const profile  = useMatch("/user/profile");
    const payment  = useMatch("/user/Payment-methods") 
    const editPayment =  useMatch("/user/edit-payment-method/:id");
    const addresses  = useMatch("/user/address");
    const editAddress = useMatch("/user/edit-address/:id");
    const editProfile = useMatch("/user/edit-profile");
    const OrderDetails = useMatch("/user/orders/:id");

    const {wishlistInfo} = useWishlist(); 
    const {orders} = useOrders();
    const {cards} = useCard();
    const {address} = useAddresses();
  return (

    <>
      <div className="user-pg-cntr">
        <div className="user-bd-sub-cntr">
          <div className="user-pg-left-cntr">
            <div className="user-left-sub-cntr shadow-md ">
              <div className="user-dashboard-cntr font-semibold">
                <div className="user-dashbord-title px-7 pt-6">
                  <span className=" text-slate-500 font-bold">DASHBOARD</span>
                </div>
                <Link to={`/user/orders`}>
                <div className={`user-dashboard-items ${order || OrderDetails?'user-dashboard-items-active':''}  flex justify-between`} >
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={ShoppingbagIcon2} alt="" className="dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Orders</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{orders?.length}</span>
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
                    <span>{wishlistInfo?.totalItems}</span>
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
                  <span className=" text-slate-500 font-bold">ACCOUNT SETTINGS</span>
                </div>
                <Link to={`/user/profile`}>
                <div className={`user-dashboard-items ${profile || editProfile?'user-dashboard-items-active':''}  flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={profileIcon} alt="" className="dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Profile Info</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span></span>
                  </div>
                </div>
                </Link>
                <Link to={`/user/Payment-methods`}>
                <div className={`user-dashboard-items ${editPayment || payment?'user-dashboard-items-active':''}  flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={creditcardIcon} alt="" className=" dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Payment Methods</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{cards?.length}</span>
                  </div>
                </div>
                </Link>
                <Link to={`/user/address`}>
                <div className={`user-dashboard-items ${editAddress || addresses?'user-dashboard-items-active':''}  flex justify-between`}>
                  <div className="items-icon-name flex space-x-3">
                    <div className="item-icon">
                      <img src={locationIcon} alt="" className="  dashboard-icons h-5" />
                    </div>
                    <div>
                      <span>Address</span>
                    </div>
                  </div>
                  <div className="item-count">
                    <span>{address?.length}</span>
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
