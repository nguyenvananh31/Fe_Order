import React from 'react'
import TopNav from '../../layout/users/TopNav/TopNav'
import { Outlet } from 'react-router-dom'
import Header from '../../layout/users/Header/Header'
import ItemProuduct from '../../layout/users/ItemProuduct/ItemProuduct'

const BaseLayoutUser = () => {
  return (
    <div className='wrapper'>
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

export default BaseLayoutUser