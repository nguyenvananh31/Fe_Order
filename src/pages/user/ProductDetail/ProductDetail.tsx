/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarFilled } from '@ant-design/icons'
import { Button, Input, Tabs, Image } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './asset/ProductDetail.scss'
import { useProductContext } from '../../../context/ProductContext';  // Import the ProductContext
const { TabPane } = Tabs;

const ProductDetail = () => {
    const { addToCart } = useProductContext();  // Access the addToCart function from context
    const [quantity, setQuantity] = useState(1);  // Default quantity set to 1
    const [product, setProduct] = useState<any>(null); // Giữ thông tin product
    const [productDetails, setProductDetails] = useState([]); // Giữ product_details
    const [relatedProduct, setRelatedProduct] = useState([]); // Giữ product_details


    const param = useParams();

    useEffect(() => {
        (async () => {
            const url = `http://127.0.0.1:8000/api/client/product/${param.id}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Api_key': import.meta.env.VITE_API_KEY,
                    },
                });

                const fetchedProduct = res.data.data;
                setProduct(fetchedProduct);
                setProductDetails(fetchedProduct.product_details); // Lấy product_details

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })();
    }, [param.id]);

    useEffect(() => {
        if (!product) return;

        (async () => {
            const url = `http://127.0.0.1:8000/api/client/product_cate/${product.category.id}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Api_key': import.meta.env.VITE_API_KEY,
                    },
                });
                setRelatedProduct(res.data.data);

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })();
    }, [product]);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));  // Ensure quantity doesn't go below 1

    const [activeTab, setActiveTab] = useState('1');
    const [activeVariant, setActiveVariant] = useState<any>('1');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const handleVariantChange = (key: any) => {
        setActiveVariant(key);
    };

    // Handle Add to Cart
    const handleAddToCart = (selectedProductDetail: any) => {
        if (!selectedProductDetail) return;

        addToCart({
            product_detail_id: selectedProductDetail.id,  // ID của chi tiết sản phẩm
            product_id: product.id,             // ID của sản phẩm chính
            quantity: quantity,                 // Số lượng sản phẩm
            price: selectedProductDetail.price,  // Giá của sản phẩm
            size_id: selectedProductDetail.size.id  // Kích thước sản phẩm
        });

        console.log('Added to cart:', selectedProductDetail);
    };

    return (
        <>
            <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto md:mt-12 mt-4 md:gap-[24px]">
                {productDetails.length > 0 ?
                    productDetails.map((item, index) => (
                        (activeVariant === (Number(index) + 1) || activeVariant === String(Number(index) + 1)) && (
                            <div key={index} className='container md:grid grid-cols-gridProductDetail block max-w-[1140px] mx-auto md:mt-12 mt-0 gap-[24px]'>
                                <div className="container-left md:px-8 px-0">
                                    <div className="box-image-wrapper">
                                        <div className="box-image-thumbnail w-full h-1/3">
                                            <Image
                                                className="box-image-thumbnail__img w-full h-full object-cover"
                                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                                alt={product?.name}
                                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                            />
                                        </div>
                                        <div className="box-image-list grid grid-cols-3 gap-[24px] md:mt-[24px] mt-3 md:px-4 p-0">
                                            <Image
                                                className="box-image-list__img w-40 h-40 object-cover"
                                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                                alt={'Image 1'}
                                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                            />
                                            <Image
                                                className="box-image-list__img w-40 h-40 object-cover"
                                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                                alt={'Image 2'}
                                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                            />
                                            <Image
                                                className="box-image-list__img w-40 h-40 object-cover rounded-md"
                                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                                alt={'Image 3'}
                                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="container-right">
                                    <div className="box-info-wrapper">
                                        <div className="box-vote flex items-center gap-[8px] md:mt-2 mt-6">
                                            <span className='box-vote__discount px-3 py-2 bg-mainColor3 rounded-sm'>-5%</span>
                                            <div className="pro-ratting text-[16px] text-mainColor3 group-hover:text-bgColor1">
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                            </div>
                                            <span className='text-xl capitalize'>(5 Review)</span>
                                        </div>
                                        <h1 className='product__title text-3xl font-bold mt-[20px] uppercase text-textColor1'>{product?.name}</h1>
                                        <p className='priduct__desc text-type-4 mt-[16px]'>{product?.description}</p>
                                        <div className="product-cost mt-[20px] flex items-center gap-3">
                                            <span className='product__price text-2xl text-textColor1 font-semibold'>${item.price}</span>
                                            <del className='text-2xl font-font1 text-type-4 opacity-60 text-mainColor1'>${Number(item.price) + Number(item.sale)}</del>
                                        </div>
                                        <div className="quantity flex items-center space-x-2 mt-[16px] gap-2">
                                            <span className="font-bold text-sm text-type-3 text-textColor1 uppercase">Số lượng :</span>
                                            <div className="flex items-center border py-1 border-mainColor2 rounded-md text-type-3">
                                                <Button
                                                    className="flex items-center justify-center w-8 h-8 border-none shadow-none z-[100] text-type-3"
                                                    icon={<MinusOutlined />}
                                                    onClick={decrement}
                                                />
                                                <Input
                                                    className="w-12 text-center border-0 mx-2 text-type-3"
                                                    value={quantity}
                                                    readOnly
                                                />
                                                <Button
                                                    className="flex items-center justify-center w-8 h-8 border-none shadow-none z-[100]"
                                                    icon={<PlusOutlined />}
                                                    onClick={increment}
                                                />
                                            </div>
                                        </div>
                                        <div className="product-action flex gap-4 mt-[20px]">
                                            <button className="btn-type-1"><span>Order now</span></button>
                                            <button className="btn-type-2" onClick={() => handleAddToCart(item)}><span>Add to cart</span></button>
                                        </div>
                                        <div className="product-variant md:mt-[40px] mt-4 text-textColor1">
                                            <span className='text-lg block mb-3'>Quantity : {item?.quantity}</span>
                                            <div className='text-lg flex items-center'>
                                                Size : <Tabs
                                                    activeKey={activeVariant}
                                                    onChange={handleVariantChange}
                                                    centered
                                                    tabBarGutter={40}
                                                    className="ml-4 tabs-variants font-font1 font-bold tracking-wider">
                                                    {productDetails.map((item, index) => (
                                                        <TabPane
                                                            tab={<span>{item?.size.name}</span>}
                                                            key={index + 1}
                                                        />
                                                    ))}
                                                </Tabs>
                                            </div>
                                            <span className='block mt-[12px]  text-lg'>Categories: {product?.category?.name}</span>
                                            <span className='block mt-[12px] text-lg'>Tags: Burgers, Tacos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )) : (
                    <div>Loading...</div>
                )}
            </div>
            {/* Rest of your component */}
        </>
    );
};

export default ProductDetail;
