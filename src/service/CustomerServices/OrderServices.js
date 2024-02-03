import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8000/api/v1/customer/orders'; // Your API base URL

const instance = axios.create({
    baseURL,
    timeout: 5000,
});

// Set JWT token in request headers
const setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear JWT token from request headers
const clearToken = () => {
    delete instance.defaults.headers.common['Authorization'];
};

// GET all orders
export const getAllOrders = async () => {
    setToken(Cookies.get('JWT'))
    try {
        const response = await instance.get('/getOrderBasicDetails');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PUT (Cancel) order
export const cancelOrder = async (request) => {
    setToken(Cookies.get('JWT'))
    try {

        return null;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderItemTrackingData = async (trackingId) => {
    setToken(Cookies.get('JWT'))
    try {
        const response = await instance.get('/getTrackingData',{params:{trackingId}});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// POST (Create) order
export const createOrder = async (request) => {
    setToken(Cookies.get('JWT'))
    try {
        const response = await instance.post('/createOrder', request);

        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// GET order by orderId
export const getOrderById = async (orderId) => {
    setToken(Cookies.get('JWT'))
    try {
        
        return null;
    } catch (error) {
        handleError(error);
    }
};

export const applyCouponCode = async (couponCode) => {
    setToken(Cookies.get('JWT'))
    try {
        const response = await instance.get(`/applyCoupon`,
            { params: { couponCode } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const getOrderDetailsById = async (Id) => {
    setToken(Cookies.get('JWT'))
    try {
        const response = await instance.get(`/getOrderDetailsById`,
            { params: { orderId:Id } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const fetchTrackingData = async (Id) => {
    setToken(Cookies.get('JWT'))
    try {
        const response = await instance.get(`/getTrackingData`,
            { params: { orderItem:Id } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

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
    getAllOrders,
    cancelOrder,
    createOrder,
    getOrderById,
    // Other API functions...
};
