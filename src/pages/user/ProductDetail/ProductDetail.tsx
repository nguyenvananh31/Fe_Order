// import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Input, Tabs, Image } from 'antd';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './asset/ProductDetail.scss';
// import { useProductContext } from '../../../context/ProductContext'; // Import the ProductContext
// import { getImageUrl } from '../../../constants/common';

// const { TabPane } = Tabs;

// interface IProduct {
//   id: string | number;
//   name: string;
//   category: { id: string | number; name: string };
//   description: string;
//   thumbnail: string;
//   product_details: IDetail[];
// }

// interface IDetail {
//   id: string | number;
//   size: { id: string | number; name: string };
//   price: number;
//   quantity: number;
//   sale?: number;
//   images: { name: string }[];
// }

// const ProductDetail = () => {
//   const { addToCart } = useProductContext(); // Access the addToCart function from context
//   const [quantity, setQuantity] = useState(1);
//   const [product, setProduct] = useState<IProduct | null>(null);
//   const [activeVariant, setActiveVariant] = useState<number>(0);
//   const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/api/client/product/${id}`, {
//           headers: { Api_key: import.meta.env.VITE_API_KEY },
//         });
//         setProduct(res.data.data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     if (!product?.category.id) return;
//     const fetchRelatedProducts = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/api/client/product_cate/${product.category.id}`, {
//           headers: { Api_key: import.meta.env.VITE_API_KEY },
//         });
//         setRelatedProducts(res.data.data);
//       } catch (error) {
//         console.error('Error fetching related products:', error);
//       }
//     };
//     fetchRelatedProducts();
//   }, [product]);
//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   const handleVariantChange = (key: string) => setActiveVariant(Number(key));
//   const handleAddToCart = () => {
//     if (!product) return;
//     const selectedProductDetail = product.product_details[activeVariant];
//     if (!selectedProductDetail) return;

//     addToCart({
//       product_detail_id: selectedProductDetail.id,
//       product_id: product.id,
//       quantity,
//       price: selectedProductDetail.price,
//       size_id: selectedProductDetail.size.id,
//     });
//   };

//   if (!product) return <div>Loading...</div>;

//   const activeProductDetail = product.product_details[activeVariant];

//   return (
//     <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto md:mt-12 mt-4 md:gap-[24px]">
//       <div className="container md:grid grid-cols-gridProductDetail block max-w-[1140px] mx-auto md:mt-12 mt-0 gap-[24px]">
//         <div className="container-left md:px-8 px-0">
//           <div className="box-image-wrapper">
//             <div className="box-image-thumbnail w-full h-1/3">
//               <Image
//                 className="box-image-thumbnail__img w-full h-full object-cover"
//                 src={getImageUrl(product.thumbnail)}
//                 alt={product.name}
//                 preview={{ src: getImageUrl(product.thumbnail), className: 'rounded-md' }}
//               />
//             </div>
//             <div className="box-image-list grid grid-cols-3 gap-[24px] md:mt-[24px] mt-3 md:px-4 p-0">
//               {activeProductDetail.images.map((image, idx) => (
//                 <Image
//                   key={idx}
//                   className="box-image-list__img w-40 h-40 object-cover"
//                   src={getImageUrl(image.name)}
//                   alt={product.name}
//                   preview={{ src: getImageUrl(image.name), className: 'rounded-md' }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="container-right">
//           <div className="box-info-wrapper">
//             <div className="box-vote flex items-center gap-[8px] md:mt-2 mt-6">
//               <span className="box-vote__discount px-3 py-2 bg-mainColor3 rounded-sm">-5%</span>
//               <div className="pro-ratting text-[16px] text-mainColor3">
//                 {[...Array(5)].map((_, i) => (
//                   <StarFilled key={i} />
//                 ))}
//               </div>
//               <span className="text-xl capitalize">(5 Review)</span>
//             </div>
//             <h1 className="product__title text-3xl font-bold mt-[20px] uppercase text-textColor1">
//               {product.name}
//             </h1>
//             <p className="product__desc text-type-4 mt-[16px]">{product.description}</p>
//             <div className="product-cost mt-[20px] flex items-center gap-3">
//               <span className="product__price text-2xl text-textColor1 font-semibold">
//                 ${activeProductDetail.price}
//               </span>
//               <del className="text-2xl font-font1 text-type-4 opacity-60 text-mainColor1">
//                 ${Number(activeProductDetail.price) + Number(activeProductDetail.sale || 0)}
//               </del>
//             </div>
//             <div className="quantity flex items-center space-x-2 mt-[16px] gap-2">
//               <span className="font-bold text-sm text-type-3 text-textColor1 uppercase">Quantity :</span>
//               <div className="flex items-center border py-1 border-mainColor2 rounded-md text-type-3">
//                 <Button className="w-8 h-8" icon={<MinusOutlined />} onClick={decrement} />
//                 <Input className="w-12 text-center border-0 mx-2" value={quantity} readOnly />
//                 <Button className="w-8 h-8" icon={<PlusOutlined />} onClick={increment} />
//               </div>
//             </div>
//             <div className="product-action flex gap-4 mt-[20px]">
//               <button className="btn-type-1"><span>Order now</span></button>
//               <button className="btn-type-2" onClick={handleAddToCart}><span>Add to cart</span></button>
//             </div>
//             <div className="product-variant md:mt-[40px] mt-4 text-textColor1">
//               <span className="text-lg block mb-3">Quantity: {activeProductDetail.quantity}</span>
//               <div className="text-lg flex items-center">
//                 Size:
//                 <Tabs
//                   activeKey={String(activeVariant)}
//                   onChange={handleVariantChange}
//                   centered
//                   tabBarGutter={40}
//                   className="ml-4 tabs-variants font-font1 font-bold tracking-wider"
//                 >
//                   {product.product_details.map((detail, idx) => (
//                     <TabPane tab={<span>{detail.size.name}</span>} key={String(idx)} />
//                   ))}
//                 </Tabs>
//               </div>
//               <span className="block mt-[12px] text-lg">Categories: {product.category.name}</span>
//               <span className="block mt-[12px] text-lg">Tags: Burgers, Tacos</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import { useParams } from 'react-router-dom';
import { useProductDetail } from './service/useProductDetail';
import ProductImageGallery from './component/ProductImageGallery';
import ProductInfo from './component/ProductInfo';
import ProductVariants from './component/ProductVariants';
import { useState } from 'react';
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';
import { Input } from 'antd/lib';
import TabPane from 'antd/es/tabs/TabPane';
import { Tabs } from 'antd';


