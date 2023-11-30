import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8000/api/v1/customer/cart'; // Your API base URL

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

// GET all cart items
export const getAllCartItems = async () => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getAll');
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PUT (Update) cart item
export const updateCartItem = async (cartItemsRequest) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.put('/updateItem', cartItemsRequest);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE cart item by cartItemId
export const deleteCartItem = async (cartItemId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.delete(`/deleteItem?cartItemId=${cartItemId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// POST (Add) cart item
export const addCartItem = async (cartItemsRequest) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.post('/addItem', cartItemsRequest);
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE (Empty) cart
export const emptyCart = async () => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.delete('/emptyCart');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// GET cart total
export const getCartTotal = async () => {
    
    try {
        const response = await instance.get('/getTotal');
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
    getAllCartItems,
    updateCartItem,
    deleteCartItem,
    addCartItem,
    emptyCart,
    getCartTotal,
    // Other API functions...
};
