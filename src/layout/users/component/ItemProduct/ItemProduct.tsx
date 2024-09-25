import React, { useState } from 'react';
import './ItemProducts.scss';
import { HeartFilled, HeartOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../../../context/ProductContext';  // Import context

interface Product {
    thumbnail?: string;
    name: string;
    id?: number|string;
    product_details: ProductDetail[];
}

interface ItemProductProps {
    product: Product;  // Sử dụng interface Product cho prop product
}

const ItemProduct: React.FC<ItemProductProps> = ({ product }) => {
    const [liked, setLiked] = useState(false);

    const { addToCart } = useProductContext();  // Lấy hàm addToCart từ context (giả sử bạn đã định nghĩa)

    const handleClick = () => {
        setLiked(!liked);
    };

    // Xử lý sự kiện khi nhấn nút Add to Cart
    const handleAddToCart = () => {
        addToCart(product);  // Thêm sản phẩm vào giỏ hàng
    };
    // Lấy thông tin product_details từ product
    const firstDetail = product.product_details[0];  // Lấy giá từ phần tử đầu tiên của mảng product_details

    return (
        <div className='w-full itemProduct group hover:bg-mainColor3 bg-transparent transition-all duration-1s cursor-pointer rounded-lg hover:shadow-lg'>
            <div className="itemProduct-img py-12 px-2 relative bg-white group-hover:bg-transparent rounded-md">
                <img
                    src="https://modinatheme.com/html/foodking-html/assets/img/food/burger-2.png"
                    alt={product.name}
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
                <div className="btn-add w-full flex justify-center">
                    <button onClick={handleAddToCart} className='text-white bg-textColor1 py-[5px] px-[50px] rounded-[19px] text-[14px] hover:bg-mainColor2 leading-[20px]'>
                        <ShoppingCartOutlined className='mr-2 text-[16px]' />
                        <span className='capitalize'>Add to cart</span>
                    </button>
                </div>
            </div>
            <div className="sale-preview flex text-white items-center justify-center gap-[10px] py-[16px]">
                <span className="discount bg-mainColor3 text-[16px] text-textColor1 font-light py-[4px] px-[6px] group-hover:bg-bodyColor rounded-[3px] ">-5%</span>
                <span className="default text-mainColor1 text-[16px] font-light">${firstDetail.price}</span>
                <span className="price text-textColor2 text-[16px]">$100</span>
            </div>
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