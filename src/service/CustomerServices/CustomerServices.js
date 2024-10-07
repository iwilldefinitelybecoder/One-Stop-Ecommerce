import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = `${serviceURL}/api/v1/customer/info`; // Your API base URL

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


export const getOrderInfo = async () => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getOrderInfo');
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


export const updateUserInfo = async (data) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.post('/updateUserInfo',data);
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUserInfo = async () => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getUserInfo');
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
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
