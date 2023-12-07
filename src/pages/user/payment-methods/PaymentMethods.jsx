import React, { useEffect, useState } from "react";
import {
  ShoppingBag3Icon,
  rightArrowIcon2,
} from "../../../assets/icons/png/user-page-icons/data";
import { rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { ordersList } from "../../../data/orderList";
import { noOrderIcon } from "../../../assets/icons/img/randoms/data";
import { Link, Outlet, useMatch } from "react-router-dom";
import { OrderPaging } from "../orders/Orders";
import useCard from "../../../CustomHooks/CardsHooks";
import CardDetails from "../../checkout/payment/CardDetails";
import {
  americanExpressIcon,
  cardIcon,
  creditCardIcon,
  mastercardIcon,
  rupayIcon,
  visaIcon,
} from "../../../assets/icons/png/cardIcons/data";
import { trashbinIcon } from "../../../assets/icons/png/toolbar1/data";
import { plusBlackIcon } from "../../../assets/icons/png/Rareicons/data";
import { CircularProgress } from "@mui/material";

export  const getCardProvider = (name) => {
  switch (name) {
    case "VISA":
      return visaIcon;
    case "MASTER":
      return mastercardIcon;
    case "AMERICAN_EXPRESS":
      return americanExpressIcon;
    case "RUPAY":
      return rupayIcon;
    default:
      return creditCardIcon;
  }
};

function PaymentMethods() {
  const { getCard, deleteItem, cards, setDefault, loading } = useCard();
  const isEditing = useMatch("/user/edit-payment-method/:id");
  const [currnetPage, setCurrentPage] = React.useState(0);
  const [addNewCard,setAddnewCard] = useState(false)
  const [save, setSave] = useState();
  const [paymentType, setPaymentType] = useState(0);
  const totalpages = Math.ceil(cards?.length / 5);
  const startIndex = currnetPage * 5;
  const endIndex = (currnetPage + 1) * 5;
  const currentOrders = cards?.slice(startIndex, endIndex);

  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
  };

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



 
  const handelDeleteCard = (cardId) => {
    deleteItem(cardId);
  };

  return (
    <>
      {  loading ? <CircularProgress/> : 
      isEditing ? (
        <>
          <div className="orders-pg-header flex justify-between ">
            <div className="flex">
              <img src={cardIcon} className=" h-10 mt-2 mr-2" />
              <span className=" font-semibold ">Payment Options</span>
            </div>
            <div className="back-btn">
              <Link to="/user/payment-methods">
                <button className="Btn">Back to Payment List</button>
              </Link>
            </div>
          </div>
          <CardDetails
            setPaymentMethod={setPaymentType}
            paymentMethod={paymentType}
            grantPermission={setSave}
          />
        </>
      ) : (
        <>
          <div className="orders-pg-header ">
            <img src={cardIcon} className=" h-10 mt-2 mr-2" />
            <span className=" font-semibold ">Payment Options</span>
          </div>
          <div className="orders-main-cntr">
            {currentOrders?.length !== 0 ? (
              <>
                <div className="orders-top-cntr">
                  <div className="order-table-rows-cntr">
                    { cards &&
                    cards?.map((order, index) => (
                      <Link
                        to={`/user/edit-payment-method/${order.cardId}`}
                        key={index}
                      >
                        <div
                          className={` ${
                            loading ? "bg-slate-100" : "bg-white"
                          } order-table-rows shadow-md py-7 pl-5 items-center`}
                        >
                          <div className="order-table-row flex w-64">
                            <div>
                              <img
                                src={getCardProvider(order.cardType)}
                                className=" h-7 mr-5"
                              />
                            </div>
                            <span className="font-semibold text-lg text-slate-600">
                              {order.cardHolderName}
                            </span>
                          </div>
                          <div className="order-table-row w-64">
                            <span
                              className={`
                    )} px-3 py-1.5 rounded-2xl font-semibold text-lg text-slate-600 `}
                            >
                              {order.cardNumber}
                            </span>
                          </div>
                          <div className="order-table-row font-semibold text-lg text-slate-600">
                            <span>{order.expireDate}</span>
                          </div>

                          <div
                            className="order-table-row-btn mr-16"
                            onClick={() => handelDeleteCard(order.cardId)}
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
                    {

                    !addNewCard?
                    <div className="add-new-method flex justify-center items-center">
                      <div className="add-mehtods-Btn bg-light-pink p-3 rounded-full shadow-md hover:bg-dark-pink hover:cursor-pointer" role="button"
                      onClick={()=>setAddnewCard(true)}
                      >
                        <img src={plusBlackIcon} className="h-6" style={{filter:"invert(1)"}} />
                      </div>
                    </div>
                    :
                    <>
                    <CardDetails
                    setPaymentMethod={setPaymentType}
                    paymentMethod={paymentType}
                    grantPermission={setSave}
                    
                    
                    />
                     <div className="add-new-method flex justify-end items-center mt-3">
                      <div className="add-mehtods-Btn Btn3 " role="button"
                      onClick={()=>setAddnewCard(false)}
                      >
                        <span>Cancel</span>
                      </div>
                    </div>
                    </>
}                     
                  </div>
                </div>
                <OrderPaging
                  currentPage={currnetPage}
                  totalpages={totalpages}
                  updatePage={handelPageChange}
                />
              </>
            ) : (
              <CardDetails
                setPaymentMethod={setPaymentType}
                paymentMethod={paymentType}
                grantPermission={setSave}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PaymentMethods;
