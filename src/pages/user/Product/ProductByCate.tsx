import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';
import { apiGetProByCate } from './utils/cate.service';

interface IState {
    loading: boolean;
    products: any[];
    cate: string;
}

const initState: IState = {
    loading: true,
    products: [],
    cate: ''
}

const ProductByCate = () => {

    const [state, setState] = useState<IState>(initState);
    const param = useParams();

    useEffect(() => {
        if (!param.id) {
            return;
        }
        (async () => {
            try {
                const res = await apiGetProByCate(+param.id!);
                const cate = res.data.length > 0 ? res.data[0].category.name : '';
                setState(prev => ({ ...prev, loading: false, products: res.data, cate }));
            } catch (error) {
                console.error('Error fetching product:', error);
                setState(prev => ({ ...prev, loading: false }));
            }
        })();
    }, [param]);

    return (
        <div className="container max-w-[1140px] px-20 gap-3 mx-auto my-16">
            <h2 className='text-4xl text-center text-textColor1 block pb-5 uppercase'>sản phẩm của Danh mục <Link to={`./product/category/${param.id}`} className='text-mainColor3'>{state.cate}</Link></h2>
            <div className="box-filter py-4 border-b-[1px]">
            </div>
            <div className="box-list-product bg-bgColor1 border mt-4 p-4 grid lg:grid-cols-4 grid-cols-2 gap-4">
                {state.products.map((product, index) => (
                    <ItemProduct product={product} key={index} />
                ))}
            </div>
        </div>
    )
}

export default ProductByCate