import { Affix, Button, Card, Checkbox, CheckboxProps, Divider, Empty, Flex, Image, Space, Spin } from "antd";
import { GetProp } from "antd/lib";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import { convertPriceVND, convertPriceVNDNotSupfix } from "../../../utils/common";
import useToast from "../../../hooks/useToast";
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined, RightOutlined, SmileOutlined } from "@ant-design/icons";
import ApiUtils from "../../../utils/api/api.utils";
import useOrder from "../../../hooks/useOrder";

type Props = {
  id?: number;
}

interface IState {
  loading: boolean;
  data: any;
}

const initState: IState = {
  loading: false,
  data: []
}

export default function ProCartComponent({ id }: Props) {

  const [state, setState] = useState<IState>(initState);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const indeterminate = useMemo(() => checkedList.length > 0 && checkedList.length < checkedList.length, [checkedList]);
  const toast = useToast();
  const {orderId} = useOrder();
  console.log('orderId: ', orderId);

//   useEffect(() => {
//     if (!id) return;
//     const fetchData = async () => {
//       try {
//         setState(prev => ({ ...prev, loading: true }));
//         const res = await apiGetOrderByBillId(id);
//         setState(prev => ({ ...prev, loading: false }));
//       } catch (error: any) {
//         setState(prev => ({ ...prev, loading: false }));
//         console.log(error);
//         toast.showError(error)
//       }
//     }
//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     if (!isFisrtLoad) return;
//     const fetchData = async () => {
//         try {
//             setState(prev => ({ ...prev, loadingCart: true }));
//             const res = await apiGetOrderByBillId(orderId || '');
//             setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: res.data.data }));
//         } catch (error) {
//             console.log(error);
//             setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: [] }));
//         }
//     }
//     fetchData();
// }, [state.refresh, isFisrtLoad]);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any) => {
    setCheckedList(checkedValues)
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    // setCheckedList();
  };


  const apiGetOrderByBillId = useCallback(async (id: string) => {
    return await ApiUtils.fetch<any, any>('/api/client/order_cart/' + id);
  }, []);

  if (!id) {
    return <div className="mt-60">
      <Empty description={'Không có dữ liệu.'} />
    </div>
  }

  if (state.loading) {
    return <Spin tip="Đang tải..."><div className="mt-60" /></Spin>
  }

  return (
    <div className="pt-5">
      <Checkbox.Group className="w-full"
      // value={props.checked}
      // onChange={props.onCheckedPro}
      >
        <Space direction="vertical" size={'large'} className="w-full">
          {
            // props.loading && (
            <Card loading={false} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
              <Card.Meta title={
                <Flex gap={4}>
                  <Checkbox value={'bb'} />
                  <Flex flex={1} align="end" justify="space-between">
                    <Flex gap={8}>
                      <img width={50} src="./images/pasta.png" alt="Ảnh sản phẩm" />
                      <div>
                        <p>Fish Burger</p>
                        <p className="text-ghost text-sm">x4</p>
                      </div>
                    </Flex>
                    <Flex gap={4} vertical={true} justify="space-between" align="end">
                      <DeleteOutlined className="cursor-pointer text-[#EB5757]" />
                      <div>
                        <span className="text-sm font-bold">{convertPriceVNDNotSupfix(100000)}</span>
                        <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                      </div>
                    </Flex>
                  </Flex>
                </Flex>
              } />
            </Card>
            // )
          }
          {/* {
            props.cart.map(i => {
              return (
                <Card key={i.id} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                  <Card.Meta title={
                    <Flex gap={4}>
                      <Checkbox value={i.id} />
                      <Flex flex={1} align="end" justify="space-between">
                        <Flex gap={8}>
                          <img className="rounded w-[50px] h-[50px] object-cover object-center" src={i.product_thumbnail ? getImageUrl(i.product_thumbnail) : fallBackImg} alt="Ảnh sản phẩm" />
                          <Space direction="vertical" align="start">
                            <p>{i.product_name} - {i.size_name}</p>
                            <Flex gap={8} justify="center" align="center">
                              <MinusCircleOutlined className="cursor-pointer"
                              // onClick={() => props.onDecreaseCart(i)} 
                              />
                              <p className="text-ghost text-sm min-w-6 pointer-events-none">x{i.quantity || 0}</p>
                              <PlusCircleOutlined
                                // onClick={() => props.onIncreaseCart(i)} 
                                className="cursor-pointer" />
                            </Flex>
                          </Space>
                        </Flex>
                        <Flex gap={4} vertical={true} justify="space-between" align="end">
                          <DeleteOutlined
                            // onClick={() => props.onDelCartPro(i.id)}
                            className="cursor-pointer text-[#EB5757]" />
                          <div>
                            <span className="text-sm font-bold">{convertPriceVNDNotSupfix(i.price)}</span>
                            <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                          </div>
                        </Flex>
                      </Flex>
                    </Flex>
                  } />
                </Card>
              )
            })
          } */}
          {/* {
            props.cart.length == 0 && !props.loading && (
              <div className="text-center">
                <SmileOutlined style={{ fontSize: 24 }} />
                <p>Không có sản phẩm nào</p>
              </div>
            )
          } */}
        </Space>
      </Checkbox.Group>
      {/*Btn choose all */}
      <Space align="center" className="mt-4">
        {/* <Button onClick={props.onToggleCheckBox}>{props.cart.length != 0 && props.cart.length == props.checked.length ? 'Bỏ chọn' : 'Chọn tất cả'}</Button> */}
        {/* <span>{props.checked.length} sản phẩm đang chọn</span> */}
      </Space>
      <Divider />
      <Space direction="vertical" size={'large'} className="w-full">
        {/* <Flex justify="space-between" align="center" >
          <span>Giảm giá</span>
          <div>
            <span className="text-sm font-bold">-{convertPriceVNDNotSupfix(total.totalSale)}</span>
            <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
          </div>
        </Flex>
        <Flex justify="space-between" align="center" >
          <span className="font-bold">Tổng tiền</span>
          <div>
            <span className="text-base font-bold">{convertPriceVNDNotSupfix(total.totalPrice)}</span>
            <span className="text-[#00813D] text-sm font-bold">vnđ</span>
          </div>
        </Flex> */}
        <Flex align="center" justify="center" >
          <Button
            // loading={props.loadingBtn} 
            // onClick={props.onOrderPro} 
            type="primary" className="w-4/5 py-4 bg-[#00813D]">Đặt ngay</Button>
        </Flex>
        <Flex align="center" justify="center" >
          <Button
            // onClick={() => handleChangeTab(2)} 
            className="w-4/5 py-4 border-[#00813D]">
            <Space align="center" size={'large'}>
              Quản lý bàn
            </Space>
          </Button>
        </Flex>
      </Space>
    </div>
  )
}