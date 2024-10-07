import axios from 'axios';
import axiosRetry from 'axios-retry';
import Cookies from 'js-cookie';
import { serviceURL } from "../utils/utils";

const baseURL = `${serviceURL()}/api/v1/products/coupons`; // Your API base URL

const instance = axios.create({
    baseURL,
    timeout: 5000,
});

axiosRetry(instance, {
    retries: 2,
    retryDelay: axiosRetry.exponentialDelay, // Exponential back-off strategy
    shouldResetTimeout: true,
});

// Set JWT token in request headers
const setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear JWT token from request headers
const clearToken = () => {
    delete instance.defaults.headers.common['Authorization'];
};


// GET all coupons
export const getAllCoupons = async (email) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.get('/getAll', {
            params: {
                userEmail: email,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE coupon by ID
export const deleteCoupon = async (couponId) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.delete('/delete', {
            params: {
                couponId: couponId,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PUT (Update) coupon by ID
export const updateCoupon = async (couponId, updateData) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.put('/update', updateData, {
            params: {
                couponId: couponId,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// POST (Apply) coupon by ID and email
export const applyCoupon = async (couponId, email) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.post('/validateCoupon', null, {
            params: {
                couponId: couponId,
                email: email,
            },
        });
        return response.data.message;
    } catch (error) {
        handleError(error);
    }
};

// Handle API call errors
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

export default {
    setToken,
    clearToken,
    getAllCoupons,
    deleteCoupon,
    updateCoupon,
    applyCoupon,
};
