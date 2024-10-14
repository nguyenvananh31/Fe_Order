import React, { createContext, useContext, useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import { getAccessToken } from '../utils/api/api.utils';

interface ProductContextType {
  products: any[];
  cart: any[];  // Quản lý giỏ hàng
  setProducts: (products: any[]) => void;
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, action: 'increase' | 'decrease') => void;
  getTotalPrice: () => number;  // Hàm tính tổng giá trị giỏ hàng
  fetchCart: () => void; // Hàm lấy giỏ hàng từ API
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  // Hàm lấy giỏ hàng từ API
  const fetchCart = async () => {
    const token = getAccessToken(); // Lấy token mỗi lần gọi hàm
  
    if (!token) {
      notification.error({ message: 'Bạn cần đăng nhập', placement: 'bottomRight' });
      return;
    }
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/client/online_cart', {
        headers: {
          Authorization: `Bearer ${token}`, // Đảm bảo truyền token đúng ở đây
          'Api_key': import.meta.env.VITE_API_KEY,
        },
      });
      setCart(response.data.data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      notification.error({ message: 'Bạn cần đăng nhập', placement: 'bottomRight' });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (productDetails: { product_detail_id: number, product_id: number, quantity: number, price: number, size_id: number }) => {
    const token = getAccessToken();
    
    if (!token) {
      notification.error({ message: 'Bạn cần đăng nhập', placement: 'bottomRight' });
      return;
    }
  
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/client/online_cart',
        productDetails, // Truyền đầy đủ các trường cần thiết
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        }
      );
      fetchCart();  // Cập nhật giỏ hàng sau khi thêm sản phẩm
      notification.success({
        message: 'Thêm sản phẩm thành công',
        description: `Sản phẩm đã được thêm vào giỏ hàng của bạn.`,
        placement: 'bottomRight',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      notification.error({ message: 'Thêm sản phẩm thất bại', placement: 'bottomRight' });
    }
  };  

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (id: number | string) => {
    const token = getAccessToken();

    if (!token) {
      notification.error({ message: 'Bạn cần đăng nhập', placement: 'bottomRight' });
      return;
    } 

    try {
      await axios.delete(`http://127.0.0.1:8000/api/client/online_cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Api_key': import.meta.env.VITE_API_KEY,
        },
      });
      fetchCart();  // Cập nhật giỏ hàng sau khi xóa sản phẩm
      notification.warning({
        message: 'Xóa sản phẩm thành công',
        description: 'Sản phẩm đã bị xóa khỏi giỏ hàng của bạn.',
        placement: 'bottomRight',
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      notification.error({ message: 'Xóa sản phẩm thất bại', placement: 'bottomRight' });
    }
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = async (id: number | string, action: 'increase' | 'decrease') => {
    const token = getAccessToken();
    
    if (!token) {
      notification.error({ message: 'Bạn cần đăng nhập', placement: 'bottomRight' });
      return;
    }

    const product = cart.find((item) => item.id === id);
    if (!product) {
      notification.error({ message: 'Product not found in cart', placement: 'bottomRight' });
      return;
    }

    const newQuantity = action === 'increase' ? product.quantity + 1 : product.quantity - 1;
    if (newQuantity < 1) {
      await removeFromCart(id);
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/client/online_cart/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        }
      );
      fetchCart();  // Cập nhật giỏ hàng sau khi cập nhật số lượng
      notification.success({
        message: 'Quantity updated',
        description: `The quantity has been updated.`,
        placement: 'bottomRight',
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      notification.error({ message: 'Không thể cập nhật số lượng', placement: 'bottomRight' });
    }
  };

  // Hàm tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        fetchCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
