import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

const TopNav = () => {
    return (
        <div className='topNav px-[20px] hidden lg:block bg-bgColor1'>
            <div className="container max-w-[1140px] mx-auto lg:grid lg:grid-cols-gridTopNav sm:block">
                <div className="container-left bg-bgColor1 flex items-center pl-[20px] py-3">
                    <h4 className='text-[16px] hidden lg:block font-semibold text-textColor1 mr-5'><span className='text-mainColor1'>100%</span>Secure delivery without contacting the courier</h4>
                    <h4 className='text-[16px] hidden lg:block font-semibold text-textColor1'> Track Your Order</h4>
                </div>
                <div className="container-right flex items-center bg-textColor1 pr-[20px]">
                    <form action="" className="form-search bg-bgColor1 h-full flex item-center">
                        <button className='border-none outline-none bg-transparent'><SearchOutlined className='scale-100' /></button>
                        <input type="text" className="form-search__input h-full p-3 text-[16px] text-textColor1 bg-transparent border-none outline-none" />
                    </form>
                    <ul className="social-list flex items-center">
                        <li className="social-list-item"><a href="" className="social-list-item__link">1</a></li>
                        <li className="social-list-item"><a href="" className="social-list-item__link">2</a></li>
                        <li className="social-list-item"><a href="" className="social-list-item__link">3</a></li>
                        <li className="social-list-item"><a href="" className="social-list-item__link">4</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopNav