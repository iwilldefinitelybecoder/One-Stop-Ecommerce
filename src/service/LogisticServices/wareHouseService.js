import axios from 'axios';
import { serviceURL } from '../../utils/utils';

const baseURL = `${serviceURL}/api/v1/logistic/warehouse`; // Your API base URL

const instance = axios.create({
    baseURL,
    timeout: 5000,
});

// Get all warehouses
export const getAllWarehouses = async () => {
    try {
        const response = await instance.get('/getallwarehouse');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Handle API call errors
const handleError = (error) => {
    console.error('API Error:', error);
    throw error; // Rethrow the error for handling in the calling function
};

export default {
    getAllWarehouses,
    // Other API functions...
};
