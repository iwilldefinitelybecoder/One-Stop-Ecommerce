import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8000/api/v1/product'; // Your API base URL

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

// Add product with data and images
export const addProduct = async (data) => {
  setToken(Cookies.get('JWT'));

    try {
        const response = await instance.post('/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200 ) {
            return response.data;
        } else {
            throw new Error('Error adding product');
        }
    } catch (error) {
        handleError(error);
    }
};

// Get all products
export const getAllProducts = async () => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getproducts');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Search products by keyword and/or category
export const searchProducts = async (keyword, category) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/search', {
            params: { keyword, category },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Search results by keyword and/or category
export const searchResults = async (keyword, category) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/search-results', {
            params: { keyword, category },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get all product reviews by productId
export const getAllProductReviews = async (productId) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/allProductReviews', {
            params: { productId },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Add a review for a product
export const addReview = async (request) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.post('/addReview', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get product attributes by attribute
export const getProductAttributes = async (attribute) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/product/attributes', {
            params: { attribute },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const publishProducts  = async (productId) =>{
    
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.post('/product/publish',null, {
            params: {productId:productId},
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}


// Handle API call errors
const handleError = (error) => {
    console.error('API Error:', error);
    throw error; // Rethrow the error for handling in the calling function
};

export default {
    setToken,
    clearToken,
    addProduct,
    getAllProducts,
    searchProducts,
    searchResults,
    getAllProductReviews,
    addReview,
    getProductAttributes,
    // Other API functions...
};
