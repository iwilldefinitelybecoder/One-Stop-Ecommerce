import React, { useEffect, useState } from 'react'
import { addReview, getAllProductReviews, getAllProducts, getProductDetails, getProductMajorDetails, getProductReviewDetails, getProductsByCategory, publishProducts, updateProductInfos } from '../service/ProductServices';
import { sleep } from '../utils/utils';

const useProducts = () => {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({})

    useEffect(()=>{
        async function fetchProducts(){
            setLoading(true)
            const response = await getAllProducts();
            setProducts(response);
            setLoading(false)
        }
        fetchProducts();
    },[])

  
    const getProducts = async () => {
        if (loading) return;
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response);
        setLoading(false);
    }

    const addProducts = async (product) => {
        if (loading) return;
        setLoading(true);
        const response = await addProducts(product);
        setProducts([...products, response]);
        setLoading(false);
    }

    // const deleteProducts = async (id) => {
    //     if (loading) return;
    //     setLoading(true);
    //     await deleteProducts(id);
    //     setProducts(prev => Array.isArray(prev) && prev.filter((product) => product.productId!== id));
    //     setLoading(false);
    // }

    // const updateProduct = async (id, product) => {
    //     if (loading) return;
    //     setLoading(true);
    //     const response = await updateProducts(id, product);
    //     setProducts(prev => Array.isArray(prev) && prev.map((product) => product.productId === id ? response : product));
    //     setLoading(false);
    // }

    const getAllproductsReview = async (id) => {
        if (loading) return;
        setLoading(true);
        const response = await getAllProductReviews(id);
        setReviews(response);
        setLoading(false);
    }

    const addProductReview = async (id, review) => {
        if (loading) return;
        setLoading(true);
        const response = await addReview(id, review);
        setReviews([...reviews, response]);
        return response;
        setLoading(false);
    }

    const publishAproduct = async (id) => {
        if (loading) return;
        setLoading(true);
        const response = await publishProducts(id);
        getProducts();
        setLoading(false);
    }

    const getProductDetailss = async (id) => {
        if (loading) return;
        setLoading(true);
        const response = await getProductDetails(id);
        setLoading(false);
        return response;
    }

    const fetchProductsByCategory = async (category,id) => {
        if (loading) return;
        setLoading(true);
        const response = await getProductsByCategory(category);
        if(response?.length === 0){
            getAllProducts()}
            else{
                if(id === undefined){
                    setProducts(response);
                    return;
                }
                setProducts(response?.filter(res=>  res.productId !== id));
            }
        await sleep(500)
        setLoading(false);
    }

    const updateProductInfo = async (id, product) => {
        if (loading) return;
        setLoading(true);
        const response = await updateProductInfos(id, product);
        setProducts(prev => Array.isArray(prev) && prev.map((product) => product.productId === id ? response : product));
        setLoading(false);
    }

    const getProductMajorDetailss = async (id) => {
        if (loading) return;
        setLoading(true);
        const response = await getProductMajorDetails(id);
        setLoading(false);
        return response;
    }

    const getProductReviewDetail = async (id) => {
        if (loading) return;
        setLoading(true);
        const response = await getProductReviewDetails(id);
        
        setLoading(false);
        setReviewData(response);
    }

    const searchResults = async (keyword,category,page)=>{
        if (loading) return;
        setLoading(true);
        const response = await searchResults(keyword,category,page);
        setLoading(false);
        await sleep(300);
        setReviewData(response);
    }


    return {
        products,
        loading,
        reviews,
        getProducts,
        addProducts,
        // deleteProducts,
        // updateProduct,
        getAllproductsReview,
        addProductReview,
        publishAproduct,
        reviewData,
        getProductReviewDetail,
        getProductDetailss,
        fetchProductsByCategory,
        getProductMajorDetailss,
        updateProductInfo,
        searchResults,
    }



}

export default useProducts