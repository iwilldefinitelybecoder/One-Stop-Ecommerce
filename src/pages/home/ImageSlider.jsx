import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './imageSlider.css'
import { TshirtIcon, appleWatchIcon } from "../../assets/icons/img/products/data";
import CarouselElements from "../../components/body/imageSliderDiv/CarouselElements";

function ImageSlider({ adGridInfo }) {

  adGridInfo = [
    {
      header: "50% Off on first purchase in Category T-Shirt",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem tempore quidem saepe ullam, quo iste veniam! Et explicabo rerum ullam obcaecati aperiam consequuntur accusamus omnis, corrupti blanditiis aliquam earum?",
      image: TshirtIcon,
    },
    {
      header: "50% Off on first purchase in Category watches",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem tempore quidem saepe ullam, quo iste veniam! Et explicabo rerum ullam obcaecati aperiam consequuntur accusamus omnis, corrupti blanditiis aliquam earum?",
      image: appleWatchIcon,
    }, 
    {
      header: "50% Off on first purchase in Category T-Shirt",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem tempore quidem saepe ullam, quo iste veniam! Et explicabo rerum ullam obcaecati aperiam consequuntur accusamus omnis, corrupti blanditiis aliquam earum?",
      image: TshirtIcon,
    },
    {
      header: "50% Off on first purchase in Category watches",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem tempore quidem saepe ullam, quo iste veniam! Et explicabo rerum ullam obcaecati aperiam consequuntur accusamus omnis, corrupti blanditiis aliquam earum?",
      image: appleWatchIcon,
    }, 
  ]

  return (
    <>
     <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {adGridInfo?.map((image, index) => (
          <SwiperSlide key={index}>
            <CarouselElements adGridInfo={image} />
          </SwiperSlide>
        ))}
      
      </Swiper>
  </>
  );
}

export default ImageSlider;
