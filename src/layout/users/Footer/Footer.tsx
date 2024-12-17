import { Link } from 'react-router-dom'
import './Footer.scss'
import { RouteConfig } from '@/constants/path'
import { Avatar } from 'antd'
const Footer = () => {
  return (
    <footer>
      <div className="container ">
        <div className="container-left">
          <Link to={RouteConfig.HOME} className='flex items-center'>
            <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
            <span className='ml-2 font-font3 text-3xl'>YaGi</span>
          </Link>
        </div>
        <div className="container-center">
          <ul className="menu-list">
            <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-3">Liên kết nhanh</a></li>
            <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-3">Tài khoản</a></li>
            <li className="menu-list-item"><a href={RouteConfig.HOME} className="menu-list-item__link text-type-2">Trang chủ</a></li>
            <li className="menu-list-item"><a href={RouteConfig.CLINET_PRODUCTS} className="menu-list-item__link text-type-2">Món ăn</a></li>
            <li className="menu-list-item"><a href={RouteConfig.TABLE} className="menu-list-item__link text-type-2">Bàn ăn</a></li>
            <li className="menu-list-item"><a href={RouteConfig.ABOUT} className="menu-list-item__link text-type-2">Giới thiệu</a></li>
            <li className="menu-list-item"><a href={RouteConfig.CONTACT} className="menu-list-item__link text-type-2">Liên hệ</a></li>
            {/* <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-2">Pages 1</a></li> */}
          </ul>
          <div className="address-box">
            <ul className="address-list">
              <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-3">Địa chỉ:</a></li>
              <li className="address-list-item"><p className="address-list-item__desc text-type-4">
                Trụ sở chính Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
              </p></li>
            </ul>
            <ul className="address-list">
              <li className="menu-list-item"><a href="#" className="menu-list-item__link text-type-3">Giờ:</a></li>
              <li className="address-list-item"><p className="address-list-item__desc text-type-4">
                11:00am – 23:00pm
                Các ngày trong tuần
              </p></li>
            </ul>
          </div>
        </div>
        <div className="container-right">
          <div className="contact-box">
            <h3 className="contact-box__heading text-type-3 font-bold">CLICK ĐỂ ĐẶT HÀNG TRỰC TUYẾN</h3>
            <p className="contact-box__desc uppercase text-type-4">CLICK ĐỂ ĐẶT HÀNG TRỰC TUYẾN</p>
            <div className="box-banner flex gap-3">
              <img src="https://www.vrihiskydeck.com/assets/img/zomato.png" alt="" />
              <img src="https://www.vrihiskydeck.com/assets/img/swiggy.png" alt="" />
            </div>
            <p className="contact-box__desc uppercase text-type-4">Hỗ trợ 24/7</p>
            <span className='text-2xl font-semibold text-mainColor2 tracking-wide'>+91 72950-54268</span>
          </div>
        </div>
      </div>
      <div className="container-bottom mx-auto bg-mainColor2">
        <div className="box-content flex items-center justify-between py-12 px-[16px] md:px-[20px] max-w-[1100px] mx-auto">
          <div className="box-left">
            <p className='text-type-4' style={{ color: "#fff", fontWeight: "500" }}>© Bản quyền 2024 DATN . Mọi quyền được bảo lưu.</p>
          </div>
          <div className="box-right">
            <img src="https://www.vrihiskydeck.com/assets/img/Cards.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer