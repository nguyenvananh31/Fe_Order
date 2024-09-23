import { AlignLeftOutlined, CloseCircleFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Drawer } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../../context/ProductContext'; // Import useProductContext để lấy dữ liệu giỏ hàng
import Navigation from '../component/Navigation/Navigation';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { cart, addToCart , removeFromCart } = useProductContext(); // Lấy cart từ context

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
          <div className="container-center lg:flex items-center justify-center hidden">
            <Navigation />
          </div>
          <div className="container-right">
            <div className="action-header flex items-center gap-10">
              <div className="cart cursor-pointer relative hidden md:block group">
                {/* Hiển thị số lượng tổng sản phẩm trong giỏ hàng */}
                <Badge count={cart.reduce((total, item) => total + item.quantity, 0)} offset={[2, 0]} showZero>
                  <ShoppingCartOutlined className='text-3xl text-mainColor1' />
                </Badge>

                <div
                    className="mini-cart min-w-[200px] absolute left-[-20px] p-4 border-[1px] border-borderColor1 rounded-md bg-bodyColor z-[99] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hidden group-hover:block">
                  <div className="mini-cart-body w-max">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item grid grid-cols-gridCartItem items-center gap-4 pb-3 mb-3 border-b-[1px] border-borderColor1">
                              <div className="cart-item-img">
                                <img className='w-20 h-20 object-cover' src="https://modinatheme.com/html/foodking-html/assets/img/food/burger.png" alt={item.name} />
                              </div>
                              <div className="cart-item-main flex items-center justify-between max-w-[100px]">
                                <div className="w-full">
                                  <h3 className="cart-item-main__title text-[16px] line-clamp-1 text-type-1">
                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                  </h3>
                                  <span className="cart-item-man__price text-[15px] text-type-1 block mt-1">${item.price}</span>
                                  <span className="cart-item-man__quantity text-[15px] text-type-1 block mt-1">Quantity: {item.quantity}</span>
                                </div>
                                <div className="absolute right-5">
                                  <button className="cursor-pointer btn-type-error" onClick={() => removeFromCart(item.id)}>
                                    <CloseCircleFilled />
                                  </button>
                                </div>
                              </div>
                            </div>
                        ))
                    ) : (
                        <p>Giỏ hàng trống</p>
                    )}
                  </div>
                  <div className="mini-cart-action flex gap-2 items-center justify-evenly">
                    <div className="mini-cart-action-left">
                      <h4 className='text-[14px] py-2 text-center'>Total: <span>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span></h4>
                      <Link to="/cart" className="btn-type-3 rounded-md bg-red-400 p-2">View cart</Link>
                    </div>
                    <div className="mini-cart-action-right">
                      <h4 className='text-[14px] py-2 text-center '>Total: <span>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span></h4>
                      <Link to="/checkout" className="btn-type-4 bg-blue-400 p-2 rounded-md"><span>Checkout</span></Link>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn uppercase text-[16px] tracking-wider text-textColor3 bg-mainColor1 rounded-md px-6 py-4 hidden md:block">ORDER NOW</button>
              <button className='text-3xl text-textColor1 group' onClick={showDrawer}><AlignLeftOutlined className='group-active:text-mainColor1' /></button>
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
          {/* Nội dung sidebar ở đây */}
        </Drawer>
      </header>
  )
}

export default Header;