import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Subscription } from 'rxjs'
import useCartStore from '../../hooks/redux/cart/useCartStore'
import Footer from '../../layout/users/Footer/Footer'
import Header from '../../layout/users/Header/Header'
import Loading from '../../layout/users/Loading/Loading'
import TopNav from '../../layout/users/TopNav/TopNav'
import { BaseEventPayload, EventBusName } from '../../utils/event-bus'
import EventBus from '../../utils/event-bus/event-bus'
import { FloatButton } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import useOrder from '../../hooks/useOrder'
import { RouteConfig } from '../../constants/path'

function Root({ children }: any) {

  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const subscriptions = useRef<any>();
  const { refreshCartStore } = useCartStore();

  useEffect(() => {
    refreshCartStore();
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

  const { orderId } = useOrder();
  const navigate = useNavigate();

  const handleGotoOrder = () => {
    navigate(RouteConfig.ORDER)
  }

  return (
    <Root>
      <div className='wrapper'>
        <TopNav />
        <Header />
        <Outlet />
        <Footer />
        {orderId && <FloatButton tooltip={'Order'} icon={<InfoCircleOutlined />} type='primary' onClick={handleGotoOrder} />}
      </div>
    </Root>
  )
}

export default BaseLayoutUser