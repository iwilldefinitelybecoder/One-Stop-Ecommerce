import axios from 'axios';
import Cookies from 'js-cookie';
import { serviceURL } from "../utils/utils";

const baseURL = `${serviceURL()}/api/v1/messages`; // Your API base URL

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

// GET all messages
export const getAllMessages = async (page,size) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.get('/getAll', {
            params: {
                page: page,
                size: size,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE message by identifier
export const deleteMessage = async (identifier) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.delete('/delete', {
            params: {
                identifier: identifier,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// DELETE all messages for the authenticated user
export const deleteAllMessages = async (userEmail) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.delete('/deleteAll', {
            params: {
                userEmail: userEmail,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// PUT (Update) message by identifier
export const updateMessage = async (messageId) => {
    setToken(Cookies.get("JWT"));
    try {
        const response = await instance.post('/update',messageId);
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
    getAllMessages,
    deleteMessage,
    deleteAllMessages,
    updateMessage,

};
