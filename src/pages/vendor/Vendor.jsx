import React from "react";
import { Outlet, useMatch } from "react-router";
import { Link } from "react-router-dom";
import {
  ShoppingbagIcon2,
  analyticsIcon,
  creditcardIcon,
  likeIcon,
  listIcon,
  locationIcon,
  ordersListIcon,
  profileIcon,
  settingsIcon,
  shoppingCartIcon,
  uploadIcon,
} from "../../assets/icons/png/user-page-icons/data";
import { ordersList } from "../../data/orderList";
import './vendor.css'
import Dashboard from "./dashboard/Dashboard";

const Vendor = () => {
  const dashboard = useMatch("/vendor/dashboard");
  const products = useMatch("/vendor/products");
  const addproducts = useMatch("/vendor/add-products");
  const orders  = useMatch("/vendor/orders");
  const accountsettings = useMatch("/vendor/account-settings");

  return (
    <>
      <div className="user-pg-cntr">
        <div className="user-bd-sub-cntr">
          <div className="user-pg-left-cntr">
            <div className="vendor-left-sub-cntr shadow-md ">
              <div className="user-dashboard-cntr font-semibold">
                <Link to={`/vendor/dashboard`}>
                  <div
                    className={`user-dashboard-items ${
                      dashboard ? "user-dashboard-items-active" : ""
                    }  flex justify-between`}
                  >
                    <div className="items-icon-name flex space-x-3">
                      <div className="item-icon">
                        <img
                          src={listIcon}
                          alt=""
                          className="dashboard-icons h-5"
                        />
                      </div>
                      <div>
                        <span>Dashboard</span>
                      </div>
                    </div>
                    <div className="item-count">
                      <span>{ordersList.length}</span>
                    </div>
                  </div>
                </Link>
                
                <Link to={`/vendor/products`}>
                  <div
                    className={`user-dashboard-items ${
                      products ? "user-dashboard-items-active" : ""
                    } flex justify-between`}
                  >
                    <div className="items-icon-name flex space-x-3">
                      <div className="item-icon">
                        <img
                          src={ordersListIcon}
                          alt=""
                          className=" dashboard-icons h-5"
                        />
                      </div>
                      <div>
                        <span>Products</span>
                      </div>
                    </div>
                    <div className="item-count">
                      <span>{-2}</span>
                    </div>
                  </div>
                </Link>
                <Link to={`/vendor/add-products`}>
                  <div
                    className={`user-dashboard-items ${
                      addproducts ? "user-dashboard-items-active" : ""
                    } flex justify-between`}
                  >
                    <div className="items-icon-name flex space-x-3">
                      <div className="item-icon">
                        <img
                          src={uploadIcon}
                          alt=""
                          className=" dashboard-icons h-5"
                        />
                      </div>
                      <div>
                        <span>Add New Product</span>
                      </div>
                    </div>
                    <div className="item-count">
                      <span>{-2}</span>
                    </div>
                  </div>
                </Link>
                <Link to={`/vendor/orders`}>
                  <div
                    className={`user-dashboard-items ${
                      orders? "user-dashboard-items-active" : ""
                    } flex justify-between`}
                  >
                    <div className="items-icon-name flex space-x-3">
                      <div className="item-icon">
                        <img
                          src={shoppingCartIcon}
                          alt=""
                          className=" dashboard-icons h-5"
                        />
                      </div>
                      <div>
                        <span>Orders</span>
                      </div>
                    </div>
                    <div className="item-count">
                      <span>{-2}</span>
                    </div>
                  </div>
                </Link>
                <Link to={`/vendor/account-settings`}>
                  <div
                    className={`user-dashboard-items ${
                      accountsettings ? "user-dashboard-items-active" : ""
                    } flex justify-between`}
                  >
                    <div className="items-icon-name flex space-x-3">
                      <div className="item-icon">
                        <img
                          src={settingsIcon}
                          alt=""
                          className=" dashboard-icons h-5"
                        />
                      </div>
                      <div>
                        <span>Account Setting</span>
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

export default Vendor;
