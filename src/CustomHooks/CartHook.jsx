import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCartItem, deleteCartItem, emptyCart, getAllCartItems, updateCartItem } from '../service/CustomerServices/CartServices';
import Cookies from 'js-cookie';
import { AccountContext } from '../context/AccountProvider';
export const cartContext = React.createContext();  

export const useCart = () =>{
    return React.useContext(cartContext);

}

const CartProvider = ({children}) => {
    const cookie = Cookies.get("JWT");
    const {account} = useContext(AccountContext);
    const [cartInfo, setCartInfo] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    


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
        , [cookie, account])

    

    useEffect(() => {
        setCart(cartInfo?.productInfo);
    }, [cartInfo])

    const getAllCartItemss = async () => {
        if(loading) return;
        setLoading(true);
        const response = await getAllCartItems();
        if (response) {
            setCartInfo(response);
        }
        setLoading(false);
    };


    const addItemToCart = async (cartItemData) => {
        if(loading) return;
        setLoading(true);
        const requestData = {...data,productId:cartItemData.productId,quantity:cartItemData.quantity}

        await addCartItem(requestData);
        getAllCartItemss();
        setLoading(false);
    };
    

    const updateItem = async (itemData) => {
        if(loading) return;
        setLoading(true);
     
        const requestData = {...data,productId:itemData.productId,quantity:itemData.quantity,cartItemId:itemData.cartItemId}

        updateCartItem(requestData);
        getAllCartItemss();

       
        setLoading(false);

    };

    const removeItem = async (data) => {
        if(loading) return;
       setLoading(true);
        await deleteCartItem(data);
        getAllCartItemss();
        setLoading(false);   

    };

    const clearCart = async () => {
        if(loading) return;
        setLoading(true);
        const response = await emptyCart(cartInfo.cartId);
        getAllCartItemss();
        setLoading(false);


    }

    const estimatedCosts = () => {
        return {
            cartTotal: cartInfo?.cartTotal,
            totalItems: cartInfo?.totalItems,
            shipping:cartInfo?.shippingCharges,
            tax:cartInfo?.tax,
            discount:cartInfo?.discount,
            grandTotal: cartInfo?.grandTotal
        };

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
    value={{cartInfo, cart, addItemToCart, updateItem, removeItem, clearCart, cartTotal, totalItems, cartId, itemExist,loading,estimatedCosts }}>
        {children}
    </cartContext.Provider>
    )
}

export default CartProvider