import { useCallback, useEffect, useMemo, useState } from "react";
import { apiAddBill, apiGetAddresandCustomer, apiGetPayment } from "./utils/checkout.service";
import { IAddress, Icustomer } from "../../../interFaces/custommers";
import { TruckOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Image, Radio, RadioChangeEvent, Row, Table, Tag } from "antd";
import BaseModalAddress from "../../../components/base/BaseModalAddress";
import useCartStore from "../../../hooks/redux/cart/useCartStore";
import { convertPriceVND } from "../../../utils/common";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import { CheckboxProps } from "antd/lib";
import useToast from "../../../hooks/useToast";
import { IPayments } from "../../../interFaces/payments";

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
  paymentValue: 0
}

const Checkout = () => {

  const [state, setState] = useState<IState>(initState);
  const { cartStore } = useCartStore();
  const toast = useToast();
  const listPros = useMemo(() => cartStore.proCarts.filter(i => cartStore.optionSelect.includes(i.id)), [cartStore]);

  const totalPros = useMemo(() => listPros.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0), [listPros]);
  const totalVoucher = useMemo(() => state.tranferPoint ? state.customer?.diemthuong : 0, [state.tranferPoint]);
  const subTotal = useMemo(() => totalPros - totalVoucher! >= 0 ? totalPros - totalVoucher! : 0, [totalPros, totalVoucher])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const res = await apiGetAddresandCustomer();
        setState(prev => ({
          ...prev, address: res.data.addresses, customer: res.data.customer,
          addresActive: res.data.addresses.length > 0 ? res.data.addresses[0] : []
        })
        )
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
          ...prev, paymants: res.data, paymentValue: res.data[0].id
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

  const handleHiddenModalAddres = useCallback(() => {
    setState(prev => ({ ...prev, showModalAddress: false }));
  }, []);

  const handleChangeAddress = useCallback(() => {
    setState(prev => ({ ...prev, showModalAddress: false }));
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
        render: (_: any, { price }: any) => `${convertPriceVND(price)}`,
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
        render: (_: any, { quantity, price }: any) => `${convertPriceVND(quantity * price)}`,
      },
    ]
  }, [cartStore]);

  const handleAddBill = useCallback(async() => {
    try {
      const formData = new FormData();
      const proIDs = cartStore.proCarts.filter(i => cartStore.optionSelect.includes(i.id));
      
      proIDs?.forEach((i) => {
        formData.append(`cart_items[]`, `${i.id}`);
      });
      formData.append('use_points', `${state.tranferPoint ? 1 : 0}`);
      formData.append('user_addresses_id', `${state.addresActive?.id}`);
      formData.append('payment_id', `${1}`);
      await apiAddBill(formData);
      toast.showSuccess('Đặt hàng thành công!');
    } catch (error: any) {
      console.log(error);
      toast.showError(error);
    }
  }, [cartStore.optionSelect, state.tranferPoint, state.addresActive]);

  const onChangePayment = useCallback( (e: RadioChangeEvent) => {
    setState(prev => ({...prev, paymentValue: e.target.value}));
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
            <div>{state.customer?.name}</div>
            <div>{'(+84) ' + state.customer?.phone_number}</div>
          </div>
        </Col>
        <Col span={8}>
          <span className="text-sm">{state.addresActive?.address}</span>
        </Col>
        <Col>
          <Tag color="red" title="Mặc định">Mặc định</Tag>
        </Col>
        <Col>
          <span className="text-sky-500 cursor-pointer" onClick={handleShowModalAddres}>Thay đổi</span>
        </Col>
      </Row>
    </div>

    <div className="bg-primary rounded-primary drop-shadow-primary my-6 p-2">
      <Table
        dataSource={listPros}
        columns={columns}
        pagination={false}
        className="custom-table"
      />
    </div>

    <div className="bg-primary rounded-primary drop-shadow-primary my-6">
      <div className="px-4 py-6 flex justify-between items-center">
        <div>
          <span>Voucher</span>
        </div>
        <Col>
          <p className="text-sky-500 cursor-pointer">Chọn Voucher</p>
        </Col>
      </div>
      <Divider className="m-0" />
      <div className="px-4 py-6 flex justify-between items-center">
        <div>
          <span>Đổi điểm</span>
        </div>
        <div className="flex items-center gap-1">
          <Col><span>{`[-${convertPriceVND(state.customer?.diemthuong || 0)}]`}</span></Col>
          <Checkbox disabled={state.customer?.diemthuong == 0} onChange={onChangePoint} />
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
              <Radio value={i.id}>{i.name}</Radio>
            ))
          }
        </Radio.Group>
      </div>
      <Divider className="m-0" />
      <Row justify={'end'}>
        <Col xs={24} md={12} className="px-4">
          <div className="flex justify-between items-center my-4">
            <span className="text-base font-semibold">Tổng tiền hàng</span>
            <span>{convertPriceVND(totalPros)}</span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="text-base font-semibold">Tổng cộng Voucher giảm giá</span>
            <span>{convertPriceVND(totalVoucher!)}</span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="text-base font-semibold">Tổng thanh toán</span>
            <span>{convertPriceVND(subTotal)}</span>
          </div>
        </Col>
      </Row>
      <Divider className="my-2" />
      <Row gutter={20} justify={'space-between'}>
        <Col xs={24} md={12} className="flex justify-center items-center my-4">
          <span className="px-4">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản</span>
        </Col>
        <Col xs={24} md={12} className="flex justify-center items-center my-4">
          <Button type="primary" className="min-w-60" onClick={handleAddBill}>Đặt hàng</Button>
        </Col>
      </Row>
    </div>

    {
      state.showModalAddress && <BaseModalAddress
        onCancel={handleHiddenModalAddres}
        onConfirm={handleChangeAddress}
        addresses={state.address}
        defaultActive={state.addresActive?.id!}
      />
    }
  </div>
};

export default Checkout;