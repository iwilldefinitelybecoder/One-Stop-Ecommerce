import React, { createContext, useContext, useEffect, useState } from 'react'
import { createOrder, fetchTrackingData, getAllOrders, getOrderById, getOrderDetailsById } from '../service/CustomerServices/OrderServices';
import { AccountContext } from './AccountProvider';
import { useMatch, useNavigate } from 'react-router';
import { useCart } from '../CustomHooks/CartHook';
import { sleep } from '../utils/utils';

export const OrderContext = createContext();

export const useOrders = ()=>{
    return useContext(OrderContext)
}
 

const OrderProvider = ({children}) => {
  const {account} = useContext(AccountContext)

  
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState({
      type: '',
      message: '',
    
    })
    
  
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
        products: {productId:"",quantity:0,price:0},
        couponId: '',
        useWallet: false,
        buyNow: false,
        shippingType:'',
        
    })
    const [orderSummary,setOrderSummary] = useState({
      cartTotal:0,
      tax:0.03,
      shipping:0.02,
      grandTotal:0,
      discount:0
    })


    useEffect(()=>{
      const product = orderDetails?.products
      if(product?.productId !== undefined){
          setOrderSummary(prev=>{
            let cartTotal = product?.quantity*product?.price;
            let tax = 0.03 * product?.quantity * product?.price /100;
            let shipping = 0.02 * product?.quantity * product?.price /100;
           
            let grandTotal = cartTotal + tax + shipping;

            return{...prev,cartTotal,tax,shipping,grandTotal}
          })
      }

    },[orderDetails?.products?.productId,orderDetails?.products.quantity])


    // useEffect(()=>{

    //   if(!page1 || !page2){
    //     resetOrderDetails()
    //   }
    // },[page1,page2])
    

  

    useEffect(()=>{
      if(loading)return
     getOrders();
    }
    ,[account])

    useEffect(()=>{
      resetOrderDetails()

    }
    ,[account])

    const resetOrderDetails = ()=>{
      setOrderDetails({
        orderTotal: 0,
        billingAddressId: '',
        shippingAddressId: '',
        cardId: '',
        customerId: account?.email,
        paymentMethod: '',
        paymentProcessId: '',
        paymentDetails: '',
        products: {productId:"",quantity:0,price:0},
        couponId: '',
        useWallet: false,
        buyNow: false,
    })
    setOrderSummary({
      subTotal:0,
      tax:0.03,
      shipping:0.02,
      grandTotal:0,
      discount:0
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
        if(response === "ORDER_PLACED"){
        setLoading(false)
        getOrders()
        setMessage
        ({type: 'success', message: 'Order Placed Successfully'})
        }
        else{
          setMessage
          ({type: 'error', message: 'Something Went Wrong'})
          setLoading(false)
        
        }
      
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

        const getOrderDetails = async (id)=>{
          if(loading)return
            setLoading(true)
            const response = await getOrderDetailsById(id);
            setLoading(false)
            getOrders()
            return response
          }

const getTrackingData = async (id)=>{
          if(loading)return
            setLoading(true)
            const response = await fetchTrackingData(id);
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
                                    getTrackingData,
                                    resetOrderDetails,
                                    message,
                                    getOrderDetails,
                                    setOrderSummary,
                                    orderSummary,
                                    setMessage
                                    }}>
    {children}
    </OrderContext.Provider>
    </>
  )
}

export default OrderProvider