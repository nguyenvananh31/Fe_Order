import { Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import '../asset/ProductDetail.scss'
interface ProductInfoProps {
    productName: string;
    description: string;
    price: number;
    sale: number;
    quantity: number;
    currentQuantity: number;
    increment: () => void;
    decrement: () => void;
    handleAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    productName,
    description,
    price,
    sale,
    quantity,
    currentQuantity,
    increment,
    decrement,
    handleAddToCart,
}) => {
    return (
        <div className="box-info-wrapper">
            <div className="box-vote flex items-center gap-[8px] md:mt-2 mt-6">
                <span className="box-vote__discount px-3 py-2 bg-mainColor3 rounded-sm">-5%</span>
                <div className="pro-ratting text-[16px] text-mainColor3">
                    {[...Array(5)].map((_, i) => (
                        <StarFilled key={i} />
                    ))}
                </div>
                <span className="text-xl capitalize">(5 Review)</span>
            </div>
            <h1 className="product__title text-3xl font-bold mt-[20px] uppercase text-mainColor2">{productName}</h1>
            <p className="product__desc text-type-3 mt-[16px]">{description}</p>
            <div className="product-cost mt-[16px] flex items-end gap-3">
                <span className="product__price text-2xl text-mainColor1 font-semibold">{price}<span className='text-textColor1 text-sm'>(VNĐ)</span></span>
                <del className="text-2xl font-font1 text-type-4 opacity-60 text-mainColor1">
                    {price + sale}VNĐ
                </del>
            </div>
            <div className="quantity flex items-center space-x-2 mt-[16px]">
                <span className="font-bold text-textColor1 capitalize">Số lượng :</span>
                <div className="flex items-center border py-1 px-2  rounded-md text-type-3">
                    <Button
                        className="w-6 h-8"
                        icon={<MinusOutlined className='' />}
                        onClick={decrement}
                    />
                    <Input
                        className="w-12 text-center border-0 mx-2 text-type-1"
                        value={currentQuantity}
                        readOnly
                    />
                    <Button
                        className="w-6 h-8"
                        icon={<PlusOutlined className='' />}
                        onClick={increment}
                    />
                </div>
            </div>
            <div className="product-action flex items-center gap-4 mt-[20px]">
                <button className="w-12 h-12 rounded-full bg-mainColor2 flex items-center justify-center hover:bg-mainColor1 hover:scale-110 duration-300" onClick={handleAddToCart}><span><ShoppingCartOutlined className='text-xl text-white' /></span></button>
                <button className="btn-type-1"><span>Đặt Hàng Ngay</span></button>
            </div>
            <span className="block mt-[12px] text-type-2">Kho: <span className='text-mainColor2 capitalize ml-2 font-bold'>{quantity} <span className=''>(Sản phẩm)</span></span></span>
        </div>
    );
};

export default ProductInfo;
