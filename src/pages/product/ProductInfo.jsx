import { Rating } from "@mui/material";

import React, { useContext, useEffect, useRef, useState } from "react";
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
import useMessageHandler from "../../components/body/Messages/NewMessagingComponent";
import QuantityBtn from "../../components/body/productCards/QuantityBtn";
import { useOrders } from "../../context/OrderContext";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/AccountProvider";

const ProductInfo = ({ ProductInfo, detailedReview, setOpen,
  feature = {
    addToCartBtn: false,
    buyNow: false,
    ratingPanel: false,
    checkoutBtn: false,
  }

}) => {

  const { addItemToCart, itemExist } = useCart();
  const { moveItemToWishlist } = useWishlist();
  const [itemDetail, setItemDetail] = useState({});
  const { handleMessage, getMessageComponents } = useMessageHandler();
  const productId = useParams().id || ProductInfo?.productId;
  const {setShowLoginButton,showLoginButton,account} = useContext(AccountContext)
  const [productRating, setProductRating] = useState(detailedReview);
  const ratingData = productRating?.ratingData;
  const totalRatings = productRating?.totalRating;
  const averageRating = productRating?.averageRating;




  const exists = itemExist(productId);

  useEffect(() => {
    setItemDetail(exists);
  }, [exists]);

  useEffect(() => {
    setProductRating(detailedReview);
  }, [detailedReview]);


  const offerPercentage = ProductInfo?.salePrice
    ? (
      ((ProductInfo.regularPrice - ProductInfo.salePrice) /
        ProductInfo.regularPrice) *
      100
    ).toFixed(0)
    : 0;

  const handleAddToCart = async () => {
    const data = {
      productId: productId,
      quantity: 1,
    };
    await addItemToCart(data);
    handleMessage(`Added ${ProductInfo.name} to cart`, "success");

  };

  const handelMoveToWishlist = () => {
    const productId = itemDetail.productId;
    const cartItemId = itemDetail.cartItemsId;

    moveItemToWishlist(cartItemId, productId);
  };



  return (
    <>
      {
        getMessageComponents()
      }
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
            value={parseInt(ProductInfo?.rating)}

            readOnly
          />
          <span className=" font-semibold">
            &#40;{ProductInfo?.numberOfRatings}&#41;
          </span>
          {
            feature?.ratingPanel &&
            <RatingPanel
              averageRating={averageRating?.toFixed(1)}
              totalRatings={totalRatings}
              ratingData={ratingData}

            />
          }
        </div>
        {!ProductInfo?.published ? (

          <div className="text-2xl font-semibold text-red-500">
            <span>Product No Longer sold by The Seller Anymore!!</span>
          </div>
        ) : (
          <>
            <div>
              {ProductInfo?.salePrice > 0 ? (
                <div className=" space-y-2">
                  <div className=" w-full h-6 flex space-x-3 items-center">
                    <span className="product-title text-2xl text-light-pink font-bold ">
                      &#8377;
                      <NumberCount end={ProductInfo?.salePrice} />
                    </span>
                    <div
                      className={`flsh-grd-ofr-prcnt relative bg-light-pink text-white font-normal text-xs rounded-xl px-3 py-1 flex justify-center items-center space-x-2 w-20 rotate-[-5deg]`}
                      style={{
                        display: `${ProductInfo?.salePrice > 0 ? "flex" : " none"
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

              {ProductInfo?.stock > 0 ?
                feature?.addToCartBtn &&
                <>
                  <button className="Btn2" onClick={() => {account?setOpen(true):setShowLoginButton(true) }}>Buy Now</button>
                  <br />
                  <div>
                    {exists !== undefined ? (
                      <ProductQuantitybtn
                        itemDetail={itemDetail}
                        stock={ProductInfo.stock}
                        setItemDetail={setItemDetail}
                      />
                    ) : (
                      <button className="Btn3" onClick={(e)=>{account?handleAddToCart(e):setShowLoginButton(true)}}>
                        Add To Cart
                      </button>
                    )}
                  </div>
                </>
                :
                (
                  <div className="text-2xl font-semibold text-red-500">
                  <span>We Don't know When The Product Will Be Back In Stock!!</span>
                </div>
                )
              }
              {
                feature?.buyNow &&
                <BuyNowCardQuantity
                  itemDetail={itemDetail}
                  stock={ProductInfo.stock}
                  setItemDetail={setItemDetail}
                />
              }
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
        {
          feature.checkoutBtn &&
          <div className="optional-checkout-btn">
            <Link to={"/checkout/details"}>
              <button className="Btn3">
                Checkout
              </button>
            </Link>
          </div>
        }
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
    <QuantityBtn
      handelAddQuantity={handelAddQuantity}
      handelMinusQuantity={handelMinusQuantity}
      handleChange={handleChange}
      itemDetail={itemDetail}
      buttonDisableRef={buttonDisableRef}
    />
  );
};


const BuyNowCardQuantity = ({ stock }) => {

  const buttonDisableRef = useRef(null);
  const { orderDetails, setOrderDetails } = useOrders();

  const [itemDetail, setItemDetail] = useState({
    productQuantity: orderDetails?.products?.quantity
  })

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
    }

  };

  const calulateTotal = (total, cases) => {
    // const itemTotal =
    //   itemDetail.salePrice !== null
    //     ? itemDetail.salePrice * total
    //     : itemDetail.regularPrice * total;
    // const formattedTotal = parseFloat(itemTotal.toFixed(2));
    // const cartItem = {
    //   ...itemDetail,
    //   productQuantity: total,
    //   productTotal: formattedTotal,
    // };

    setItemDetail({ ...itemDetail, productQuantity: total });
    setOrderDetails((prev) => ({
      ...prev,
      products: { ...prev.products, quantity: total }
    }
    ))
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
    <>
      <QuantityBtn
        handelAddQuantity={handelAddQuantity}
        handelMinusQuantity={handelMinusQuantity}
        handleChange={handleChange}
        itemDetail={itemDetail}
        buttonDisableRef={buttonDisableRef}
      />
    </>
  )
}

export default ProductInfo;
