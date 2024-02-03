import { Checkbox, Collapse, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useOrders } from '../../../context/OrderContext';
import { useCart } from '../../../CustomHooks/CartHook';



const ReviewFacet = () => {

  const [batchOrders,setBatchOrders] = useState(true);
  const {estimatedCosts} = useCart();
  const [estimatedCost,setEstimatedCosts] = useState();
  const {orderDetails,setOrderDetails,orderSummary} = useOrders();
  const [errors,setErrors] = useState({})

  useEffect(() => {
    setOrderDetails(prev=>({...prev,shippingType:"STANDARD"}))
  }, [])

  useEffect(()=>{

    if(orderDetails.buyNow){
     setEstimatedCosts(orderSummary)
    }else{

      setEstimatedCosts(estimatedCosts());
    }
    
  },[])

  const handelOrderDetailsChange = (e) => {
    const { value ,name} = e.target;
    setOrderDetails(prev=>({...prev,[name]:value}))

  }

  const handleSubmit = () => {
    const error = {};
      if(orderDetails.shippingType === "")error.shippingType = "Choose a Shipping Mehthod"

      setErrors(error);
   
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Shipping Preferences</h1>

      <div className="mb-2">
        <RadioGroup
          aria-label="shipping"
          name="shippingType"
          defaultValue="STANDARD"
          value={orderDetails.shippingType}
          onChange={handelOrderDetailsChange}
        >

          <FormControlLabel
            control={
              <Radio
                value="STANDARD"
                className="mr-2"
              />
              
            }
            labelPlacement='end'
            label="Standard Shipping  &nbsp;&nbsp;&nbsp; + &#8377;100"
          />

          <FormControlLabel
            control={
              <Radio

                value="EXPRESS"
                className="mr-2"
              />
            }
            labelPlacement='end'
            label="Express Shipping &nbsp;&nbsp;&nbsp; + &#8377;300"
          />

        </RadioGroup>
        {
          errors.shippingType &&
          <span></span>
        }
      </div>
   <Collapse in={orderDetails.shippingType === "EXPRESS"}>
      <div className=" ml-10 mb-4">
      <FormControlLabel 
        labelPlacement="end"
        control={
        <Checkbox
        checked={batchOrders}  // Controlled by state
        onChange={(e)=>{setBatchOrders(e.target.checked)}}  // Controlled by handler function
        color="primary"
        inputProps={{ 'aria-label': 'controlled-checkbox' }}
      />
        }
        label="Batch multiple orders into single shipment"
        />
      </div>
        </Collapse>
      <button
        onClick={handleSubmit}
        className=" Btn3 focus:outline-none focus:shadow-outline"
      >
        Save Preferences
      </button>
    </div>
  );
};




export default ReviewFacet;
