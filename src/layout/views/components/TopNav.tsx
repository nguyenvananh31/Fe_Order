import { FacebookFilled, InstagramOutlined, SearchOutlined, TruckOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons'
import React from 'react'

const TopNav = () => {
    return (
        <div className='topNav hidden lg:block bg-bgColor1 border-b-[1px]'>
            <div className="container max-w-[1140px] mx-auto lg:grid lg:grid-cols-gridTopNav sm:block px-[20px]">
                <div className="container-left bg-bgColor1 flex items-center  py-4">
                    <h4 className='text-[16px] hidden lg:block font-semibold text-textColor1 mr-7'><span className='text-mainColor1 mr-2'>100%</span>Secure delivery without contacting the courier</h4>
                    <h4 className='text-[16px] hidden lg:block font-semibold text-textColor1'><TruckOutlined className='text-mainColor1 text-2xl font-bold' /> Track Your Order</h4>
                </div>
                <div className="container-right flex items-center bg-textColor1">
                    <form action="" className="form-search bg-bgColor1 h-full flex item-center border-l-[1px] pl-4 border-borderColor1">
                        <button className='border-none outline-none bg-transparent'><SearchOutlined className='text-2xl text-textColor2' /></button>
                        <input type="text" className="form-search__input h-full p-3 text-[16px] text-textColor2 bg-transparent border-none outline-none w-20" placeholder='Search...' />
                    </form>
                    <ul className="social-list flex items-center">
                        <ul className="box-social flex gap-4 ml-5">
                            <li className="box-social-item"><a href="" className="box-social-item__link group"><FacebookFilled className='text-[20px] text-textColor3' /></a></li>
                            <li className="box-social-item"><a href="" className="box-social-item__link group"><InstagramOutlined className='text-[20px] text-textColor3' /></a></li>
                            <li className="box-social-item"><a href="" className="box-social-item__link group"><TwitterOutlined className='text-[20px] text-textColor3' /></a></li>
                            <li className="box-social-item"><a href="" className="box-social-item__link group"><YoutubeFilled className='text-[20px] text-textColor3' /></a></li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopNav