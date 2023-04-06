import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
const Layout = ({userLoggedIn}) => {
  return (
    <div>
        <Header userLoggedIn={userLoggedIn}/>
        <Outlet />
    </div>
  )
}

export default Layout