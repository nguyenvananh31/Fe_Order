import { CloseCircleFilled, CreditCardOutlined, CustomerServiceOutlined, DownCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Drawer, Form, Image, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fallBackImg, getImageUrl } from '../../../constants/common';
import './asset/Order.scss';
import ProductCates from './ProductCates';
import { apiGetProForOrder } from './utils/order.service';
import { convertPriceVND } from '../../../utils/common';
import { useNavigate, useParams } from 'react-router-dom';
import useToast from '../../../hooks/useToast';
import { RoutePath } from '../../../constants/path';

interface IState {
  loading: boolean;
  loadingBtn: boolean;
  refresh: boolean;
  products: any[];
}

const initState: IState = {
  loading: false,
  loadingBtn: false,
  refresh: false,
  products: [],
}

const Order = () => {
  const [state, setState] = useState<IState>(initState);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [selectedItems, setSelectedItems] = useState([]);
  const { id: billId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const getInnitOrder = useCallback(() => {
    if (!billId) {
      toast.showError('Vui lòng quét mã bàn!');
      navigate(RoutePath.HOME);
      return;
    }
  }, []);

  useEffect(() => {
    getInnitOrder();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const res = await apiGetProForOrder();
        let items = [];
        items = res.data.map((i: any) => {
          if (i.product_details.length == 0) {
            return [];
          }
          return i.product_details.map((x: any) => ({ ...x, image: x.images.length > 0 ? x.images[0].name : '', name: i.name }));
        })

        setState(prev => ({ ...prev, loading: false, products: items[0] }));
      } catch (error) {
        console.log(error);
        setState(prev => ({ ...prev, loading: false }));
      }
    }
    fetchData();
  }, [state.refresh]);

  // useEffect(() => {
  //   setProducts(listPro)
  // }, [listPro]);

  // const savedItems = JSON.parse(String(localStorage.getItem('selectedItems'))) || [];
  // useEffect(() => {
  //   setSelectedItems(savedItems);
  // }, [savedItems]);

  // Monitor changes in localStorage and update the state
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const updatedItems = JSON.parse(String(localStorage.getItem('selectedItems'))) || [];
  //     setSelectedItems(updatedItems);
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  // Function to handle removing item or updating quantity
  const [updatedItem, setUpdatedItem] = useState<[]>([]);

  const handleRemoveItem = (id: number) => {
    const existingItem: any = selectedItems.find((product: any) => product.id === id);

    if (existingItem) {
      let updatedItems: any;
      if (Number(existingItem.quantity) > 1) {
        // If item has quantity > 1, decrement quantity
        updatedItems = selectedItems.map((product: any) =>
          product.id === id ? { ...product, quantity: product.quantity - 1 } : product
        );
        setUpdatedItem(updatedItems);
      } else {
        // If quantity is 1, remove the item entirely
        updatedItems = selectedItems.filter((product: any) => product.id !== id);
        setUpdatedItem(updatedItems)
      }

      // Update localStorage and trigger UI re-render
      localStorage.setItem('selectedItems', JSON.stringify(updatedItem));
      setSelectedItems(updatedItem);  // Ensure state is updated immediately
    }
  };

  // const toggleDetailVisibility = (productId: number) => {
  //   setVisibleDetails(prev => ({
  //     ...prev,
  //     [productId]: !prev[productId], // Toggle trạng thái ẩn/hiện cho sản phẩm có ID là productId
  //   }));
  // };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onFinish = (values: any) => {
    console.log('Form Values: ', values);
  };
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToButton = useCallback(() => {
    const button = document.getElementById('btn-bottom');
    if (button && scrollRef.current) {
      button.scrollIntoView({
        behavior: 'smooth', // Thêm hiệu ứng cuộn mượt
        block: 'nearest', // Đảm bảo nút nằm gần nhất
      });
    }
  }, []);

  const productsSale: any[] = useMemo(() => {
    if (state.products.length == 0) {
      return [];
    }
    return state.products.filter(i => i.sale != 0);
  }, [state.products])

  return (
    <>
      <div className='container max-w-[1140px] h-screen overflow-y-auto px-[16px] lg:px-[20px] mx-auto gap-[24px] py-6'>
        <ProductCates />
        <div className="list-product">
          <h2 className='text-white w-full text-3xl font-font1 mt-4 p-2 bg-mainColor3 text-center font-bold tracking-wider'>RELATED FOOD</h2>
          <div className="w-full box-related-list grid md:grid-cols-5 grid-cols-3 gap-2 mt-2  overflow-y-auto h-[50vh] p-2">
            {
              state.products.map(i => (
                <div key={i.id} className="h-[181px] box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
                  <div className='w-[114px] h-[114px]'>
                    <Image
                      className='rounded-lg cursor-pointer h-full w-full object-cover object-center'
                      src={i.image ? getImageUrl(i.image) : fallBackImg}
                    />
                  </div>
                  <h3 className=' text-lg  text-mainColor2 text-center font-font1 line-clamp-1'>{i?.name || ''} - {i?.size?.name || ''} </h3>
                  <button className='w-full  '>
                    <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
                  </button>
                </div>
              ))
            }
          </div>
          <h2 className='text-white text-3xl font-font1 mt-4 p-2 bg-mainColor3 text-center font-bold tracking-wider'>SUPPER SLAE</h2>
          <div className=" w-full box-list-item group overflow-y-auto h-[50vh] p-2">
            {
              productsSale?.map((i: any) => (
                <div key={i.id} className="box-order-item flex items-center justify-evenly gap-3 p-2 border rounded-md shadow-sm mt-[16px]">
                  <div className="box-image">
                    <img className='w-[100px] h-[100px] object-contain' src={i.image ? getImageUrl(i.image) : fallBackImg} alt="" />
                  </div>
                  <div className="box-content pt-2">
                    <h3 className='text-textColor1 text-xl font-font1'>{i?.name || ''} - {i?.size?.name || ''}</h3>
                    <span className='flex gap-2 items-center'>
                      <span className='text-mainColor1 text-lg font-font1'>{convertPriceVND(+i.sale)}</span>
                      <del className='text-textColor2 text-md font-font1'>{convertPriceVND(+i.price)}</del>
                    </span>
                    {/* <p className='font-font1 text-gray-400 text-[12px] mt-1'>GOOF MESSI RONALDO</p> */}
                  </div>
                  <div className="box-action">
                    <button>
                      <PlusCircleOutlined className='text-xl text-mainColor1 font-bold hover:text-mainColor2 ' />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <Drawer
          placement="right"
          onClose={onClose}
          closable={false}
          open={visible}
          className="w-full relative"
        >
          <div className="sideBar-heading px-4 py-6 w-full flex items-center justify-between border-b-[1px] shadow-sm">
            <div className="logo-wrapper">
              <img src="https://modinatheme.com/html/foodking-html/assets/img/logo/logo.svg" alt=""
                className="logo-wrapper__img w-[120px]" />
            </div>
            <button className="group" onClick={onClose}>
              <CloseCircleFilled className='text-mainColor1 text-4xl group-active:text-mainColor2' />
            </button>
          </div>
          <div className="tabs-order">
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              centered
              tabBarGutter={40}
              tabBarStyle={{ fontWeight: '', fontSize: '20px' }}
              className=' text-4xl font-font3'
            >
              <TabPane className='uppercase' tab={<span>Menu</span>} key="1" />
              <TabPane className='uppercase' tab={<span>Ordered</span>} key="2" />

            </Tabs>
          </div>
          <div className="py-2 px-2 relative">
            <div className="container">

              {activeTab === '1' && (
                <div className='w-full'>
                  <form action="" className='mt-2 border border-borderColor1 rounded-md flex items-center justify-between px-4 py-3 hover:border-mainColor2'>
                    <input type="text" placeholder='Search...' className='border-none outline-none rounded-md w-full text-type-3' />
                    <button type='submit' className='border-none group'><SearchOutlined className='text-textColor2 text-xl group-hover:text-mainColor2 ' /></button>
                  </form>
                  <h2 className='text-white text-3xl font-font1 mt-6 p-2 bg-mainColor2 text-center font-bold tracking-wider'>List Order</h2>
                  <table className="w-full mt-4 border-collapse bg-bgColor1">
                    <tbody>
                      {state.products?.map((product) => (
                        <tr className='text-center'>
                          <td className="border">
                            <div className="box w-14 h-14 mx-auto my-3">
                              <Image
                                className='rounded-lg cursor-pointer object-cover'
                                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg", width: "200px" }} // Tính năng preview ảnh chi tiết
                              />
                            </div>
                          </td>
                          <td className="border">
                            <span className='block font-font1 text-textColor1 text-lg'>{product.name}</span>

                          </td>
                          <td className="border">
                            <Form
                              layout="vertical"
                              onFinish={onFinish}
                              className='mx-auto'
                            >
                              {/* Input Number Field */}
                              <input
                                className="w-10 text-center text-type-3 border outline-none"
                                value={product.quantity}
                                type='number'
                              />
                            </Form>
                          </td>
                          <td className="border font-font3 p-2 text-mainColor1 text-lg ">
                            <button onClick={() => handleRemoveItem(product.id)}><MinusCircleOutlined /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="container flex justify-center mt-2">
                    <button className="btn-type-2" id="btn-bottom"><span>Order Now</span></button>
                  </div>
                </div>
              )}
              {activeTab === '2' && (
                <div className='text-type-4'>
                  <h2 className="text-type-3">ADDITIONAL INFORMATION</h2>
                  <table className="w-full mt-4 border-collapse bg-bgColor1">
                    <tbody>
                      <tr className='text-center'>
                        <td className="border ">
                          <div className="box w-14 h-14 mx-auto my-3">
                            <Image
                              className='rounded-lg cursor-pointer object-cover'
                              src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                              preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg", width: "200px" }} // Tính năng preview ảnh chi tiết
                            />
                          </div>
                        </td>
                        <td className="border p-2">
                          <span className='block font-font1 text-mainColor3'>Pizza</span>
                          <span className='font-font3 text-mainColor2'>X4</span>
                        </td>
                        <td className="border p-2 font-font3 text-mainColor1 ">$2000</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full py-3 text-right">
                    <span className='font-font1 text-lg block text-textColor2'>Total: $<span className='text-textColor2 '>999</span></span>
                    <span className='font-font1 text-lg block text-textColor2'>Discount: $<span className='text-textColor2 '>999</span></span>
                    <span className='font-font1 text-xl text-textColor1 border-t-[1px] mt-1 block pt-2'>Cost : <span className='text-mainColor1 '>$999</span></span>
                  </div>
                  <div className="container flex justify-center">
                    <button className="btn-type-2"><span>Pay Now</span></button>
                  </div>
                </div>

              )}
            </div>

          </div>
          <div className="btn-down absolute bottom-4 right-8">
            <button className=' bg-bgColor1 rounded-full shadow-lg border' onClick={scrollToButton}><DownCircleOutlined className='text-4xl text-mainColor2 active:text-mainColor3 hover:text-mainColor1' /></button>
          </div>
        </Drawer>
        <button

          className=" fixed top-[50%] right-[16px] w-[50px] h-[50px] rounded-full bg-mainColor2 flex items-center justify-center text-white cursor-pointer hover:bg-mainColor1 shadow-md"
          onClick={showDrawer}
        >
          Order
        </button>
        <div className="box-content md:grid block grid-cols-gridOrder mt-6 gap-4 ">
          <div className="box-table-info">
            <h2 className='text-xl py-2 px-4 bg-blue-700 text-white'>Table Information</h2>
            <table className="w-full mt-2 border-collapse">
              <tbody>
                <tr>
                  <td className="border py-2 px-4">Table</td>
                  <td className="border py-2 px-4">11</td>
                </tr>
                <tr>
                  <td className="border py-2 px-4">Name</td>
                  <td className="border py-2 px-4">mr. anv</td>
                </tr>
                <tr>
                  <td className="border py-2 px-4">COST</td>
                  <td className="border py-2 px-4">
                    $999
                  </td>
                </tr>
                <tr>
                  <td className="border py-2 px-4">Check in</td>
                  <td className="border py-2 px-4">16:20:15 PM</td>
                </tr>
                <tr>
                  <td className="border py-2 px-4">Check OUT</td>
                  <td className="border py-2 px-4">-- : -- : -- PM</td>
                </tr>
              </tbody>
            </table>
            <div className="box-table-info-action flex gap-4 justify-between mt-2">
              <button className='px-6 py-3 bg-mainColor3 text-black hover:bg-mainColor1 duration-200 hover:text-white'><CustomerServiceOutlined className='mr-1' />SUPPORT</button>
              <button className='px-6 py-3 bg-mainColor2 text-white hover:bg-mainColor1 duration-200'><CreditCardOutlined className='mr-1' />PAY FULL</button>
            </div>
          </div>
          <div className="banner-ads-order w-full h-full md:mt-0 mt-4">

          </div>
        </div>
      </div>
      {/* Drawer */}

    </>

  )
}

export default Order