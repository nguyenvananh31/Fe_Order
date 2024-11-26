import { Link } from 'react-router-dom'
import { RouteConfig } from '../../../../constants/path'
const Navigation = () => {
    return (
        <ul className="menus flex items-center">
            <li className="menus-item px-3"><Link to={RouteConfig.HOME} className="menus-item__link text-type-1">home</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.CLINET_PRODUCTS} className="menus-item__link text-type-1">Product</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.TABLE} className="menus-item__link text-type-1">table & order</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.ABOUT} className="menus-item__link text-type-1">about us</Link></li>
            <li className="menus-item px-3"><Link to={RouteConfig.CONTACT} className="menus-item__link text-type-1">contact</Link></li>
        </ul>
    )
}

export default Navigation