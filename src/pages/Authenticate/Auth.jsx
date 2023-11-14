import React from 'react'
import { Outlet } from 'react-router'

const Auth = () => {
  return (
    <div className=' flex justify-center items-start w-full h-[100vh] bg-main-bg'>

        <Outlet/>
    </div>
  )
}

export default Auth