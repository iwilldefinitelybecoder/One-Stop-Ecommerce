import { combineReducers } from "redux";
import userReducer from "./UserReducer.jsx";
import cartToggleReducers from "./cartToggleReducers.jsx";
import CartItemCountReducer from "./CartItemCountReducer.jsx";
import items from "./items.jsx";
import EstimatedCostsReducer from "./EstimatedCostsReducer.jsx";

const RootReducer = combineReducers({
    
    user: userReducer,
    cartToggle: cartToggleReducers,
    cartValue:CartItemCountReducer,
    cartItems:items,
    estimate:EstimatedCostsReducer
});

export default RootReducer;