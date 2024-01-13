import React, { createContext, useContext, useEffect, useState } from 'react'
import { createOrder, getAllOrders, getOrderById } from '../service/CustomerServices/OrderServices';
import { AccountContext } from './AccountProvider';

export const OrderContext = createContext();

export const useOrders = ()=>{
    return useContext(OrderContext)
}

const OrderProvider = ({children}) => {
  const {account} = useContext(AccountContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [orderDetails, setOrderDetails] = useState({
        orderId: '',
        orderTotal: 0,
        billingAddressId: '',
        shippingAddressId: '',
        cardId: '',
        customerId: account?.email,
        paymentMethod: '',
        paymentProcessId: '',
        paymentDetails: '',
        products: [],
        couponId: '',
        useWallet: false,
        buyNow: false,
    })

    

  

    useEffect(()=>{
      if(loading)return
        setLoading(true)
        async function fetchOrders(){
          if(!account)return
           const response  = await getAllOrders()
            setOrders(response)
            setLoading(false)
        }
        fetchOrders()
    }
    ,[account])

    useEffect(()=>{
      resetOrderDetails()
    }
    ,[account])

    const resetOrderDetails = ()=>{
      setOrderDetails({
        orderId: '',
        orderTotal: 0,
        billingAddressId: '',
        shippingAddressId: '',
        cardId: '',
        customerId: account?.email,
        paymentMethod: '',
        paymentProcessId: '',
        paymentDetails: '',
        products: [],
        couponId: '',
        useWallet: false,
        buyNow: false,
    })
    }



    const getOrders = async ()=>{
      if(loading)return
        setLoading(true)
        const response = await getAllOrders()
        setOrders(response)
        setLoading(false)
      }

    const createOrders = async ()=>{
      if(loading)return
        setLoading(true)
        const response = await createOrder(orderDetails)
        console.log(response)
        setLoading(false)
        getOrders()
      }

      const getorderById = async (id)=>{
        if(loading)return
          setLoading(true)
          const response = await getOrderById(id)
          console.log(response)
          setLoading(false)
          getOrders()
          return response
        }



  return (
    <>
    <OrderContext.Provider value={{orderDetails,
                                    orders, 
                                    setOrders,
                                    setOrderDetails,
                                    loading,
                                    createOrders,
                                    getorderById,
                                    resetOrderDetails
                                    }}>
    {children}
    </OrderContext.Provider>
    </>
  )
}

export default OrderProvider