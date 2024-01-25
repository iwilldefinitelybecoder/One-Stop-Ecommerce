import { Collapse, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { useOrders } from '../../../context/OrderContext';
import { CheckBox } from '@mui/icons-material';


const ReviewFacet = () => {

  const [batchOrders,setBatchOrders] = useState(false);
  const {orderDetails,setOrderDetails} = useOrders();
  const [errors,setErrors] = useState({})

 

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
          defaultChecked="standard"
          value={orderDetails.shippingType}
          onChange={handelOrderDetailsChange}
        >

          <FormControlLabel
            control={
              <Radio
                value="standard"
                className="mr-2"
              />
              
            }
            labelPlacement='end'
            label="Standard Shipping"
          />

          <FormControlLabel
            control={
              <Radio

                value="express"
                className="mr-2"
              />
            }
            labelPlacement='end'
            label="Express Shipping"
          />

        </RadioGroup>
        {
          errors.shippingType &&
          <span></span>
        }
      </div>
   <Collapse in={orderDetails.shippingType === "express"}>
      <div className=" ml-10 mb-4">
        <FormControlLabel
        control={
          <CheckBox
          checked={batchOrders}
          onChange={(e)=>{setBatchOrders(e.target.checked)}}
          color="primary"
          inputProps={{ 'aria-label': 'controlled-checkbox' }}
          />
        }
        labelPlacement='end'
        label="Batch Multiple Orders Together"
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
