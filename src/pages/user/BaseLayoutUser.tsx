import TopNav from '../../layout/users/TopNav/TopNav'
import { Outlet } from 'react-router-dom'
import Header from '../../layout/users/Header/Header'
import Footer from '../../layout/users/Footer/Footer'
import { useCallback, useEffect, useRef, useState } from 'react'
import Loading from '../../layout/users/Loading/Loading'

function Root({children} :any) {

  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const subscriptions = useRef<any>();


  useEffect(() => {
    setMounted(true);
    registerEventBus();

    return () => {
      subscriptions.current?.unsubscribe();
    }
  }, []);

  const registerEventBus = useCallback(() => {

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