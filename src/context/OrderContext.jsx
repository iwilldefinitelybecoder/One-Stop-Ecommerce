import React, { createContext, useContext, useEffect, useState } from 'react'
import { createOrder, getAllOrders, getOrderById } from '../service/CustomerServices/OrderServices';

export const OrderContext = createContext();

export const useOrders = ()=>{
    return useContext(OrderContext)
}

const OrderProvider = ({children}) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [orderDetails, setOrderDetails] = useState({
        orderId: '',
        orderTotal: 0,
        billingAddress: '',
        shippingAddress: '',
        cardId: '',
        customerId: '',
        paymentMethod: '',
        paymentProcessId: '',
        paymentId: '',
        products: [],
    })

    useEffect(()=>{
      if(loading)return
        setLoading(true)
        async function fetchOrders(){
           const response  = await getAllOrders()
            setOrders(response)
            setLoading(false)
        }
        fetchOrders()
    }
    ,[])

    const createOrders = async ()=>{
      if(loading)return
        setLoading(true)
        const response = await createOrder(orderDetails)
        setOrders([...orders, response])
        setLoading(false)
      }

      const getorderById = async (id)=>{
        if(loading)return
          setLoading(true)
          const response = await getOrderById(id)
          setLoading(false)
          return response
        }



  return (
    <>
    <OrderContext.Provider value={{orderDetails,
                                    setOrderDetails,
                                    loading,
                                    createOrders,
                                    getorderById
                                    }}>
    {children}
    </OrderContext.Provider>
    </>
  )
}

export default OrderProvider