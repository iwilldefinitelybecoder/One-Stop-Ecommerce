import CryptoJs from 'crypto-js';


const REACT_APP_SECREAT_KEY="MYKEY4DEMO";

export const saveData = ({data,type}) => {
    const jsonData = JSON.stringify(data);

    const encryptedData = CryptoJs.AES.encrypt(
        jsonData,
       REACT_APP_SECREAT_KEY
    ).toString();
 
    localStorage.setItem("account", encryptedData);
    }

    export const getData =  ({ type }) => {
        const encryptedData = localStorage.getItem("account");
      
        if (encryptedData) {
          try {
            const bytes = CryptoJs.AES.decrypt(encryptedData, REACT_APP_SECREAT_KEY);

      
            const data = bytes.toString(CryptoJs.enc.Utf8);

      
            if (data) {
              const jsonData = JSON.parse(data);
             
              return jsonData;
            }
          } catch (error) {
         
          }
        }
      
        return null;
      };
export const removeData = ({type}) => {
    localStorage.removeItem("account");
    
}


