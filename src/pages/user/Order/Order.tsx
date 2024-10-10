/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, CreditCardOutlined, CustomerServiceOutlined, DownCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Image, Input, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useCallback, useRef, useState } from 'react';
import './asset/Order.scss'
import ProductCates from './ProductCates';
import { useEffect } from 'react';
const Order = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [activeVariant, setActiveVariant] = useState<any>('1');
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<[]>([]);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  // const [visibleDetails, setVisibleDetails] = useState<{ [key: number]: boolean }>({});

  const listPro = JSON.parse(String(localStorage.getItem('selectedItems'))) || [];
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    setProducts(listPro)
  }, [listPro]);

  const savedItems = JSON.parse(String(localStorage.getItem('selectedItems'))) || [];
  useEffect(() => {
    setSelectedItems(savedItems);
  }, [savedItems]);

  // Monitor changes in localStorage and update the state
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedItems = JSON.parse(String(localStorage.getItem('selectedItems'))) || [];
      setSelectedItems(updatedItems);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to handle removing item or updating quantity
  const [updatedItem, setUpdatedItem] = useState<[]>([]);

  const handleRemoveItem = (id:number) => {
    const existingItem = selectedItems.find((product) => product.id === id);

    if (existingItem) {
      let updatedItems;
      if (Number(existingItem.quantity) > 1) {
        // If item has quantity > 1, decrement quantity
        updatedItems = selectedItems.map((product) =>
          product.id === id ? { ...product, quantity: product.quantity - 1 } : product
        );
        setUpdatedItem(updatedItems)
      } else {
        // If quantity is 1, remove the item entirely
        updatedItems = selectedItems.filter((product) => product.id !== id);
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
  const toggleDetailVisibility = () => {
    setIsDetailVisible(prev => !prev);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const handleVariantChange = (key: any) => {
    setActiveVariant(key);
  };

  const onIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
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
  return (
    <>
      <div className='container max-w-[1140px] h-screen overflow-y-auto px-[16px] lg:px-[20px] mx-auto gap-[24px] py-6'>
        <ProductCates />
        <div className="list-product">
          <h2 className='text-white w-full text-3xl font-font1 mt-4 p-2 bg-mainColor3 text-center font-bold tracking-wider'>RELATED FOOD</h2>
          <div className="w-full box-related-list grid md:grid-cols-5 grid-cols-3 gap-2 mt-2  overflow-y-auto h-[50vh] p-2">
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
            <div className="box-related-item border p-2 w-full rounded-md shadow-lg flex flex-wrap justify-center">
              <Image
                className='rounded-lg cursor-pointer w-full h-full object-cover'
                src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
              />
              <h3 className=' text-lg  text-mainColor2 text-center font-font1'>Pizza ádasdsa</h3>
              <button className='w-full  '>
                <PlusCircleOutlined className='text-lg text-mainColor1 font-bold hover:text-mainColor3 ' />
              </button>
            </div>
          </div>
          <h2 className='text-white text-3xl font-font1 mt-4 p-2 bg-mainColor3 text-center font-bold tracking-wider'>SUPPER SLAE</h2>
          <div className=" w-full box-list-item group overflow-y-auto h-[50vh] p-2">
            <div className="box-order-item flex items-center justify-evenly gap-3 p-2 border rounded-md shadow-sm mt-[16px]">
              <div className="box-image">
                <img className='w-[100px] h-[100px] object-contain' src="https://www.vrihiskydeck.com/assets/img/food/pizza-3.png" alt="" />
              </div>
              <div className="box-content pt-2">
                <h3 className='text-textColor1 text-xl font-font1'>Pizza Ronaldo</h3>
                <span className='flex gap-2 items-center'>
                  <span className='text-mainColor1 text-lg font-font1'>$999</span>
                  <del className='text-textColor2 text-md font-font1'>$2000</del>
                </span>
                <p className='font-font1 text-gray-400 text-[12px] mt-1'>GOOF MESSI RONALDO</p>
              </div>
              <div className="box-action">
                <button onClick={toggleDetailVisibility}>
                  <PlusCircleOutlined className='text-xl text-mainColor1 font-bold hover:text-mainColor2 ' />
                </button>
              </div>
            </div>
            {isDetailVisible && (
              <div className=" w-full box-order-detail p-3 border rounded-md mt-1">
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ quantity: quantity }}
                >
                  {/* Input Text Field */}
                  <Form.Item
                    name="description"
                    className=''
                  >
                    <Input className="text-type-2 border border-borderColor1 rounded-md flex items-center justify-between px-4 py-3 hover:border-mainColor2" placeholder="Enter description for staff" />
                  </Form.Item>

                  {/* Input Number Field */}
                  <Form.Item
                    name="quantity"
                    className='w-full flex '
                    rules={[{ required: true, message: 'Please input quantity!' }]}
                  >
                    <div className="w-full flex items-center justify-between gap-2 mt-[12px]">
                      <div className="flex items-center space-x-2">
                        <Button onClick={onDecrease} type="default" className=" px-4">
                          -
                        </Button>
                        <Input
                          className="w-12 text-center mx-2 text-type-3 border"
                          value={quantity}
                          readOnly
                          onChange={(value) => setQuantity(value || 1)}
                        />
                        <Button onClick={onIncrease} type="default" className="px-4">
                          +
                        </Button>
                      </div>
                      <Button type="primary" htmlType="submit" className="w-full btn-type-2">
                        <span>Add</span>
                      </Button>
                    </div>
                  </Form.Item>

                </Form>
              </div>
            )}
            <div className="box-order-item flex items-center justify-evenly gap-3 p-2 border rounded-md shadow-sm mt-[16px]">
              <div className="box-image">
                <img className='w-[100px] h-[100px] object-contain' src="https://www.vrihiskydeck.com/assets/img/food/pizza-3.png" alt="" />
              </div>
              <div className="box-content pt-2">
                <h3 className='text-textColor1 text-xl font-font1'>Pizza Ronaldo</h3>
                <span className='flex gap-2 items-center'>
                  <span className='text-mainColor1 text-lg font-font1'>$999</span>
                  <del className='text-textColor2 text-md font-font1'>$2000</del>
                </span>
                <p className='font-font1 text-gray-400 text-[12px] mt-1'>GOOF MESSI RONALDO</p>
              </div>
              <div className="box-action">
                <button onClick={toggleDetailVisibility}>
                  <PlusCircleOutlined className='text-xl text-mainColor1 font-bold hover:text-mainColor2 ' />
                </button>
              </div>
            </div>
            <div className="box-order-item flex items-center justify-evenly gap-3 p-2 border rounded-md shadow-sm mt-[16px]">
              <div className="box-image">
                <img className='w-[100px] h-[100px] object-contain' src="https://www.vrihiskydeck.com/assets/img/food/pizza-3.png" alt="" />
              </div>
              <div className="box-content pt-2">
                <h3 className='text-textColor1 text-xl font-font1'>Pizza Ronaldo</h3>
                <span className='flex gap-2 items-center'>
                  <span className='text-mainColor1 text-lg font-font1'>$999</span>
                  <del className='text-textColor2 text-md font-font1'>$2000</del>
                </span>
                <p className='font-font1 text-gray-400 text-[12px] mt-1'>GOOF MESSI RONALDO</p>
              </div>
              <div className="box-action">
                <button onClick={toggleDetailVisibility}>
                  <PlusCircleOutlined className='text-xl text-mainColor1 font-bold hover:text-mainColor2 ' />
                </button>
              </div>
            </div>
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
                      {products?.map((product) => (
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
                              initialValues={{ quantity: quantity }}
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