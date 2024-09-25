import { CloseCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Drawer, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Order = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [activeVariant, setActiveVariant] = useState<any>('1');
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const handleVariantChange = (key: any) => {
    setActiveVariant(key);
  };
  return (
    <>
      <div className='container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto gap-[24px] py-6'>
        <div className="box-content grid grid-cols-gridOrder">
          <div className="box-table-info">1</div>
          <div className="box-ads-slider">2</div>
        </div>
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
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            centered
            tabBarGutter={40}
            tabBarStyle={{ fontWeight: '', fontSize: '16px' }}
            className='text-type-3 '
          >
            <TabPane tab={"DESCRIPTION"} key="1" />
            <TabPane tab="ADDITIONAL INFORMATION" key="2" />

          </Tabs>
          <div className="py-2 px-2">
            <div className="container">

              {activeTab === '1' && (
                <div className='w-full'>
                  <h2 className="text-2xl font-bold">EXPERIENCE IS OVER THE WORLD VISIT</h2>
                  <p className="mt-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium...
                  </p>
                  <h3 className="mt-8 text-2xl w-full font-bold">MORE DETAILS</h3>
                  <ul className="list-none w-full mt-4 space-y-2 grid grid-cols-2 gap-[16px]">
                    {/* Details List */}
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span> Lorem Ipsum is simply dummy text of the printing industry.
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span> Lorem Ipsum is simply dummy text of the printing industry.
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span> Lorem Ipsum is simply dummy text of the printing industry.
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span> Lorem Ipsum is simply dummy text of the printing industry.
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span> Lorem Ipsum is simply dummy text of the printing industry.
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 font-bold mr-2">✔</span> Lorem Ipsum is simply dummy text of the printing industry.
                    </li>
                    {/* Add more list items */}
                  </ul>
                </div>
              )}
              {activeTab === '2' && (
                <div className='text-type-4'>
                  <h2 className="text-type-3">ADDITIONAL INFORMATION</h2>
                  <table className="w-full mt-4 border-collapse">
                    <tbody>
                      <tr>
                        <td className="border py-2 px-4">Weight</td>
                        <td className="border py-2 px-4">240 Ton</td>
                      </tr>
                      <tr>
                        <td className="border py-2 px-4">Dimensions</td>
                        <td className="border py-2 px-4">20 × 30 × 40 cm</td>
                      </tr>
                      <tr>
                        <td className="border py-2 px-4">Colors</td>
                        <td className="border py-2 px-4">Black, Blue, Green</td>
                      </tr>
                      <tr>
                        <td className="border py-2 px-4">Size</td>
                        <td className="border py-2 px-4">

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
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