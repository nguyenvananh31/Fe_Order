import React, { useState } from 'react';
import './ItemProducts.scss';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ItemProduct = () => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div className='w-full itemProduct group hover:bg-mainColor3 transition-all duration-1s cursor-pointer rounded-lg '>
      <div className="itemProduct-img py-16 px-20 relative">
        <img
          src="https://modinatheme.com/html/foodking-html/assets/img/food/burger-2.png"
          alt=""
          className="itemProduct__img w-full object-cover group-hover:scale-110 transition-all duration-1s"
        />
        {/* Thay đổi className dựa trên trạng thái liked */}
        <div className={`itemProduct-btn absolute top-0 left-0 p-1 flex justify-center items-center m-3 rounded-md transition-all ${liked ? 'bg-white' : 'bg-black hover:bg-white'}`}>
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
      <div className="itemProduct-main">
        {/* Nội dung khác */}
      </div>
    </div>
  );
};

export default ItemProduct;
