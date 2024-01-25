import React from 'react'
import useWishlist from '../../../CustomHooks/WishListHook'
import { Box, Grid } from '@mui/material';
import FlashDealsGridCards from '../../../components/body/productCards/flashDealsCard/flashDealsGridCards';
import styled from 'styled-components';
import './wishlist.css'
import { noDataImg } from '../../../assets/icons/img/Illistrations/data';
import { useMatch, useNavigate } from 'react-router';
import Loader from '../../../components/body/Loader';

const CustomGridItem = styled(Grid)(({ theme }) => ({
  border: '1px solid transparent', // Initial border
  borderRadius: 8,
  transition: '0.3s', // Transition for hover effect
  backgroundColor: 'white',
  padding: '10px',

  '&:hover': {
    backgroundColor: 'white', // Background color on hover
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Shadow on hover
    // Border on hover
  },
}));

function Wishlist() {
  const { wishlist, wishlistInfo, moveAllItemsToCart,loading,clearWishlist } = useWishlist();
  useNavigate();


  const handelMoveAllToCart = () => {
    moveAllItemsToCart();
  }

  const handelClearWishlist=()=>{
    clearWishlist();
  }


  return (
    <>
    {
      loading?
      <Loader/>
      :
      <>
      {
        wishlistInfo?.totalItems === 0 ? (
          <div className=' w-full h-[70vh] bg-white flex justify-center items-center' >
            <span className=' font-semibold text-2xl'>WishList Is Empty</span>
            <img src={noDataImg} alt="" />
          </div>
        )
          :
          (
            <div>

              

              <div className='wishlist-cntr'>
                <div className='wishlist-body'>
                  {wishlist?.map((item) => {
                    return (
                      <div key={item.productId} className=' w-72 swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active flash-grid-cards flex-col justify-start items-start px-4 py-4 rounded-xl shadow-md  transition-all'>
                        <FlashDealsGridCards productInfo={item} />
                      </div>

                    );
                  })}
                </div>
              </div>
              <div className="w-full flex justify-end mr-14 space-x-5 ">
                <button className="Btn2" onClick={handelClearWishlist}>Clear WhishList</button>
                <button className="Btn3" onClick={handelMoveAllToCart}>Move All To Cart</button>

              </div>
            </div>
          )
      }
      </>
    }
    </>
  )
}

export default Wishlist