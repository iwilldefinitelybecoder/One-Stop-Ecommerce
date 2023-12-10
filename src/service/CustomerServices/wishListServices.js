import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8000/api/customer/wishlist'; // Your API base URL for Wishlist

const instance = axios.create({
    baseURL,
    timeout: 5000,
});

const setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearToken = () => {
    delete instance.defaults.headers.common['Authorization'];
};

const handleError = (error) => {
    if (error.response) {
        console.error('API Error - Status:', error.response.status);
        console.error('API Error - Data:', error.response.data);
        // Handle specific status codes or response data
    } else if (error.request) {
        console.error('API Error - Request:', error.request);
        // Handle request errors (e.g., no response)
    } else {
        console.error('API Error - Message:', error.message);
        // Handle other errors
    }
};

export const getWishList = async () => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getAll');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteFromWishList = async (productId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.delete(`/delete?productId=${productId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addProductToWishList = async (productId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get(`/add?productId=${productId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const moveProductToCart = async (productId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get(`/moveToCart?productId=${productId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const moveAllToCart = async (identifier) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get(`/moveAllToCart?identifier=${identifier}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const moveAllToWishList = async (identifier) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get(`/moveAllToWishList?identifier=${identifier}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const moveProductToWishList = async (cartItemId, productId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get(`/moveToWishList?cartItemId=${cartItemId}&productId=${productId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const emptyWishList = async () => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.delete('/emptyWishList');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default {
    setToken,
    clearToken,
    getWishList,
    deleteFromWishList,
    addProductToWishList,
    moveProductToCart,
    moveAllToCart,
    moveAllToWishList,
    moveProductToWishList,
    emptyWishList,
    // Other wishlist functions...
};
