import React from 'react'

const initialState = {
  subTotal: 0,
  shipping: 0,
  tax: 0,
  discount: 0,
  addedAll: 0,
}
const EstimatedCostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'estimatedCosts':
        return action.payload
        default:
        return state
    }
}

export default EstimatedCostsReducer