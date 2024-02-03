import React, { useEffect, useState } from 'react'
import ProductImage from './ProductImage'
import useProducts from '../../CustomHooks/ProductsHook'
import { useMatch, useNavigate } from 'react-router'
import { shoppingCartIcon } from '../../assets/icons/png/user-page-icons/data'
import { rightArrowIcon } from '../../assets/icons/png/toolbar-icons/data'
import ProductInfo from './ProductInfo'
import MIddleContainer from './MIddleContainer'
import AdditionalContainer from './AdditionalContainer'
import BuyNowCard from '../../components/body/productCards/BuyNowCard'


export const productInfoFeatures = {
  addToCartBtn:true,
  buyNow:false,
  ratingPanel:true,
  checkoutBtn:false,
}


const ProductDetail = () => {

  const productId = useMatch('/product/:id').params.id;
  const {getProductDetailss ,getProductReviewDetail,reviewData}= useProducts();
  const [productDetails, setProductDetails] = useState({});
  const [open,setOpen] = useState();
  const Navigate = useNavigate();

  useEffect(()=>{
    async function fetchProductDetails(){
      const response = await getProductDetailss(productId);
      getProductReviewDetail(productId);
      setProductDetails(response);
    }
    fetchProductDetails();
  }
  ,[productId])

  
  
  return (
    <>
      {
        productDetails ?
    <div>
      
        <div className='product-cntr h-[680px]  flex mb-20'>
          <BuyNowCard open={open} setOpen={setOpen} productDetails={productDetails}/>
          <div className='product-img w-[556px]'>
            <ProductImage productDetails={productDetails} viewCategory={true} />
          </div>
          <div className='product-info w-[556px]'>
            <ProductInfo ProductInfo={productDetails} setOpen={setOpen} detailedReview={reviewData}  feature={productInfoFeatures}/>
          </div>
        </div>
        <div className='facet'>
          <MIddleContainer productInfo={productDetails}/>
        </div>
        <div className='extra-cntr max-w-[1220px]'>
          <AdditionalContainer productDetails={productDetails}/>
        </div>
    </div>
        :
        <div className="flex justify-center items-center w-full h-[70vh] ">
        <div className="bg-white p-8 rounded-lg shadow-md flex w-full max-w-screen-lg">
          <div className="flex-shrink-0">
            {/* Large image or SVG icon for the error */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#e94560"
              className="h-32 w-32"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="ml-8 flex flex-col">
            <h2 className="text-4xl text-dark-pink font-semibold mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-600">
              We're sorry, but the product you are looking for could not be found.
              Please check the spelling of the product name or try searching again.
            </p>
            <div className="mt-6 flex">
              <button
                className="bg-dark-pink text-white px-4 py-2 rounded-md mr-4 hover:bg-light-pink transition duration-300"
                onClick={() => {
                  Navigate(-1);
                }}
              >
                Go Back
              </button>
              <button
                className="bg-light-pink text-white px-4 py-2 rounded-md hover:bg-dark-pink transition duration-300"
                onClick={() => {
                  Navigate("/");
                }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      }
    </>
  )
}

export default ProductDetail