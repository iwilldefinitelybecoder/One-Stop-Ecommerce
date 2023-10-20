import React from 'react'

const initialState = 0
const CartItemCountReducer = (state = initialState,action) => {
    switch(action.type){
        case 'cartItemCount':
            return action.payload
        default:
            return state
}
}

export default CartItemCountReducer