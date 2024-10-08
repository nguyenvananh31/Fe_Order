import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../../context/ProductContext';
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from 'axios';

const Cart = () => {
  const { cart, setCart, removeFromCart, updateQuantity } = useProductContext();

  // Gọi API để lấy dữ liệu giỏ hàng
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Lấy token từ localStorage nếu cần
        const response = await axios.get('http://127.0.0.1:8000/api/client/online_cart', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Api_key': process.env.REACT_APP_API_KEY,
          },
        });
        setCart(response.data.data); // Cập nhật giỏ hàng với dữ liệu từ API
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [setCart]);

  // Tính tổng giá trị giỏ hàng
  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;  // Chuyển đổi giá thành số và kiểm tra hợp lệ
    return total + (itemPrice * item.quantity);  // Tính tổng tiền của từng sản phẩm
  }, 0);

  return (
    <div className="container mx-auto py-8 xl:px-56 lg:px-36 md:px-16 px-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

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
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                    <span className="whitespace-nowrap">{item.product_name}</span>
                  </td>

                  {/* Hiển thị giá sản phẩm từ API */}
                  <td className="py-4 whitespace-nowrap">
                    ${parseFloat(item.price).toFixed(2)}  {/* Hiển thị giá sản phẩm */}
                  </td>

                  <td className="py-4">
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

                  {/* Tính toán Subtotal (Tổng tiền cho mỗi sản phẩm) */}
                  <td className="py-4 whitespace-nowrap">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)} {/* Tính tổng tiền */}
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
      </div>

      {/* Tổng giỏ hàng */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-6">Cart Total</h3>
          <div className="flex justify-between mb-4">
            <span>SUBTOTAL:</span>
            <span>${cartTotal.toFixed(2)}</span>  {/* Hiển thị tổng giỏ hàng */}
          </div>
          <div className="flex justify-between mb-4">
            <span>SHIPPING:</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between font-bold mb-6">
            <span>TOTAL:</span>
            <span>${(cartTotal + 10).toFixed(2)}</span>  {/* Hiển thị tổng bao gồm phí ship */}
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
