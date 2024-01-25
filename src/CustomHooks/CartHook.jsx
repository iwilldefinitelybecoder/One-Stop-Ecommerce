import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCartItem,
  deleteCartItem,
  emptyCart,
  getAllCartItems,
  updateCartItem,
} from "../service/CustomerServices/CartServices";
import Cookies from "js-cookie";
import { AccountContext } from "../context/AccountProvider";
import useCoupons from "./CouponHook";
import { useOrders } from "../context/OrderContext";
import { sleep } from "../utils/utils";
export const cartContext = React.createContext();

export const useCart = () => {
  return React.useContext(cartContext);
};

const CartProvider = ({ children }) => {
  const cookie = Cookies.get("JWT");
  const { account } = useContext(AccountContext);
  const [cartInfo, setCartInfo] = useState([]);
  const [cart, setCart] = useState([]);

  const [discountedSummary, setDiscountedSummary] = useState({
    cartTotal: 0,
    tax: 0,
    shipping: 0,
    totalBeforeDiscount: 0,
    discountPercentage: 0,
    discountAmount: 0,
    grandTotal: 0,
  });
  const [loading, setLoading] = useState(false);
  const { fetchAllCoupons } = useCoupons();

  const data = {
    cartId: cartInfo?.cartId,
    productId: null,
    quantity: null,
    cartItemId: null,
  };

  useEffect(() => {
    async function fetchCart() {
      const response = await getAllCartItems();
      setCartInfo(response);
    }
    fetchCart();
  }, [cookie, account]);

  useEffect(() => {
    setCart(cartInfo?.productInfo);
  }, [cartInfo]);

  const getAllCartItemss = async () => {
    if(!account)return
    if (loading) return;
    setLoading(true);
    const response = await getAllCartItems();
    if (response) {
      setCartInfo(response);
    }
    setLoading(false);
  };

  const addItemToCart = async (cartItemData) => {
    if (loading) return;
    setLoading(true);
    const requestData = {
      ...data,
      productId: cartItemData.productId,
      quantity: cartItemData.quantity,
    };

    await addCartItem(requestData);
    getAllCartItemss();
    setLoading(false);
  };

  const updateItem = async (itemData) => {
    if (loading) return;
    setLoading(true);

    const requestData = {
      ...data,
      productId: itemData.productId,
      quantity: itemData.quantity,
      cartItemId: itemData.cartItemId,
    };

    updateCartItem(requestData);
    await getAllCartItemss();

    await fetchAllCoupons(account.email);
    await sleep(200);
    setLoading(false);
  };

  const removeItem = async (data) => {
    if (loading) return;
    setLoading(true);
    await deleteCartItem(data);
    await getAllCartItemss();
    await fetchAllCoupons(account.email);
    setLoading(false);
  };

  const clearCart = async () => {
    if (loading) return;
    setLoading(true);
    const response = await emptyCart(cartInfo.cartId);
    await getAllCartItemss(account.email);
    setLoading(false);
  };

  const estimatedCosts = () => {
    return {
      cartTotal: cartInfo?.cartTotal,
      totalItems: cartInfo?.totalItems,
      shipping: cartInfo?.shippingCharges,
      tax: cartInfo?.tax,
      discount: cartInfo?.discount,
      grandTotal: cartInfo?.grandTotal,
    };
  };

  function calculateDiscountedSummary(
    offerPercentage,
    maxDiscountPrice,
    cartTotal = cartInfo?.cartTotal,
    tax = cartInfo?.tax,
    shipping= cartInfo?.shippingCharges
  ) {
    
    const totalBeforeDiscount = cartTotal + tax + shipping;
    const discountAmount = (offerPercentage / 100) * totalBeforeDiscount;
    const applicableDiscount = Math.min(discountAmount, maxDiscountPrice);
    const grandTotal = totalBeforeDiscount - applicableDiscount;
    const data = {
      cartTotal,
      tax,
      shipping,
      totalBeforeDiscount,
      discountPercentage: offerPercentage,
      discountAmount: applicableDiscount,
      grandTotal,
    };
    setDiscountedSummary(data);
  }

  const cartTotal = () => {
    return cartInfo?.cartTotal;
  };

  const totalItems = () => {
    return cartInfo?.totalItems;
  };

  const cartId = () => {
    return cartInfo?.cartId;
  };

  const itemExist = (id) => {
    return cart?.find((item) => item.productId === id);
  };

  return (
    <cartContext.Provider
      value={{
        cartInfo,
        cart,
        getAllCartItemss,
        addItemToCart,
        updateItem,
        removeItem,
        clearCart,
        calculateDiscountedSummary,
        discountedSummary,
        cartTotal,
        totalItems,
        cartId,
        itemExist,
        loading,
        estimatedCosts,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
