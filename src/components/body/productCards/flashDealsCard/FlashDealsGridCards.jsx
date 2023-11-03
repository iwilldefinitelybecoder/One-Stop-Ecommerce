import React, { useEffect, useRef, useState } from "react";
import "./flashGrid.css";
import Rating from "@mui/material/Rating";
import { connect, useDispatch } from "react-redux";
import {
  TshirtIcon,
  minusIcon,
  plusIcon,
} from "../../../../assets/icons/img/products/data";
import {
  viewIcon,
  wishListIcon2,
} from "../../../../assets/icons/png/Rareicons/data";
import { randomValueGenrator } from "../../../../utils/randomId";

const FlashDealsGridCards = ({ productInfo, estimateCost, itemDetails }) => {
  const offerPercentage = productInfo.discountPrice
    ? (
        ((productInfo.price - productInfo.discountPrice) / productInfo.price) *
        100
      ).toFixed(0)
    : 0;

let index;
  const item = itemDetails?.filter((item, i) => {
    if(item.id === productInfo.id){
      index = i;
      return item
      
  }});
  console.log(index,itemDetails)
  
  const [itemDetail, setItemDetail] = useState(
    item[0] !== undefined
      ? item[0]
      : {
        ...productInfo,  
        itemQuantity:0,
        itemTotal:0,
        
      }
  );
        
        useEffect(() => {
    const item = itemDetails?.filter((item, i) => {
      if(item.id === productInfo.id){
        index = i
        return item;
    }});

    setItemDetail(
      item[0] !== undefined
        ? item[0]
        : {
          ...productInfo,
          itemQuantity:0,
          itemTotal:0,
          
        }
    );
  }, [itemDetails]);

  
  const dispatch = useDispatch();
  

  const buttonDisableRef = useRef(null);

  const handelAddQuantity = () => {
    
    const total = itemDetail.itemQuantity + 1;
    const cases = "ADD";
    setItemDetail({
      ...itemDetail,
      itemQuantity:total
    })
    
  };

  const handelMinusQuantity = () => {
    if (itemDetail.itemQuantity > 0) {
      // buttonDisableRef.current.disabled = true;
      const total = itemDetail.itemQuantity - 1;
      const cases = "MINUS";calulateTotal(total);
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: index });
    }
  };

  const calulateTotal = (total, cases) => {
    const existingItem = itemDetails.some((items,i)=>items.id === productInfo.id)
    setItemDetail((prevItemDetail) => {
      const itemTotal = prevItemDetail.price * total;
      const formattedTotal = parseFloat(itemTotal.toFixed(2));
      const cartItem = {
        ...prevItemDetail,
        itemQuantity: total,
        itemTotal: formattedTotal,
      };
      
        if(existingItem){
          dispatch({
            type: "UPDATE_ITEM",
            payload: { index,cartItem },
          });
        }else{
          dispatch({type:"ADD_ITEM",payload:cartItem})
        }
      
      return cartItem;
    });
  };

  const handleChange = (e, quantity) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "").slice(0, 2);
    if (value === "" || value === "0") {
      value = 1;
    }
    const values = parseInt(value, 10);
    let cases;

    if (quantity < values) {
      cases = "ADD";
    } else {
      cases = "MINUS";
    }

    setItemDetail({ ...itemDetail, itemQuantity: values });
    calulateTotal(values, cases);
  };

  return (
    <>
      <div className="flash-grid-body  justify-between w-full h-full ">
        <div className="flash-grid-top-cntr">
          <div className=" w-full h-6">
          <div
            className={`flsh-grd-ofr-prcnt  bg-light-pink text-white font-normal text-xs rounded-xl px-3 py-1 flex justify-center w-20`}
            style={{
              display: `${productInfo?.discountPrice > 0 ? "flex" : " none"}`,
            }}
            >
            <h5 className=" ">{offerPercentage}% off</h5>
          </div>
            </div>
          <div className="flash-grd-img-cntr w-full flex justify-center mt-4">
            <div className="flash-grid-img h-60 w-60">
              <img
                src={productInfo.image}
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div className="flash-grid-bottom-cntr flex justify-between space-y-1">
          <div
            className="flsh-grd-btm-cntr-left  justify-center"
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <div className="flsh-grd-prdt-name mb-2">
              <h5 className="text-lg font-semibold">{productInfo.name}</h5>
            </div>
            {productInfo.hasOwnProperty("rating") && (
              <div className="flsh-grd-prdt-rating">
                <Rating name="read-only" value={productInfo.rating} readOnly />
              </div>
            )}
            <div className="flsh-grd-prdt-price-add-crt  items-center">
              <div className="flsh-grd-prdt-price flex space-x-2">
                {productInfo.hasOwnProperty("discountPrice") ? (
                  <>
                    <h5 className=" text-base font-semibold text-light-pink">
                      &#8377;{productInfo.discountPrice}
                    </h5>
                    <h5 className="text-base font-semibold line-through text-slate-400 ">
                      &#8377;{productInfo.price}
                    </h5>
                  </>
                ) : (
                  <h5 className="text-base font-semibold text-light-pink ">
                    &#8377;{productInfo.price}
                  </h5>
                )}
              </div>
            </div>
          </div>
          <div
            className="flsh-grd-btm-cntr-right justify-center items-end "
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="flsh-grd-prdt-add-crt-btn">
              <div className="cart-quantity ">
                <div className="quantity-checkout flex-col space-y-2  ">
                  {itemDetail?.itemQuantity > 0 ? (
                    <>

                      {/* <span className=" font-semibold ml-2.5 focus:ring-1 focus:ring-light-pink">{itemDetail.itemQuantity}</span> */}
                      <button
                        className="quantity-btn  ring-1 bg-light-pink ring-light-pink rounded-md p-1 h-5 w-5 hover:bg-dark-pink  transition-colors"
                        onClick={handelAddQuantity}
                      >
                        <img src={plusIcon} alt="" className="quantity-icon" />
                      </button>
                      <input
                        type="number"
                        className="quantity-input w-7 py-1 rounded-lg font-semibold text-center text-sm focus:ring-1 focus:ring-light-pink  "
                        pattern="[0-9]{0,1}"
                        maxLength={1}
                        value={itemDetail?.itemQuantity}
                        onChange={(e) => {
                          handleChange(e, itemDetail?.quantity);
                        }}
                      />
                      <button
                        className={`quantity-btn ring-1  ring-light-pink rounded-md p-1 h-5 w-5 hover:bg-light-pink hover:ring-dark-pink hover:text-white transition-colors`}
                        onClick={handelMinusQuantity}
                        ref={buttonDisableRef}
                      >
                        <img src={minusIcon} alt="" className="quantity-icon" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="quantity-btn  ring-1 ring-light-pink rounded-md p-1 h-5 w-5 hover:bg-light-pink hover:text-white transition-colors"
                      onClick={handelAddQuantity}
                    >
                      <img src={plusIcon} alt="" className="quantity-icon" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" space-y-1">
          <div className="view-hover-icon" role="button">
            <img src={viewIcon} className=" h-5" />
          </div>
          <div className="wishlist-hover-icon" role="button">
            <img src={wishListIcon2} className=" h-5" />
          </div>
        </div>
      </div>
    </>
  );
};

const reduxCart = (state) => ({
  itemDetails: state.cartItems,
  estimateCost: state.estimate,
});

export default connect(reduxCart)(FlashDealsGridCards);
