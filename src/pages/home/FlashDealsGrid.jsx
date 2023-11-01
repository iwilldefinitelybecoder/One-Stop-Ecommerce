import React, { useRef, useState } from "react";
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


function FlashDealsGrid() {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
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
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        virtual
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index} className="flash-grid-cards rounded-xl shadow-lg">
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default FlashDealsGrid;
