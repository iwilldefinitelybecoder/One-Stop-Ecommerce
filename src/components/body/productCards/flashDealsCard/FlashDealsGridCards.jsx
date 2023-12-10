import React, { useContext, useEffect, useRef, useState } from "react";
import "./flashGrid.css";
import Rating from "@mui/material/Rating";
import { connect, useDispatch } from "react-redux";
import {
  TshirtIcon,
  minusIcon,
  plusIcon,
} from "../../../../assets/icons/img/products/data";
import {
  viewIcon,
  wishListIcon2,
} from "../../../../assets/icons/png/Rareicons/data";
import { randomValueGenrator } from "../../../../utils/randomId";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { SwiperSlide,Swiper } from "swiper/react";
import { AccountContext } from "../../../../context/AccountProvider";
import Cookies from "js-cookie";

import {useCart} from "../../../../CustomHooks/CartHook";
import { Link, useMatch } from "react-router-dom";
import useWishlist from "../../../../CustomHooks/WishListHook";
import Lottie from "react-lottie-player";
import { heartMarkGif } from "../../../../assets/icons/json/data";


const FlashDealsGridCards = ({ productInfo }) => {
  const {cart,itemExist,updateItem,addItemToCart,removeItem} = useCart()
  const {setShowLoginButton,showLoginButton,account} = useContext(AccountContext)
  const {productId,addToWishlist,removeFromWishlist,moveToCart} = useWishlist();
  const productExist =productId!==0? productId?.includes(productInfo?.productId):false
  const page = useMatch('/user/Wishlist')

  const buttonDisableRef = useRef(null);
  

  const offerPercentage = productInfo.salePrice
    ? (
        ((productInfo.regularPrice - productInfo.salePrice) / productInfo.regularPrice) *
        100
      ).toFixed(0)
      : 0;
      
      const exists = itemExist(productInfo.productId)
  const [itemDetail, setItemDetail] = useState(
    exists !==undefined?
      exists
      : {
          ...productInfo,
          images:[...productInfo.imageURL],
          productQuantity: 0,
          productTotal: 0,
        }
  );
  const [addNewItem, setAddNewItem] = useState(null);
  const [mouseHover, setMouseHover] = useState(false);

  const data = {
    productId:productInfo?.productId,
    quantity:null,
    cartItemId:exists?.cartItemsId
  }

  useEffect(() => {
    if (addNewItem !== null) {
      data.quantity = 1
      addItemToCart(data)
    }
  }, [addNewItem]);

  


  useEffect(() => {

    setItemDetail(
      exists !== undefined
        ? exists
        : {
            ...productInfo,
            // images:[...productInfo.imageURL],
            productQuantity: 0,
            productTotal: 0,
          }
    );
  }, [cart]);




  const handelAddQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const total = itemDetail.productQuantity + 1;
    setItemDetail({
      ...itemDetail,
      productQuantity: total,
    });
    calulateTotal(total);
  };

  const handelMinusQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemDetail.itemQuantity > 1) {
      // buttonDisableRef.current.disabled = true;
      const total = itemDetail.productQuantity - 1;
      setItemDetail({
        ...itemDetail,
        productQuantity: total,
      });

      calulateTotal(total);
    } else {
      
      removeItem(data.cartItemId)
    }
  };

  const calulateTotal = (total) => {
    const existingItem = exists !==undefined

    setItemDetail((prevItemDetail) => {
      const itemTotal = prevItemDetail.hasOwnProperty("salePrice")
        ? prevItemDetail.salePrice * total
        : prevItemDetail.regularPrice * total;
      const formattedTotal = parseFloat(itemTotal.toFixed(2));
     

    
      if (existingItem) {
        data.quantity = total
  
        updateItem(data);
      } else {
        data.quantity = total
        if(page){
          moveToCart(itemDetail?.productId)
      
        }else{

          setAddNewItem(data);
        }

      }

      return {...itemDetail, itemTotal: formattedTotal };
    });
  };

  const handleChange = (e, quantity) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "").slice(0, 2);
    if (value === "" || value === "0") {
      value = 1;
    }
    const values = parseInt(value, 10);
    let cases;

  

    setItemDetail({ ...itemDetail, productQuantity: values });
    calulateTotal(values);
  };

  const handelMouseEnter = () => {
    setMouseHover(true);
  };

  const handelMouseleave = () => {
    setMouseHover(false);
  };

  const handelAddToWishList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (account) {
      productId?.includes(productInfo?.productId)
        ? removeFromWishlist(productInfo?.productId)
        : addToWishlist(productInfo?.productId);
    } else {
      setShowLoginButton(true);
    }
  }

  return (
    <>
      <div
        className="flash-grid-body  justify-between w-full h-full  "
        onMouseEnter={handelMouseEnter}
        onMouseLeave={handelMouseleave}
      >
    <Link to={`/product/${productInfo?.productId}`}>
        <div className="flash-grid-top-cntr">
          <div className=" w-full h-6">
            <div
              className={`flsh-grd-ofr-prcnt  bg-light-pink text-white font-normal text-xs rounded-xl px-3 py-1 flex justify-center w-20`}
              style={{
                display: `${productInfo?.salePrice > 0 ? "flex" : " none"}`,
              }}
            >
              <h5 className=" ">{offerPercentage}% off</h5>
            </div>
          </div>
          <ItemImageSlider
            productImages={productInfo?.imageURL}
            mouseHover={mouseHover}
          />
        </div>

        <div className="flash-grid-bottom-cntr flex justify-between space-y-1">
          <div
            className="flsh-grd-btm-cntr-left  justify-center"
            style={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <div className="flsh-grd-prdt-name mb-2">
              <h5 className="text-lg font-semibold">{productInfo.name}</h5>
            </div>
            {productInfo.hasOwnProperty("rating") && productInfo.rating >0 && (
              <div className="flsh-grd-prdt-rating">
                <Rating name="read-only" value={productInfo.rating} readOnly />
              </div>
            )}
            <div className="flsh-grd-prdt-price-add-crt  items-center">
              <div className="flsh-grd-prdt-price flex space-x-2">
                {productInfo.hasOwnProperty("salePrice") ? (
                  <>
                    <h5 className=" text-base font-semibold text-light-pink">
                      &#8377;{productInfo.salePrice}
                    </h5>
                    <h5 className="text-base font-semibold line-through text-slate-400 ">
                      &#8377;{productInfo.regularPrice}
                    </h5>
                  </>
                ) : (
                  <h5 className="text-base font-semibold text-light-pink ">
                    &#8377;{productInfo.regularPrice}
                  </h5>
                )}
              </div>
            </div>
          </div>
          <div
            className="flsh-grd-btm-cntr-right justify-center items-end "
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="flsh-grd-prdt-add-crt-btn">
              <div className="cart-quantity ">
                <div className="quantity-checkout flex-col space-y-2  ">
                  {itemDetail?.productQuantity > 0 ? (
                    <>
                  
                      <button
                        className="quantity-btn  ring-1 bg-light-pink ring-light-pink rounded-md p-1 h-5 w-5 hover:bg-dark-pink  transition-colors"
                        onClick={handelAddQuantity}
                       
                      >
                        <img src={plusIcon} alt="" className="quantity-icon" />
                      </button>
                      <input
                        type="number"
                        className="quantity-input w-7 py-1 rounded-lg font-semibold text-center text-sm focus:ring-1 focus:ring-light-pink  "
                        pattern="[0-9]{0,1}"
                        maxLength={1}
                        value={itemDetail?.productQuantity}
                        onChange={(e) => {
                          handleChange(e, itemDetail?.productQuantity);
                        }}
                      />
                      <button
                        className={`quantity-btn ring-1  ring-light-pink rounded-md p-1 h-5 w-5 hover:bg-light-pink hover:ring-dark-pink hover:text-white transition-colors`}
                        onClick={handelMinusQuantity}
                        ref={buttonDisableRef}
                      >
                        <img src={minusIcon} alt="" className="quantity-icon" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="quantity-btn   ring-1 ring-light-pink rounded-md p-1 h-5 w-5 hover:bg-light-pink hover:text-white transition-colors"
                      
                      onClick={(e)=>{account?handelAddQuantity(e):setShowLoginButton(true)}}
                      title="Add to Cart"
                    >
                      <img src={plusIcon} alt="" className="quantity-icon" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" space-y-1 z-50" >
          
          {productExist?
          <div
            className="wishlist-added-icon"
            role="button"
            title="remove from WishList"
            onClick={handelAddToWishList}
          >
            <Lottie play loop={false} animationData={heartMarkGif} className=" h-[90px]" />
          </div>
            :
          <div
            className="wishlist-hover-icon"
            role="button"
            title="Add to WishList"
            onClick={handelAddToWishList}
          >
            <img src={wishListIcon2} className=" h-5" />
          </div>
          
          }
          <div className="view-hover-icon" role="button" title="view-product">
            <img src={viewIcon} className=" h-5" />
          </div>
        </div>
      </Link>
      </div>
    </>
  );
};

const reduxCart = (state) => ({
  itemsDetails: state.cartItems,
});

const ItemImageSlider = ({ productImages, mouseHover }) => {

  return !mouseHover ? (
    <div
      className="flash-grd-img-cntr-non-hover w-full h-[180px] items-center flex justify-center mt-10 mb-5"
    >
      <div className="flash-grid-img h-40 w-40">
        <img
          src={productImages[0]}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  ) : (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,

      }}
     
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {
        productImages?.map((image, index) => (
       
          <SwiperSlide key={index}  style={{height:'150px',maxWidth:'252px',padding:'0'}} className=" mt-7 mb-5">
            <div
              className="flash-grd-img-cntr w-full flex justify-center mt-4"
              key={index}
            >
              <div className="flash-grid-img h-40 w-40">
                <img src={image} alt="" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};

export default connect(reduxCart)(FlashDealsGridCards);
