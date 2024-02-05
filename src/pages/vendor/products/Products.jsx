import React, { Suspense, useEffect } from "react";
import {
  ShoppingBag3Icon,
  emptyCartIcon2,
  rightArrowIcon2,

} from "../../../assets/icons/png/user-page-icons/data";
import './product.css'
import { rightArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { ordersList } from "../../../data/orderList";
import { noOrderIcon } from "../../../assets/icons/img/randoms/data";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { OrderPaging } from "../../user/orders/Orders";
import { getVendorProductList } from "../../../service/vendorServices";
import { CircularProgress, FormControlLabel, Switch } from "@mui/material";
import ProductDrawer from "../../../components/body/productCards/ProductDrawer";
import { userIcon } from "../../../assets/icons/png/toolbar1/data";
import useProducts from "../../../CustomHooks/ProductsHook";
import { formatDateFromTimestamp, formatOrderedDate } from "../../../utils/DisplayFormatters";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = React.useState([]);
  const [currnetPage, setCurrentPage] = React.useState(searchParams.get("page") || 0);
  const [loadings, setLoadings] = React.useState(true);



  const totalpages = Math.ceil(orders.length / 5);
  const startIndex = currnetPage * 5;
  const endIndex = (currnetPage + 1) * 5;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
    searchParams.set("page", currnetPage);
    setSearchParams(searchParams);
  };



  useEffect(() => {
    async function fetchData() {
      const data = await getVendorProductList();
      if (data.length > 0)
        setOrders(data)
      setLoadings(false)
    }
    fetchData()
    searchParams.set("page", 0);
    setSearchParams(searchParams);
  }
    , [])





  return (
    <>
      {loadings ? <CircularProgress /> :
        <div className="orders-main-cntr">
          {orders.length !== 0 ?
            (<Suspense fallback={<div>Loading...</div>}>
              <ProductList2 currentOrders={currentOrders}  />
            </Suspense>
            ) : (
              <div className="orders-empty-cntr">

                <div className="orders-top-cntr">
                  <div className="orders-pg-header ">
                    <img src={ShoppingBag3Icon} className=" h-6 mt-2 mr-2" />
                    <span className=" font-semibold ">Product List</span>
                  </div>
                </div>

                <div className="orders-empty-img-cntr flex justify-center">
                  <img src={noOrderIcon} className="  mt-2 mr-2" />
                </div>
                <div className="orders-empty-text-cntr flex justify-end ">
                  <span className="text-slate-500 font-semibold text-2xl">
                    You haven't Added any Products Yet.
                  </span>
                  <div className="rotating-text  ">
                    <span className="text-slate-500 font-semibold text-2xl  ">??</span>

                  </div>
                </div>
              </div>
            )
          }
          <OrderPaging
            currentPage={currnetPage}
            totalpages={totalpages}
            updatePage={handelPageChange}
          />
        </div>
      }
    </>
  );
}

const ProductList2 = ({ currentOrders }) => {
  const [open, setOpen] = React.useState(false);
  const [productContainerIndex, setProductContainerIndex] = React.useState( Array.isArray(currentOrders) ? Array(currentOrders.length).fill(false):[]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProductDetailss, loading,getProductMajorDetailss } = useProducts();

  const [productDetails, setProductDetails] = React.useState();

  const subStringName = (name) => {
    if (name.length > 10) {
      return name.substring(0, 10) + "...";
    } else {
      return name;
    }
  };

  const page = searchParams.get("page");
  useEffect(() => {
    setProductContainerIndex(Array(currentOrders.length).fill(false))
  }, [page])

  
  useEffect(() => {
    async function fetchData() {

        const data = await getProductMajorDetailss(searchParams.get("productId"));
        console.log(data,searchParams.get("productId"))
        setProductDetails(data);
    }
    fetchData();
  }, [searchParams.get("productId"),productContainerIndex]);



  const handelDrawerOpen = (e,index) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
    if(!productContainerIndex[index]){
      
      handelProductContainerOpen(index)
    searchParams.set("productId", currentOrders[index].productId);
    setSearchParams(searchParams)
    }else{
      
      handelDrawerClose(e)
    }
  }

  const handelDrawerClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let temp = [...productContainerIndex];
    temp.fill(false);
    setProductContainerIndex(temp);
  }

  const handelProductContainerOpen = (index) => {
    let temp = [...productContainerIndex];
    temp.fill(false);
    temp[index] = true;
    setProductContainerIndex(temp);
  }

  const handelProductContainerClose = (index) => {
    let temp = [...productContainerIndex];
    temp.fill(false);
    setProductContainerIndex(temp);
  }




  return (
    (
      <div className="orders-top-cntr">
        <div className="orders-pg-header ">
          <img src={ShoppingBag3Icon} className=" h-6 mt-2 mr-2" />
          <span className=" font-semibold ">Product List</span>
        </div>
        <div className="orders-table-header text-slate-500 pl-5">
          <div className="orders-table-title ">
            <span>Name&nbsp;</span>
          </div>


          <div className="orders-table-title">
            <span>Regular Price&nbsp;</span>
          </div>
          <div className="orders-table-title">
            <span>Inn Date&nbsp;</span>
          </div>
          <div className="orders-table-title">
            <span>Quantity&nbsp;</span>
          </div>
          <div className="orders-table-title">
            <span>Sale Price&nbsp;</span>
          </div>
        </div>

        <div className={"product-table-rows-cntr"}>
          {currentOrders.map((order, index) => (
            <Link to={`/vendor/edit-product/${order.productId}`} key={index}>
              <div className="order-table-row-parent">
                <div className={`product-table-rows  shadow-md py-7 pl-5  ${productContainerIndex[index]?"mb-0":"mb-5"}`} >
                  <div className=" h-10 w-10 mt-2 rounded-full">
                    <img src={order?.imageURL || userIcon} className="h-8" />
                  </div>
                  <div className="order-table-row flex space-x-2 ml-[-5px]">
                    {/* <img src={emptyCartIcon2} className=" h-8"  /> */}
                    <span className="font-semibold text-lg text-slate-600">{subStringName(order.name)}</span>
                  </div>
                  <div className="order-table-row">
                    <span
                      className={`px-3 py-1.5 rounded-2xl `}
                    >
                      {order.regularPrice}
                    </span>
                  </div>
                  <div className="order-table-row">
                    <span>{formatDateFromTimestamp(order.innDate) || "---"}</span>
                  </div>
                  <div className="order-table-row">
                    <span>{order.stock}</span>
                  </div>
                  <div className="order-table-row">
                    <span>{order.salePrice || "---"}</span>
                  </div>
                  <div className="order-table-row-btn">
                    <img src={rightArrowIcon2} className="order-tbl-ar-icon h-5" />
                  </div>

                  <div className="order-table-row-btn-static rotate-90" onClick={(e)=>handelDrawerOpen(e,index)}>
                    <img src={rightArrowIcon} className="order-tbl-ar-icon h-3" />
                  </div>
               
                </div>
                <ProductDrawer productContainerIndex={productContainerIndex} productDetails={productDetails}  order={order} handelProductContainer={handelProductContainerClose} index={index} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  )
}


export default ProductList;