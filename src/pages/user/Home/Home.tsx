
import { useEffect, useMemo, useState } from 'react'
import ItemProduct from '../../../layout/users/component/ItemProduct/ItemProduct';
import SliderTop from '../../../layout/users/component/SliderTop/SliderTop';
import SliderCate from '../../../layout/users/component/SliderCate/SliderCate';
import { apiGetCateClient, apiGetProDetail } from './utils/home.service';
import { Spin } from 'antd';

interface IState {
  loadingPro: boolean;
  loadingBtn: boolean;
  loadingCate: boolean;
  proDetails: any[];
  cates: any[];
  refresh: boolean;
}

const initState: IState = {
  loadingPro: true,
  loadingCate: true,
  loadingBtn: false,
  proDetails: [],
  cates: [],
  refresh: false,
}

const Home = () => {
  const [state, setState] = useState<IState>(initState);

  const catesMemo = useMemo(() => state.cates, [state.cates]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetProDetail();
        setState(prev => ({ ...prev, proDetails: res.data, loadingPro: false }));
      } catch (error) {
        console.error('Error fetching products:', error);
        setState(prev => ({ ...prev, proDetails: [], loadingPro: false }));
      }
    })()
  }, [state.refresh]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetCateClient();
        setState(prev => ({ ...prev, cates: res.data, loadingCate: false }));
      } catch (error) {
        console.error('Error fetching products:', error);
        setState(prev => ({ ...prev, cates: [], loadingCate: false }));
      }
    })()
  }, [state.refresh]);

  return (
    <div>
      <SliderTop />
      <div className="container max-w-[1140px] md:px-20 px-6 text-center  gap-3 mx-auto mt-16">
        <h2 className='text-4xl text-mainColor2 block pb-5 font-bold'>Danh mục phổ biến</h2>
      </div>
      <SliderCate cates={catesMemo} loadingCate={state.loadingCate} />
      {
        state.loadingPro &&
        <div className='flex justify-center items-center min-h-20'>
          <Spin />
        </div>
      }
      <div className="container max-w-[1140px] grid grid-cols-4 gap-10 mx-auto mt-16">
        {
          state.proDetails.map((item, index) => (
            <ItemProduct key={index} product={item} />
          ))
        }
      </div>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">
              ĐƯỢC NHỮNG NHÀ SÁNG TẠO ĐỈNH THẾ GIỚI TIN TƯỞNG
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