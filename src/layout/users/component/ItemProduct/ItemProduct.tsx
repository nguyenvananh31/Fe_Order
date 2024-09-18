import React, { useState } from 'react';
import './ItemProducts.scss';
import { HeartFilled, HeartOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { Button } from 'antd';

const ItemProduct = () => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    return (
        <div className='w-full itemProduct group hover:bg-mainColor3 transition-all duration-1s cursor-pointer rounded-lg shadow-lg'>
            <div className="itemProduct-img py-12 px-2 relative">
                <img
                    src="https://modinatheme.com/html/foodking-html/assets/img/food/burger-2.png"
                    alt=""
                    className="itemProduct__img w-full max-h-[145px] object-contain group-hover:scale-110 transition-all duration-1s"
                />
                {/* Thay đổi className dựa trên trạng thái liked */}
                <div className={`itemProduct-btn absolute top-0 left-0 p-1 flex justify-center items-center m-3 rounded-md transition-all ${liked ? 'bg-white' : 'bg-black hover:bg-white'}`}>
                    <Button
                        type="text"
                        icon={liked ? <HeartFilled className='' style={{ color: '#ffb936 ' }} /> : <HeartOutlined />}
                        onClick={handleClick}
                        style={{
                            fontSize: '18px',
                            color: liked ? 'red' : 'white',
                            border: 'none',
                            background: 'transparent'
                        }}
                    />
                </div>
            </div>
            <div className="itemProduct-main w-full opacity-0 scale-0 group-hover:opacity-[1] group-hover:scale-[1] duration-300">
                {/* Nội dung khác */}
                <div className="btn-add w-full flex justify-center">
                    <button className='text-white bg-textColor1 py-[5px] px-[50px] rounded-[19px] text-[14px] hover:bg-mainColor2 leading-[20px] '> <ShoppingCartOutlined className='mr-2 text-[16px]' /><span className='capitalize'>Add to cart</span></button>
                </div>

            </div>
            <div className="sale-preview flex text-white items-center justify-center gap-[10px] py-[16px]">
                <span className="discount bg-mainColor3 text-[16px] text-textColor1 font-light py-[4px] px-[6px] group-hover:bg-bodyColor rounded-[3px] ">-5%</span>
                <span className="default text-mainColor1 text-[16px] font-light">$60</span>
                <span className="price text-textColor2 text-[16px] font-">$30</span>
            </div>
            <h2 className='pro-info__title text-center text-[18px] text-textColor1'>Whopper Burger King</h2>
            <div className="pro-ratting mt-[16px] pb-[16px] flex items-center justify-center text-[14px] text-mainColor3 group-hover:text-bgColor1">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
            </div>
        </div>
    );
};

export default ItemProduct;
