import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';

const ProductByCate = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [category, setCategory] = useState<any[]>([]);

    const param = useParams()
    useEffect(() => {
        (async () => {
            const url = `http://127.0.0.1:8000/api/client/product_cate/${param.id}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Api_key': import.meta.env.VITE_API_KEY,
                    },
                });
                console.log(res.data.data);
                setProducts(res.data.data)
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })();
        (async () => {
            const url = `http://127.0.0.1:8000/api/client/category/${param.id}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Api_key': import.meta.env.VITE_API_KEY,
                    },
                });
                console.log(res.data.data);
                setCategory(res.data.data)
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })()
    }, [setProducts, param.id]);

    return (
        <div className="container max-w-[1140px] px-20 gap-3 mx-auto my-16">
            <h2 className='text-4xl text-center text-textColor1 block pb-5 uppercase'>sản phẩm của Danh mục <Link to={`/product/category/${param.id}`} className='text-mainColor3'>{category.name}</Link></h2>
            <div className="box-filter py-4 border-b-[1px]">
            </div>
            <div className="box-list-product bg-bgColor1 border mt-4 p-4 grid lg:grid-cols-4 grid-cols-2 gap-4">
                {products.map((product, index) => (
                    <ItemProduct product={product} key={index} />
                ))}
            </div>
        </div>
    )
}

export default ProductByCate