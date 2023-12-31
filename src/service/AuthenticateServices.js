import axios from "axios";
import Cookies from "js-cookie";

const URI = "http://localhost:8000/api/v1";
const host = window.location.protocol+"//"+window.location.hostname+":"+window.location.port;
console.log(host)

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
    console.log(error)
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Missing Username or Password" };
    } else if (error?.response.status === 401) {
      return { success: false, message: "Invalid Username or Password" };
    } else if (error?.response.status === 403) {
      return { success: false, message: "Email or Password is incorrect" };
    }else if(error?.response.status === 404){
        if(error?.response.data === "NOT_VERIFIED"){
          return { success: false, message: "User Email Not Verified" };
    }
  }
    else  {
      return { success: false, message: "Login Failed" };
    }
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(
      `${URI}/auth/register`,
      data,
      { headers: { "Content-Type": "application/json",
    "x-host-url":host+"/Auth/verify-email" } },
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

    }else if(error?.response.status === 409){
      return { success: false, message: "Email already exists" }; 
    } 
    else {
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

export const tokenUserInfo = async (data) => {
  try {
    const response = await axios.get(
      `${URI}/auth/tokenUser?token=${data}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    if(response.status === 200){
    return { success: true, message:"Success",response:response };
    }

  } catch (error) {
    console.log(error)
    if (!error?.response) {
      return { success: false, message: "No Server Response", response:error };
      
    } else if (error?.code === "ERR_BAD_REQUEST") {
      
      
      if(error?.response.data === "Invalid Token"){
       
        return { success: false, message: "INVALID_TOKEN", response:error };
      }else if(error?.response.data === "Token Expired"){
          return { success: false, message: "TOKEN_EXPIRED ", response:error };
        }else if(error?.response.data === "User Already Verified"){
          return { success: false, message: "USER_ALREADY_VERIFIED", response:error };
        }


    } else {
      return { success: false, message: "verification Failed", response:error };
    }
  }
   
}



export const verifyEmail = async (data) => {
  try {
    const response = await axios.get(
      `${URI}/auth/verifyemail?token=${data}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    if(response.status === 200){
    return { success: true,message:"TOKEN_VERIFIED" ,response:response };
    }
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response", response:error };
      
    } else if (error?.code === "ERR_BAD_REQUEST") {
      
      
      if(error?.response.data === "Invalid Token"){
       
        return { success: false, message: "INVALID_TOKEN", response:error };
      }else if(error?.response.data === "Token Expired"){
          return { success: false, message: "TOKEN_EXPIRED ", response:error };
        }


    } else {
      return { success: false, message: "verification Failed", response:error };
    }
  }
  }
   

export const resendVerificationEmail = async (data) => {
  try {
    const response = await axios.get(
      `${URI}/auth/resendVerifyToken?token=${data}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-host-url": host+"Auth/verify-email"
        },
      },
      { withCredentials: true }
    );
    if(response.status === 200 && response.data === "User Verified"){
    return { success: true, response };
    }
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === "BAD REQUEST" && error?.response.data === "Token Expired") {
      return { success: false, message: "Token is expired" };
    } else if (error?.response.status === "BAD REQUEST" && error?.response.data === "Token Invalid") {
      return { success: false, message: "Invalid Token" };
    } else if (error?.response.status === "BAD REQUEST" && error?.response.data === "User Already Verified") {
      return { success: false, message: "User Already verified" };
    } else {
      return { success: false, message: "verification Failed" };
    }
  }
}

export const validateOldPassword = async (data) => {
  const token = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `${URI}/user/validateOldPassword`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      return { success: true, message: "Password Validated" };
    }
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Fatal error" };
    }
  }
};

export const changePassword = async (data) => {
  const token = Cookies.get("JWT");
  try {
    const response = await axios.post(
      `${URI}/user/changePassword`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      return { success: true, message: "Password Changed" };
    }
  } catch (error) {
    if (!error?.response) {
      return { success: false, message: "No Server Response" };
    } else if (error?.response.status === 400) {
      return { success: false, message: "Fatal error" };
    }
  }
};
