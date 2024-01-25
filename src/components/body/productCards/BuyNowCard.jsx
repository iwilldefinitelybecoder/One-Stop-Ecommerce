import { Dialog,DialogContent,makeStyles } from "@mui/material";
import React, { useEffect } from "react";

import "../quickViewProduct.css";
import ProductImage from "../../../pages/product/ProductImage";
import ProductInfo from "../../../pages/product/ProductInfo";
import { useOrders } from "../../../context/OrderContext";

const productInfo = {
    addToCartBtn:false,
    buyNow:true,
    ratingPanel:false,
    checkoutBtn:true,
}
const BuyNowCard  = ({ open, setOpen, productDetails }) => {
 

    const {orderDetails,setOrderDetails} = useOrders();

    useEffect(()=>{
        setOrderDetails((prev) => ({
            ...prev,
            products: {
              ...prev.products,
              quantity:1,
              productId:productDetails.productId,
              price:productDetails.salePrice > 0 ? productDetails.salePrice : productDetails.regularPrice
            }
            ,buyNow:true,
          }));
    },[productDetails])
    
    const handelClose = () => {
      setOpen(false);
    };
  
  
    return (
      <>
        <Dialog open={open} onClose={handelClose}
          sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
               
                  width: "100%",
                  maxWidth: "1000px", 
                  maxHeight:"615px"
                },
              },
              }}
        >
          <DialogContent sx={{ padding: '0px', margin: '0px',display:"flex",justifyContent:'center',alignItems:'start' }}>
            <div className="product-img w-[650px]">
              <ProductImage productDetails={productDetails} viewCategory={false} />
            </div>
            <div className="product-info w-[556px]">
              <ProductInfo ProductInfo={productDetails} feature={productInfo} />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  

export default BuyNowCard