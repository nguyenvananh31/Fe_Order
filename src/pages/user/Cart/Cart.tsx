import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
      <div className="container mx-auto py-8 xl:px-56 lg:px-36 md:px-16 px-8">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

        {/* Bảng sản phẩm */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse mb-8 hidden sm:table">
            <thead>
            <tr className="border-b">
              <th className="py-3">Product</th>
              <th className="py-3">Price</th>
              <th className="py-3">Quantity</th>
              <th className="py-3">Subtotal</th>
              <th className="py-3">Remove</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b">
              <td className="py-4 flex items-center">
                <img
                    src="https://modinatheme.com/html/foodking-html/assets/img/food/burger.png"
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <span className="whitespace-nowrap">Product Name</span>
              </td>
              <td className="py-4 whitespace-nowrap">$195.00</td>
              <td className="py-4">
                <input
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="w-16 text-center border border-gray-300 rounded-md"
                />
              </td>
              <td className="py-4 whitespace-nowrap">$0.00</td>
              <td className="py-4 text-center">
                <button className="text-red-600">
                  <i className="fas fa-times"></i>
                </button>
              </td>
            </tr>

            </tbody>
          </table>

          {/* Thiết kế dạng khối trên màn hình nhỏ */}
          <div className="sm:hidden">
            <div className="relative flex flex-col border-b pb-4">
              <div className="absolute top-0 right-0">
                <button className="text-red-600">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="flex items-center">
                <img
                    src="https://modinatheme.com/html/foodking-html/assets/img/food/burger.png"
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <span className="font-bold">Product Name</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Price:</span>
                <span>$195.00</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Quantity:</span>
                <input
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="w-16 text-center border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span>Subtotal:</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tổng giỏ hàng */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm bg-white p-6 shadow-md rounded-md">
            <h3 className="text-xl font-semibold mb-6">Cart Total</h3>
            <div className="flex justify-between mb-4">
              <span>SUBTOTAL:</span>
              <span>$320,00</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>SHIPPING:</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between font-bold mb-6">
              <span>TOTAL:</span>
              <span>$330,00</span>
            </div>
            <Link
                to="/checkout"
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-800 transition-all text-center block"
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Cart;