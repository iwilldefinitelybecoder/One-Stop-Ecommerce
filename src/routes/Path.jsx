import React, { Profiler } from "react";
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Address from "../pages/user/address/Address";
import WishList from "../pages/user/wishlist/WishList";
import Product from "../pages/product/Product";
import UserProfile from "../pages/user/userProfile/UserProfile";
import UserOrders from "../pages/user/orders/Orders";
import Layout from "../layouts/Layout";
import NotFound from "../pages/NotFound";
import PaymentMethods from "../pages/user/payment-methods/PaymentMethods";
import User from "../pages/user/User";
import AccountSettings from "../pages/vendor/accountsettings/AccountSettings";
import Products from "../pages/vendor/products/Products";
import AddProducts from "../pages/vendor/addProducts/AddProducts";
import Orders from "../pages/vendor/orders/Orders";
import Vendor from "../pages/vendor/Vendor";
import Dashboard from "../pages/vendor/dashboard/Dashboard";
import Checkout from "../pages/checkout/Checkout";
import Cart from "../pages/checkout/cart/Cart";
import Details from "../pages/checkout/Details/Details";
import Payment from "../pages/checkout/payment/payment";
import Review from "../pages/checkout/review/Review";
import Login from "../pages/Authenticate/login/Login";
import SignUp from "../pages/Authenticate/Signup/SignUp";
import Payment2 from "../pages/payments/Payment";
import RequireAuth, {
  RequireAuth2,
  RequireAuth3,
} from "../pages/Authenticate/RequireAuth";
import UnauthorizedPage from "./UnauthorizedPage";
import Logout from "../pages/Authenticate/Logout";
import UpgradeToVendor from "../pages/Authenticate/vendor/UpgradeTOVendor";
import Auth from "../pages/Authenticate/Auth";
import ChangePassword from "../pages/Authenticate/extraAuthpages/ChangePassword";
import ResetPassword from "../pages/Authenticate/extraAuthpages/ResetPassword";
import VerifyEmail from "../pages/Authenticate/extraAuthpages/VerifyEmail";

export const roles = {
  USER: "USER",
  VENDOR: "VENDOR",
  ADMIN: "ADMIN",
};

export const routes = {
  entry: ["/login", "/signup"],
  exit: ["/logout"],
};

function Path() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<Auth />} >
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="payment" element={<Payment2 />} />

        <Route element={<RequireAuth3 unAllowedRoutes={routes.exit} />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route element={<RequireAuth2 unAllowedRoutes={routes.entry} />}>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={roles.USER} />}>
          <Route path="/register-vendor" element={<UpgradeToVendor />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product" element={<Product />} />
          <Route element={<RequireAuth allowedRoles={[roles.USER, roles.VENDOR]} />}>
            <Route path="/checkout" element={<Checkout />}>
              <Route index element={<Cart />} />
              <Route path="cart" element={<Cart />} />
              <Route path="details" element={<Details />} />
              <Route path="payment" element={<Payment />} />
              <Route path="review" element={<Review />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[roles.USER, roles.VENDOR]} />}>
            <Route path="/user" element={<User />}>
              <Route index element={<UserProfile />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="address" element={<Address />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="orders/:id" element={<UserProfile />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="payment-methods" element={<PaymentMethods />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={roles.VENDOR} />}>
            <Route path="/vendor" element={<Vendor />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="Products" element={<Products />} />
              <Route path="add-products" element={<AddProducts />} />
              <Route path="orders/:id" element={<UserProfile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Path;
