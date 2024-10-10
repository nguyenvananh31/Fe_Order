import { Checkbox, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../../hooks/redux/cart/useCartStore';
import useToastMessage from '../../../hooks/useToastMessage';
import { convertPriceVND } from '../../../utils/common';

interface IState {
  loading: boolean;
  loadingBtn: boolean;
  refresh: boolean;
  itemId?: number;
  quantity?: number;
}

const initState: IState = {
  loading: false,
  loadingBtn: false,
  refresh: false,
}

const Cart = () => {
  const [state, setState] = useState<IState>(initState);
  const { contextHolder, showToast } = useToastMessage();
  const { cartStore, setProtoCart, refreshCartStore, setCartSelect } = useCartStore();
  const indeterminate = useMemo(() => cartStore.optionSelect.length > 0 && cartStore.optionSelect.length < cartStore.proCarts.length, [cartStore]);

  useEffect(() => {
    (async () => {
      setState(prev => ({ ...prev, loading: true }));
      const res = await refreshCartStore();
      if (!res) {
        showToast('error', 'Có lỗi xảy ra!');
      }
      setState(prev => ({ ...prev, loading: false }));
    })();
  }, [state.refresh]);

  // Tính tổng giá trị giỏ hàng
  const cartTotal = useMemo(() => {
    return cartStore.proCarts.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + (itemPrice * item.quantity);
    }, 0)
  }, [cartStore]);

  //Xử lý sự kiện thêm sửa 
  const handleIncrease = useCallback((id: number) => {
    const newPros = cartStore.proCarts.map((i: any) => i.id == id ? { ...i, quantity: i.quantity + 1 } : i);
    setProtoCart(newPros);
  }, [cartStore]);

  const handleDecrease = useCallback((id: number, quantity: number) => {
    let newPros = [];
    if (quantity - 1 == 0) {
      newPros = cartStore.proCarts.filter(i => i.id !== id);
    } else {
      newPros = cartStore.proCarts.map(i => i.id == id ? { ...i, quantity: i.quantity - 1 } : i);
    }
    setProtoCart(newPros);
  }, [cartStore]);

  const handleDeleteCart = useCallback((id: number) => {
    let newPros = cartStore.proCarts.filter(i => i.id !== id);
    setProtoCart(newPros);
  }, [cartStore]);

  const onCheckAllChange = useCallback((e: any) => {
    const optionSelect = e.target.checked ? cartStore.proCarts.map(i => i.id) : [];
    setCartSelect(optionSelect);
  }, [cartStore]);

  const onChange = useCallback((checkedValues: any) => {
    setCartSelect(checkedValues);
  }, [cartStore])

  return <>
    {contextHolder}
    <div className="container mx-auto py-8 xl:px-56 lg:px-36 md:px-16 px-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      <div className="overflow-x-auto">
        <Checkbox indeterminate={indeterminate} checked={cartStore.optionSelect.length == cartStore.proCarts.length} onChange={onCheckAllChange} className="m-2">
          Chọn tất cả
        </Checkbox>
        <Checkbox.Group className="block" value={cartStore.optionSelect} onChange={onChange}>
          {state.loading ? <div className='flex justify-center items-center min-h-20'>
            <Spin />
          </div>
            : cartStore.proCarts.length > 0 ? (
              <table className="min-w-full text-left border-collapse mb-8 hidden sm:table">
                <thead>
                  <tr className="border-b">
                    <th className="py-3"></th>
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Subtotal</th>
                    <th className="py-3">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartStore.proCarts.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Checkbox checked={true} value={item.id} className="mx-2" />
                      </td>
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
                        {convertPriceVND(item.price || 0)}  {/* Hiển thị giá sản phẩm */}
                      </td>

                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="text-red-500"
                            onClick={() => handleDecrease(item.id, item.quantity)}
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
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Tính toán Subtotal (Tổng tiền cho mỗi sản phẩm) */}
                      <td className="py-4 whitespace-nowrap">
                        {(item.price * item.quantity).toFixed(2)} {/* Tính tổng tiền */}
                      </td>
                      <td className="py-4 text-center">
                        <button className="text-red-600" onClick={() => handleDeleteCart(item.id)} >
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
        </Checkbox.Group>
      </div>

      {/* Tổng giỏ hàng */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-6">Cart Total</h3>
          <div className="flex justify-between mb-4">
            <span>SUBTOTAL:</span>
            <span>{convertPriceVND(cartTotal)}</span>  {/* Hiển thị tổng giỏ hàng */}
          </div>
          <div className="flex justify-between mb-4">
            <span>SHIPPING:</span>
            <span>10</span>
          </div>
          <div className="flex justify-between font-bold mb-6">
            <span>TOTAL:</span>
            <span>{convertPriceVND(cartTotal + 10)}</span>  {/* Hiển thị tổng bao gồm phí ship */}
          </div>
          <Link
            to="/checkout"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-800 transition-all text-center block"
          >
            CHECKOUT
          </Link>
        </div>
      </div>
    </div >
  </>
};

export default Cart;
