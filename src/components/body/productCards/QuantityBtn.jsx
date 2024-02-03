import React, { useContext } from 'react'
import { minusIcon, plusIcon } from '../../../assets/icons/img/products/data';
import { AccountContext } from '../../../context/AccountProvider';


const QuantityBtn = ({handelAddQuantity,handelMinusQuantity,handleChange,buttonDisableRef,itemDetail}) => {
  const {setShowLoginButton,showLoginButton,account} = useContext(AccountContext)

  return (
    <div className="cart-quantity space-x-4 mt-4">
    <button
      className={`quantity-btn ring-1  ring-light-pink rounded-md p-3 hover:bg-light-pink hover:text-white transition-colors`}
      onClick={handelMinusQuantity}
      ref={buttonDisableRef}
    >
      <img src={minusIcon} alt="" className="quantity-icon" />
    </button>

    {/* <span className=" font-semibold ml-2.5 focus:ring-1 focus:ring-light-pink">{itemDetail.itemQuantity}</span> */}
    <input
      type="number"
      className="quantity-input w-10 py-1 rounded-lg text-[20px] font-semibold text-center focus:ring-1 focus:ring-light-pink  "
      pattern="[0-9]{0,1}"
      maxLength={1}
      value={itemDetail?.productQuantity}
      onChange={(e) => {
        handleChange(e, itemDetail?.productQuantity);
      }}
    />
    <button
      className="quantity-btn  ring-1 ring-light-pink rounded-md p-3 hover:bg-light-pink hover:text-white transition-colors"
      onClick={(e)=>{account?handelAddQuantity(e):setShowLoginButton(true)}}
    >
      <img src={plusIcon} alt="" className="quantity-icon" />
    </button>
  </div>
  )
}

export default QuantityBtn