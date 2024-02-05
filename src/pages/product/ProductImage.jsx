import { Button, IconButton, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import MagnifiedImg from "./MagnifiedImg";
import { ArrowLeftOutlined, ChevronLeft, ChevronRight, HeartBroken } from "@mui/icons-material";
import useWishlist from "../../CustomHooks/WishListHook";
import { useMatch } from "react-router";
import Lottie from "react-lottie-player";
import { heartMarkGif } from "../../assets/icons/json/data";
import { wishListIcon2 } from "../../assets/icons/png/Rareicons/data";
import { rightArrowIcon } from "../../assets/icons/png/toolbar-icons/data";
import { Link } from "react-router-dom";
import styled from "styled-components";


const CarouselIcon = styled(IconButton)`
  font-size: 30px;
  cursor: pointer;
  color: black;
`;


const ProductImage = ({ productDetails, viewCategory, loading }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImage, setMainImage] = useState(Array.isArray(productDetails?.imageURL) && productDetails?.imageURL[0]);
  const { productExistsInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [sliderPosition, setSliderPosition] = useState(0);
  const productId = useMatch("/product/:id")?.params.id;
  useEffect(() => {
    setMainImage(productDetails?.imageURL && productDetails?.imageURL[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    setMainImage(productDetails?.imageURL && productDetails?.imageURL[0]);

  }, [productDetails?.imageURL]);

  const exists = productExistsInWishlist(productId);

  const handelWishList = () => {
    if (exists) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const handleCarouselClick = (e, direction) => {
    e.stopPropagation();
    if (direction === -1) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setSliderPosition((prev) => prev - 90);
      }
    } else {
      if (currentIndex < productDetails?.imageURL?.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSliderPosition((prev) => prev + 90);
      }
    }
  }

  const handelSepcialCharacters = (category) => {
    return category?.replace(/&/g, "%26")?.replace(/ /g, "+");
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className=" items-center px-10 py-8  space-y-8 w-full h-max relative "
    >
      <div onClick={handelWishList}>
        {
          

            loading ?
            <Skeleton variant="rect" animation="wave" width={300} height={30} />
            :
            viewCategory &&
            
            <>
            <div className="category-flow absolute left-0 flex items-center space-x-1 w-full justify-start underline text-facebook-blue hover:cursor-pointer hover:text-blue-900">
              <Link to="/">
                <span className="text-lg font-semibold">Home</span>
              </Link>

              <img src={rightArrowIcon} className="h-3" />
              <Link to={`/search?category=${handelSepcialCharacters(productDetails?.category)}`}>
                <span className="text-lg font-semibold">{productDetails?.category}</span>
              </Link>
              <img src={rightArrowIcon} className="h-3" />
              <Link to={`/search?q=${productDetails?.name}`}>
                <span className="text-lg font-semibold ">{productDetails?.name}</span>
              </Link>
            </div>
            </>
            
        }



        <div className=" w-full flex justify-end tooltip ">

          {exists ? (
            <div className=" absolute right-[-3px] top-[12px]   hover:cursor-pointer " title="Remove From Wishlist">
              <span class="tooltiptext">Remove From playList</span>
              <Lottie
                className="w-[350px] h-[340px]"
                play
                resizeMode="center"

                loop={false}
                animationData={heartMarkGif}
                style={{ height: "130px", width: "130px", padding: '0px', margin: '0px' }}

              />
            </div>
          ) : (
            <div className=" absolute right-10 top-[55px] hover:bg-slate-200 rounded-full p-2 hover:cursor-pointer" title="Add To Wishlist">
              <span class="tooltiptext">Add To WishList</span>
              <img src={wishListIcon2} className=" h-7" />
            </div>
          )}
        </div>
      </div>
      <div className="main-img-cntr w-[350px] h-[340px] ">
        {mainImage && <MagnifiedImg loading={loading} image={mainImage} />}
      </div>
      <div className="flex">
        <div
          className=" flex-column items-center justify-center mt-6 w-[40px] h-[40px] rounded-full bg-slate-100 hover:bg-slate-200 hover:cursor-pointer"
          aria-disabled={currentIndex === 0}
          color="inherit"
          onClick={(e) => handleCarouselClick(e, -1)}

        >
          <ChevronLeft />
        </div>
        <div className="choose-img-cntr w-[270px] overflow-hidden h-[90px]  relative">
          <div className=" flex absolute left-[90px] transition-all  top-0"
            style={{ transform: `translateX(-${sliderPosition}px)` }}
          >
            {
              loading ?
                Array.from({ length: 3 }, (_, i) => i).map((_, index) => {
                  return (
                    <div
                      className={`choose-img bg-white  rounded-md mx-5 flex justify-center items-center w-[60px] h-[60px] ring-1 ring-slate-300 shadow-md w-[55px] h-[55px]  hover:cursor-pointer `}

                      key={index}
                    >
                      <Skeleton variant="rect" animation="wave" width={60} height={60} />
                    </div>
                  );
                }
                )
                :


                productDetails?.imageURL?.map((image, index) => {
                  return (
                    <Button
                      onClick={() => { setCurrentIndex(index); setSliderPosition(index * 90) }}
                      className="w-[90px] h-[90px] "
                      key={index}
                    >
                      <div
                        className={`choose-img bg-white  rounded-md mx-1 p-2 flex justify-center items-center w-[60px] h-[60px] ${index === currentIndex
                          ? " ring-1 ring-light-pink w-[75px] h-[70px] shadow-2xl"
                          : "ring-1 ring-slate-300 hover:ring-black shadow-md w-[55px] h-[55px]  hover:cursor-pointer "
                          }`}
                        style={{
                          backgroundImage: `url(${image?.imagePreview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        key={index}

                      >
                        <img
                          src={image?.imageURL}
                          onLoad={(e) => {
                            e.target.style.opacity = 1;
                          }}
                          style={{

                            opacity: 0,
                            transition: "opacity 0.5s ease-in-out",
                          }}
                        />
                      </div>
                    </Button>
                  );
                })}

          </div>
        </div>
        <div
          className=" flex-column items-center justify-center mt-6 w-[40px] h-[40px] rounded-full bg-slate-100 hover:bg-slate-200 hover:cursor-pointer"
          color="inherit"
          onClick={(e) => handleCarouselClick(e, 1)}
          disabled={currentIndex === productDetails?.imageURL?.length - 1}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
