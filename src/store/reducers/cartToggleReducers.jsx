import React from 'react'

const initialState = false;
const cartToggleReducers = (state = initialState,action) => {

    switch (action.type) {
        case 'TOGGLE_CART':
            return !state
        default:
            return state
    }

}

export default cartToggleReducers