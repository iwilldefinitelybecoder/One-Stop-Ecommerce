import axios from "axios";

const API_URL = "http://localhost:8000/product/";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmhpY2hhbmRyYXYxMDhAZ21haWwuY29tIiwiaWF0IjoxNjk3NTEzMDUzLCJleHAiOjE2OTc1MTQ0OTN9.IFtm0KDSYuZbj4qvVB37-aFOIznzZ992Tgmy-OK13Ek"


export const AddProduct = async (product) => {
   try {
    return axios.post(API_URL + "add", product,
     {
        headers:
        {
        'Content-Type':"multipart/form-data",
        'Authorization':`Bearer ${token}`
     },t
    }
    );
   } catch (error) {
         console.log(error.message);
   }
     
   
}