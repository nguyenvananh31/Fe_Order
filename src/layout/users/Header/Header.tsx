import { AlignLeftOutlined, ClockCircleOutlined, CloseCircleFilled, HomeOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, PinterestOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined, TikTokOutlined, TwitterOutlined } from '@ant-design/icons'
import { Badge, Drawer, Image } from 'antd'
import { useState } from 'react'
import Navigation from '../component/Navigation/Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
      <header className='bg-bgColor1 w-full relative'>
        <div className="container max-w-[1140px] mx-auto px-[20px] py-6 border-b-[1px] border-borderColor1 flex items-center justify-between">
          <div className="container-left">
            <div className="logo-wrapper pr-12">
              <img src="https://modinatheme.com/html/foodking-html/assets/img/logo/logo.svg" alt="" className="logo-wrapper__img" />
            </div>
          </div>
          <div className="container-center lg:flex items-center justify-center hidden ">
            <Navigation />
          </div>
          <div className="container-right ">
            <div className="action-header flex items-center gap-10">
              <div className="cart cursor-pointer relative hidden md:block group">
                <Badge count="1" offset={[2, 0]} showZero>
                  <ShoppingCartOutlined className='text-3xl text-mainColor1'/>
                </Badge>

                <div
                    className="mini-cart min-w-[200px] absolute left-[-20px] p-4 border-[1px] border-borderColor1 rounded-md bg-bodyColor z-[99] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hidden group-hover:block">
                  <div className="mini-cart-body w-max">
                    <div
                        className="cart-item grid grid-cols-gridCartItem items-center gap-4 pb-3 mb-3 border-b-[1px] border-borderColor1">
                      <div className="cart-item-img">
                        <img className='w-20 h-20 object-cover'
                             src="https://modinatheme.com/html/foodking-html/assets/img/food/burger.png" alt=""/>
                      </div>
                      <div className="cart-item-main flex items-center justify-between max-w-[100px]">
                        <div className="w-full">
                          <h3 className="cart-item-main__title text-[16px] line-clamp-1 text-type-1">
                            <Link to={`anv`}> AN day ne</Link>
                          </h3>
                          <span className="cart-item-man__price text-[15px] text-type-1 block mt-1">$168</span>
                        </div>
                        <div className="absolute right-5">
                          <button className="cursor-pointer btn-type-error"><CloseCircleFilled className=''/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mini-cart-action flex gap-2 items-center justify-evenly">
                    <div className="mini-cart-action-left">
                      <h4 className='text-[14px] py-2 text-center'>Shopping : <span>$400</span></h4>
                      <Link to="/cart" className="btn-type-1 rounded-md bg-red-400 p-2">View cart</Link>
                    </div>
                    <div className="mini-cart-action-right">
                      <h4 className='text-[14px] py-2 text-center '>Shopping : <span>$400</span></h4>
                      <Link to="/checkout" className="btn-type-2 bg-blue-400 p-2 rounded-md"><span>Checkout</span></Link>
                    </div>
                  </div>
                </div>
              </div>
              <button
                  className="btn uppercase text-[16px] tracking-wider text-textColor3 bg-mainColor1 rounded-md px-6 py-4 hidden md:block">ORDER
                NOW
              </button>
              <button className='text-3xl text-textColor1 group' onClick={showDrawer}><AlignLeftOutlined
                  className='group-active:text-mainColor1'/></button>
            </div>
          </div>

        </div>
        <Drawer
            placement="right"
            onClose={onClose}
            closable={false}
            visible={visible}
            className="w-full relative"
        >
          <div className="sideBar-heading px-4 py-6 w-full flex items-center justify-between border-b-[1px] shadow-sm">
            <div className="logo-wrapper">
              <img src="https://modinatheme.com/html/foodking-html/assets/img/logo/logo.svg" alt=""
                   className="logo-wrapper__img w-[120px]"/>
            </div>
            <button className="group" onClick={onClose}>
              <CloseCircleFilled className='text-mainColor1 text-4xl group-active:text-mainColor2'/>
            </button>
          </div>
          <div className="py-2 px-2">
            <div className="container">
              <ul className="menus-mobile md:hidden block ">
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Home</Link><PlusOutlined/></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Product</Link><PlusOutlined/></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Table</Link><PlusOutlined/></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Order</Link><PlusOutlined/></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">About us</Link><PlusOutlined/></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link to={``} className="menus-item__link text-type-2">Contact</Link><PlusOutlined /></li>
              </ul>
            </div>
            <div className="container">
              <form action="" className='mt-5 border border-borderColor1 rounded-md flex items-center justify-between p-4 hover:border-mainColor2'>
                <input type="text" placeholder='Search...' className='border-none outline-none rounded-md w-full text-type-3' />
                <button type='submit' className='border-none group'><SearchOutlined className='text-textColor2 text-xl group-hover:text-mainColor2' /></button>
              </form>
              <p className='text-type-4 py-4 '>This involves interactions between a business and its customers. It's about meeting customers' needs and resolving their problems. Effective customer service is crucial.</p>
              <div className="box-gird-image grid grid-cols-3 gap-5">
                <Image
                    className='rounded-lg cursor-pointer w-full h-full object-cover'
                    src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                    preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
                />
                <Image
                    className='rounded-lg cursor-pointer w-full h-full object-cover'
                    src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                    preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
                />
                <Image
                    className='rounded-lg cursor-pointer w-full h-full object-cover'
                    src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                    preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
                />
                <Image
                    className='rounded-lg cursor-pointer w-full h-full object-cover'
                    src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                    preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
                />
                <Image
                    className='rounded-lg cursor-pointer w-full h-full object-cover'
                    src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                    preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
                />
                <Image
                    className='rounded-lg cursor-pointer w-full h-full object-cover'
                    src={"https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg"}
                    preview={{ src: "https://modinatheme.com/html/foodking-html/assets/img/header/01.jpg" }} // Tính năng preview ảnh chi tiết
                />
              </div>
            </div>
            <div className="container my-5 flex justify-center">
              <button className="btn-type-2"><span>Order now</span></button>
            </div>
            <div className="container">
              <div className="box-contact-sideBar">
                <ul className="contact-list">
                  <li className="contact-list-item mb-6 text-[16px] text-textColor1"><MailOutlined className='text-[18px] text-mainColor1' /><span className='ml-2 text-type-1'>Email : </span><Link to="mailto:annguyen04@homail.com" className="contact-list-item__link text-type-2">annguyen04@homail.com</Link></li>
                  <li className="contact-list-item mb-6 text-[16px] text-textColor1"><HomeOutlined className='text-[17px] text-mainColor1' /><span className='ml-2 text-type-1'>Address : </span><Link to={``} className="contact-list-item__link text-type-2">100, </Link></li>
                  <li className="contact-list-item mb-6 text-[16px] text-textColor1"><ClockCircleOutlined className='text-[18px] text-mainColor1' /><span className='ml-2 text-type-1'>Open : </span><Link to={``} className="contact-list-item__link text-type-2">7:00 - 13:30 , 13:30 - 22:00</Link></li>
                  <li className="contact-list-item mb-6 text-[16px] text-textColor1"><PhoneOutlined className='text-[18px] text-mainColor1' /><span className='ml-2 text-type-1'>Phone : </span><Link to="tel:+84365772975" className="contact-list-item__link text-type-2"> +84365772975</Link></li>
                </ul>
              </div>
            </div>
            <div className="container">
              <ul className="box-social flex gap-4 mb-4 border-t-[1px] border-borderColor1 pt-6">
                <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><TwitterOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
                <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><TikTokOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
                <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><PinterestOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
                <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><InstagramOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
              </ul>
            </div>

          </div>

        </Drawer>
      </header>
  )
}

export default Header