import { Checkbox, Image, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fallBackImg, getImageUrl } from '../../../constants/common';
import { RoutePath } from '../../../constants/path';
import useCartStore from '../../../hooks/redux/cart/useCartStore';
import useToast from '../../../hooks/useToast';
import useToastMessage from '../../../hooks/useToastMessage';
import { convertPriceVND } from '../../../utils/common';
import { apiDeleteCart, apiUpdateCart } from './utils/cart.service';

interface IState {
  isLoading: boolean;
  loading: boolean;
  loadingBtn: boolean;
  refresh: boolean;
  itemId?: number;
  quantity?: number;
}

interface IUpdateCart {
  id: number;
  quantity: number;
}

const initState: IState = {
  isLoading: false,
  loading: false,
  loadingBtn: false,
  refresh: false,
}

const Cart = () => {
  const [state, setState] = useState<IState>(initState);
  const [updateCart, setUpdateCart] = useState<IUpdateCart>();
  const { cartStore, setProtoCart, refreshCartStore, setCartSelect } = useCartStore();
  const { contextHolder, showToast } = useToastMessage();
  const toast = useToast();
  const navigate = useNavigate();
  const listProsChecked = useMemo(() => cartStore.proCarts.filter(i => cartStore.optionSelect.includes(i.id)), [cartStore]);
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

  //Handle update cart
  useEffect(() => {
    if (!updateCart) {
      return;
    }
    const timeout = setTimeout(async () => {

      if (updateCart?.quantity! < 1) {
        try {
          setState(prev => ({ ...prev, loadingBtn: true, isLoading: true }));
          await apiDeleteCart(updateCart?.id!);
        } catch (error) {
          console.log(error);
          showToast('error', 'Xoá sản phẩm thất bại!');
        }
        setState(prev => ({ ...prev, loadingBtn: false, isLoading: false }));
        return;
      }

      try {
        setState(prev => ({ ...prev, isLoading: true }));
        await apiUpdateCart(updateCart?.id!, { quantity: updateCart?.quantity! });
        setState(prev => ({ ...prev, isLoading: false }));
      } catch (error: any) {
        console.log(error);
        setState(prev => ({ ...prev, isLoading: false }));
        if (error?.data?.soluong) {
          const newPros = cartStore.proCarts.map((i: any) => i.id == updateCart.id ? { ...i, quantity: error.data.soluong } : i);
          setProtoCart(newPros);
          toast.showError(error.error);
          return;
        }
        toast.showError('Đã có lỗi xảy ra!');
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [updateCart]);

  // Tính tổng giá trị giỏ hàng
  const cartTotal = useMemo(() => {
    return listProsChecked.reduce((total, item) => {
      const itemPrice = (+item.product_sale || +item.product_price) || 0;
      return total + (itemPrice * item.quantity);
    }, 0)
  }, [cartStore]);

  //Xử lý sự kiện thêm sửa 
  const handleIncrease = useCallback((id: number, quantity: number) => {
    if (state.isLoading) {
      return;
    }
    setUpdateCart({ id, quantity: quantity + 1 });
    const newPros = cartStore.proCarts.map((i: any) => i.id == id ? { ...i, quantity: i.quantity + 1 } : i);
    setProtoCart(newPros);
  }, [cartStore, state.isLoading]);

  const handleDecrease = useCallback((id: number, quantity: number) => {
    if (state.isLoading) {
      return;
    }
    let newPros = [];
    setUpdateCart({ id, quantity: quantity - 1 });
    if (quantity - 1 == 0) {
      newPros = cartStore.proCarts.filter(i => i.id !== id);
    } else {
      newPros = cartStore.proCarts.map(i => i.id == id ? { ...i, quantity: i.quantity - 1 } : i);
    }
    setProtoCart(newPros);
  }, [cartStore, state.isLoading]);

  const handleDeleteCart = useCallback((id: number) => {
    if (state.isLoading) {
      return;
    }
    setUpdateCart({ id, quantity: 0 });
    let newPros = cartStore.proCarts.filter(i => i.id !== id);
    setProtoCart(newPros);
  }, [cartStore, state.isLoading]);

  const onCheckAllChange = useCallback((e: any) => {
    const optionSelect = e.target.checked ? cartStore.proCarts.map(i => i.id) : [];
    setCartSelect(optionSelect);
  }, [cartStore]);

  const onChange = useCallback((checkedValues: any) => {
    setCartSelect(checkedValues);
  }, [cartStore]);

  const handleCheckout = useCallback(() => {
    if (cartStore.optionSelect.length < 1) {
      toast.showError('Vui lòng chọn sản phẩm!');
      return;
    }
    navigate('/' + RoutePath.CHECKOUT);
  }, [cartStore.optionSelect])

  return <>
    {contextHolder}
    <div className="container mx-auto py-8 xl:px-56 lg:px-36 md:px-16 px-8">
      <h2 className="text-3xl font-bold mb-6">Giỏ hàng</h2>

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
                    <th className="py-3">Sản phẩm</th>
                    <th className="py-3">Giá</th>
                    <th className="py-3">Số lượng</th>
                    <th colSpan={5} className="py-3">Tổng</th>
                    <th className="py-3">Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartStore.proCarts.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Checkbox checked={true} value={item.id} className="mx-2" />
                      </td>
                      <td className="py-4 flex items-center">
                        <Image
                          src={item?.product_thumbnail ? getImageUrl(item.product_thumbnail) : fallBackImg}
                          className="max-w-[120px] max-h-[120px] min-h-[119px] min-w-[119px] object-cover rounded"
                        />
                        <span className="whitespace-nowrap pl-2">{item.product_name}</span>
                      </td>

                      {/* Hiển thị giá sản phẩm từ API */}
                      <td className="py-4 whitespace-nowrap">
                        {convertPriceVND((+item.product_sale || +item.product_price) || 0)}  {/* Hiển thị giá sản phẩm */}
                      </td>

                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="text-red-500 text-[25px]"
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
                            className="text-green-500 text-[20px]"
                            onClick={() => handleIncrease(item.id, item.quantity)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Tính toán Subtotal (Tổng tiền cho mỗi sản phẩm) */}
                      <td className="py-4 whitespace-nowrap min-w-[100px]">
                        {convertPriceVND((+item.product_sale || +item.product_price) * item.quantity)} {/* Tính tổng tiền */}
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
              <p>Giỏ hàng của bạn đang trống.</p>
            )}
        </Checkbox.Group>
      </div>

      {/* Tổng giỏ hàng */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-6">Tổng giỏ hàng</h3>
          <div className="flex justify-between mb-4">
            <span>Tổng tiền sản phẩm:</span>
            <span>{convertPriceVND(cartTotal)}</span>  {/* Hiển thị tổng giỏ hàng */}
          </div>
          {/* <div className="flex justify-between mb-4">
            <span>Phí:</span>
            <span>{convertPriceVND(10)}</span>
          </div> */}
          <div className="flex justify-between font-bold mb-6">
            <span>Thành tiền:</span>
            <span>{convertPriceVND(cartTotal)}</span>  {/* Hiển thị tổng bao gồm phí ship */}
          </div>
          <div
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-800 transition-all text-center block cursor-pointer"
          >
            Mua hàng
          </div>
        </div>
      </div>
    </div >
  </>
};

export default Cart;
