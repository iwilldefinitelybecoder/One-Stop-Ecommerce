import React, { Suspense, lazy, useEffect } from "react";
import "./productDetails.css";
import Loader from "../../components/body/Loader";
import useProducts from "../../CustomHooks/ProductsHook";



const ProductDetail  = lazy(() => import("./ProductDetail"));

function ProductDetails() {




  return (
    <>
      <div className="product-pg-cntr">
        <div className="products-pg-bd-cntr">
          <div className="product-Details-cntr">
            <Suspense fallback={<Loader/>}>
            <ProductDetail/>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
