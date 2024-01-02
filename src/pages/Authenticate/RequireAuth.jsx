import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router'
import { AccountContext } from '../../context/AccountProvider';
import MessagesBox from '../../components/body/Messages/MessagesBox';

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
    const [serverResponse, setServerResponse] = useState("valid");
    const { account } = useContext(AccountContext);
    const location = useLocation();
    const purchaseId = useParams().id;
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await validatePurchase(purchaseId);
          setServerResponse(response.valid ? 'valid' : 'invalid');
        } catch (error) {
          console.error('Error:', error);
          setServerResponse('invalid');
        }
        setServerResponse("valid")
      }
  
      fetchData();
    }, [purchaseId]);
  
    if (account?.roles.find((role) => allowedRoles.includes(role))) {
      return serverResponse === 'valid' ? (
        <Outlet />
      ) : (
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
      );
    } else if (account?.email) {
      return (
        <>
          <Navigate to={'/login'} state={{ from: location }} replace />
          <MessagesBox newMessage={'Please Login to continue'} />
        </>
      );
    } else {
      return <Navigate to={'/unauthorized'} state={{ from: location }} replace />;
    }
  };
  
    
  

export default RequireAuth