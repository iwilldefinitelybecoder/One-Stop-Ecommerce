import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8000/product/";

const token = Cookies.get("JWT");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const AddProduct = async (product) => {
  try {
    return axios.post(API_URL + "add", product, {
      headers: headers,
    });
  } catch (error) {
    console.log(error.message);
  }
};
