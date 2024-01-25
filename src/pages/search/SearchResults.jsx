import React, { useEffect } from "react";
import ProductGrid from "./ProductGrid";
import useProducts from "../../CustomHooks/ProductsHook";
import { OrderPaging } from "../user/orders/Orders";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, products,loading } = useProducts();
  const [currnetPage, setCurrentPage] = React.useState(searchParams.get("page") || 0);
  let totalpages = Math.ceil(products?.length / 10);
  let startIndex = currnetPage * 10;
  let endIndex = (currnetPage + 1) * 10;
  let currentOrders = products?.slice(startIndex, endIndex);

  useEffect(() => {
    // fetch results 
    const keyword = searchParams.get('q');
    
    async function fetchProducts() {
      await searchResults(keyword,null,currnetPage);
       totalpages = Math.ceil(products?.length / 10);
      startIndex = currnetPage * 10;
      endIndex = (currnetPage + 1) * 10;
      currentOrders = products?.slice(startIndex, endIndex);
    }
    fetchProducts();
    searchParams.set("page", currnetPage);
    setSearchParams(searchParams);
  }, []);

  const handelPageChange = (page) => {
    if (page < 0 || page > totalpages - 1) return;
    setCurrentPage(page);
    searchParams.set("page", currnetPage);
    setSearchParams(searchParams);
  };

  return (
    <div className=" search-results-sub-cntr h-auto w-[880px]  mb-5">
      <div className="search-result-header">
        <span className="text-2xl font-semibold">Search Results For &nbsp;<span className="text-xl font-semibold underline">{searchParams.get('q')}</span></span>
      </div>
      <div className='search-result-subheader'>
            <span className='text-lg font-semibold'>Showing 1-{products?.length} of {products?.length} results</span>
        </div>
        {
            loading ? (
                <div className='text-center h-full text-lg flex justify-center items-center bg-white font-semibold my-5 rounded-lg shadow-lg'>
                    <span className=" italic font-semibold text-slate-500"><CircularProgress/></span>
                </div>
            ) :

        currentOrders?.length !== 0 ? (
           
      <div className=" h-auto my-5 ">
        <ProductGrid products={products} />
      </div>
        ) : (
            <div className='text-center h-[60vh] text-lg flex justify-center items-center bg-white font-semibold my-5 rounded-lg shadow-lg'>
                <span className=" italic font-semibold text-slate-500">No Products Found</span>
            </div>
        )
        }
        
      <div className=" mt-auto">
        <OrderPaging
          totalpages={totalpages}
          updatePage={handelPageChange}
          currentPage={currnetPage}
        />
      </div>
    </div>
  );
};

export default SearchResults;
