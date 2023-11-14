import { createContext, useState, useEffect, useRef } from 'react';
import { getData, saveData } from '../utils/encryptData';
import { fetchUserIcon } from '../service/AuthenticateServices';
import { roles } from '../routes/Path';
import { AuthVendor } from '../service/vendorServices';

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {

    const [ account, setAccount ] = useState(getData("account"));
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const [authErrors, setAuthErrors] = useState({
      invalidToken: false,
      tokenExpired: false,
      noUserData: false,
    });

    useEffect(() => {
      async function authVendor() {
        const token = account?.token;
        const response = await AuthVendor(token);
        if (response?.success) {
          saveData("account", { ...account.token, ...response?.response?.data });
        } else {
          console.log(response);
        }  
      }
      if (account?.role === roles.VENDOR) authVendor();
    }, [account]);

    useEffect(() => {
        async function fetchProfileIcon() {
          const data = await fetchUserIcon(account?.imageId);
    
          if (data?.success) {
            try {
              // const urlLink = await binaryToDataURL(data?.response.data);
              const blob = new Blob([data?.response.data], {
                type: data?.response.headers["content-type"],
              });
              const urlLink = URL.createObjectURL(blob);
              setAccount({ ...account, userIcon: `http://localhost:8000/api/v1/user/getprofileicon/${account.imageId}` });
             
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log(response);
          }
        }
        if (account?.imageId) fetchProfileIcon();
      }, [account?.imageId]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if(e.key === "account") {
        setAccount(getData("account"));
            }
        };
        window.addEventListener("storage", handleStorageChange);

        return () =>{
            window.removeEventListener("storage", handleStorageChange);

        }
  
    }
    ,[])

    useEffect(() => {
        
    }
    ,[account])
    
    return (
        <AccountContext.Provider value={{ 
            account, 
            setAccount, 
            showLoginButton,
            setShowLoginButton,
            showLogoutButton,
            setShowLogoutButton,
            authErrors,
            setAuthErrors
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;