import React, { useEffect, useState } from 'react'
import { addReview, getAllProductReviews, getAllProducts, getProductDetails, getProductMajorDetails, getProductsByCategory, publishProducts, updateProductInfos } from '../service/ProductServices';

const useProducts = () => {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    console.log(products)

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

    const fetchProductsByCategory = async (category) => {
        if (loading) return;
        setLoading(true);
        const response = await getProductsByCategory(category);
        setProducts(response);
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
        getProductDetailss,
        fetchProductsByCategory,
        getProductMajorDetailss,
        updateProductInfo

    }



}

export default useProducts