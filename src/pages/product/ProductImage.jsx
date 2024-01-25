import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MagnifiedImg from "./MagnifiedImg";
import { HeartBroken } from "@mui/icons-material";
import useWishlist from "../../CustomHooks/WishListHook";
import { useMatch } from "react-router";
import Lottie from "react-lottie-player";
import { heartMarkGif } from "../../assets/icons/json/data";
import { wishListIcon2 } from "../../assets/icons/png/Rareicons/data";
import { rightArrowIcon } from "../../assets/icons/png/toolbar-icons/data";
import { Link } from "react-router-dom";

const ProductImage = ({ productDetails,viewCategory }) => {
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImage, setMainImage] = useState(Array.isArray(productDetails?.imageURL) && productDetails?.imageURL[0]);
  const { productExistsInWishlist,addToWishlist,removeFromWishlist } = useWishlist();
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className=" items-center px-10 py-8  space-y-8 w-full h-max relative "
    >
      <div  onClick={handelWishList}>
   {
    viewCategory &&
    <div className="category-flow absolute left-0 flex items-center space-x-1 w-full justify-start underline text-facebook-blue hover:cursor-pointer hover:text-blue-900">
       <Link to="/">
        <span className="text-lg font-semibold">Home</span>
        </Link>

        <img src={rightArrowIcon} className="h-3" />
        <Link to="/search">
        <span className="text-lg font-semibold">{productDetails?.category}</span>
        </Link>
        <img src={rightArrowIcon} className="h-3" />
        <Link to={`/search?q=${productDetails?.name}`}>
        <span className="text-lg font-semibold ">{productDetails?.name}</span>
        </Link>
    </div>
    }


        <div className=" w-full flex justify-end tooltip "> 
       
          {exists ? (
            <div className=" absolute right-[-3px] top-[12px]   hover:cursor-pointer "  title="Remove From Wishlist">
                <span class="tooltiptext">Remove From playList</span>
            <Lottie
              className="w-[350px] h-[340px]"
              play
              resizeMode="center"
                
              loop={false}
              animationData={heartMarkGif}
              style={{height:"130px",width:"130px",padding:'0px',margin:'0px'}}
              
              />
              </div>
          ) : (
            <div className=" absolute right-10 top-[55px] hover:bg-slate-200 rounded-full p-2 hover:cursor-pointer"  title="Add To Wishlist"> 
                 <span class="tooltiptext">Add To WishList</span>
                <img src={wishListIcon2} className=" h-7" />
            </div>
          )}
        </div>
      </div>
      <div className="main-img-cntr w-[350px] h-[340px] ">
        {mainImage && <MagnifiedImg image={mainImage} />}
      </div>
      <div className="choose-img-cntr flex">
        {productDetails?.imageURL?.map((image, index) => {
          return (
            <Button
              onClick={() => setCurrentIndex(index)}
              className="w-[90px] h-[90px] "
              key={index}
            >
              <div
                className={`choose-img bg-white rounded-md mx-2 p-3 flex justify-center items-center w-[60px] h-[60px] ${
                  index === currentIndex
                    ? " ring-1 ring-light-pink"
                    : "ring-1 ring-slate-300 hover:ring-black"
                }`}
                key={index}
              >
                <img src={image} />
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImage;
