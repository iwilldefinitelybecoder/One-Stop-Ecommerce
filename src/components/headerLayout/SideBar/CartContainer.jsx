import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  closeIcon,
  notaskIcon,
  shoppingbagIcon,
} from "../../../assets/icons/png/toolbar1/data";
import "./cart.css";
import CartItems from "./cartItems";
import { TshirtIcon } from "../../../assets/icons/img/products/data";
import { emptycartIcon } from "../../../assets/icons/img/randoms/data";
import AlertBox from "../../body/AlertBox";
import { Link } from "react-router-dom";
import { emptyCartIcon2 } from "../../../assets/icons/png/user-page-icons/data";
import { getAllCartItems } from "../../../service/CustomerServices/CartServices";

const CartContainer = ({ cartToggle, cartValue, items }) => {
  items = items?.productInfo;
  console.log(items);
  const dispatch = useDispatch();
  const [CartTotal, setCartTotal] = useState(0);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [cart, setCart] = useState();
  useEffect(() => {

    getAllCartItems()
      .then((res) => {
        setCart(res); 
      })
      .catch((err) => {
        console.log(err); 
      });
  }, []);

  console.log(cart);

  document.body.style.overflow = cartToggle ? "hidden" : "auto";
  const alertMessage = (
    <div className="cart-item-container flex justify-center ">
      <div className="item-image">
        <img src={deleteItem?.itemDetail.image} alt="" />
      </div>
      <div className="item-description">
        <span className=" text-md font-semibold py-1">
          {deleteItem?.itemDetail.name}
        </span>
        <span className=" text-slate-400 text-sm ">
          &#8377;{deleteItem?.itemDetail.price}&nbsp;x&nbsp;
          {deleteItem?.itemDetail.itemQuantity}
        </span>
        <span className=" text-light-pink font-semibold py-1">
          &#8377;{deleteItem?.itemDetail.itemTotal}
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    const total = items?.reduce(
      (sum, item) => sum + item.price * item.itemQuantity,
      0
    );
    const formattedTotal = parseFloat(total.toFixed(2));
    setCartTotal(formattedTotal);
  }, [items]);

  const ContainerRefs = items?.map(() => React.createRef());

  const handelToggle = (e) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_CART" });
  };

  const updateCart = (index, cartItem) => {
    const updatedData = items?.map((item, i) => {
      if (item.id === cartItem.id) {
        return cartItem;
      } else {
        return item;
      }
    });

    dispatch({ type: "UPDATE_ITEM", payload: { index, cartItem } });
  };

  const removeItem = (index) => {
    dispatch({ type: "REMOVE_ITEM", payload: index });
  };

  const handelEmptyCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  dispatch({ type: "cartItemCount", payload: items.length });
  return (
    <>
      {deleteToggle ? (
        <AlertBox
          index={deleteItem.index}
          item={deleteItem.itemDetail}
          setDeleteToggle={setDeleteToggle}
          updateValue={removeItem}
          AlertMessage={alertMessage}
        />
      ) : (
        cartToggle && (
          <div className="cart-main-container">
            <div
              className="cart-bg-container"
              role="button"
              onClick={handelToggle}
            ></div>
            <div className="cart-side-container">
              <div className="cart-header ">
                <div className="cart-logo">
                  <img src={shoppingbagIcon} alt="" className="user-icon" />
                  <div
                    className="Close-cart-container "
                    role="button"
                    onClick={handelToggle}
                    title="Close-Cart"
                  >
                    <div>
                      <img src={closeIcon} alt="" className=" h-3" />
                    </div>
                  </div>
                </div>
                <div className="item-count pl-3 font-semibold">
                  <span>{cartValue}&nbsp;Items</span>
                </div>
              </div>
              <div className="cart-body">
                {items && items.length !== 0
                  ? items?.map((item, index) => {
                      return (
                        <CartItems
                          key={index}
                          updateValue={updateCart}
                          index={index}
                          itemDetails={item}
                          setDeleteToggle={setDeleteToggle}
                          setDeleteItem={setDeleteItem}
                        />
                      );
                    })
                  : items && (
                      <div className="empty-cart-container mt-40">
                        <div className="empty-cart">
                          <img
                            src={emptycartIcon}
                            alt=""
                            className="empty-cart-icon"
                          />
                          <span className="empty-cart-text font-semibold font-poppins  text-lg">
                            Your cart is empty&nbsp;
                          </span>
                          <img src={notaskIcon} className="sleeping-icon" />
                        </div>
                      </div>
                    )}
              </div>
              {items.length !== 0 && (
                <div className="cart-footer" onClick={handelToggle}>
                  <div className="flex justify-center mr-4 items-center">
                  <div
                    
                    className=" empty-cart-btn flex justify-center hover:cursor-pointer space-x-2 items-center text-white bg-light-pink px-5 py-2.5 rounded-md font-semibold mx-4 my-2 hover:bg-dark-pink transition-colors "
                    title="empty-Cart"
                    onClick={e=>{handelToggle(e);handelEmptyCart()}}
                  >
                    <img src={emptyCartIcon2} alt="" className="h-8 " />

                    <span>Empty Cart</span>
                  </div>
                  <Link to="/checkout/cart">
                    <button className=" text-light-pink ring-1 ring-light-pink bg-white px-8 py-3 .5  rounded-md font-semibold mx-4  my-2 hover:bg-light-pink hover:text-white transition-colors">
                      View Cart
                    </button>
                  </Link>
                    </div>
                  <Link to="/checkout/details">
                    <button className=" text-white bg-light-pink px-5 py-2.5 rounded-md font-semibold mx-4 my-2 hover:bg-dark-pink transition-colors">
                      Checkout Now &#40; &#8377; {CartTotal}&nbsp;&#41;
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

const mapCartStateToProps = (state) => ({
  cartToggle: state.cartToggle,
  cartValue: state.cartValue,
  items: state.cartItems,
});

export default connect(mapCartStateToProps)(CartContainer);
