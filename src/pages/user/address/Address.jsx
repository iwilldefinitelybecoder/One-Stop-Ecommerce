import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingBag3Icon,
  rightArrowIcon2,
} from "../../../assets/icons/png/user-page-icons/data";
import { Link, Outlet, useMatch } from "react-router-dom";
import { OrderPaging } from "../orders/Orders";

import {
  americanExpressIcon,
  cardIcon,
  creditCardIcon,
  mastercardIcon,
  rupayIcon,
  visaIcon,
} from "../../../assets/icons/png/cardIcons/data";
import { trashbinIcon } from "../../../assets/icons/png/toolbar1/data";
import { mapPinIcon, plusBlackIcon } from "../../../assets/icons/png/Rareicons/data";
import Container1 from "../../checkout/Details/Container1";
import useAddresses from "../../../CustomHooks/AddressHooks";
import { CircularProgress } from "@mui/material";

function Address() {
  const {getAddresses,deleteAddresses,loading,addresses} = useAddresses();
  const isEditing = useMatch("/user/edit-Address/:id");
  const [currnetPage, setCurrentPage] = React.useState(0);
  const [addNewCard, setAddnewCard] = useState(false);
  const forwardRef = useRef();
  const [save, setSave] = useState();
  const totalpages = Math.ceil(addresses?.length / 5);
  const startIndex = currnetPage * 5;
  const endIndex = (currnetPage + 1) * 5;
  const currentOrders = addresses?.slice(startIndex, endIndex);

  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
  };



  const handelDeleteCard = (e,cardId) => {
    e.preventDefault();
    e.stopPropagation();
    deleteAddresses(cardId);
  };
  console.log(addresses);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : isEditing ? (
        <>
          <div className="orders-pg-header flex justify-between ">
            <div className="flex">
              <img src={mapPinIcon} className=" h-10 mt-2 mr-2" />
              <span className=" font-semibold ">My Addresses</span>
            </div>
            <div className="back-btn">
              <Link to="/user/payment-methods">
                <button className="Btn">Back to Address List</button>
              </Link>
            </div>
          </div>
          <Container1 forwardRef={forwardRef} grantPermission={setSave} />
        </>
      ) : (
        <>
          <div className="orders-pg-header ">
            <img src={mapPinIcon} className=" h-8 mt-2 mr-2" />
            <span className=" font-semibold ">My Addresses</span>
          </div>
          <div className="orders-main-cntr">
            {currentOrders?.length !== 0 ? (
              <>
                <div className="orders-top-cntr">
                  <div className="order-table-rows-cntr">
                    {addresses &&
                      currentOrders?.map((address, index) => (
                        <Link
                          to={`/user/edit-address/${address.addressId}`}
                          key={index}
                        >
                          <div
                            className={` ${
                              loading ? "bg-slate-100" : "bg-white"
                            } order-table-rows shadow-md py-7 pl-5 items-center`}
                          >
                            <div className="order-table-row flex w-64">
                              <div>
                              
                              </div>
                              <span className="font-semibold text-lg text-slate-600">
                                {address?.name}
                              </span>
                            </div>
                            <div className="order-table-row w-64">
                              <span
                                className={`
                    )} px-3 py-1.5 rounded-2xl font-semibold text-lg text-slate-600 `}
                              >
                                {address?.area}
                              </span>
                            </div>
                            <div className="order-table-row font-semibold text-lg text-slate-600">
                              <span>{address?.number}</span>
                            </div>

                            <div
                              className="order-table-row-btn mr-16"
                              onClick={(e) => handelDeleteCard(e,address.addressId)}
                            >
                              <img
                                src={trashbinIcon}
                                className="order-tbl-ar-icon h-5"
                              />
                            </div>

                            <div className="order-table-row-btn">
                              <img
                                src={rightArrowIcon2}
                                className="order-tbl-ar-icon h-5"
                              />
                            </div>
                          </div>
                        </Link>
                      ))}
                    {!addNewCard ? (
                      <div className="add-new-method flex justify-center items-center">
                        <div
                          className="add-mehtods-Btn bg-light-pink p-3 rounded-full shadow-md hover:bg-dark-pink hover:cursor-pointer"
                          role="button"
                          onClick={() => setAddnewCard(true)}
                        >
                          <img
                            src={plusBlackIcon}
                            className="h-6"
                            style={{ filter: "invert(1)" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Container1
                          forwardRef={forwardRef}
                          grantPermission={setSave}
                        />
                        <div className="add-new-method flex justify-end items-center mt-3">
                          <div
                            className="add-mehtods-Btn Btn3 "
                            role="button"
                            onClick={() => setAddnewCard(false)}
                          >
                            <span>Cancel</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <OrderPaging
                  currentPage={currnetPage}
                  totalpages={totalpages}
                  updatePage={handelPageChange}
                />
              </>
            ) : (
              <Container1 forwardRef={forwardRef} grantPermission={setSave} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Address;
