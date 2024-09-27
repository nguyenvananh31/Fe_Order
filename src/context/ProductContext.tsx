import React, { createContext, useContext, useState } from 'react';
import { notification } from 'antd';

interface ProductContextType {
  products: any[];
  cart: any[];  // Quản lý giỏ hàng
  setProducts: (products: any[]) => void;
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, action: 'increase' | 'decrease') => void;
  getTotalPrice: () => number;  // Hàm tính tổng giá trị giỏ hàng
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

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên
        return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Thông báo chỉ xuất hiện một lần khi thêm sản phẩm vào giỏ hàng
    notification.success({
      message: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
      placement: 'bottomRight',
    });
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number | string) => {
    const product = cart.find((item) => item.id === id);
    if (!product) return;

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    notification.warning({
      message: 'Removed from Cart',
      description: `${product.name} has been removed from your cart.`,
      placement: 'bottomRight',
    });
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (id: number | string, action: 'increase' | 'decrease') => {
    setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === id) {
            if (action === 'increase') {
              return { ...item, quantity: item.quantity + 1 };
            } else if (action === 'decrease' && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
    );
    notification.success({
      message: 'Updated to Cart',
      description: `The cart has been updated !`,
      placement: 'bottomRight',
    });
  };

  // Hàm tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
      <ProductContext.Provider value={{ products, setProducts, cart, addToCart, removeFromCart, updateQuantity, getTotalPrice }}>
        {children}
      </ProductContext.Provider>
  );
};