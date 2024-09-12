import React, { useState } from 'react'
import './ItemProducts.scss';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const ItemProuduct = () => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    }
    return (
        <div className='w-full itemProuduct group hover:bg-mainColor3 transition-all duration-1s cursor-pointer rounded-lg '>
            <div className="itemProuduct-img py-16 px-20 relative">
                <img src="https://modinatheme.com/html/foodking-html/assets/img/food/burger-2.png" alt="" className="itemProuduct__img w-full object-cover group-hover:scale-110 transition-all duration-1s" />
            <div className="itemProduct-btn absolute top-0 left-0 p-1 flex justify-center items-center bg-black m-3 rounded-md hover:bg-white">
                    <Button
                        type="text"
                        icon={liked ? <HeartFilled style={{ color: '#ffb936 ' }} /> : <HeartOutlined />}
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
            <div className="itemProuduct-main">

            </div>
        </div>

    )
}

export default ItemProuduct