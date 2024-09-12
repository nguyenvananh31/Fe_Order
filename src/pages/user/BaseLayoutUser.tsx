import React from 'react'
import TopNav from '../../layout/users/components/TopNav/TopNav'
import { Outlet } from 'react-router-dom'
import Header from '../../layout/users/components/Header/Header'

const BaseLayoutUser = () => {
  return (
    <div className='wrapper'>
        <TopNav/>
        <Header/>
        <Outlet></Outlet>
    </div>
  )
}

export default BaseLayoutUser