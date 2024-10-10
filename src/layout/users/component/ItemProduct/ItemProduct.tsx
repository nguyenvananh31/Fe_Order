import React, { useState } from 'react';
import './ItemProducts.scss';
import { HeartFilled, HeartOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../../../context/ProductContext';  // Import context

interface Size {
  id: number;
  name: string;
}

interface ProductDetail {
  id: number;
  price: number;
  quantity: number;
  size: Size;
  images: string[];
}

interface Product {
  id: number;
  name: string;
  thumbnail?: string;
  product_details: ProductDetail[];
}

interface ItemProductProps {
  product: Product;  // Sử dụng interface Product cho prop product
}

const ItemProduct: React.FC<ItemProductProps> = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useProductContext();  // Lấy hàm addToCart từ context

  const handleClick = () => {
    setLiked(!liked);
  };

  // Kiểm tra và lấy chi tiết sản phẩm
  const firstDetail = product.product_details && product.product_details.length > 0
    ? product.product_details[0]
    : null;

  if (!firstDetail) {
    return <p>No product details available</p>;
  }

  // Xử lý sự kiện khi nhấn nút Add to Cart
  const handleAddToCart = () => {
    if (firstDetail) {
      // Kiểm tra và gửi các thông tin cần thiết để thêm vào giỏ hàng
      addToCart({
        product_detail_id: firstDetail.id,  // ID của chi tiết sản phẩm
        product_id: product.id,             // ID của sản phẩm chính
        quantity: 1,                        // Số lượng thêm vào giỏ hàng
        price: firstDetail.price,           // Giá của sản phẩm
        size_id: firstDetail.size.id,       // ID của kích thước nếu có
      });
    }
  };

  return (
    <div className='w-full itemProduct group hover:bg-mainColor3 bg-transparent transition-all duration-1s cursor-pointer rounded-lg hover:shadow-lg'>
      <div className="itemProduct-img py-12 px-2 relative bg-white group-hover:bg-transparent rounded-md">
        <img
          src="https://modinatheme.com/html/foodking-html/assets/img/food/burger-2.png"
          alt={product.name}
          className="itemProduct__img w-full max-h-[145px] object-contain group-hover:scale-110 transition-all duration-1s"
        />
        <div className={`itemProduct-btn absolute top-0 left-0 p-1 flex justify-center items-center m-3 rounded-md transition-all ${liked ? 'bg-white' : 'bg-black hover:bg-white'}`}>
          <Button
            type="text"
            icon={liked ? <HeartFilled style={{ color: '#ffb936 ' }} /> : <HeartOutlined />}
            onClick={handleClick}
            style={{
              fontSize: '18px',
              color: liked ? 'red' : 'white',
              border: 'none',
              background: 'transparent',
            }}
          />
        </div>
      </div>

      <div className="itemProduct-main w-full opacity-0 scale-0 group-hover:opacity-[1] group-hover:scale-[1] duration-300">
        <div className="btn-add w-full flex justify-center">
          <button onClick={handleAddToCart} className='text-white bg-textColor1 py-[5px] px-[50px] rounded-[19px] text-[14px] hover:bg-mainColor2 leading-[20px]'>
            <ShoppingCartOutlined className='mr-2 text-[16px]' />
            <span className='capitalize'>Add to cart</span>
          </button>
        </div>
      </div>

      {firstDetail && (
        <div className="sale-preview sm:flex block text-center text-white items-center justify-center gap-[10px] py-[16px]">
          <span className="discount bg-mainColor3 text-[16px] text-textColor1 font-light py-[4px] px-[6px] group-hover:bg-bodyColor rounded-[3px] ">-5%</span>
          <span className='block sm:flex gap-2 sm:mt-0 mt-3 '>
            <span className="font-bold default text-mainColor1 text-[16px]">${firstDetail.price}</span>
            <del className="font-thin sm:ml-0 ml-2 price text-textColor2 text-[16px]">${(firstDetail.price - (firstDetail.sale || 0)).toFixed(2)}</del>
          </span>
        </div>
      )}

      <Link to={`product/${product.id}`} className='pro-info__title text-center text-[18px] text-textColor1'>
        <h2>{product.name}</h2>
      </Link>

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
