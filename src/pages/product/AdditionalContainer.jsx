import React, { useEffect, useState } from 'react'
import useProducts from '../../CustomHooks/ProductsHook'
import { useParams } from 'react-router'
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FlashDealsGridCards from '../../components/body/productCards/flashDealsCard/flashDealsGridCards';
import { flashIcon, rightTriangleArrowIcon } from '../../assets/icons/png/Rareicons/data';
import { Link } from 'react-router-dom';


const AdditionalContainer = ({category}) => {
  const {fetchProductsByCategory,loading,products} = useProducts()
  const [swiperRef, setSwiperRef] = useState(null);
  const params = useParams()
  const {id} = params

  useEffect(()=>{
    fetchProductsByCategory(category)
  },[id])

  return (
    <>
     <div className="flash-grid-header flex justify-between">
        <div className="flash-grid-name-cntr flex cursor-default">
          {/* <div className="flash-grid-img">
            <img src={flashIcon} alt="" className=" h-10" />
          </div> */}
          <div className="flash-grid-name ">
            <h3 className=" text-2xl font-semibold">Similar Products</h3>
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
    width={1200}
    navigation={true}
    className="flash-deals-grid-swiper"
    virtual
    initialSlide={1}
  >
    {products?.map((product, index) => (
      <SwiperSlide key={product} virtualIndex={index} className="flash-grid-cards flex-col justify-start items-start px-4 py-4 rounded-xl shadow-lg hover:shadow-2xl  transition-all">
        <FlashDealsGridCards key={index}  productInfo={product}/>
      </SwiperSlide>
    ))}
  </Swiper>
    </>
  )
}

export default AdditionalContainer