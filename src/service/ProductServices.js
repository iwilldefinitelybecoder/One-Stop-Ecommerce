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

export const getProductsByCategory = async (category) => {
    
    setToken(Cookies.get('JWT'));
        try {
            const response = await instance.get('/getProductsByCategory', {
                params: { category },
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

// Search results by keyword and/or category
export const searchResults = async (keyword, category,page) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/search-results', {
            params: { keyword, category,page },
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
        const response = await instance.post('/addReview', request,);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const validatePurchase = async (purchaseId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/validatePurchase', { params: { purchaseId } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Verify Review Exists
export const doesReviewExist = async (purchaseId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/verifyReviewExists', { params: { purchaseId } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get Write Review Meta Info
export const getWriteReviewMetaInfo = async (purchaseId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getWriteReviewMetaInfo', { params: { purchaseId } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get Review Data
export const getReviewData = async (purchaseId) => {
    setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/getReviewData', { params: { purchaseId } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get product attributes by attribute
export const getProductByAttributes = async (attribute) => {
  setToken(Cookies.get('JWT'));
    try {
        const response = await instance.get('/attributes', {
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
        const response = await instance.post('/publish',null, {
            params: {productId:productId},
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const getProductDetails  = async (productId) =>{
        
        setToken(Cookies.get('JWT'));
        try {
            const response = await instance.get('/getProduct', {
                params: {productId:productId},
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    export const getProductMajorDetails  = async (productId) =>{
        
        setToken(Cookies.get('JWT'));
        try {
            const response = await instance.get('/getProductMajorDetails', {
                params: {productId:productId},
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

export const validateReview  = async (purchaseId) =>{
        
        setToken(Cookies.get('JWT'));
        try {
            const response = await instance.get('/validateReview', {
                params: {purchaseId:purchaseId},
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

export const validateReviewExist  = async (purchaseId) =>{
            
            setToken(Cookies.get('JWT'));
            try {
                const response = await instance.get('/validateReviewExist', {params: {purchaseId:purchaseId}});
                return response
            } catch (error) {
                return handleError(error);
            }
        }

export const updateProductInfos  = async (productId,data) =>{
           
            
            setToken(Cookies.get('JWT'));
            try {
                const response = await instance.post('/updateMajorDetails',data, 
                   {params: {productId:productId}},

                );
                return response.data;
            } catch (error) {
                handleError(error);
            }
        }


export const getAttributes = async () =>{
                
                setToken(Cookies.get('JWT'));
                try {
                    const response = await instance.get('/getAddributes');
                    return response.data;
                } catch (error) {
                    handleError(error);
                }
            }

export const updateProductDetails  = async (data,productId) =>{
                    
                    setToken(Cookies.get('JWT'));
                    try {
                        const response = await instance.post('/updateDetails',data, 
                        {params: {productId:productId}},
        
                        );
                        return response.data;
                    } catch (error) {
                        handleError(error);
                    }
                }   
                
export const getProductReviewDetails  = async (productId) =>{
                    
                    setToken(Cookies.get('JWT'));
                    try {
                        const response = await instance.get('/getProductDetailReview', 
                        {params: {productId:productId}},
        
                        );
                        return response.data;
                    } catch (error) {
                        handleError(error);
                    }
                }   


// Handle API call errors
const handleError = (error) => {
    console.error('API Error:', error);
    console.error('API Error:', error.message)
    return error
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
    getProductByAttributes,
    // Other API functions...
};
