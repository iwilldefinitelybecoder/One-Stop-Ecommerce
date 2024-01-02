import { Dialog,DialogContent,makeStyles } from "@mui/material";
import React from "react";
import ProductImage from "../../pages/product/ProductImage";
import ProductInfo from "../../pages/product/ProductInfo";
import "./quickViewProduct.css";


const QuickProductView = ({ open, setOpen, productDetails }) => {
    
  const handelClose = () => {
    setOpen(false);
  };



  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} 
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
            <ProductImage images={productDetails?.imageURL} />
          </div>
          <div className="product-info w-[556px]">
            <ProductInfo ProductInfo={productDetails} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickProductView;
