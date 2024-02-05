import { Skeleton } from '@mui/material'
import React from 'react'

const ProductCardLoading = () => {
  return (
    <div className='w-72 swiper-slide px-10 py-8 flex-column justify-center items-start  rounded-xl shadow-md transition-all'>
            <Skeleton  sx={{borderRadius:"12px"}} variant="text" width={50} animation="wave"/>
            <br />
            <Skeleton className=" rounded-xl" variant="rectangular"  animation="wave" width={200} height={170} />
            <br />
            <Skeleton sx={{borderRadius:"12px"}} variant="text" width={120}  animation="wave" />
            <Skeleton  sx={{borderRadius:"12px"}}  variant="text" width={140} animation="wave"/>
            <Skeleton  sx={{borderRadius:"12px"}}  variant="text" width={200}  animation="wave"/>
          </div>
  )
}

export default ProductCardLoading