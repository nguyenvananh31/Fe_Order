import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Subscription } from 'rxjs'
import useCartStore from '../../hooks/redux/cart/useCartStore'
import Footer from '../../layout/users/Footer/Footer'
import Header from '../../layout/users/Header/Header'
import Loading from '../../layout/users/Loading/Loading'
import TopNav from '../../layout/users/TopNav/TopNav'
import { BaseEventPayload, EventBusName } from '../../utils/event-bus'
import EventBus from '../../utils/event-bus/event-bus'
import { apiGetCart } from './Cart/utils/cart.service'

function Root({ children }: any) {

  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const subscriptions = useRef<any>();
  const { setProtoCart } = useCartStore();

  useEffect(() => {
    getInnitCartStore();
  }, []);

  const getInnitCartStore = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiGetCart();
      setProtoCart(res.data || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    registerEventBus();

    return () => {
      subscriptions.current?.unsubscribe();
    }
  }, []);

  const registerEventBus = useCallback(() => {
    subscriptions.current = new Subscription();
    subscriptions.current.add(
      EventBus.getInstance().events.subscribe((data: BaseEventPayload<boolean>) => {
        if (data.type === EventBusName.SET_LOADING_APP) {
          setLoading(data.payload || false);
        }
      })
    )
  }, []);

  return <>
    {mounted && children}
    {loading && <Loading />}
  </>
}

const BaseLayoutUser = () => {
  return (
    <Root>
      <div className='wrapper'>
        <TopNav />
        <Header />
        <Outlet />
        {/* <div className="container max-w-[1140px] mx-auto">
          <div className="box p-4 grid grid-cols-4 gap-8">
            <ItemProuduct />
            <ItemProuduct />
            <ItemProuduct />
            <ItemProuduct />
          </div>
        </div> */}
        <Footer />
      </div>
    </Root>
  )
}

export default BaseLayoutUser