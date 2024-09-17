import React from 'react';

const Checkout = () => {
  return (
    <div className="container mx-auto py-8 xl:px-56 lg:px-36 md:px-16 px-8">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Select Payment Method */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-4">Select Any One</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Credit/Debit Cards
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Paypal
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Payoneer
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Visa
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Mastercard
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" /> Fastpay
            </label>
          </div>
        </div>

        {/* Billing Address */}
        <div className="md:col-span-2 bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 rounded-md"
            />
            <select className="border p-2 rounded-md w-full">
              <option value="USA">USA</option>
              <option value="AUS">AUS</option>
              <option value="UK">UK</option>
              <option value="NED">NED</option>
            </select>

            <input
              type="text"
              placeholder="Country"
              className="border p-2 rounded-md"
            />
            <textarea
              placeholder="Address"
              className="border p-2 rounded-md col-span-2"
            // rows="3"
            ></textarea>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="md:col-span-2 bg-white p-6 shadow-md rounded-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label>Expiry Date</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label>CVC / CVV</label>
              <input
                type="text"
                placeholder="3 Digits"
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div className="col-span-2">
              <label>Name on Card</label>
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div className="flex items-center col-span-2">
              <input type="checkbox" className="mr-2" />
              <span>Save for my next payment</span>
            </div>
          </div>

          <button className="bg-green-600 text-white py-3 rounded-md w-full mt-6 hover:bg-green-700" >
            Payment Now
          </button>
        </div>
      </div>
    </div>
  )
};

export default Checkout;