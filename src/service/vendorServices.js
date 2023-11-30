import axios from "axios";
import Cookies from "js-cookie";

const URI = "http://localhost:8000/api/v1/vendor";

const baseURL = 'http://localhost:8000/api/v1/vendor'; // Your API base URL

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


export const upgradeToVendor = async (data) => {
    const token = Cookies.get("JWT");
    try {
        const response = await axios.post(
        `${URI}/register`,
        data,
        {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        },
        { withCredentials: true }
        );
        if (response.status === 200 || response.status === "ok") {
        return { success: true, response };
        }
    } catch (error) {
        if (!error?.response) {
        return { success: false, message: "No Server Response" };
        } else if (error?.response.status === 403) {
        return { success: false, message: "Session Expired" };
        } else {
        return { success: false, message: "failed to connect to server" };
        }
    }
    }

    export const AuthVendor = async (data) => {
        const token = Cookies.get("JWT");
        try {
          const response = await axios.get(
            `${URI}/authenticate`,

            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
            { withCredentials: true }
          );
          if (response.status === 200 || response.status === "ok") {
            return { success: true, response };
          }
        } catch (error) {
          if (!error?.response) {
            return { success: false, message: "No Server Response" };
          } else if (error?.response.status === 403) {
            return { success: false, message: "Session Expired" };
          } else {
            return { success: false, message: "failed to connect to server" };
          }
        }
      }

      export const getVendorProductList = async () => {
        setToken(Cookies.get('JWT'));
          try {
              const response = await instance.get('/getAll', {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              return response.data;
          } catch (error) {
              handleError(error);
          }
      };
    