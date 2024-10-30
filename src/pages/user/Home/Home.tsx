
import { useEffect, useState } from 'react'
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';

import SliderTop from '../../../layout/users/component/SliderTop/SliderTop';
import SliderCate from '../../../layout/users/component/SliderCate/SliderCate';
import axios from 'axios';
const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const url = 'http://127.0.0.1:8000/api/client/products_details/';
      try {
        const res = await axios.get(url, {
          headers: {
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        });
        // console.log(res.data.data);
        setProducts(res.data.data); // Sử dụng dấu || [] để đảm bảo products luôn là mảng
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Trong trường hợp có lỗi, gán mảng rỗng
      }
    })()
  }, [setProducts]);

  return (
    <div>
      <SliderTop />
      <div className="container max-w-[1140px] md:px-20 px-6 text-center  gap-3 mx-auto mt-16">
        <h2 className='text-4xl text-mainColor2 block pb-5 font-bold'>Top Category</h2>
      </div>
      <SliderCate />
      <div className="container max-w-[1140px] grid grid-cols-4 gap-10 mx-auto mt-16">
        {
          products.map((item, index) => (
            <ItemProduct key={index} product={item} />
          ))
        }
      </div>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">
              Trusted by world class creators
            </h2>
          </div>
          <div className="grid items-center grid-cols-2 gap-10 mt-12 md:grid-cols-4 sm:gap-y-16">
            <div>
              <img
                className="object-contain w-auto mx-auto h-14"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-1.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-contain w-auto mx-auto h-14"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-2.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-contain w-auto h-10 mx-auto"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-3.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-contain w-auto mx-auto h-14"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home;