import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useOutletContext, useParams } from 'react-router'
import { AccountContext } from '../../context/AccountProvider';
import MessagesBox from '../../components/body/Messages/MessagesBox';
import { useSearchParams } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { validatePurchase } from '../../service/ProductServices';
import Loader from '../../components/body/Loader';

const RequireAuth = ({allowedRoles}) => {
    const { account } = useContext(AccountContext);
    const location = useLocation();


  

  return (

        account?.roles.find(role=> allowedRoles.includes(role))?
        <Outlet />:
        account?.email?
        <Navigate to={'/unauthorized'} state={{from:location}} replace />
        :
        <>
        <Navigate to={'/login'} state={{from:location}} replace />
        <MessagesBox newMessage={"Please Login to continue"} />
        </>
    
  )
}

export const RequireAuth2 = ({unAllowedRoutes}) => {
  const { account } = useContext(AccountContext);
  const location = useLocation();
  const route = location.pathname;
  return (
      
      account?.token && unAllowedRoutes.includes(route)?
      <Navigate to={'/'} state={{from:location}} replace />
      :
      <Outlet />
      
    
        
      
    )
  }

  export const RequireAuth3 = ({unAllowedRoutes}) => {

  
    const { account,authErrors } = useContext(AccountContext);
    const location = useLocation();
    const route = location.pathname;
    return (
      authErrors.invalidToken && !account?.token && unAllowedRoutes.includes(route)?
      <Navigate to={'/'} state={{from:location}} replace />
      :
      <Outlet />
      
    )
  }

  export const ValidateAuth = ({ allowedRoles }) => {
    const [serverResponse, setServerResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { account } = useContext(AccountContext);
    const location = useLocation();
    const purchaseId = useParams().id;
  
    useEffect(() => {
      let isMounted = true;
  
      async function fetchData(purchaseId) {
        try {
          const response = await validatePurchase(purchaseId);
  
          // Check if the component is still mounted before updating state
          if (isMounted) {
            setServerResponse(response);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error:', error);
  
          // Check if the component is still mounted before updating state
          if (isMounted) {
            setServerResponse('invalid');
            setLoading(false);
          }
        }
      }
  
      fetchData(purchaseId);
  
      // Cleanup function to set isMounted to false when the component unmounts
      return () => {
        isMounted = false;
      };
    }, [purchaseId]);

    
     return loading ? (
        <Loader />
      ) : account?.roles.find((role) => allowedRoles.includes(role)) ? (
        serverResponse === 'valid' ? (
          <Outlet />
        ) : (
          <Navigate to={'/unauthorized'} state={{ from: location }} replace />
        )
      ) : account?.email ? (
        <>
          <Navigate to={'/login'} state={{ from: location }} replace />
          <MessagesBox newMessage={'Please Login to continue'} />
        </>
      ) : (
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
      )
     
   
    
  };


  
  export const CheckOutAuth  = ({currentPage,requiredValues})=>{
    const [topcntr] = useOutletContext();
    const {orderDetails} = useOrders();
    const location = useLocation();

    const route = location.pathname;
    const page = currentPage;
    

    return (
      route === page &&
      requiredValues.every((value)=>orderDetails[value] !== '')?
      <Outlet context={[topcntr]} />
      :
      <Navigate to={'/checkout'} state={{from:location}} replace />
      
    )
     
  }
  
    
  

export default RequireAuth