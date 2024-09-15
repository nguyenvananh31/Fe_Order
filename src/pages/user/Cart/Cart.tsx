import React from 'react';
 import './Cart.scss'

const Cart: React.FC = () => {
  console.log("123");
  
    return (
        <header>
            <section className="cart-section section-padding fix">
                <div className="container">
                    <div className="main-cart-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="cart-wrapper">
                                    <div className="cart-items-wrapper">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="cart-item">
                                                    <td className="cart-item-info">
                                                        <img src="https://modinatheme.com/html/foodking-html/assets/img/food/burger-2.png" alt="Product Image" />
                                                    </td>
                                                    <td className="cart-item-price">
                                                        $ <span className="base-price">195.00</span>
                                                    </td>
                                                    <td>
                                                        <div className="cart-item-quantity">
                                                            <span className="cart-item-quantity-amount">1</span>
                                                            <div className="cart-item-quantity-controller">
                                                                <a href="#0" className="cart-increment">
                                                                    <i className="far fa-caret-up"></i>
                                                                </a>
                                                                <a href="#0" className="cart-decrement">
                                                                    <i className="far fa-caret-down"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="cart-item-price">
                                                        $ <span className="total-price">195.00</span>
                                                    </td>
                                                    <td className="cart-item-remove">
                                                        <a href="#0">
                                                            <i className="fas fa-times"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart-wrapper-footer">
                                        <form action="/">
                                            <input type="text" name="promo-code" id="promoCode" placeholder="Promo code" />
                                            <button type="submit" className="theme-btn border-radius-none">
                                                Apply Code
                                            </button>
                                        </form>
                                        <a href="/" className="theme-btn border-radius-none">
                                            Update Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6"></div>
                            <div className="col-xl-6">
                                <div className="cart-pragh-box">
                                    <div className="cart-graph">
                                        <h4>Cart Total</h4>
                                        
                                        <ul>
                                            <li>
                                                <span>Subtotal</span>
                                                <span>$320.00</span>
                                            </li>
                                            <li>
                                                <span>Shipping</span>
                                                <span>$10</span>
                                            </li>
                                            <li>
                                                <span>Total</span>
                                                <span>$330.00</span>
                                            </li>
                                        </ul>
                                        <div className="chck">
                                            <a href="checkout" className="theme-btn border-radius-none">
                                                Checkout
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Cart;