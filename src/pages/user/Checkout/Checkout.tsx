import React, { useState } from 'react';
import'./Checkout.scss'

const Checkout: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
    console.log("ahihi");
    
  };

  return (
    <section className="checkout-section fix section-padding border-bottom">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form action="#" method="post">
              <div className="row g-4">
                <div className="col-md-5 col-lg-4 col-xl-3">
                  <div className="checkout-radio">
                    <p className="primary-text">Select one</p>
                    <div className="checkout-radio-wrapper">
                      {["Credit/Debit Cards", "PayPal", "Payoneer", "Visa", "Mastercard", "Fastpay"].map((method) => (
                        <div key={method} className="checkout-radio-single">
                          <input
                            type="radio"
                            className="form-check-input"
                            id={method}
                            name="pay-method"
                            value={method}
                            checked={selectedPaymentMethod === method}
                            onChange={handlePaymentMethodChange}
                          />
                          <label htmlFor={method}>{method}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-8 col-xl-9">
                  <div className="checkout-single-wrapper">
                    <div className="checkout-single boxshado-single">
                      <h4>Billing address</h4>
                      <div className="checkout-single-form">
                        <div className="row g-4">
                          <div className="col-lg-6">
                            <div className="input-single">
                              <input
                                type="text"
                                name="user-first-name"
                                id="userFirstName"
                                required
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-single">
                              <input
                                type="text"
                                name="user-last-name"
                                id="userLastName"
                                required
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-single">
                              <input
                                type="email"
                                name="user-check-email"
                                id="userCheckEmail"
                                required
                                placeholder="Your Email"
                              />
                            </div>
                          </div>
                          {/* <div className="col-lg-6">
                            <div className="input-single">
                              <select className="country-select" style={{ display: 'none' }}>
                                <option value="usa">USA</option>
                                
                              </select>
                              <div className="nice-select country-select" tabIndex={0}>
                                <span className="current">USA</span>
                                <ul className="list">
                                  <li data-value="usa" className="option selected">USA</li>
                                  
                                </ul>
                              </div>
                            </div>
                          </div> */}
                          <div className="col-lg-12">
                            <div className="input-single">
                              <textarea
                                name="user-address"
                                id="userAddress"
                                placeholder="Address"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-single checkout-single-bg">
                      <h4>Payment Methods</h4>
                      <div className="checkout-single-form">
                        <p className="payment"></p>
                        <div className="row g-3">
                          <div className="col-lg-12">
                            <div className="input-single">
                              <label htmlFor="userCardNumber">Card number</label>
                              <input
                                type="number"
                                name="user-card-number"
                                id="userCardNumber"
                                placeholder="0000 0000 0000 0000"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-single">
                              <label htmlFor="userCardDate">Expiry date</label>
                              <input
                                type="text"
                                id="userCardDate"
                                placeholder="DD/MM/YY"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-single">
                              <label htmlFor="userCvc">Cvc / Cvv</label>
                              <input
                                type="text"
                                maxLength={3}
                                name="user-card-cvc"
                                id="userCvc"
                                required
                                placeholder="3 Digits"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="input-single">
                              <label htmlFor="userCardName">Name on card</label>
                              <input
                                type="text"
                                name="user-card-name"
                                id="userCardName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-single input-check payment-save">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="save-for-next"
                          id="saveForNext"
                        />
                        <label htmlFor="saveForNext">Save for my next payment</label>
                      </div>
                      <div className="mt-4">
                        <a href="checkout.html" className="theme-btn border-radius-none">
                          Payment Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;