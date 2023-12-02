import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8000/api/v1/customer/cards'; // Your API base URL

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

// GET all cards
export const getAllCards = async () => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.get('/getAll');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PUT (Update) card item
export const updateCardItem = async (request) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.put('/updateItem', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE card item
export const deleteCardItem = async (cardId) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.delete(`/deleteItem?cardId=${cardId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// POST (Add) card item
export const addCardItem = async (request) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.post('/addItem', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PATCH (Set Default) card
export const setDefaultCard = async (cardId) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.patch(`/setDefault?cardId=${cardId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// GET single card by cardId
export const getCardById = async (cardId) => {
    setToken(Cookies.get("JWT"))
    try {
        const response = await instance.get(`/getCard?cardId=${cardId}`);
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
    getAllCards,
    updateCardItem,
    deleteCardItem,
    addCardItem,
    setDefaultCard,
    getCardById,
    // Other API functions...
};
