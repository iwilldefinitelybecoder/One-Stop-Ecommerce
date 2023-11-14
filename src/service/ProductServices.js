import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8000/api/v1/product/";




export const AddProduct = async (product) => {
  const token = Cookies.get("JWT");
  try {
    return axios.post(API_URL + "add", product, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};


export const getProducts = async () => {
  const token = Cookies.get("JWT"); 
  try {
    return axios.get(API_URL + "get", {
      headers:{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    }, {
      withCredentials: true
    });
  } catch (error) {
    console.log(error.message);
  }
}