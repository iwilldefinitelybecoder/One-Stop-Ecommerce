import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCartItem, deleteCartItem, getAllCartItems, updateCartItem } from '../service/CustomerServices/CartServices';

export const cartContext = React.createContext();  

export const useCart = () =>{
    return React.useContext(cartContext);

}

const CartProvider = ({children}) => {
    const [cartInfo, setCartInfo] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();

    const data = {
        cartId: cartInfo?.cartId,
        productId: null,
        quantity: null,
        cartItemId: null
    }

    useEffect(() => {
        async function fetchCart() {
            const response = await getAllCartItems();
            setCartInfo(response);
        }
        fetchCart();
    }
        , [])

    useEffect(() => {
        dispatch({ type: "SET_CART", payload: cart });
    }, [cart])

    useEffect(() => {
        setCart(cartInfo?.productInfo);
    }, [cartInfo])

    const addItemToCart = async (cartItemData) => {
        if(loading) return;
        setLoading(true);
        const requestData = {...data,productId:cartItemData.productId,quantity:cartItemData.quantity}

        const response = await addCartItem(requestData);
        if (response) {
            setCart([...cart, {...response}]);
            dispatch({ type: "SET_CART", payload:response});                
        }
        setLoading(false);
    };
    console.log(cart)   

    const updateItem = async (itemData) => {
        if(loading) return;
        setLoading(true);
     
        const requestData = {...data,productId:itemData.productId,quantity:itemData.quantity,cartItemId:itemData.cartItemId}

        const response = await updateCartItem(requestData);

        if (response) {
            dispatch({ type: "UPDATE_ITEM", payload: { ...response } });
        }
        setLoading(false);

    };

    const removeItem = async (data) => {
        if(loading) return;
       setLoading(true);
        const response = await deleteCartItem(data);


        if (response) {
            dispatch({ type:"SET_CART",payload:response })
        }
        setLoading(false);

    };

    const clearCart = async () => {
        if(loading) return;
        setLoading(true);
        const response = await emptyCart(cartInfo.cartId);
        if (response) {
            dispatch({ type: "CLEAR_CART" });
        }
        setLoading(false);


    }
  
    const cartTotal = ()=>{
        return cartInfo?.cartTotal;
    }

    const totalItems = ()=>{
        return cartInfo?.totalItems;
    }

    const cartId = ()=>{
        return cartInfo?.cartId;
    }

    const itemExist = (id)=>{
        return cart?.find((item)=>item.productId === id);
    }

    
    return(
    <cartContext.Provider 
    value={{ cart, addItemToCart, updateItem, removeItem, clearCart, cartTotal, totalItems, cartId, itemExist,loading }}>
        {children}
    </cartContext.Provider>
    )
}

export default CartProvider