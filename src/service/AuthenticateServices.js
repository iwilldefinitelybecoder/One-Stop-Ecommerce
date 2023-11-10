import axios from "axios";
import Cookies from "js-cookie";

const URI = "http://localhost:8000/api/v1";

export const login = async (data) => {
  try {
    const response = await axios.post(
      `${URI}/auth/login`,
      data,
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    return { success: true, response };
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Missing Username or Password" };
    } else if (error?.response.status === 401) {
      return { success: false, message: "Invalid Username or Password" };
    } else if (error?.response.status === 403) {
      return { success: false, message: "Email or Password is incorrect" };
    } else {
      return { success: false, message: "Login Failed" };
    }
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(
      `${URI}/auth/register`,
      data,
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    return { success: true, response };
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Missing Username or Password" };
    } else if (error?.response.status === 401) {
      return { success: false, message: "Invalid Username or Password" };
    } else if (error?.response.status === 403) {
      return { success: false, message: "Email or Password is incorrect" };
    } else {
      return { success: false, message: "Login Failed" };
    }
  }
}

export const Authenticate = async ({ data }) => {
  const token = Cookies.get("JWT");
  try {
    const response = await axios.get(
      `${URI}/user/authenticate`,
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
};

export const SaveUserIcon = async (data) => {
  const token = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `${URI}/user/uploadprofileicon`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
      { setTimeout: 10000 }
    );
    if (response.status === 200) {
      return { success: true, message: "Icon Saved" };
    }
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Error, retry again" };
    }
  }
};

export const fetchUserIcon = async (id) => {
  const token = Cookies.get("JWT");
  try {
    const response = await axios.get(
      `${URI}/user/getprofileicon/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );
    if (response.status === 200) {
      return {
        success: true,
        response,
        contentType: response.headers["content-type"],
      };
    }
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Fatal error" };
    }
  }
};
