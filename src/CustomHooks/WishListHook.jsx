import { useEffect, useState } from 'react';
import {
  getWishList,
  deleteFromWishList,
  addProductToWishList,
  moveProductToCart,
  moveAllToCart,
  moveAllToWishList,
  moveProductToWishList,
  emptyWishList,
} from '../service/CustomerServices/wishListServices';

const useWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistInfo, setWishlistInfo] = useState({});
  const [productId, setProductId] = useState([]);

  
  
  useEffect(() => {
      getWishlistItems();
    }, []);
    
    useEffect(() => {
        setWishlist(wishlistInfo?.products);
    }, [wishlistInfo]);

    useEffect(() => {
        const productsIds = wishlist?.map((item) => item.productId);
        setProductId(productsIds);
    }, [wishlist]);


  const getWishlistItems = async () => {
    setLoading(true);
    const data = await getWishList();
    setWishlistInfo(data);
    setLoading(false);
  };

  const removeFromWishlist = async (productId) => {
    setLoading(true);
    await deleteFromWishList(productId);
    await getWishlistItems(); // Refresh wishlist after deletion
    setLoading(false);
  };

  const addToWishlist = async (productId) => {
    setLoading(true);
    await addProductToWishList(productId);
    await getWishlistItems(); // Refresh wishlist after addition
    setLoading(false);
  };

  const moveToCart = async (productId) => {
    setLoading(true);
    await moveProductToCart(productId);
    await getWishlistItems(); // Refresh wishlist after moving to cart
    setLoading(false);
  };

  const moveAllItemsToCart = async (identifier) => {
    setLoading(true);
    await moveAllToCart(identifier);
    await getWishlistItems(); // Refresh wishlist after moving all to cart
    setLoading(false);
  };

  const moveAllItemsToWishlist = async (identifier) => {
    setLoading(true);
    await moveAllToWishList(identifier);
    await getWishlistItems(); // Refresh wishlist after moving all to wishlist
    setLoading(false);
  };

  const moveItemToWishlist = async (cartItemId, productId) => {
    setLoading(true);
    await moveProductToWishList(cartItemId, productId);
    await getWishlistItems(); // Refresh wishlist after moving item to wishlist
    setLoading(false);
  };

  const clearWishlist = async () => {
    setLoading(true);
    await emptyWishList();
    await getWishlistItems(); // Refresh wishlist after clearing
    setLoading(false);
  };

  // Return functions, wishlist items, and loading state for use in components
  return {
    getWishlistItems,
    removeFromWishlist,
    addToWishlist,
    moveToCart,
    moveAllItemsToCart,
    moveAllItemsToWishlist,
    moveItemToWishlist,
    clearWishlist,
    wishlist,
    wishlistInfo,
    productId,
    loading,
  };
};

export default useWishlist;
