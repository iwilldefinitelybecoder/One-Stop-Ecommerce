import React, { useEffect, useState } from 'react'
import ProductImage from './ProductImage'
import useProducts from '../../CustomHooks/ProductsHook'
import { useMatch } from 'react-router'
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
        <div className='extra-cntr'>
          <AdditionalContainer productDetails={productDetails}/>
        </div>
    </div>
    </>
  )
}

export default ProductDetail