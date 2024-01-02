import React, { useContext, useEffect, useState } from 'react'
import { useOrders } from '../../../context/OrderContext'
import { processPayment } from '../../../utils/processPayment'
import { useCart } from '../../../CustomHooks/CartHook'
import AccountProvider, { AccountContext } from '../../../context/AccountProvider'
import { Card, Grid, Typography, CircularProgress } from '@mui/material'; 

const PlaceOrder = () => {
    const {ordersDetails,setOrderDetails,createOrders} = useOrders();
    const {account} = useContext(AccountContext);
    const [token, setToken] = useState('')
    const {cart} = useCart();
    const [errors, setErrors] = useState({})



    
    useEffect(()=>{
        if(ordersDetails?.paymentMethod === 'COD'){
            setOrderDetails(prevOrderItems =>( { ...prevOrderItems, paymentDetails: {status: 'PENDING'},products: cart, customerId: account?.email}))
            createOrders()
        }else if(ordersDetails?.paymentMethod === 'DEBITCARD') {

            async function getPaymentToken(){
                const response = await processPayment(ordersDetails?.cardId)
                if(response.status === 'error' ){
                    setErrors({status: 'FAILED'})
                    setOrderDetails(prevOrderItems =>( { ...prevOrderItems, paymentDetails: {status: 'FAILED'},products: cart, customerId: account?.email}))
                }else{
                setOrderDetails(prevOrderItems =>( { ...prevOrderItems, paymentProcessId: response.id , paymentDetails: response, products: cart, customerId: account?.email}))
                }
            }

            getPaymentToken()
        }else if(ordersDetails?.paymentMethod === 'UPI'){

            async function getPaymentToken(){
                const response = await processPayment(ordersDetails?.cardId)
                if(response.status === 'error' ){
                    setErrors({status: 'FAILED'})
                    setOrderDetails(prevOrderItems =>( { ...prevOrderItems, paymentDetails: {status: 'FAILED'},products: cart, customerId: account?.email}))
                }else{
                setOrderDetails(prevOrderItems =>( { ...prevOrderItems, paymentProcessId: response.id , paymentDetails: response, products: cart, customerId: account?.email}))
                }
            }

            getPaymentToken()
    }
}

    ,[])

    
  

  return (
    <div>
      <OrderSummary orderData={ordersDetails} />
    </div>
  )
}




const OrderSummary = ({ orderData }) => {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      const fetchedOrderId = '123456'; 
      setOrderId(fetchedOrderId);
      setLoading(false);
    }, 2000); 
  }, []);

  return (
    <Card className="p-3 bg-white">
      <Grid container spacing={3}>
        {/* Product Information */}
        <Grid item xs={4} className="bg-white"> 
          <img src={orderData?.productImage} alt={orderData?.productName} />
          <Typography variant="h6">{orderData?.productName}</Typography>
          <Typography variant="body2">Quantity: {orderData?.quantity}</Typography>
          <Typography variant="body2">Price: ₹{orderData?.price}</Typography>
        </Grid>

        {/* Delivery and Payment Information */}
        <Grid item xs={8}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress />
            </div>
          ) : (
            <div>
              <Typography variant="h5">Order Summary</Typography>
              <Typography variant="body2">Delivery Location: {orderData?.deliveryLocation}</Typography>
              <Typography variant="body2">Payment Method: {orderData?.paymentMethod}</Typography>
              <Typography variant="h6">Order Total: ₹{orderData?.orderTotal}</Typography>
              <Typography variant="subtitle1">Order ID: {orderId}</Typography>
              {/* Add a button for payment or confirmation */}
            </div>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};




export default PlaceOrder