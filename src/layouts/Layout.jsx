import React from 'react'
import Header from './header/Header'

import FooterLayout from './footer/FooterLayout'
import { Outlet } from 'react-router'


function Layout({children}) {
    
  return (
    <>
    <div className='the-main-container bg-main-bg'>

    <Header/>
    <Outlet/>
    <FooterLayout/>
    </div>
    </>
  )
}

export default Layout