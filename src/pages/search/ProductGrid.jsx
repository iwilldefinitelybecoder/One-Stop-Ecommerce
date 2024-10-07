import React from "react";
import Grid from "@mui/material/Grid";
import FlashDealsGridCards from "../../components/body/productCards/flashDealsCard/FlashDealsGridCards";
import ProductCardLoading from "../../components/body/loading/ProductCardLoading";
// Replace 'ProductCard' with your actual product card component

const ProductGrid = ({ products, loading1, loading2 }) => {
  return (
    products?.length === 0 ? <div className="flex justify-center items-center h-96 w-full">
      <span className="text-2xl font-semibold">No Products Found</span>
    </div> :
      <Grid container columnGap={12} rowGap={5} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
         loading1 || loading2 ?
            [1, 2, 3, 4, 5, 6].map((index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} className="search-result-cards hover:shadow-2xl ">
               
                  <ProductCardLoading />
              
              </Grid>
            ))
            :
            products?.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} className="search-result-cards hover:shadow-2xl transition-all ">
                <div
                  key={product.productId}
                  className="w-72 swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active flash-grid-cards flex-col justify-start items-start px-4 py-4 rounded-xl shadow-md transition-all"
                >
                  <FlashDealsGridCards productInfo={product} />
                </div>
              </Grid>
            ))
        }
      </Grid>

  );
};

export default ProductGrid;
