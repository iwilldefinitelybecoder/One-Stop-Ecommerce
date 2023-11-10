import axios from "axios";
import Cookies from "js-cookie";

const URI = "http://localhost:8000/api/v1/vendor";

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