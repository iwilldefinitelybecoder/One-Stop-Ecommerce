import React, { useEffect, useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./flashdeals.css";
import {
  flashIcon,
  rightTriangleArrowIcon,
} from "../../assets/icons/png/Rareicons/data";
import { Link } from "react-router-dom";
import FlashDealsGridCards from "../../components/body/productCards/flashDealsCard/flashDealsGridCards";

import { products } from "../../data/products";


function FlashDealsGrid() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [productinfo, setProductinfo] = useState(products);

  useEffect(() => {
    setProductinfo(products);
  }
  , [products]);
  
  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 5 }).map((_, index) => `Slide ${index + 1}`)
  );

  return (
    <>
      <div className="flash-grid-header flex justify-between">
        <div className="flash-grid-name-cntr flex cursor-default">
          <div className="flash-grid-img">
            <img src={flashIcon} alt="" className=" h-10" />
          </div>
          <div className="flash-grid-name ">
            <h3 className=" text-2xl font-semibold">Flash Deals</h3>
          </div>
        </div>
        <Link to={"/products"}>
        <div className="flash-grid-viewMore-cntr flex cursor-pointer" role="button">
          <div>
            <h5 className=" text-lg font-medium">View all</h5>
          </div>
          <div>
            <img src={rightTriangleArrowIcon} alt="" className=" h-4 mt-1 ml-2" />
          </div>
        </div>
        </Link>
      </div>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          el: ".swiper-pagination-1", 
          type: "fraction",
      
        }}
        navigation={true}
        className="flash-deals-grid-swiper"
        virtual
      >
        {productinfo?.map((product, index) => (
          <SwiperSlide key={product} virtualIndex={index} className="flash-grid-cards flex-col justify-start items-start px-4 py-4 rounded-xl shadow-lg">
            <FlashDealsGridCards  productInfo={product}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default FlashDealsGrid;
