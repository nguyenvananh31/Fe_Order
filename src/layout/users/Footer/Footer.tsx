import React from 'react'
import './Footer.scss'
const Footer = () => {
  return (
    <footer>
      <div className="container ">
        <div className="container-left">
          <div className="logo-bottom-wrapper">
            <img src="https://modinatheme.com/html/foodking-html/assets/img/logo/logo.svg" alt="" className="logo-bottom__img" />
          </div>
        </div>
        <div className="container-center">
          <ul className="menu-list">
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-3">Quick Links</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-3">My account</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 3</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
            <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-2">Pages 1</a></li>
          </ul>
          <div className="address-box">
            <ul className="address-list">
              <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-3">Address:</a></li>
              <li className="address-list-item"><p className="address-list-item__desc text-type-4">
                Magadhi, Atal Path, near Rajdhani Apartment, Mahesh Nagar, Keshri Nagar, Patna, Bihar 800024 India
              </p></li>
            </ul>
            <ul className="address-list">
              <li className="menu-list-item"><a href="" className="menu-list-item__link text-type-3">Hours:</a></li>
              <li className="address-list-item"><p className="address-list-item__desc text-type-4">
                11:00am – 23:00pm
                Monday to Sunday
              </p></li>
            </ul>
          </div>
        </div>
        <div className="container-right">
          <div className="contact-box">
            <h3 className="contact-box__heading text-type-3 font-bold">Click To Order Online</h3>
            <p className="contact-box__desc uppercase text-type-4">We are Available On</p>
            <div className="box-banner flex gap-3">
              <img src="https://www.vrihiskydeck.com/assets/img/zomato.png" alt="" />
              <img src="https://www.vrihiskydeck.com/assets/img/swiggy.png" alt="" />
            </div>
            <p className="contact-box__desc uppercase text-type-4">24/7 Support center</p>
            <span className='text-2xl font-semibold text-mainColor2 tracking-wide'>+91 72950-54268</span>
          </div>
        </div>
      </div>
      <div className="container-bottom mx-auto bg-mainColor2">
        <div className="box-content flex items-center justify-between py-12 px-[16px] md:px-[20px] max-w-[1100px] mx-auto">
          <div className="box-left">
            <p className='text-type-4' style={{color: "#fff",fontWeight:"500"}}>© Copyright 2024 VrihiSkyDeck . All Rights Reserved.</p>
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