import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../views/components/TopNav'
import Header from '../views/components/Header'

const BaseLayoutUsers = () => {
  return (
    <div>
      <TopNav/>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default BaseLayoutUsers
