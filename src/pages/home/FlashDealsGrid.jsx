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


import useProducts from "../../CustomHooks/ProductsHook";
import { getProductByAttributes } from "../../service/ProductServices";


function FlashDealsGrid({ gridName, type, typeIcon = flashIcon }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [productinfo, setProductinfo] = useState([]);

  const { products } = useProducts();
  useEffect(() => {
    async function fetchProducts() {
      const response = await getProductByAttributes(type);
      if (response)
        setProductinfo(response);
    }
    fetchProducts()
  }

    , [products])


  return (
    <>
      <div className="flash-grid-header flex justify-between">
        <div className="flash-grid-name-cntr flex cursor-default">
          <div className="flash-grid-img">
            <img src={typeIcon} alt="" className=" h-10" />
          </div>
          <div className="flash-grid-name ">
            <h3 className=" text-2xl font-semibold">{gridName}</h3>
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
      {
        productinfo?.length > 0 ?

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
            initialSlide={1}
          >


            {
              productinfo?.map((product, index) => (
                <SwiperSlide key={product} virtualIndex={index} className="flash-grid-cards flex-col justify-start items-start px-4 py-4 rounded-xl shadow-lg hover:shadow-2xl  transition-all">
                  <FlashDealsGridCards key={index} productInfo={product} />
                </SwiperSlide>
              ))


            }

          </Swiper>
          :
          <div className="h-full w-full flex justify-center items-center font-semibold text-2xl">No Products To Show </div>
      }
    </>
  );
}

export default FlashDealsGrid;
