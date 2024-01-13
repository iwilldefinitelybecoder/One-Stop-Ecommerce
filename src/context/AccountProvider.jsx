import { createContext, useState, useEffect, useRef } from 'react';
import { getData, saveData } from '../utils/encryptData';
import { fetchUserIcon } from '../service/AuthenticateServices';
import { roles } from '../routes/Path';
import { AuthVendor } from '../service/vendorServices';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import useMessage from '../CustomHooks/MessageHook';
import useMessageHandler from '../components/body/Messages/NewMessagingComponent';
import { getAllMessages } from '../service/messageServices';

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {

    const [ account, setAccount ] = useState(getData("account"));
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const {handelMessage, getMessageComponents} = useMessageHandler();
    const [authErrors, setAuthErrors] = useState({
      invalidToken: false,
      tokenExpired: false,
      noUserData: false,
    });
    const socketRef = useRef();

    useEffect(() => {
      const socket = new SockJS('http://localhost:8000/ws', null, {
        transports: ['websocket'],
        withCredentials: false
      });
      const stompClient = Stomp.over(socket);
    
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (messageOutput) {
          console.log(messageOutput);
        });
    
        const subscription = stompClient.subscribe("queue/notification", function (data) {
           getAllMessages();
           handelMessage("you have a new Notification", "success");
           
        });
    
        socketRef.current = stompClient;
    
        return () => {
          if (socketRef.current.connected) {
            socketRef.current.disconnect();
          }
          if (subscription.id !== null && stompClient.connected) {
            subscription.unsubscribe();
          }
        };
      });

       
    }, []);



    useEffect(() => {
        async function fetchProfileIcon() {
          const data = await fetchUserIcon(account?.imageId);
    
          if (data?.success) {
            try {
              // const urlLink = await binaryToDataURL(data?.response.data);
              const blob = await fetch(`http://localhost:8000/api/v1/user/getprofileicon/${account?.imageId}`).then((r) =>r.blob());
              
              const urlLink = URL.createObjectURL(blob);
              setAccount({ ...account, userIcon:urlLink });
             
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log(data?.response?.data?.message);
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

    
    return (
        <AccountContext.Provider value={{ 
            account, 
            setAccount, 
            showLoginButton,
            setShowLoginButton,
            showLogoutButton,
            setShowLogoutButton,
            authErrors,
            setAuthErrors,
            socketRef,
        }}>
          {getMessageComponents()}
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;