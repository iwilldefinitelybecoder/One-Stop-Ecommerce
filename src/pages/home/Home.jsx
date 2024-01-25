import React from "react";
import "./home.css";
import FlashDealsGrid from "./FlashDealsGrid";
import ImageSlider from "./ImageSlider";
import { flashIcon } from "../../assets/icons/png/Rareicons/data";
import { productTypes } from "../../data/products";

const Home = () => {
  return (
    <>
    <div className="home-main-cntr home-header bg-white mb-8">
        <div className="home-pos-cntr image-slider-height ">
          <div className="image-sliding-container ">
            <ImageSlider />
          </div>
         
        </div>
      </div>
      <div className="home-main-cntr home-body flex-column ">
        <div className="home-pos-cntr">
       
          <div className="flash-Deals-grid">
            <FlashDealsGrid gridName={"New Arrivals"} typeIcon={flashIcon} type={productTypes.NEW_PRODUCT} />
          </div>
          
        </div>
        <div className="home-pos-cntr">
       
       <div className="flash-Deals-grid">
         <FlashDealsGrid  gridName={"Flash Deals"} typeIcon={flashIcon} type={productTypes.FLASH_DEAL} />
       </div>
       
     </div>
        
      </div>
    </>
  );
};

export default Home;
