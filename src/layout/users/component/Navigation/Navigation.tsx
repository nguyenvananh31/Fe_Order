import React from 'react'
import { Link } from 'react-router-dom'
const Navigation = () => {
    return (
        <ul className="menus flex items-center">
            <li className="menus-item px-3"><Link to={``} className="menus-item__link text-type-1">home</Link></li>
            <li className="menus-item px-3"><Link to={`product`} className="menus-item__link text-type-1">Product</Link></li>
            <li className="menus-item px-3"><Link to={`table`} className="menus-item__link text-type-1">table & order</Link></li>
            <li className="menus-item px-3"><Link to={`about`} className="menus-item__link text-type-1">about us</Link></li>
            <li className="menus-item px-3"><Link to={`contact`} className="menus-item__link text-type-1">contact</Link></li>
        </ul>
    )
}

export default Navigation