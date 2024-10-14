import { PlusCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
interface IProduct {
    id?: string | number;
    name?: string;
    category?: string;
    description?: string;
    thumbnail?: string;
    product_details?: IDetail[]
}
interface IDetail {
    id?: string | number;
    name?: string;
    image?: string[];
    size?: size[];
    price?: number | string;
    quantity?: number
}
interface size {
    id: string | number;
    name: string;

}
const ProductCates = () => {
    const [products, setProducts] = useState<IProduct[]>([]); // Giữ thông tin product
    const [productDetails, setProductDetails] = useState<[]>([]); // Giữ product_details
    const param = useParams();
    const [selectedItems, setSelectedItems] = useState<[]>([]);
    const basUrl = import.meta.env.VITE_API_KEY;
    // Load data from localStorage when the component mounts
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        setSelectedItems(savedItems);
    }, []);

    // Function to handle adding item or updating quantity

    const handleAddItem = (id, name) => {
        const existingItem = selectedItems.find((product) => product.id === id);

        let updatedItems;
        if (existingItem) {
            // If item exists, increase quantity
            updatedItems = selectedItems.map((product) =>
                product.id === id ? { ...product, quantity: product.quantity + 1 } : product
            );
        } else {
            // If item does not exist, add it with quantity 1
            updatedItems = [...selectedItems, { id, name, quantity: 1 }];
        }

        setSelectedItems(updatedItems); // Update state
        localStorage.setItem('selectedItems', JSON.stringify(updatedItems)); // Save to localStorage

    };
    useEffect(() => {
        (async () => {
            const url = `http://127.0.0.1:8000/api/client/product_cate/${param.id}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Api_key': import.meta.env.VITE_API_KEY,
                    },
                });

                const fetchedProduct = res.data.data;
                setProducts(fetchedProduct);

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })();

    }, [param.id]);
    useEffect(() => {
        products.map((item) => {
            (async () => {
                const url = `http://127.0.0.1:8000/api/client/product/${item.id}`;
                try {
                    const res = await axios.get(url, {
                        headers: {
                            'Api_key': import.meta.env.VITE_API_KEY,
                        },
                    });
                    const fetchedProduct = res.data.data;
                    setProductDetails(fetchedProduct.product_details); // Lấy product_details
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            })();

        })
    }, [products]);

    // console.log(productDetails);

    return (
        <div className='w-full p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3'>
            {products?.map((item) => (
                <div key={item.id} className="box-order-item flex items-center justify-evenly gap-3 p-2 border rounded-md shadow-sm">
                    <div className="box-image">
                        <img className='w-[100px] h-[100px] object-contain' src={`${basUrl}${item.thumbnail}`} alt="" />
                    </div>
                    <div className="box-content pt-2">
                        <h3 className='text-textColor1 text-xl font-font1'>{item?.name}</h3>
                        <p className='font-font1 text-gray-600 text-[14px] mt-1'>Danh Mục: {item?.category}</p>
                    </div>
                    <div className="box-action">
                        <button onClick={() => handleAddItem(item.id, item.name)}>
                            <PlusCircleOutlined className='text-xl text-mainColor1 font-bold hover:text-mainColor2' />
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ProductCates