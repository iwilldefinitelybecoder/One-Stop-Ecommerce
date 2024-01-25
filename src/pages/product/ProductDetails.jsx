import React, { Suspense, lazy, useEffect } from "react";
import "./productDetails.css";
import Loader from "../../components/body/Loader";
import useProducts from "../../CustomHooks/ProductsHook";
import useMessageHandler from "../../components/body/Messages/NewMessagingComponent";



const ProductDetail  = lazy(() => import("./ProductDetail"));

function ProductDetails() {

  const {getMessageComponents} = useMessageHandler();



  return (
    <>
      <div className="product-pg-cntr">
        <div className="products-pg-bd-cntr">
          <div className="product-Details-cntr">
            <Suspense fallback={<Loader/>}>
            <ProductDetail/>
            {getMessageComponents()}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
