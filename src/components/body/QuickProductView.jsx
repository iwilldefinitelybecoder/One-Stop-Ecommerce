import { Dialog,DialogContent,IconButton,makeStyles } from "@mui/material";
import React, { useState } from "react";
import ProductImage from "../../pages/product/ProductImage";
import ProductInfo from "../../pages/product/ProductInfo";
import "./quickViewProduct.css";
import { productInfoFeatures } from "../../pages/product/ProductDetail";
import { Close } from "@mui/icons-material";


const QuickProductView = ({ open, handelClose, productDetails }) => {
    



  return (


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
          <div className="close-dialouge-btn  ">
            <IconButton onClick={handelClose} sx={{ position: "absolute", top: "0", right: "0" }}>
            <Close />
            </IconButton>
          </div>
          <div className="product-img w-[650px]">
            <ProductImage productDetails={productDetails} viewCategory={false} />
          </div>
          <div className="product-info w-[556px]">
            <ProductInfo ProductInfo={productDetails} feature={productInfoFeatures} />
          </div>
        </DialogContent>
      </Dialog>
    
  );
};

export default QuickProductView;
