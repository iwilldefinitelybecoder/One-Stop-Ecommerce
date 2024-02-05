import React, { useEffect } from "react";
import ProductGrid from "./ProductGrid";
import useProducts from "../../CustomHooks/ProductsHook";
import { OrderPaging } from "../user/orders/Orders";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadings, setLoadings] = React.useState(false);
  const { searchResultss, products,loading } = useProducts();
  const [currnetPage, setCurrentPage] = React.useState(searchParams.get("page") || 0);
  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const priceRange = searchParams.get("range");
  const query = searchParams.get("q");
  let totalpages = Math.ceil(products?.length / 10);
  let startIndex = currnetPage * 10;
  let endIndex = (currnetPage + 1) * 10;
  let currentOrders = products?.slice(startIndex, endIndex);

  useEffect(() => {
    // fetch results 
    const keyword = searchParams.get('q');
    
    async function fetchProducts() {
    
      const range = priceRange ? priceRange.split(",") : [0, 100000];
      range[0] = parseFloat(range[0]);
      range[1] = parseFloat(range[1]);
      const data = {
        keyword,
        category,
        averageRating: rating,
        priceRange: range,
        page: currnetPage,
      }
      await searchResultss(data);
      let product = products.filter((product) => {
        if(product?.salePrice > 0){
        if (product?.salePrice >= range[0] && product?.salePrice <= range[1]) {
          console.log("product",product)
          return product;
        }
      }else{
        if(product?.regularPrice >= range[0] && product?.regularPrice <= range[1]){
          return product;
        }
      }
      });
       totalpages = Math.ceil(product?.length / 10);
      startIndex = currnetPage * 10;
      endIndex = (currnetPage + 1) * 10;
      currentOrders = product?.slice(startIndex, endIndex);
      setLoadings(false);
    }
    setLoadings(true);
    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 500);
    searchParams.set("page", currnetPage);
    setSearchParams(searchParams);

    return () => {
      clearTimeout(debounceFetch);
    };
  }, [currnetPage,query,category,rating,priceRange]);

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
        
      <div className=" h-auto my-5 ">
        <ProductGrid products={currentOrders} loading1={loading} loading2={loading} />
      </div>
       
        
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
