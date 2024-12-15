import { LeftOutlined, RightOutlined, TruckOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Image, Radio, RadioChangeEvent, Row, Table, Tag } from "antd";
import { CheckboxProps } from "antd/lib";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseModalAddress from "../../../components/base/BaseModalAddress";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import { RouteConfig } from "../../../constants/path";
import useCartStore from "../../../hooks/redux/cart/useCartStore";
import useToast from "../../../hooks/useToast";
import { IAddress, Icustomer } from "../../../interFaces/custommers";
import { IPayments } from "../../../interFaces/payments";
import { convertPriceVND } from "../../../utils/common";
import BaseModalVoucher from "./components/VoucherModal";
import { apiAddBill, apiGetAddresandCustomer, apiGetPayment } from "./utils/checkout.service";
import { useIsMobile } from "../../../hooks/useIsMobile";
import ModalPayment from "../Order/components/ModalPayment";

interface IState {
  loading: boolean;
  loadingBtn: boolean;
  refresh: boolean;
  address: IAddress[];
  customer: Icustomer | undefined;
  addresActive: IAddress | undefined;
  showModalAddress: boolean;
  tranferPoint: boolean;
  paymants: IPayments[];
  paymentValue: number;
  showModalVoucher: boolean;
  voucher: any[];
  showMorePro: boolean;
  showModalPay: boolean;
  bill: any;
}

const initState: IState = {
  loading: false,
  loadingBtn: false,
  refresh: false,
  address: [],
  customer: undefined,
  addresActive: undefined,
  showModalAddress: false,
  tranferPoint: false,
  paymants: [],
  paymentValue: 0,
  showModalVoucher: false,
  voucher: [],
  showMorePro: false,
  showModalPay: false,
  bill: {},
}

