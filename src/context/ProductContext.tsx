import React, { createContext, useContext, useState } from 'react';

interface ProductContextType {
  products: any[];
  cart: any[];  // Quản lý giỏ hàng
  setProducts: (products: any[]) => void;
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, action: 'increase' | 'decrease') => void;  // Hàm cập nhật số lượng
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
        return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
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
  };

  return (
      <ProductContext.Provider value={{ products, setProducts, cart, addToCart, removeFromCart, updateQuantity }}>
        {children}
      </ProductContext.Provider>
  );
};