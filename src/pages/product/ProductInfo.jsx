import { Rating } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../../CustomHooks/CartHook";
import { useParams } from "react-router";
import useWishlist from "../../CustomHooks/WishListHook";
import { minusIcon, plusIcon } from "../../assets/icons/img/products/data";
import {
  char0ToUpper,
  getStockStatusColor,
  getStockStatusMessage,
} from "../../utils/utils";
import NumberCount from "../../components/body/UtilsComponent/NumberCount";
import ProductDescription from "./ProductDescription";
import { productTagStringIcon } from "../../assets/icons/png/Rareicons/data";
import RatingPanel from "./RatingPanel";

const ProductInfo = ({ ProductInfo }) => {
  const { addItemToCart, itemExist } = useCart();
  const { moveItemToWishlist } = useWishlist();
  const [itemDetail, setItemDetail] = useState({});
  const ratingData = { '5': 30, '4': 25, '3': 15, '2': 10, '1': 5 };

  const productId = useParams().id;

  const exists = itemExist(productId);

  useEffect(() => {
    setItemDetail(exists);
  }, [exists]);

  const offerPercentage = ProductInfo?.salePrice
    ? (
        ((ProductInfo.regularPrice - ProductInfo.salePrice) /
          ProductInfo.regularPrice) *
        100
      ).toFixed(0)
    : 0;

  const handleAddToCart = () => {
    const data = {
      productId: productId,
      quantity: 1,
    };
    addItemToCart(data);
  };

  const handelMoveToWishlist = () => {
    const productId = itemDetail.productId;
    const cartItemId = itemDetail.cartItemsId;

    moveItemToWishlist(cartItemId, productId);
  };

  console.log(ProductInfo);

  return (
    <>
      <div className="space-y-4 ml-10 mt-10">
        <div className="product-title text-3xl font-semibold ">
          <span>{char0ToUpper(ProductInfo?.name)}</span>
        </div>
        <div>
          <span className=" text-slate-500">Brand:</span>
          <span className=" font-semibold">{ProductInfo?.brand}</span>
        </div>
        <div className="review-main-cntr flex items-center space-x-1 relative">
          <span className=" text-slate-500">Rated:</span>
          <Rating
            name="read-only"
            value={parseInt(ProductInfo?.Rating)}
            readOnly
          />
          <span className=" font-semibold">
            &#40;{ProductInfo?.numberOfRatings}&#41;
          </span>
          <RatingPanel
            averageRating={4.2}
            totalRatings={85}
            ratingData={ratingData}
            
          />
        </div>
        {!ProductInfo?.published ? (
          <div className="text-2xl font-semibold text-red-500">
            <span>Product No Longer sold by The Seller Anymore!!</span>
          </div>
        ) : (
          <>
            <div>
              {ProductInfo?.hasOwnProperty("salePrice") ? (
                <div className=" space-y-2">
                  <div className=" w-full h-6 flex space-x-3 items-center">
                    <span className="product-title text-2xl text-light-pink font-bold ">
                      &#8377;
                      <NumberCount end={ProductInfo?.salePrice} />
                    </span>
                    <div
                      className={`flsh-grd-ofr-prcnt relative bg-light-pink text-white font-normal text-xs rounded-xl px-3 py-1 flex justify-center items-center space-x-2 w-20 rotate-[-5deg]`}
                      style={{
                        display: `${
                          ProductInfo?.salePrice > 0 ? "flex" : " none"
                        }`,
                      }}
                    >
                      <div className="h-1 w-1 bg-white ring-2 ring-black rounded-full"></div>
                      <h5 className=" ">{offerPercentage}% off</h5>
                      <img
                        src={productTagStringIcon}
                        className=" h-6 absolute rotate-[-45deg] right-16"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">M.R.P</span>
                    <span className="product-title  text-slate-400 line-through font-bold ">
                      &nbsp;&#8377;{ProductInfo?.regularPrice || "78787"}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-slate-500">Price:</span>
                  <span className="product-title text-2xl text-light-pink font-bold ">
                    &#8377;{ProductInfo?.regularPrice || "78787"}
                  </span>
                </div>
              )}
              <span
                className={`${getStockStatusColor(
                  ProductInfo?.stock
                )} text-xl font-semibold`}
              >
                {getStockStatusMessage(ProductInfo?.stock)}
              </span>
            </div>

            <div className="h-[115px] ">
              <button className="Btn2">Buy Now</button>
              <br />
              <div>
                {exists !== undefined ? (
                  <ProductQuantitybtn
                    itemDetail={itemDetail}
                    stock={ProductInfo.stock}
                    setItemDetail={setItemDetail}
                  />
                ) : (
                  <button className="Btn3" onClick={handleAddToCart}>
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        <div className=" className= font-semibold">
          <span className="text-slate-500">sold By:</span>
          <span className=" font-semibold"> {ProductInfo?.vendorName}</span>
        </div>
        <div>
          <span className="text-slate-500 ">Description:</span>
          <p className=" font-semibold text-[20px]">
            <ProductDescription description={ProductInfo?.description} />
          </p>
        </div>
      </div>
    </>
  );
};

const ProductQuantitybtn = ({ itemDetail, setItemDetail, stock }) => {
  const buttonDisableRef = useRef(null);
  const { updateItem, removeItem, cartInfo } = useCart();

  const handelAddQuantity = () => {
    if (itemDetail.productQuantity <= stock) {
      const total = itemDetail.productQuantity + 1;

      const cases = "ADD";

      calulateTotal(total, cases);
    }
  };

  const handelMinusQuantity = () => {
    if (itemDetail.productQuantity > 1) {
      // buttonDisableRef.current.disabled = true;
      const total = itemDetail.productQuantity - 1;

      const cases = "MINUS";
      calulateTotal(total, cases);
    } else {
      removeItem(itemDetail.cartItemsId);
    }
  };

  const calulateTotal = (total, cases) => {
    const itemTotal =
      itemDetail.salePrice !== null
        ? itemDetail.salePrice * total
        : itemDetail.regularPrice * total;
    const formattedTotal = parseFloat(itemTotal.toFixed(2));
    const cartItem = {
      ...itemDetail,
      productQuantity: total,
      productTotal: formattedTotal,
    };
    const cartItemInfo = {
      cartId: cartInfo?.cartId,
      productId: cartItem.productId,
      quantity: total,
      cartItemId: cartItem.cartItemsId,
    };
    setItemDetail(cartItem);
    updateItem(cartItemInfo);
  };

  const handleChange = (e, quantity) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "").slice(0, 2);
    if (value === "" || value === "0") {
      value = 1;
    }
    const values = parseInt(value, 10);

    if (values > stock) {
      setItemDetail({ ...itemDetail, productQuantity: stock });
      calulateTotal(stock);
    } else {
      setItemDetail({ ...itemDetail, productQuantity: values });
      calulateTotal(values);
    }
  };

  return (
    <div className="cart-quantity space-x-4 mt-4">
      <button
        className={`quantity-btn ring-1  ring-light-pink rounded-md p-3 hover:bg-light-pink hover:text-white transition-colors`}
        onClick={handelMinusQuantity}
        ref={buttonDisableRef}
      >
        <img src={minusIcon} alt="" className="quantity-icon" />
      </button>

      {/* <span className=" font-semibold ml-2.5 focus:ring-1 focus:ring-light-pink">{itemDetail.itemQuantity}</span> */}
      <input
        type="number"
        className="quantity-input w-10 py-1 rounded-lg text-[20px] font-semibold text-center focus:ring-1 focus:ring-light-pink  "
        pattern="[0-9]{0,1}"
        maxLength={1}
        value={itemDetail?.productQuantity}
        onChange={(e) => {
          handleChange(e, itemDetail?.productQuantity);
        }}
      />
      <button
        className="quantity-btn  ring-1 ring-light-pink rounded-md p-3 hover:bg-light-pink hover:text-white transition-colors"
        onClick={handelAddQuantity}
      >
        <img src={plusIcon} alt="" className="quantity-icon" />
      </button>
    </div>
  );
};

export default ProductInfo;
