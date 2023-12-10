import React from 'react'
import useWishlist from '../../../CustomHooks/WishListHook'
import { Box, Grid } from '@mui/material';
import FlashDealsGridCards from '../../../components/body/productCards/flashDealsCard/flashDealsGridCards';
import styled from 'styled-components';
import './wishlist.css'
import { noDataImg } from '../../../assets/icons/img/Illistrations/data';
import { useMatch } from 'react-router';

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
  const { wishlist, wishlistInfo, moveAllItemsToCart } = useWishlist();


  const handelMoveAllToCart = () => {
    moveAllItemsToCart();
  }


  return (
    <>
      {
        wishlistInfo.totalItems === 0 ? (
          <div className=' w-full h-[70vh] bg-white flex justify-center items-center' >
            <span className=' font-semibold text-2xl'>WishList Is Empty</span>
            <img src={noDataImg} alt="" />
          </div>
        )
          :
          (
            <div>

              <div className="w-full flex justify-end mr-14 mt-5">
                <button className="Btn3" onClick={handelMoveAllToCart}>Move All To WishList</button>

              </div>

              <div className='wishlist-cntr'>
                <div className='wishlist-body'>
                  {wishlist?.map((item) => {
                    return (
                      <div key={item.productId} className='wishlist-card w-[270px] rounded-lg h-[403px] bg-white px-4 py-3'>
                        <FlashDealsGridCards productInfo={item} />
                      </div>

                    );
                  })}
                </div>
              </div>
            </div>
          )
      }
    </>
  )
}

export default Wishlist