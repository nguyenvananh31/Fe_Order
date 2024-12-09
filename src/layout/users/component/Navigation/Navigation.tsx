import { Link } from 'react-router-dom'
import { RouteConfig } from '../../../../constants/path'
const Navigation = () => {
    return (
        <ul className="menus flex items-center">
            <li className="menus-item px-3"><Link to={RouteConfig.HOME} className="menus-item__link text-type-1">Trang chủ</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.CLINET_PRODUCTS} className="menus-item__link text-type-1">Món ăn</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.TABLE} className="menus-item__link text-type-1">Bàn ăn</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.ABOUT} className="menus-item__link text-type-1">Giới thiệu</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.CONTACT} className="menus-item__link text-type-1">Liên hệ</Link></li>
        </ul>
    )
}

export default Navigation