import { createContext, useState, useEffect, useRef } from 'react';
import { getData } from '../utils/encryptData';

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {

    const [ account, setAccount ] = useState(getData("account"));
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(false);


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
    
    return (
        <AccountContext.Provider value={{ 
            account, 
            setAccount, 
            showLoginButton,
            setShowLoginButton,
            showLogoutButton,
            setShowLogoutButton,
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;