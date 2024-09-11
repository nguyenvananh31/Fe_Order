import React from 'react'
import TopNav from '../../layout/views/components/TopNav'
import { Outlet } from 'react-router-dom'
import Header from '../../layout/views/components/Header'

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