const Checkout = () => {

  const [state, setState] = useState<IState>(initState);
  const { cartStore, refreshCartStore } = useCartStore();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (cartStore.optionSelect.length == 0) {
      navigate(RouteConfig.CART);
      return;
    }
  }, []);

  const toast = useToast();
  const listPros = useMemo(() => cartStore.proCarts.filter(i => cartStore.optionSelect.includes(i.id)), [cartStore]);

  const listProsDisplay = useMemo(() => {
    if (state.showMorePro || listPros.length <= 2) {
      return listPros;
    }
    return listPros.slice(2);
  }, [listPros, state.showMorePro]);

  const totalPros = useMemo(() => listPros.reduce((acc, curr) => acc + ((+curr.product_sale || +curr.product_price) * curr.quantity), 0), [listPros]);
  const totalVouchers = useMemo(() => {
    return state.voucher.reduce((acc, curr) => {
      if (!!+curr.value) {
        return acc + +curr.value;
      }
      const discount = totalPros * (+curr.discount_percentage / 100);
      if (discount > +curr.max_discount_value) {
        return acc + +curr.max_discount_value;
      }
      return acc + discount;
    }, 0);
  }, [state.voucher, totalPros]);
  const totalDiscount = useMemo(() => {
    let pointSale = state.tranferPoint ? (state.customer?.diemthuong || 0) > totalPros ? totalPros : state.customer?.diemthuong : 0;
    return pointSale + totalVouchers;
  }, [state.tranferPoint, totalVouchers]);
  const subTotal = useMemo(() => totalPros - totalDiscount! >= 0 ? totalPros - totalDiscount! : 0, [totalPros, totalDiscount]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const res = await apiGetAddresandCustomer();
        let addresActive: IAddress | undefined;
        if (res.data.addresses.length > 0) {
          const addDefault = res.data.addresses.filter((i: IAddress) => i.is_default == 1);
          addresActive = addDefault.length > 0 ? addDefault[0] : res.data.addresses[0];
        }
        setState(prev => ({
          ...prev, address: res.data.addresses, customer: res.data.customer,
          addresActive
        }));

      } catch (error) {
        console.log(error);
        setState(prev => ({ ...prev, loading: false }));
      }
    }
    fetchData();
  }, [state.refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const res = await apiGetPayment();
        setState(prev => ({
          ...prev, paymants: res.data, paymentValue: res.data[0]?.id
        })
        )
      } catch (error) {
        console.log(error);
        setState(prev => ({ ...prev, loading: false }));
      }
    }
    fetchData();
  }, []);

  const handleShowModalAddres = useCallback(() => {
    setState(prev => ({ ...prev, showModalAddress: true }));
  }, []);

  const handleShowModalVoucher = useCallback(() => {
    setState(prev => ({ ...prev, showModalVoucher: true }));
  }, []);

  const handleHiddenModal = useCallback(() => {
    setState(prev => ({ ...prev, showModalAddress: false, showModalVoucher: false, showModalPay: false }));
  }, []);

  const handleHiddenModalPay = useCallback(() => {
    setState(prev => ({ ...prev, showModalPay: false }));
    refreshCartStore();
    navigate(RouteConfig.HOME);
  }, []);

  const handleChangeAddress = useCallback((item?: IAddress) => () => {
    setState(prev => ({ ...prev, showModalAddress: false, addresActive: item }));
  }, []);

  const onChangePoint: CheckboxProps['onChange'] = (e) => {
    setState(prev => ({ ...prev, tranferPoint: e.target.checked }))
  };

  const columns: any = useMemo(() => {
    return [
      {
        title: <span className="text-lg">Sản phẩm</span>,
        dataIndex: 'product_name',
        key: 'product_name',
        render: (_: any, { product_name, product_thumbnail }: any) => (
          <div className="py-4 flex items-center">
            <Image
              src={product_thumbnail ? getImageUrl(product_thumbnail) : fallBackImg}
              className="max-w-[50px] max-h-[50px] min-h-[49px] min-w-[49px] object-cover rounded"
            />
            <span className="whitespace-nowrap pl-2">{product_name}</span>
          </div>
        )
      },
      {
        title: <span className="text-ghost">Đơn giá</span>,
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: (_: any, { product_sale, product_price }: any) => `${convertPriceVND(+product_sale || +product_price)}`,
      },
      {
        title: <span className="text-ghost">Số lượng</span>,
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'right',
      },
      {
        title: <span className="text-ghost">Thành tiền</span>,
        dataIndex: 'total',
        key: 'total',
        align: 'right',
        render: (_: any, { quantity, product_sale, product_price }: any) => `${convertPriceVND(quantity * (+product_sale || +product_price))}`,
      },
    ]
  }, [cartStore]);

  const handleAddBill = useCallback(async () => {
    try {
      const formData = new FormData();
      const proIDs = cartStore.proCarts.filter(i => cartStore.optionSelect.includes(i.id));

      proIDs?.forEach((i) => {
        formData.append(`cart_items[]`, `${i.id}`);
      });
      state.voucher?.forEach((i) => {
        formData.append(`vouchers[]`, `${i.id}`);
      });
      formData.append('use_points', `${state.tranferPoint ? 1 : 0}`);
      formData.append('user_addresses_id', `${state.addresActive?.id}`);
      formData.append('payment_id', `${state.paymentValue}`);
      const res = await apiAddBill(formData);
      toast.showSuccess('Đặt hàng thành công!' + (state.paymentValue == 2 ? ' Vui lòng thanh toán đơn hàng!' : ''));
      if (state.paymentValue == 2) {
        setState(prev => ({ ...prev, showModalPay: true, bill: res?.bill }));
      } else {
        refreshCartStore();
        navigate(RouteConfig.HOME);
      }
    } catch (error: any) {
      console.log(error);
      toast.showError(error);
    }
  }, [cartStore.optionSelect, state.tranferPoint, state.addresActive, state.voucher, state.paymentValue]);

  const onChangePayment = useCallback((e: RadioChangeEvent) => {
    setState(prev => ({ ...prev, paymentValue: e.target.value }));
  }, []);

  const handleChooseVoucher = useCallback((voucher: any[]) => () => {
    setState(prev => ({ ...prev, voucher, showModalVoucher: false }));
  }, []);

  const handleShowMorePro = useCallback(() => {
    setState(prev => ({ ...prev, showMorePro: !prev.showMorePro }));
  }, []);

  return <div className="container mx-auto my-4 xl:px-40">
    <h1 className="text-2xl my-4">Thanh toán</h1>
    <div className="bg-primary rounded-primary drop-shadow-primary">
      <Row gutter={16} justify={'space-around'} align={'middle'}>
        <Col className="p-4">
          <div className="pb-2 text-xl font-semibold text-mainColor1">
            <TruckOutlined />
            <span className="pl-2">Địa chỉ nhận hàng</span>
          </div>
          <div className="font-semibold text-base">
            <div>{state.addresActive?.fullname}</div>
            <div>{'(+84) ' + state.addresActive?.phone}</div>
          </div>
        </Col>
        <Col span={8}>
          <span className="text-sm line-clamp-2">{state.addresActive?.province} - {state.addresActive?.district} - {state.addresActive?.commune} - {state.addresActive?.address}</span>
        </Col>
        <Col>
          {state.addresActive?.is_default == 1 && <Tag color="red" className="ml-4 h-max" title="Mặc định">Mặc định</Tag>}
        </Col>
        <Col>
          <span className="text-sky-500 cursor-pointer" onClick={handleShowModalAddres}>Thay đổi</span>
        </Col>
      </Row>
    </div>
    <Row gutter={20}>
      <Col span={14}>
        <div className="bg-primary rounded-primary drop-shadow-primary my-6 p-2">
          <Table
            dataSource={listProsDisplay}
            columns={columns}
            pagination={false}
            className="custom-table"
          />
          {listPros.length > 2 && (
            <div className="flex items-center justify-center">
              <Button onClick={handleShowMorePro} type="text" className="text-sky-500">
                {
                  !state.showMorePro ? (
                    <>Xem thêm <RightOutlined /></>
                  ) : (
                    <>Thu gọn <LeftOutlined /></>
                  )
                }
              </Button>
            </div>
          )}
        </div>
      </Col>
      <Col span={10}>
        <div className="bg-primary rounded-primary drop-shadow-primary my-6">
          <div className="px-4 py-6 flex justify-between items-center">
            <div>
              <span>Voucher</span>
            </div>
            <Col className="flex">
              <span className="mr-4">{state.voucher.length > 0 && `x${state.voucher.length} đang sử dụng (${convertPriceVND(totalVouchers)})`}</span>
              <span onClick={handleShowModalVoucher} className="text-sky-500 cursor-pointer">Chọn Voucher</span>
            </Col>
          </div>
          <Divider className="m-0" />
          <div className="px-4 py-6 flex justify-between items-center">
            <div>
              <span>Đổi điểm</span>
            </div>
            <div className="flex items-center gap-1">
              <Col><span>Số điểm hiện có: {state.customer?.diemthuong || 0} = {`[-${convertPriceVND(state.customer?.diemthuong || 0)}]`}</span></Col>
              <Checkbox disabled={!state.customer?.diemthuong || (state.customer?.diemthuong == 0)} onChange={onChangePoint} />
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-primary drop-shadow-primary my-6">
          <div className="px-4 py-6 flex justify-start gap-4 items-center">
            <div>
              <span>Phương thức thanh toán</span>
            </div>
            <Radio.Group onChange={onChangePayment} value={state.paymentValue}>
              {
                state.paymants.map(i => (
                  <Radio className="line-clamp-1" key={i.id} value={i.id}>{i.name}</Radio>
                ))
              }
            </Radio.Group>
          </div>
          <Divider className="m-0" />
          <Row justify={'end'}>
            <Col span={24} className="px-4">
              <div className="flex justify-between items-center my-4">
                <span className="text-base font-semibold">Tổng tiền hàng</span>
                <span>{convertPriceVND(totalPros)}</span>
              </div>
              <div className="flex justify-between items-center my-4">
                <span className="text-base font-semibold">Tổng cộng Voucher giảm giá</span>
                <span>{convertPriceVND(totalDiscount || 0)}</span>
              </div>
              <div className="flex justify-between items-center my-4">
                <span className="text-base font-semibold">Tổng thanh toán</span>
                <span>{convertPriceVND(subTotal)}</span>
              </div>
            </Col>
          </Row>
          <Divider className="my-2" />
          <Row gutter={20} justify={'space-between'}>
            <Col span={24} className="flex justify-center items-center my-4">
              <span className="px-4 text-center">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản</span>
            </Col>
            <Col span={24} className="flex justify-center items-center mb-4">
              <Button type="primary" className="min-w-60" onClick={handleAddBill}>Đặt hàng</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    {
      state.showModalAddress && <BaseModalAddress
        onCancel={handleHiddenModal}
        onConfirm={handleChangeAddress}
        addresses={state.address}
        defaultActive={state.addresActive}
      />
    }

    {
      state.showModalVoucher && <BaseModalVoucher
        onCancel={handleHiddenModal}
        onConfirm={handleChooseVoucher}
        voucher={state.voucher}
      />
    }
    {/* Modal thông tin thanh toán */}
    {
      state.showModalPay && <ModalPayment
        onCancel={handleHiddenModalPay}
        billPros={listPros}
        billDetail={state.bill}
        isMobile={isMobile}
      />
    }
  </div>
};

export default Checkout;