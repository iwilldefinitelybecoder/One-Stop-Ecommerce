import {
  TshirtIcon,
  appleWatchIcon,
  appleWatchIcon2,
  fossilWatchIcon,
  iphoneIcon,
  nikeShoeIcon,
} from "../assets/icons/img/products/data";

export const products = [
  {
    id: 0,
    name: "high Neck Swetter",
    price: 2999.26,
    discountPrice: 1999.26,
    image:[TshirtIcon,iphoneIcon,appleWatchIcon2,fossilWatchIcon,nikeShoeIcon] ,
    rating: 3,
  },
  {
    id: 1,
    name: "iphone 12 pro",
    price: 129999.26,
    discountPrice: 119999.26,
    image: [iphoneIcon],
    rating: 4,
  },
  {
    id: 2,
    name: "Nike Shoe ",
    price: 4999.26,
    discountPrice: 2999.26,
    image:[nikeShoeIcon],
    rating: 4,
  },

  {
    id: 3,
    name: "apple watch",
    price: 22999.26,
    image: [appleWatchIcon],
    rating: 3,
  },
  {
    id: 4,
    name: "Fossil Watch",
    price: 32999.26,
    image:[ fossilWatchIcon],
    rating: 2,
  },
  {
    id: 5,
    name: "apple watch 2",
    price: 42999.26,
    image: [appleWatchIcon2],
    
  },
];
