import React, { useEffect, useRef, useState } from "react";
import { closeIcon, editIcon, trashbinIcon } from "../../../assets/icons/png/toolbar1/data";
import {
  TshirtIcon,
  minusIcon,
  plusIcon,
} from "../../../assets/icons/img/products/data";
import { useDispatch } from "react-redux";
import {useCart} from "../../../CustomHooks/CartHook";


const cartItems = ({index,updateValue,itemDetails ,setDeleteToggle, setDeleteItem}) => {
  
  const [itemDetail, setItemDetail] = useState(itemDetails);
  const [editItem, setEditItem] = useState(false); 
  const { updateItem , removeItem, loading } = useCart();
  const buttonDisableRef = useRef(null);
  const dispatch = useDispatch();

  const handelAddQuantity = () => {
    const total = itemDetail.productQuantity + 1;
    const cases = "ADD"

    calulateTotal(total,cases);
  };

  const handelMinusQuantity = () => {
    if (itemDetail.productQuantity > 1) {
      // buttonDisableRef.current.disabled = true;
      const total = itemDetail.productQuantity - 1;
      const cases = "MINUS"
    calulateTotal(total,cases);
    }
  };

  const calulateTotal = (total, cases) => {

    const data = {
      productId:itemDetail.productId,
      quantity:total,
      cartItemId:itemDetail.cartItemsId
    }

    setItemDetail((prevItemDetail) => {
      const itemTotal = prevItemDetail.hasOwnProperty("salePrice") ? prevItemDetail.discountPrice * total : prevItemDetail.price;
      const formattedTotal = parseFloat(itemTotal?.toFixed(2));
      updateItem(data);

      return { ...prevItemDetail, productQuantity: total, itemTotal: formattedTotal };
    })

  };



  const handelEditItem = () => {
  
    setEditItem(!editItem);
    };

  const handleChange = (e,quantity) => {
    let value = e.target.value;


    value = value.replace(/\D/g, "").slice(0, 2);
    if(value === '' || value === '0'){value = 1}
    const values = parseInt(value, 10);
    let cases
  
    if(quantity < values){
        cases =  'ADD'
    }else{
        cases =  'MINUS'
    }

    setItemDetail({ ...itemDetail, productQuantity: values });
    calulateTotal(values,cases);
  };

  const handeleteDelete = (e) => {
    setDeleteToggle(true);
    setDeleteItem(itemDetail)
    removeItem(dispatch, itemDetail.cartItemsId);
  }
  

  return (
   
    <>
      <div className={`${loading? "bg-slate-100":null} cart-item-container flex`}>
        {!editItem ? (
        <div className="edit-item cursor-pointer" title="edit-item" role="button" onClick={handelEditItem}>
            <img src={editIcon} alt="edit-icon" className="edit-icon h-5 mt-12 mr-5 ml-2 " />
        </div>
        ) : (
            <div className="cart-quantity">
            <div className="quantity space-y-2">
              <button
                className="quantity-btn  ring-1 ring-light-pink rounded-full p-1 hover:bg-light-pink hover:text-white transition-colors"
                onClick={handelAddQuantity}
              >
                <img src={plusIcon} alt="" className="quantity-icon" />
              </button>
              {/* <span className=" font-semibold ml-2.5 focus:ring-1 focus:ring-light-pink">{itemDetail.productQuantity}</span> */}
              <input
                type="number"
                className="quantity-input w-7 py-1 rounded-lg font-semibold text-center focus:ring-1 focus:ring-light-pink  "
                pattern="[0-9]{0,1}"
                maxLength={1}
                disabled={loading}
                value={itemDetail.productQuantity}
                onChange={(e) => {
                  handleChange(e,itemDetail.quantity);
                }}
              />
              <button
                className={`quantity-btn ring-1  ring-light-pink rounded-full p-1 hover:bg-light-pink hover:text-white transition-colors`}
                onClick={handelMinusQuantity}
                ref={buttonDisableRef}
              >
                <img src={minusIcon} alt="" className="quantity-icon" />
              </button>
            </div>
            <div className="edit-done-btn " role="button" onClick={(e)=>{handelEditItem(e)}}>
                <button className="h-7 w-10 ring-1 ring-light-pink font-semibold text-light-pink rounded-md px-8 py-1 pt-0.5 flex justify-center align-top hover:bg-light-pink hover:text-white transition-all absolute left-72 bottom-10">
                <span className=" font-semibold">Done?</span>
                </button>
            </div>
          </div>
        )
        }
        <div className="item-image">
          <img src={itemDetail.productImageURL[0]} alt="" />
        </div>
        <div className="item-description">
          <span className=" text-md font-semibold py-1">{itemDetail.productName}</span>
          <span className=" text-slate-400 text-sm ">
            &#8377;{itemDetail.salePrice || itemDetail.regularprice}&nbsp;x&nbsp;{itemDetail.productQuantity}
          </span>
          <span className=" text-light-pink font-semibold py-1">
            &#8377;{itemDetail.productTotal}
          </span>
        </div>
        {
            !editItem &&
        <div className="delete-item-container " >
          <div className="delete-item" onClick={e=>{handeleteDelete(e)}}>
            <img src={trashbinIcon} alt="" className=" h-4" />
          </div>
        </div>
        }
      </div>     
    </>

  );
};

export default cartItems;
