import React, { useEffect, useState } from 'react'
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';
import SliderTop from '../../../layout/users/component/SliderTop/SliderTop';
import SliderCate from '../../../layout/users/component/SliderCate/SliderCate';
import axios from 'axios';
const Home = () => {
  const [products, setProducts] = useState([])
  // const  products, setProducts ]= useProductContext();
  useEffect(() => {
    (async () => {
      const url = 'http://127.0.0.1:8000/api/client/products/';
      try {
        const res = await axios.get(url, {
          headers: {
            'Api_key': 'PPhZygIbLHiaA7PhRCTvqEf4fdQ3MH5jowQDD4DK275ph4co88qkeynWOjPB',
          },
        });
        console.log(res.data.data.data);
        setProducts(res.data.data.data)
        // return data.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    })()
  }, [setProducts]);
  return (
    <div>
      <SliderTop />
      <div className="container max-w-[1140px] px-20 gap-3 mx-auto mt-16">
        <h2 className='text-4xl text-textColor1 block pb-5'>Top Category</h2>
      </div>
      <SliderCate />
      <div className="container max-w-[1140px] my-16 grid grid-cols-4 px-20 gap-3 mx-auto">
        {/* <ItemProduct />
        <ItemProduct />
        <ItemProduct /> */}
        {products.map((item,index) => (
          <ItemProduct key={index} product={item}  />
        ))}
      </div>
    </div>
  )
}
export default Home