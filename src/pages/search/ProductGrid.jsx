import React from "react";
import Grid from "@mui/material/Grid";
import FlashDealsGridCards from "../../components/body/productCards/flashDealsCard/flashDealsGridCards";
// Replace 'ProductCard' with your actual product card component

const ProductGrid = ({ products }) => {
  return (
<Grid container columnGap={12} rowGap={5} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
  {products?.map((product, index) => (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
      <div
        key={product.productId}
        className="w-72 swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active flash-grid-cards flex-col justify-start items-start px-4 py-4 rounded-xl shadow-md transition-all"
      >
        <FlashDealsGridCards productInfo={product} />
      </div>
    </Grid>
  ))}
</Grid>

  );
};

export default ProductGrid;
