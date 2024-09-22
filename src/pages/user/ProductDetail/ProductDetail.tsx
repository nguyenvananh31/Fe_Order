import { StarFilled } from '@ant-design/icons'
import { Button, Input, Tabs, Image } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';
const { TabPane } = Tabs;

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState<any>(null); // Giữ thông tin product
    const [productDetails, setProductDetails] = useState([]); // Giữ product_details

    const param = useParams();

    useEffect(() => {
        (async () => {
            const url = `http://127.0.0.1:8000/api/client/product/${param.id}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Api_key': 'Mej9ao3hfxn68l70DImqcreshf06nU84S7qvY481yZrEWTpcOiLzPtdzBqzg',
                    },
                });

                const fetchedProduct = res.data.data;
                setProduct(fetchedProduct);
                setProductDetails(fetchedProduct.product_details); // Lấy product_details

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })()
    }, [param.id]);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

    const [activeTab, setActiveTab] = useState('1');
    const [activeVariant, setActiveVariant] = useState('1');


    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };
    const handleVariantChange = (key: string) => {
        setActiveVariant(key);
    };
    return (
        <>
            <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]">
                {activeVariant === '1' && (
                    <div className='container grid grid-cols-gridProductDetail max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]'>
                        <div className="container-left px-8">
                            <div className="box-image-wrapper">
                                <div className="box-image-thumbnail w-full h-1/3">
                                    <Image
                                        className="box-image-thumbnail__img w-full h-full object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={product?.name}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                </div>
                                <div className="box-image-list grid grid-cols-3 gap-[24px] mt-[24px] px-4">
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover rounded-md"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="container-right">
                            <div className="box-info-wrapper">
                                <div className="box-vote flex items-center gap-[8px] mt-12">
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
                                <h1 className='product__title text-3xl font-bold mt-[20px]'>{product?.name}</h1>
                                <p className='priduct__desc text-type-4 mt-[16px]'>There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form, by injected humour, or randomised</p>
                                <div className="product-cost mt-[20px] flex gap-3">
                                    <span className='product__price text-3xl text-textColor1'>${productDetails[0]?.price}</span>
                                    <del className='text-2xl text-type-4 opacity-60 text-mainColor1'>${Number(productDetails[0]?.price) + Number(productDetails[0]?.sale)}</del>
                                </div>
                                <div className="quantity flex items-center space-x-2 mt-[16px] gap-2">
                                    <span className="font-bold text-sm text-type-3">QUANTITY:</span>
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
                                    <button className="btn-type-2"><span>Add to cart</span></button>
                                </div>
                                <div className="product-variant mt-[40px] text-textColor1">
                                    <h4 className='text-md mb-3'>GROUND DELIVERY SURCHARGE: </h4>
                                    <div className='block mt-[12px] text-md'>
                                        Size :
                                    </div>
                                    <span className='block mt-[12px] text-md'>Categories: </span>
                                    <span className='block mt-[12px] text-md'>Tags: Burgers, Tacos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeVariant === '2' && (
                    <div className='container grid grid-cols-gridProductDetail max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]'>
                        <div className="container-left px-8">
                            <div className="box-image-wrapper">
                                <div className="box-image-thumbnail w-full h-1/3">
                                    <Image
                                        className="box-image-thumbnail__img w-full h-full object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={product?.name}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                </div>
                                <div className="box-image-list grid grid-cols-3 gap-[24px] mt-[24px] px-4">
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover rounded-md"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="container-right">
                            <div className="box-info-wrapper">
                                <div className="box-vote flex items-center gap-[8px] mt-12">
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
                                <h1 className='product__title text-3xl font-bold mt-[20px]'>{product?.name}</h1>
                                <p className='priduct__desc text-type-4 mt-[16px]'>There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form, by injected humour, or randomised</p>
                                <div className="product-cost mt-[20px] flex gap-3">
                                    <span className='product__price text-3xl text-textColor1'>${productDetails[0]?.price}</span>
                                    <del className='text-2xl text-type-4 opacity-60 text-mainColor1'>${Number(productDetails[0]?.price) + Number(productDetails[0]?.sale)}</del>
                                </div>
                                <div className="quantity flex items-center space-x-2 mt-[16px] gap-2">
                                    <span className="font-bold text-sm text-type-3">QUANTITY:</span>
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
                                    <button className="btn-type-2"><span>Add to cart</span></button>
                                </div>
                                <div className="product-variant mt-[40px] text-textColor1">
                                    <h4 className='text-md mb-3'>GROUND DELIVERY SURCHARGE: </h4>
                                    <div className='block mt-[12px] text-md'>
                                        Size :
                                    </div>
                                    <span className='block mt-[12px] text-md'>Categories: </span>
                                    <span className='block mt-[12px] text-md'>Tags: Burgers, Tacos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeVariant === '3' && (
                    <div className='container grid grid-cols-gridProductDetail max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]'>
                        <div className="container-left px-8">
                            <div className="box-image-wrapper">
                                <div className="box-image-thumbnail w-full h-1/3">
                                    <Image
                                        className="box-image-thumbnail__img w-full h-full object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={product?.name}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                </div>
                                <div className="box-image-list grid grid-cols-3 gap-[24px] mt-[24px] px-4">
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                    <Image
                                        className="box-image-list__img w-40 h-40 object-cover rounded-md"
                                        src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                        preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="container-right">
                            <div className="box-info-wrapper">
                                <div className="box-vote flex items-center gap-[8px] mt-12">
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
                                <h1 className='product__title text-3xl font-bold mt-[20px]'>{product?.name}</h1>
                                <p className='priduct__desc text-type-4 mt-[16px]'>There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form, by injected humour, or randomised</p>
                                <div className="product-cost mt-[20px] flex gap-3">
                                    <span className='product__price text-3xl text-textColor1'>${productDetails[0]?.price}</span>
                                    <del className='text-2xl text-type-4 opacity-60 text-mainColor1'>${Number(productDetails[0]?.price) + Number(productDetails[0]?.sale)}</del>
                                </div>
                                <div className="quantity flex items-center space-x-2 mt-[16px] gap-2">
                                    <span className="font-bold text-sm text-type-3">QUANTITY:</span>
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
                                    <button className="btn-type-2"><span>Add to cart</span></button>
                                </div>
                                <div className="product-variant mt-[40px] text-textColor1">
                                    <h4 className='text-md mb-3'>GROUND DELIVERY SURCHARGE: </h4>
                                    <div className='block mt-[12px] text-md'>
                                        Size :
                                    </div>
                                    <span className='block mt-[12px] text-md'>Categories: </span>
                                    <span className='block mt-[12px] text-md'>Tags: Burgers, Tacos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <div className='container grid grid-cols-gridProductDetail max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]'>
                <div className="container-left px-8">
                    <div className="box-image-wrapper">
                        <div className="box-image-thumbnail w-full h-1/3">
                            <Image
                                className="box-image-thumbnail__img w-full h-full object-cover"
                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                alt={product?.name}
                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                            />
                        </div>
                        <div className="box-image-list grid grid-cols-3 gap-[24px] mt-[24px] px-4">
                            <Image
                                className="box-image-list__img w-40 h-40 object-cover"
                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                            />
                            <Image
                                className="box-image-list__img w-40 h-40 object-cover"
                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                            />
                            <Image
                                className="box-image-list__img w-40 h-40 object-cover rounded-md"
                                src={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                alt={'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png'}
                                preview={{ src: 'https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png', className: 'rounded-md' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="container-right">
                    <div className="box-info-wrapper">
                        <div className="box-vote flex items-center gap-[8px] mt-12">
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
                        <h1 className='product__title text-3xl font-bold mt-[20px]'>{product?.name}</h1>
                        <p className='priduct__desc text-type-4 mt-[16px]'>There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form, by injected humour, or randomised</p>
                        <div className="product-cost mt-[20px] flex gap-3">
                            <span className='product__price text-3xl text-textColor1'>${productDetails[0]?.price}</span>
                            <del className='text-2xl text-type-4 opacity-60 text-mainColor1'>${Number(productDetails[0]?.price) + Number(productDetails[0]?.sale)}</del>
                        </div>
                        <div className="quantity flex items-center space-x-2 mt-[16px] gap-2">
                            <span className="font-bold text-sm text-type-3">QUANTITY:</span>
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
                            <button className="btn-type-2"><span>Add to cart</span></button>
                        </div>
                        <div className="product-variant mt-[40px] text-textColor1">
                            <h4 className='text-md mb-3'>GROUND DELIVERY SURCHARGE: </h4>
                            <div className='block mt-[12px] text-md'>
                                Size :
                            </div>
                            <span className='block mt-[12px] text-md'>Categories: </span>
                            <span className='block mt-[12px] text-md'>Tags: Burgers, Tacos</span>
                        </div>
                    </div>
                </div>
            </div> */}
            <Tabs
                activeKey={activeVariant}
                onChange={handleVariantChange}
                centered
                tabBarGutter={40}
                tabBarStyle={{ fontWeight: 'bold', fontSize: '16px' }}
                className='text-type-3 '>
                <TabPane tab={"size 1"} key="1" />
                <TabPane tab="size 2" key="2" />
                <TabPane tab="size 3" key="3" />
            </Tabs>

            <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]">
                {/* Tabs Navigation */}
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    centered
                    tabBarGutter={40}
                    tabBarStyle={{ fontWeight: 'bold', fontSize: '16px' }}
                    className='text-type-3 '
                >
                    <TabPane tab={"DESCRIPTION"} key="1" />
                    <TabPane tab="ADDITIONAL INFORMATION" key="2" />
                    <TabPane tab="REVIEWS (4)" key="3" />

                </Tabs>

                {/* Content Based on Selected Tab */}
                <div className="my-6 px-12 w-full">
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
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === '3' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">REVIEWS (4)</h2>
                            <div className="space-y-4">
                                {/* Review Item */}
                                <div className="p-4 border rounded-lg">
                                    <div className="w-full flex items-center">
                                        <img src="https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png" alt="Reviewer" className="w-24 h-24 rounded-sm mr-4" />
                                        <div className='w-full flex items-center justify-between'>
                                            <div className='w-full flex items-center gap-[24px]'>
                                                <div >
                                                    <h3 className="font-bold text-type-3">MIKLOS SALSA</h3>
                                                    <p className="text-sm text-gray-500">27 JUNE 2024 AT 5:44 PM</p>
                                                </div>
                                                <p className="text-type-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                            </div>
                                            <div className="ml-auto text-yellow-500 text-2xl">
                                                ★★★★★
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more review items */}

                                {/* Add Review Form */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4">ADD A REVIEW</h3>
                                    <div className="flex items-center mb-4">
                                        <span className="mr-2">Rate this product:</span>
                                        <div className="text-yellow-500 text-2xl">
                                            ★★★★★
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Full Name" className="border p-2 rounded-md outline-none text-type-3" />
                                        <input type="email" placeholder="Email Address" className="border p-2 rounded-md outline-none text-type-3" />
                                    </div>
                                    <Input.TextArea rows={8} className="border mt-4 p-2 rounded-md outline-none w-full text-type-3" placeholder="Message" ></Input.TextArea>
                                    <button className='btn-type-2 mt-4'><span>Send Message</span></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="container bg-bgColor1 px-[16px] lg:px-[20px] mx-auto my-12 gap-[24px] pt-8">
                <div className="reated-product-heading text-center">
                    <span className='text-sm text-mainColor1'>crispy, every bite taste</span>
                    <h2 className='text-5xl text-textColor1 mt-3'>RELATED PRODUCTS</h2>
                </div>
                <div className="related-product grid grid-cols-4 px-20 py-12 gap-3 max-w-[1140px] mx-auto">
                    {/* <ItemProduct/> */}
                    {/* <ItemProduct/> */}
                    {/* <ItemProduct/> */}
                    {/* <ItemProduct/> */}
                </div>
            </div>
        </>
    )
}

export default ProductDetail