import axios from 'axios';
import Cookies from 'js-cookie';
import { serviceURL } from '../../utils/utils';

const baseURL = `${serviceURL}/api/v1/customer/address`; // Your API base URL

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

// GET all addresses
export const getAllAddresses = async () => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.get('/getAll');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE address by identifier
export const deleteAddress = async (identifier) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.delete(`/delete?identifier=${identifier}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// POST (Add) new address
export const addAddress = async (address) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.post('/add', address);

        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PUT (Update) address by identifier
export const updateAddress = async (identifier, address) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.put(`/update?identifier=${identifier}`, address);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// GET address by identifier
export const getAddress = async (identifier) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.get(`/get?identifier=${identifier}`);
        return response.data;
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
    getAllAddresses,
    deleteAddress,
    addAddress,
    updateAddress,
    getAddress,
    // Other API functions...
};
