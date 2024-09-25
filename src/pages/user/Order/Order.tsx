import { CloseCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Order = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div className='container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto gap-[24px] py-6'>
        <Drawer
          placement="right"
          onClose={onClose}
          closable={false}
          open={visible}
          className="w-full relative"
        >
          <div className="sideBar-heading px-4 py-6 w-full flex items-center justify-between border-b-[1px] shadow-sm">
            <div className="logo-wrapper">
              <img src="https://modinatheme.com/html/foodking-html/assets/img/logo/logo.svg" alt=""
                className="logo-wrapper__img w-[120px]" />
            </div>
            <button className="group" onClick={onClose}>
              <CloseCircleFilled className='text-mainColor1 text-4xl group-active:text-mainColor2' />
            </button>
          </div>
          <div className="py-2 px-2">
            <div className="container">
              <ul className="menus-mobile md:hidden block ">
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={``} className="menus-item__link text-type-2">Home</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={``} className="menus-item__link text-type-2">Product</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={``} className="menus-item__link text-type-2">Table</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={``} className="menus-item__link text-type-2">Order</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={``} className="menus-item__link text-type-2">About us</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link to={``} className="menus-item__link text-type-2">Contact</Link><PlusOutlined /></li>
              </ul>
            </div>
            <div className="container">
              <form action="" className='mt-5 border border-borderColor1 rounded-md flex items-center justify-between p-4 hover:border-mainColor2'>
                <input type="text" placeholder='Search...' className='border-none outline-none rounded-md w-full text-type-3' />
                <button type='submit' className='border-none group'><SearchOutlined className='text-textColor2 text-xl group-hover:text-mainColor2' /></button>
              </form>
              <p className='text-type-4 py-4 '>This involves interactions between a business and its customers. It's about meeting customers' needs and resolving their problems. Effective customer service is crucial.</p>

            </div>
            <div className="container my-5 flex justify-center">
              <button className="btn-type-2"><span>Order now</span></button>
            </div>
          </div>
        </Drawer>
        <button
          className="fixed top-[50%] right-[16px] w-[50px] h-[50px] rounded-full bg-mainColor2 flex items-center justify-center text-white cursor-pointer hover:bg-mainColor1 shadow-md"
          onClick={showDrawer}
        >
          Order
        </button>
      </div>
      {/* Drawer */}

    </>

  )
}

export default Order