import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../views/components/TopNav'

const BaseLayoutUsers = () => {
  return (
    <div>
      <TopNav/>
      <Outlet/>
    </div>
  )
}

export default BaseLayoutUsers
