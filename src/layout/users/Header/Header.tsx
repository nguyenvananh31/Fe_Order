import { AlignLeftOutlined, CloseCircleFilled, LogoutOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Drawer, Dropdown, Image } from 'antd';
import { MenuProps } from 'antd/lib';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants/path';
import useAuth from '../../../hooks/redux/auth/useAuth';
import useCartStore from '../../../hooks/redux/cart/useCartStore';
import Navigation from '../component/Navigation/Navigation';

// interface IState {
//   loading: boolean;
//   loadingBtn: boolean;
//   refresh: boolean;
//   itemId?: number;
//   quantity?: number;
// }

// interface IUpdateCart {
//   id: number;
//   quantity: number;
// }

// const initState: IState = {
//   loading: false,
//   loadingBtn: false,
//   refresh: false,
// }

const Header = () => {
  // const [state, setState] = useState<IState>(initState);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigate();
  // const toast = useToast();
  const { user, clearStore } = useAuth();
  // const [updateCart, setUpdateCart] = useState<IUpdateCart>();
  const { cartStore } = useCartStore();
  const totalCart = useMemo(() => cartStore.proCarts.reduce((total: any, item: any) => total + item.quantity, 0), [cartStore]);

  // useEffect(() => {
  //   (async () => {
  //     setState(prev => ({ ...prev, loading: true }));
  //     const res = await refreshCartStore();
  //     if (!res) {
  //       showToast('error', 'Có lỗi xảy ra!');
  //     }
  //     setState(prev => ({ ...prev, loading: false }));
  //   })();
  // }, [state.refresh]);

  //Handle update cart
  // useEffect(() => {
  //   if (!updateCart) {
  //     return;
  //   }
  //   const timeout = setTimeout(async () => {
  //     if (updateCart?.quantity! < 1) {
  //       try {
  //         setState(prev => ({ ...prev, loadingBtn: true }));
  //         await apiDeleteCart(updateCart?.id!);
  //       } catch (error) {
  //         console.log(error);
  //         showToast('error', 'Xoá sản phẩm thất bại!');
  //       }
  //       setState(prev => ({ ...prev, loadingBtn: false }));
  //       return;
  //     }

  //     try {
  //       await apiUpdateCart(updateCart?.id!, { quantity: updateCart?.quantity! });
  //     } catch (error: any) {
  //       console.log(error);
  //       if (error?.data?.soluong) {
  //         const newPros = cartStore.proCarts.map((i: any) => i.id == updateCart.id ? { ...i, quantity: error.data.soluong } : i);
  //         setProtoCart(newPros);
  //         toast.showError(error.error);
  //         return;
  //       }
  //       toast.showError('Đã có lỗi xảy ra!');
  //     }
  //   }, 300);

  //   return () => clearTimeout(timeout);
  // }, [updateCart]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // // Tính tổng giá trị giỏ hàng
  // const cartTotal = useMemo(() => {
  //   return cartStore.proCarts.reduce((total, item) => {
  //     const itemPrice = item.price || 0;
  //     return total + (itemPrice * item.quantity);
  //   }, 0)
  // }, [cartStore]);

  // //Xử lý sự kiện thêm sửa 
  // const handleIncrease = useCallback((id: number, quantity: number) => {
  //   setUpdateCart({ id, quantity: quantity + 1 });
  //   const newPros = cartStore.proCarts.map((i: any) => i.id == id ? { ...i, quantity: i.quantity + 1 } : i);
  //   setProtoCart(newPros);
  // }, [cartStore]);

  // const handleDecrease = useCallback((id: number, quantity: number) => {
  //   let newPros = [];
  //   setUpdateCart({ id, quantity: quantity - 1 });
  //   if (quantity - 1 == 0) {
  //     newPros = cartStore.proCarts.filter(i => i.id !== id);
  //   } else {
  //     newPros = cartStore.proCarts.map(i => i.id == id ? { ...i, quantity: i.quantity - 1 } : i);
  //   }
  //   setProtoCart(newPros);
  // }, [cartStore]);

  // const handleDeleteCart = useCallback((id: number) => {
  //   setUpdateCart({ id, quantity: 0 });
  //   let newPros = cartStore.proCarts.filter(i => i.id !== id);
  //   setProtoCart(newPros);
  // }, [cartStore]);

  const gotoLogin = useCallback(() => {
    navigation(RouteConfig.LOGIN);
  }, []);

  const gotoProfile = useCallback(() => {
    navigation(RouteConfig.PROFILE);
  }, []);

  const handleLogout = useCallback(() => () => {
    clearStore();
  }, []);

  // Menu item Account
  const items: MenuProps['items'] = [
    {
      key: '1',
      style: {
        padding: 0,
        margin: "4px"
      },
      label: (
        <div className="flex items-center px-4 py-2 gap-4 min-w-[180px] rounded-primary group hover:bg-purple">
          <Avatar className="w-[38px] h-[38px]" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <div className="flex flex-col">
            <span className="text-primary font-semibold text-base group-hover:text-purple">{user?.name || 'Chưa có'}</span>
            <span className="text-ghost text-sm font-normal">User</span>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      style: {
        padding: 0,
        margin: "4px"
      },
      label: (
        <div onClick={gotoProfile} className="flex items-center px-4 py-2 gap-2 min-w-[180px] rounded-primary group hover:bg-purple">
          <UserOutlined className="text-primary text-base group-hover:text-purple" />
          <span className="text-primary text-base group-hover:text-purple">Quản lý tài khoản</span>
        </div>
      ),
    },
    {
      key: '3',
      style: {
        padding: 0,
        margin: "4px"
      },
      label: (
        <div onClick={handleLogout()} className="flex items-center px-4 py-2 gap-2 min-w-[180px] rounded-primary group hover:bg-purple">
          <LogoutOutlined className="text-primary text-base group-hover:text-purple" />
          <span className="text-primary text-base group-hover:text-purple">Đăng xuất</span>
        </div>
      ),
    },
  ];

  return (
    <>
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
              <Link to={RouteConfig.CART} className="cart cursor-pointer relative hidden md:block group">
                {/* Hiển thị số lượng tổng sản phẩm trong giỏ hàng */}
                <Badge count={totalCart} offset={[2, 0]} showZero>
                  <ShoppingCartOutlined className='text-3xl text-mainColor1' />
                </Badge>
              </Link>
              {
                !user ? (
                  <button className="btn uppercase text-[16px] tracking-wider text-textColor3 bg-mainColor1 rounded-md px-6 py-4 hidden md:block" onClick={gotoLogin}>Đăng nhập</button>
                ) : (
                  <>
                    {/* Account */}
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                      <Avatar className="cursor-pointer w-[38px] h-[38px]" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Dropdown>
                    {/* Account End */}
                  </>
                )
              }
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
                  to={RouteConfig.HOME} className="menus-item__link text-type-2">Trang chủ</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={RouteConfig.CLINET_PRODUCTS} className="menus-item__link text-type-2">Món ăn</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={RouteConfig.TABLE} className="menus-item__link text-type-2">Bàn</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link
                  to={RouteConfig.ABOUT} className="menus-item__link text-type-2">Giới thiệu</Link><PlusOutlined /></li>
                <li className="menus-item flex justify-between border-b-[1px] border-borderColor1 py-3 mb-2"><Link to={RouteConfig.CONTACT} className="menus-item__link text-type-2">Liên hệ</Link><PlusOutlined /></li>
              </ul>
            </div>
            <div className="container">
              <form action="" className='mt-5 border border-borderColor1 rounded-md flex items-center justify-between p-4 hover:border-mainColor2'>
                <input type="text" placeholder='Search...' className='border-none outline-none rounded-md w-full text-type-3' />
                <button type='submit' className='border-none group'><SearchOutlined className='text-textColor2 text-xl group-hover:text-mainColor2' /></button>
              </form>
              <p className='text-type-4 py-4 '>Điều này liên quan đến sự tương tác giữa một doanh nghiệp và khách hàng của mình. Đó là về việc đáp ứng nhu cầu của khách hàng và giải quyết vấn đề của họ. Dịch vụ khách hàng hiệu quả là rất quan trọng.</p>
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
              <button className="btn-type-2"><span>Đặt ngay</span></button>
            </div>
            {/* <div className="container">
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
            </div> */}
          </div>
          {/* <div className="container">
            <ul className="box-social flex gap-4 mb-4 border-t-[1px] border-borderColor1 pt-6">
              <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><TwitterOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
              <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><TikTokOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
              <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><PinterestOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
              <li className="box-social-item p-3 border rounded-full group hover:bg-textColor1 cursor-pointer"><Link to={``} className="box-social-item__link group block w-[50px] h-[50px]"><InstagramOutlined className='text-textColor1 text-2xl group-hover:text-textColor3 ' /></Link></li>
            </ul>
          </div> */}
        </Drawer>
      </header>
    </>
  );
};

export default Header;


