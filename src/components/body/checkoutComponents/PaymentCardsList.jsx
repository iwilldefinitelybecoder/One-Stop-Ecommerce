import React from 'react'
import { getCardProvider } from '../../../pages/user/payment-methods/PaymentMethods'
import { FormControlLabel, Radio } from '@mui/material'

const PaymentCardsList = ({card,loading}) => {




  return (
    <div
    className={` ${
      loading ? "bg-slate-100" : "bg-white"
    } order-table-rows shadow-md py-7 pl-3 items-center space-x-0`}
  >
    <div className="order-table-row flex w-64 items-center">
    <FormControlLabel
            value={card.cardId}
            control={<Radio />}

          />
      <div>
        <img
          src={getCardProvider(card.cardType)}
          className=" h-7 mr-5"
        />
      </div>
      <span className="font-semibold text-lg text-slate-600">
        {card.cardHolderName}
      </span>
    </div>
    <div className="order-table-row w-64">
      <span
        className={`
)} px-3 py-1.5 rounded-2xl font-semibold text-lg text-slate-600 `}
      >
        {card.cardNumber}
      </span>
    </div>
    <div className="order-table-row font-semibold text-lg text-slate-600">
      <span>{card.expireDate}</span>
    </div>

    
  </div>
  )
}

export default PaymentCardsList