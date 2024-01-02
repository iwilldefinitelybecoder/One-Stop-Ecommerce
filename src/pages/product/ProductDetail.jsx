import React, { useEffect, useState } from 'react'
import ProductImage from './ProductImage'
import useProducts from '../../CustomHooks/ProductsHook'
import { useMatch } from 'react-router'
import { shoppingCartIcon } from '../../assets/icons/png/user-page-icons/data'
import { rightArrowIcon } from '../../assets/icons/png/toolbar-icons/data'
import ProductInfo from './ProductInfo'
import MIddleContainer from './MIddleContainer'
import AdditionalContainer from './AdditionalContainer'

const ProductDetail = () => {

  const productId = useMatch('/product/:id').params.id;
  const {getProductDetailss}= useProducts();
  const [productDetails, setProductDetails] = useState({
    // productImages: [shoppingCartIcon,rightArrowIcon],
    // specifications:{
    //   title:"title",
    //   camera:"camera",
    //   ram:"ram",
    //   storage:"storage",
    //   description:"description"
    // },
    // regularPrice:2000,
    // salePrice:1000,
    // rating:4,
    // numberOfRatings:100,
    // productName:"productName",
    // description:"descriptiond jnandknj la ndjn d redn d  e hfor ndnjnc edddddddd ddddddddddd ddddddddddddddddd ddddddddddddddddddd f",
    
  });

  useEffect(()=>{
    async function fetchProductDetails(){
      const response = await getProductDetailss(productId);
      setProductDetails(response);
    }
    fetchProductDetails();
  }
  ,[productId])

    
  return (
    <>
    <div>
        <div className='product-cntr h-[680px]  flex mb-20'>
          <div className='product-img w-[556px]'>
            <ProductImage productDetails={productDetails} />
          </div>
          <div className='product-info w-[556px]'>
            <ProductInfo ProductInfo={productDetails} />
          </div>
        </div>
        <div className='facet'>
          <MIddleContainer productInfo={productDetails}/>
        </div>
        <div className='extra-cntr'>
          <AdditionalContainer category={productDetails?.category}/>
        </div>
    </div>
    </>
  )
}

export default ProductDetail