const ProductDetail = () => {
    const { id } = useParams();
    const { product, relatedProducts, loading } = useProductDetail(id!);  // Custom hook for fetching product details
    const [quantity, setQuantity] = useState(1);
    const [activeVariant, setActiveVariant] = useState<number>(0);
    const [activeTab, setActiveTab] = useState('1');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleVariantChange = (key: string) => setActiveVariant(Number(key));

    const handleAddToCart = (selectedProductDetail: unknown) => {
        // Logic to handle add to cart
        console.log('Added to cart:', selectedProductDetail);
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const activeProductDetail = product.product_details[activeVariant];

    return (
        <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto md:mt-6 my-4 md:gap-[24px]">
            <div className="container md:grid grid-cols-gridProductDetail block max-w-[1140px] mx-auto md:mt-6 mt-0 gap-[24px]">
                <div className="container-left md:px-8 px-0">
                    <ProductImageGallery
                        thumbnail={product.thumbnail}
                        images={activeProductDetail.images}
                        productName={product.name}
                    />
                </div>
                <div className="container-right">
                    <ProductInfo
                        productName={product.name}
                        description={product.description}
                        price={activeProductDetail.price}
                        sale={activeProductDetail.sale || 0}
                        quantity={activeProductDetail.quantity}
                        currentQuantity={quantity}
                        increment={increment}
                        decrement={decrement}
                        handleAddToCart={() => handleAddToCart(activeProductDetail)}
                    />
                    <ProductVariants
                        productDetails={product.product_details}
                        activeVariant={activeVariant}
                        handleVariantChange={handleVariantChange}
                    />
                </div>
            </div>
            <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto gap-[24px]">
                {/* Tabs Navigation */}
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    centered
                    tabBarGutter={40}
                    tabBarStyle={{ fontWeight: 'bold', fontSize: '16px' }}
                    className='tabs-detail text-type-3 md:mt-12 mt-6 pb-3'
                >
                    <TabPane tab={<span className='capitalize mx-2 text-lg'>Chi tiết</span>} key="1" />
                    <TabPane tab={<span className='capitalize mx-2 text-lg'>Biến thể</span>} key="2" />
                    <TabPane tab={<span className='capitalize mx-2 text-lg'>Phản Hồi</span>} key="3" />
                </Tabs>
                {/* Content Based on Selected Tab */}
                <div className="my-6 md:px-12 w-full">
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
                            <h2 className="text-type-3">INFORMATION</h2>
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
                                    <tr>
                                        <td className="border py-2 px-4">Size</td>
                                        <td className="border py-2 px-4">
                                        </td>
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
                                        <div className='w-full md:flex items-center justify-between'>
                                            <div className='w-full md:flex items-center gap-[24px]'>
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
                    <h2 className='text-5xl text-mainColor2 mt-3 font-bold'>RELATED PRODUCTS</h2>
                </div>
                <div className="related-product grid lg:grid-cols-4 grid-cols-2 md:px-20 py-12 gap-3 max-w-[1140px] mx-auto">
                    {relatedProducts
                        .filter((pro) => pro.id !== product.id)
                        .slice(0, 10) // Only take the first 10 products after filtering
                        .map((product, index) => (
                            <ItemProduct product={product} key={index} />
                        ))}
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;