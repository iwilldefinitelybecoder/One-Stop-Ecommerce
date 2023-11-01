import React from "react";
import "./home.css";
import FlashDealsGrid from "./FlashDealsGrid";
import ImageSlider from "./ImageSlider";

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
      <div className="home-main-cntr home-body ">
        <div className="home-pos-cntr">
       
          <div className="flash-Deals-grid">
            <FlashDealsGrid />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
