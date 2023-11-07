import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { AccountContext } from '../../context/AccountProvider';
import MessagesBox from '../../components/body/Messages/MessagesBox';

const RequireAuth = ({allowedRoles}) => {
    const { account } = useContext(AccountContext);
    const location = useLocation();
  

  return (

        account?.role === allowedRoles?
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
    const { account } = useContext(AccountContext);
    const location = useLocation();
    const route = location.pathname;
    return (
      !account?.token && unAllowedRoutes.includes(route)?
      <Navigate to={'/'} state={{from:location}} replace />
      :
      <Outlet />
      
    )
  }

export default RequireAuth