import React, { useEffect, useState } from 'react'
import { addReview, getAllProductReviews } from '../service/ProductServices';

const useProducts = () => {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);


    useEffect(()=>{
        async function getProducts(){
            setLoading(true)
            const response = await getProducts();
            const data = await response.json();
            setProducts(data);
            setLoading(false)
        }
        getProducts();
    },[])

    const getProducts = async () => {
        if (loading) return;
        setLoading(true);
        const response = await getProducts();
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

    return {
        products,
        loading,
        reviews,
        getProducts,
        addProducts,
        // deleteProducts,
        // updateProduct,
        getAllproductsReview,
        addProductReview
    }



}

export default useProducts