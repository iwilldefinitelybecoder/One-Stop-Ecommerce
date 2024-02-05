import React, { useEffect, useRef } from "react";

import { useOrders } from "../../../context/OrderContext";
import { Link } from "react-router-dom";
import { flashIcon } from "../../../assets/icons/png/Rareicons/data";
import {
  formatOrderedDate,
  truncateString,
} from "../../../utils/DisplayFormatters";
import TrackingShipment from "./TrackShipment";
import useProducts from "../../../CustomHooks/ProductsHook";
import { constructDataFromList } from "../../../utils/trackingDataBuilder";
import InfoBarDropDown from "./InfoBarDropDown";
import { EnhancedEncryption } from "@mui/icons-material";
import EnhancedInvoiceGenerator from "../../../components/body/PdfGenerator/EnhncedPdfGenerator";
import { getOrderItemTrackingData } from "../../../service/CustomerServices/OrderServices";

const OrderProducts = ({ orderDetails, getTrackingData }) => {
  const productCntrRef = React.useRef(null);
  const { getProductDetailss } = useProducts();
  const [isCntrOverflow, setIsCntrOverflow] = React.useState(false);
  const generatePdfRef = useRef();

  useEffect(() => {
    const cntr = productCntrRef.current;
    if (cntr.scrollHeight > cntr.clientHeight) {
      setIsCntrOverflow(true);
    }
  }, []);

  const handleScrollToTop = () => {
    productCntrRef.current.scrollTop = 0;
  };
  return (
    <>
      <div className=" flex-column w-full bg-slate-200 px-4 py-5 rounded-lg shadow-md my-5 ">
        <div className=" flex w-full items-center justify-around">
          <div>
            {" "}
            <span className="text-slate-500">Order ID: </span>
            <span className=" span-text">
              #{orderDetails?.generatedOrderId}
            </span>
          </div>
          <div>
            {" "}
            <span className=" text-slate-500 span-label">
              Order Placed On:{" "}
            </span>
            <span className=" span-text">
              {formatOrderedDate(orderDetails?.orderDate || 0)}
            </span>
          </div>

        
          <div>
            <InfoBarDropDown
              generatePdfRef={generatePdfRef}
              orderDetails={orderDetails}
            />
          </div>
        </div>
      </div>
      <div className=" relative">
        <div
          className=" order-product-cntr  overflow-scroll  "
          ref={productCntrRef}
        >
          {orderDetails?.productId?.map((productId, index) => (
            <OrderedProductList
              key={index}
              data={productId}
              fetchProducts={getProductDetailss}
              fetchTrackingData={getTrackingData}
            />
          ))}
          {isCntrOverflow && (
            <div className=" absolute top-[600px] left-10 ">
              <button className="Btn3 shadow-lg" onClick={handleScrollToTop}>
                Back To Top
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const OrderedProductList = ({ data, fetchProducts, fetchTrackingData }) => {
  const variation = {
    color: "red",
    size: "XL",
    material: "cotton",
  };
  const [productDetails, setProductDetails] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [trackingData, setTrackingData] = React.useState({});

  useEffect(() => {
    async function fetchProductDetails() {
      const response = await fetchProducts(data.productId);

      setProductDetails(response);
    }
    fetchProductDetails();
  }, []);

  useEffect(() => {
    async function fetchTrackingDataa() {
      const response = await getOrderItemTrackingData(data?.trackingId);

      if (response !== undefined)
        setTrackingData(constructDataFromList(response));
      else setTrackingData({});
    }
    fetchTrackingDataa();
  }, []);

  constructDataFromList;
  const handleTrackShipment = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="product-List-Cntr flex items-center justify-between my-6 border-b-2 py-8 px-8  bg-white rounded-md shadow-md ">
      <div className="product-detail flex items-center space-x-3">
        <div className="product-img p-3 w-40 h-40 rounded-md  flex items-center justify-center "
         style={{backgroundImage: `url(${productDetails?.thumbnail?.imagePreview || productDetails.imageURL && productDetails?.imageURL[0]?.imagePreview || flashIcon})`,
         backgroundSize: "cover",
         backgroundPosition: "center",
 }} 
        >
         <img src={productDetails?.thumbnail?.imageURL || productDetails.imageURL && productDetails?.imageURL[0]?.imageURL || flashIcon} 
                
                onLoad={(e) => {
                  e.target.style.opacity = 1;
                }}
                style={{ objectFit: "cover",
                objectPosition: "center",
                overflow: "hidden",
                opacity: 0,
                transition: "opacity 0.5s ease-in-out",
              }}
                 />
        </div>
        <div className="max-w-[150px]">
          <Link to={`/product/${data.productId}`}>
            <p className="font-semibold hover:underline hover:cursor-pointer break-words">
              {truncateString(productDetails?.name, 90) || "Product Name"}
            </p>
          </Link>
          <span className="text-slate-400 font-semibold">
            <span className="text-light-pink">{data.price}</span> x{" "}
            <span>{data.quantity}</span>
          </span>
        </div>
      </div>
      <div className="product-properties w-[150px] text-center">
        <span className=" text-slate-400">Product Properties</span>
        <br />
        <div
          style={{ display: "block" }}
          className="  text-slate-400 font-semibold text-center "
        >
          {data.hasOwnProperty("variation") ? (
            Object.keys(data?.varitation).length > 0 &&
            Object.entries(variation).map(([key, value]) => (
              <>
                <span className=" text-slate-500 mr-2" key={key}>
                  {key} : {value}
                </span>
                <br />
              </>
            ))
          ) : (
            <span className="text-slate-500 mr-"> No Variation</span>
          )}
        </div>
      </div>
      <TrackingShipment
        open={open}
        onClose={(e) => setOpen(e)}
        handleClose={handleTrackShipment}
        trackingData={trackingData}
      />
      <div className="flex-column space-y-4">
        <Link to={`/product/write-review/${data?.purchaseId}`}>
          <button className="Btn w-full">Give FeedBack</button>
        </Link>

        <button className="Btn w-full" onClick={handleTrackShipment}>
          Track Order
        </button>

        {"delivered" === "delivered" ? (
          <Link to={`/product/write-review/${data?.OrderItemId}`}>
            <button className="Btn w-full">Return</button>
          </Link>
        ) : (
          <Link to={`/product/write-review/${data?.orderItemId}`}>
            <button className="Btn w-full">Cancel</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrderProducts;
