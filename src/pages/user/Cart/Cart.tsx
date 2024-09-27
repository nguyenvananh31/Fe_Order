import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../../context/ProductContext';
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useProductContext();

  // Tính tổng giá trị giỏ hàng
  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = item.product_details[0]?.price || 0;  // Lấy giá từ product_details
    return total + itemPrice * item.quantity;
  }, 0);

  return (
      <div className="container mx-auto py-8 xl:px-56 lg:px-36 md:px-16 px-8">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

        {/* Bảng sản phẩm */}
        <div className="overflow-x-auto">
          {cart.length > 0 ? (
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
                {cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 flex items-center">
                        <img
                            src="https://modinatheme.com/html/foodking-html/assets/img/food/burger.png"
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-full mr-4"
                        />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </td>
                      {/* Hiển thị giá sản phẩm từ product_details */}
                      <td className="py-4 whitespace-nowrap">
                        ${item.product_details[0]?.price || 'N/A'}
                      </td>
                      <td className="py-4">
                        {/* Thêm nút tăng giảm số lượng */}
                        <div className="flex items-center">
                          <button
                              className="text-red-500"
                              onClick={() => updateQuantity(item.id, 'decrease')}
                          >
                            -
                          </button>
                          <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-12 text-center mx-2 border border-gray-300 rounded-md"
                          />
                          <button
                              className="text-green-500"
                              onClick={() => updateQuantity(item.id, 'increase')}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        ${(item.product_details[0]?.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 text-center">
                        <button className="text-red-600" onClick={() => removeFromCart(item.id)}>
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          ) : (
              <p>Your cart is empty.</p>
          )}

          {/* Thiết kế dạng khối trên màn hình nhỏ */}
          <div className="sm:hidden">
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id} className="relative flex flex-col border-b pb-4">
                      <div className="absolute top-0 right-0">
                        <button className="text-red-600" onClick={() => removeFromCart(item.id)}>
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="flex items-center">
                        <img
                            src={item.thumbnail || 'https://modinatheme.com/html/foodking-html/assets/img/food/burger.png'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-full mr-4"
                        />
                        <span className="font-bold">{item.name}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Price:</span>
                        <span>${item.product_details[0]?.price || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Quantity:</span>
                        <div className="cart-item-quantity-controls flex items-center mt-1">
                          <MinusCircleOutlined
                              className="text-red-500 cursor-pointer"
                              onClick={() => updateQuantity(item.id, 'decrease')}
                          />
                          <span className="mx-2">{item.quantity}</span>
                          <PlusCircleOutlined
                              className="text-green-500 cursor-pointer"
                              onClick={() => updateQuantity(item.id, 'increase')}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Subtotal:</span>
                        <span>${(item.product_details[0]?.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* Tổng giỏ hàng */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm bg-white p-6 shadow-md rounded-md">
            <h3 className="text-xl font-semibold mb-6">Cart Total</h3>
            <div className="flex justify-between mb-4">
              <span>SUBTOTAL:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>SHIPPING:</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between font-bold mb-6">
              <span>TOTAL:</span>
              <span>${(cartTotal + 10).toFixed(2)}</span>
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