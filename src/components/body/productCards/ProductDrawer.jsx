import { Collapse, FormControlLabel, Switch } from '@mui/material'
import React, { useState } from 'react'
import useProducts from '../../../CustomHooks/ProductsHook'
import CustomizedSwitch from '../../singularComponents/Switch';

const ProductDrawer = ({order,index,handelProductContainer,productContainerIndex}) => {

    const {publishAproduct}  = useProducts();
    
    const [orders, setOrders] = useState(order);
    console.log(orders.enabled)

    const handelDrawerClose = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        handelProductContainer(index)
      }
    
      const handelPublishChange = (e) => {
        
        setOrders(prev => {
          const updatedOrders = { ...prev, enabled: !prev.enabled };
          publishAproduct(updatedOrders.productId); 
          return updatedOrders; 
        });
      };
  return (
    <Collapse in={productContainerIndex[index]}>
        <div className='prduct-drawer-body w-full h-auto bg-white mb-5 cursor-default px-6 py-2' onClick={(e)=>{e.stopPropagation();e.preventDefault()}} >
        <div  className="order-table-row">
                <FormControlLabel control={<CustomizedSwitch onClick={handelPublishChange} i checked={orders.enabled} />} label={orders.enabled ? "Published" : "concealed"} 
                onClick={(e)=>{e.stopPropagation();e.preventDefault()}}
                /> 
            
              </div>
              <button className='Btn3' onClick={handelDrawerClose}>Close</button>
        </div>
    </Collapse>
  )
}

export default ProductDrawer