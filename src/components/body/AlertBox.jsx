import React from "react";
import "./alert.css";
import { TshirtIcon } from "../../assets/icons/img/products/data";
import { WarningIcon, closeIcon } from "../../assets/icons/png/toolbar1/data";

const AlertBox = ({index, item ,setDeleteToggle,updateValue,AlertMessage}) => {
  const [itemDetail, setItemDetail] = React.useState(item);
  const [animation, setAnimation] = React.useState(false);

  const handelAnimation = () => {
    
    setAnimation(true);
    setDeleteToggle(false)
  }

  return (
    <>
      <div className="alert-main-container">
        <div className="alert-background-container">

        </div>
        <div className={`alert-message-container shadow-2xl`}>
          <div className="warning-close-btn font-bold " role="button" onClick={(e)=>setDeleteToggle(false)}>X</div>
          <div className="warning-icon-bg">
            <img src={WarningIcon} className=" h-24" />
            <span className=" font-poppins font-extrabold text-xl">
              Hold On!
            </span>
          </div>
         {AlertMessage}
          <div className="alert-controles">
            <div className="alert-message mt-12">
              <span className=" font-semibold text-md">
                Are you sure you want to remove this item?
              </span>
            </div>
            <div className="alert-btn-container">
              <button className="alert-btn bg-white text-light-pink font-semibold px-4 py-1 rounded-md ring-1 ring-light-pink hover:bg-light-pink hover:text-white"
                onClick={(e)=>{handelAnimation();}}
              >
                No
              </button>
              <button className="alert-btn bg-white text-light-pink font-semibold px-4 py-1 rounded-md ring-1 ring-light-pink  hover:bg-light-pink hover:text-white"
              onClick={(e)=>{handelAnimation();updateValue(index,itemDetail)}}
              >
                yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertBox;
