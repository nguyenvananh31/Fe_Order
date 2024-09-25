
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
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        });
        console.log(res.data.data.data);
          setProducts(res.data.data.products || []); // Sử dụng dấu || [] để đảm bảo products luôn là mảng
      } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]); // Trong trường hợp có lỗi, gán mảng rỗng
      }
    })()
  }, [setProducts]);

  return (
      <div>
          <SliderTop/>
          <div className="container max-w-[1140px] px-20 gap-3 mx-auto mt-16">
              <h2 className='text-4xl text-textColor1 block pb-5'>Top Category</h2>
          </div>
          <SliderCate/>
          <div>
              {products && products.length > 0 ? (
                  products.map((item, index) => (
                      <ItemProduct key={index} product={item}/>
                  ))
              ) : (
                  <p>No products available</p> // Thông báo hoặc xử lý khi dữ liệu chưa có
              )}
          </div>

      </div>
  )
}
export default Home;