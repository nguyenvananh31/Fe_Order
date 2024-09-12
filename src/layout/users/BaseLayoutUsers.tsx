import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from './components/TopNav/TopNav'
import Header from './components/Header/Header'
import ItemProuduct from './components/ItemProuduct/ItemProuduct';

const BaseLayoutUsers = () => {
  return (
    <div>
      <TopNav />
      <Header />
      <Outlet />
      <div className="container max-w-[1140px] mx-auto">
        <div className="box p-4 grid grid-cols-4 gap-8">
          <ItemProuduct />
          <ItemProuduct />
          <ItemProuduct />
          <ItemProuduct />
        </div>
      </div>
    </div>
  )
}

export default BaseLayoutUsers
