import { AlignLeftOutlined, ClockCircleOutlined, CloseCircleFilled, HomeOutlined, InstagramOutlined, MailOutlined, MinusCircleOutlined, PhoneOutlined, PinterestOutlined, PlusCircleOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined, TikTokOutlined, TwitterOutlined } from '@ant-design/icons';
import { Badge, Drawer, Image } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../../hooks/redux/cart/useCartStore';
import Navigation from '../component/Navigation/Navigation';
import { apiDeleteCart, apiUpdateCart } from '../../../pages/user/Cart/utils/cart.service';
import useToast from '../../../hooks/useToast';
import useToastMessage from '../../../hooks/useToastMessage';
import { RoutePath } from '../../../constants/path';

interface IState {
  loading: boolean;
  loadingBtn: boolean;
  refresh: boolean;
  itemId?: number;
  quantity?: number;
}

interface IUpdateCart {
  id: number;
  quantity: number;
}

const initState: IState = {
  loading: false,
  loadingBtn: false,
  refresh: false,
}

const Header = () => {
  const [state, setState] = useState<IState>(initState);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigate();
  const toast = useToast();
  const [updateCart, setUpdateCart] = useState<IUpdateCart>();
  const { cartStore, setProtoCart, refreshCartStore } = useCartStore();
  const { contextHolder, showToast } = useToastMessage();
  const totalCart = useMemo(() => cartStore.proCarts.reduce((total: any, item: any) => total + item.quantity, 0), [cartStore])

  useEffect(() => {
    (async () => {
      setState(prev => ({ ...prev, loading: true }));
      const res = await refreshCartStore();
      if (!res) {
        showToast('error', 'Có lỗi xảy ra!');
      }
      setState(prev => ({ ...prev, loading: false }));
    })();
  }, [state.refresh]);

  //Handle update cart
  useEffect(() => {
    if (!updateCart) {
      return;
    }
    const timeout = setTimeout(async () => {
      if (updateCart?.quantity! < 1) {
        try {
          setState(prev => ({ ...prev, loadingBtn: true }));
          await apiDeleteCart(updateCart?.id!);
        } catch (error) {
          console.log(error);
          showToast('error', 'Xoá sản phẩm thất bại!');
        }
        setState(prev => ({ ...prev, loadingBtn: false }));
        return;
      }

      try {
        await apiUpdateCart(updateCart?.id!, { quantity: updateCart?.quantity! });
      } catch (error: any) {
        console.log(error);
        if (error?.data?.soluong) {
          const newPros = cartStore.proCarts.map((i: any) => i.id == updateCart.id ? { ...i, quantity: error.data.soluong } : i);
          setProtoCart(newPros);
          toast.showError(error.error);
          return;
        }
        toast.showError('Đã có lỗi xảy ra!');
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [updateCart]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Tính tổng giá trị giỏ hàng
  const cartTotal = useMemo(() => {
    return cartStore.proCarts.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + (itemPrice * item.quantity);
    }, 0)
  }, [cartStore]);

  //Xử lý sự kiện thêm sửa 
  const handleIncrease = useCallback((id: number, quantity: number) => {
    setUpdateCart({ id, quantity: quantity + 1 });
    const newPros = cartStore.proCarts.map((i: any) => i.id == id ? { ...i, quantity: i.quantity + 1 } : i);
    setProtoCart(newPros);
  }, [cartStore]);

  const handleDecrease = useCallback((id: number, quantity: number) => {
    let newPros = [];
    setUpdateCart({ id, quantity: quantity - 1 });
    if (quantity - 1 == 0) {
      newPros = cartStore.proCarts.filter(i => i.id !== id);
    } else {
      newPros = cartStore.proCarts.map(i => i.id == id ? { ...i, quantity: i.quantity - 1 } : i);
    }
    setProtoCart(newPros);
  }, [cartStore]);

  const handleDeleteCart = useCallback((id: number) => {
    setUpdateCart({ id, quantity: 0 });
    let newPros = cartStore.proCarts.filter(i => i.id !== id);
    setProtoCart(newPros);
  }, [cartStore]);

  const gotoLogin = useCallback(() => {
    navigation('/' + RoutePath.LOGIN);
  }, []);

  return (
    <>
      {contextHolder}
      <header className='bg-bgColor1 w-full relative'>
        <div className="container max-w-[1140px] mx-auto px-[20px] py-6 border-b-[1px] border-borderColor1 flex items-center justify-between">
          <div className="container-left">
            <div className="logo-wrapper pr-12">
              <Link to={`/`}>
                <img src="https://modinatheme.com/html/foodking-html/assets/img/logo/logo.svg" alt="" className="logo-wrapper__img" />
              </Link>
            </div>
          </div>
          <div className="container-center lg:flex items-center justify-center hidden">
            <Navigation />
          </div>
          <div className="container-right">
            <div className="action-header flex items-center gap-10">
              <div className="cart cursor-pointer relative hidden md:block group">
                {/* Hiển thị số lượng tổng sản phẩm trong giỏ hàng */}
                <Badge count={totalCart} offset={[2, 0]} showZero>
                  <ShoppingCartOutlined className='text-3xl text-mainColor1' />
                </Badge>

                <div className="mini-cart min-w-[350px] absolute left-[-50px] overflow-hidden border-[1px] rounded-md bg-bodyColor z-[99] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out h-0 group-hover:h-[340px]">
                  <div className="mini-cart-body w-max px-4 pt-4">
                    {cartStore.proCarts.length > 0 ? (
                      cartStore.proCarts.map((item: any, index: any) => (
                        <div key={index} className="cart-item grid grid-cols-gridCartItem items-center gap-4 pb-3 mb-3 border-b-[1px] border-borderColor1">
                          <div className="cart-item-img">
                            <img className='w-20 h-20 object-cover' src="https://modinatheme.com/html/foodking-html/assets/img/food/burger.png" alt={item.product_name} />
                          </div>
                          <div className="cart-item-main flex items-center justify-between max-w-[100px]">
                            <div className="w-full">
                              <h3 className="cart-item-main__title text-[16px] line-clamp-1 text-type-1">
                                <Link to={`/product/${item.product_detail_id}`}>{item.product_name}</Link>
                              </h3>
                              <span className="cart-item-man__price text-[15px] text-type-1 block mt-1">${item.price}</span>
                              {/* Thêm các nút tăng giảm số lượng */}
                              <div className="cart-item-quantity-controls flex items-center mt-1">
                                <MinusCircleOutlined
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => handleDecrease(item.id, item.quantity)}
                                />
                                <span className="mx-2">{item.quantity}</span>
                                <PlusCircleOutlined
                                  className="text-green-500 cursor-pointer"
                                  onClick={() => handleIncrease(item.id, item.quantity)}
                                />
                              </div>
                            </div>
                            <div className="absolute right-5">
                              {/* Nút xóa sản phẩm khỏi giỏ hàng */}
                              <button className="cursor-pointer btn-type-error" onClick={() => handleDeleteCart(item.id)}>
                                <CloseCircleFilled />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Your cart is empty.</p>
                    )}
                  </div>
                  <div className="mini-cart-action flex gap-2 items-center justify-evenly px-4 pb-4">
                    <div className="mini-cart-action-left">
                      <h4 className='text-[14px] py-2 text-center'>
                        Total: <span> ${cartTotal}</span>
                      </h4>
                      <Link to="/cart" className="btn-type-3 rounded-md bg-red-400 p-1.5">View cart</Link>
                    </div>
                    <div className="mini-cart-action-right">
                      <h4 className='text-[14px] py-2 text-center'>
                        Total: <span> ${cartTotal}</span>
                      </h4>
                      <Link to="/checkout" className="btn-type-4 bg-blue-400 p-1.5 rounded-md"><span>Checkout</span></Link>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn uppercase text-[16px] tracking-wider text-textColor3 bg-mainColor1 rounded-md px-6 py-4 hidden md:block" onClick={gotoLogin}>Đăng nhập</button>
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
            <div className="py-2 px-2">
              <div className="container">
                <ul className="menus-mobile md:hidden block ">
                  <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Home</Link><PlusOutlined /></li>
                  <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Product</Link><PlusOutlined /></li>
                  <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Table</Link><PlusOutlined /></li>
                  <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">Order</Link><PlusOutlined /></li>
                  <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                    to={``} className="menus-item__link text-type-2">About us</Link><PlusOutlined /></li>
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
        </Drawer>
      </header>
    </>
  );
};

export default Header;
