import { CheckOutlined, DeleteOutlined, InfoCircleOutlined, MinusCircleOutlined, PauseOutlined, PayCircleOutlined, PlusCircleOutlined, PlusOutlined, ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Empty, Flex, Image, QRCode, Segmented, Space, Spin, Tooltip } from "antd";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import useToast from "../../../hooks/useToast";
import { apiActiveItem, apiGetTableDetail } from "../../../pages/admin/Tables/utils/rable.service";
import { apiAddOrderPro, apiDelOrderCart, apiOrderPros, apiUpdateOrderCart } from "../../../pages/user/Order/utils/order.service";
import ApiUtils from "../../../utils/api/api.utils";
import { convertPriceVND, convertPriceVNDNotSupfix, getUrlQrCheck } from "../../../utils/common";
import { BaseEventPayload, EventBusName } from "../../../utils/event-bus";
import EventBus from "../../../utils/event-bus/event-bus";
import { showManageOrder } from "../../../utils/event-bus/event-bus.events";

type Props = {
    id?: number;
    isShow: boolean;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    data: any[];
    checkedCofirm: any[];
    billDetail: any;
    loadingCart: boolean;
    cartOrderPro: any[];
    checkedOrder: any[];
    apiCaling: boolean;
    itemHandle?: any;
}

const initState: IState = {
    loading: false,
    loadingBtn: false,
    data: [],
    checkedCofirm: [],
    billDetail: {},
    loadingCart: false,
    cartOrderPro: [],
    checkedOrder: [],
    apiCaling: false,
}

interface ITotal {
    totalSale: number;
    totalPrice: number;
}

export default function OrderCartComponent({ id, isShow }: Props) {

    const [state, setState] = useState<IState>(initState);
    const [option, setOption] = useState<number>(1);
    const toast = useToast();
    const subscriptions = useRef(new Subscription());

    useEffect(() => {
        registerEventBus();

        return () => {
            subscriptions.current.unsubscribe();
        };
    }, []);

    const registerEventBus = () => {
        subscriptions.current = new Subscription();
        subscriptions.current.add(
            EventBus.getInstance().events.subscribe((data: BaseEventPayload<any>) => {
                if (data.type === EventBusName.ADD_PRO_TO_TABLE) {
                    if (!isShow) {
                        return;
                    }
                    const item = data.payload?.item;
                    setState(prev => {
                        if (prev.apiCaling) {
                            return prev;
                        }
                        let newPros = [...prev.cartOrderPro];
                        let pro = prev.cartOrderPro.filter(i => i.product_detail_id == (item.product_detail_id || item.id));
                        if (pro.length > 0) {
                            newPros = prev.cartOrderPro.map(i => i.product_detail_id == (item.product_detail_id || item.id) ? { ...i, quantity: i.quantity + (item?.sl || 1), amount: (i?.amount || 0) + 1 } : i);
                            pro[0].amount = (pro[0]?.amount || 0) + (item?.sl || 1);
                        } else {
                            pro = [{
                                id: '1',
                                product_name: item.name,
                                product_thumbnail: item.image,
                                size_name: item.size?.name,
                                price: +item.sale || item.price,
                                quantity: (item?.sl || 1),
                                product_detail_id: item.id,
                                amount: (item?.sl || 1)
                            }]
                            newPros.push(pro[0]);
                        }
                        return {
                            ...prev,
                            cartOrderPro: newPros,
                            itemHandle: { ...pro[0], isAdd: true }
                        }
                    });
                }
            })
        );
    };

    const total: ITotal = useMemo(() => {
        const pros = state.cartOrderPro.filter(i => state.checkedOrder.includes(i.id));
        const totalSale = pros.reduce((acc, curr) => acc + (+curr.sale || 0), 0);
        const totalPrice = pros.reduce((acc, curr) => acc + (+curr.sale || +curr.price), 0);
        return {
            totalSale, totalPrice
        };
    }, [state.checkedOrder]);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetTableDetail(id);
                setState(prev => ({ ...prev, data: res?.data[0]?.bill_details || [], loading: false, billDetail: res?.data[0] }));
            } catch (error: any) {
                setState(prev => ({ ...prev, loading: false }));
                toast.showError(error);
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    //Handle add pro to cart order
    useEffect(() => {
        if (!state.itemHandle) {
            return;
        }

        const timeout = setTimeout(async () => {
            setState(prev => ({ ...prev, apiCaling: true }));
            if (state.itemHandle.isAdd) {
                const body = {
                    ma_bill: state?.billDetail?.ma_bill || '',
                    product_detail_id: state.itemHandle.product_detail_id,
                    quantity: state.itemHandle.amount
                }
                try {
                    const res: any = await apiAddOrderPro(body);
                    const newPros = state.cartOrderPro.map(i => i.product_detail_id == state.itemHandle.product_detail_id ? { ...i, id: res.data.id, amount: 0 } : i);
                    setState(prev => {
                        return { ...prev, itemHandle: undefined, cartOrderPro: [...newPros] }
                    });
                    toast.showSuccess('Thêm món thành công!');
                } catch (error: any) {
                    console.log(error);
                    setState(prev => {
                        let newPros = [...prev.cartOrderPro];
                        if (error?.quantity) {
                            newPros.map(i => i.product_detail_id == state.itemHandle.product_detail_id ? { ...i, quantity: error.quantity } : i);
                        }
                        return { ...prev, itemHandle: undefined, cartOrderPro: newPros };
                    });
                    toast.showError(error);
                }
            }
            if (state.itemHandle.isUpdate) {
                const body = {
                    id_cart_order: state.itemHandle.id,
                    quantity: state.itemHandle.quantity,
                }
                try {
                    await apiUpdateOrderCart(body);
                    setState(prev => ({ ...prev, itemHandle: undefined }));
                    toast.showSuccess('Cập nhật món thành công!');
                } catch (error: any) {
                    console.log(error);
                    setState(prev => {
                        let newPros = [...prev.cartOrderPro];
                        if (error?.quantity) {
                            newPros.map(i => i.product_detail_id == state.itemHandle.product_detail_id ? { ...i, quantity: error.quantity } : i);
                        }
                        return { ...prev, itemHandle: undefined, cartOrderPro: newPros };
                    });
                    toast.showError(error);
                }
            }
            setState(prev => ({ ...prev, apiCaling: false }));
        }, 300);

        (async () => {
            if (state.itemHandle.isDel) {
                setState(prev => ({ ...prev, apiCaling: true }));
                try {
                    await apiDelOrderCart(state.itemHandle.id);
                    toast.showSuccess('Xoá sản phẩm thành công!')
                    const newPros = state.cartOrderPro.filter(i => i.id != state.itemHandle.id);
                    setState(prev => ({ ...prev, itemHandle: undefined, cartOrderPro: [...newPros] }));
                } catch (error: any) {
                    console.log(error);
                    setState(prev => ({ ...prev, itemHandle: undefined }));
                    toast.showError(error);
                }
                setState(prev => ({ ...prev, apiCaling: false }));
            }
        })();

        return () => clearTimeout(timeout);
    }, [state.itemHandle, state.billDetail]);

    const handleCheckedPro = useCallback((ids: number[]) => {
        setState(prev => ({ ...prev, checkedCofirm: ids }))
    }, []);

    const handleToggleCheckAll = useCallback(() => {
        setState(prev => {
            if (prev.data.length == 0) {
                return prev;
            }
            let newChecked = [];
            if (prev.data.length > prev.checkedCofirm.length) {
                newChecked = prev.data.map(i => i.id_bill_detail);
            } else {
                newChecked = [];
            }
            return {
                ...prev,
                checkedCofirm: newChecked
            }
        })
    }, []);

    const handleActiveItem = useCallback(async (ids: number[]) => {
        if (ids.length == 0) {
            toast.showError('Vui lòng chọn món muốn xác nhận!');
            return;
        }
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiActiveItem({ id_billdetails: ids });
            toast.showSuccess('Xác nhận món thành công!');
            setState(prev => {
                const newPros = [...prev.data.map(i => ids.includes(i.id_bill_detail) ? { ...i, product: { ...i.product, status: !i.product.status } } : i)];
                return { ...prev, loadingBtn: false, data: newPros, checkedCofirm: [] };
            });
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
            setState(prev => ({ ...prev, loadingBtn: false }));
        }
    }, []);

    const handleChangeOption = useCallback((value: number) => {
        if (value === 3) {
            getApiOrderProCart(state?.billDetail?.ma_bill || '');
        }
        setOption(value);
    }, [state.billDetail]);

    const getApiOrderProCart = useCallback(async (id: string) => {
        try {
            setState(prev => ({ ...prev, loadingCart: true }));
            const res = await apiGetOrderByBillId(id);
            setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: res.data.data }));
        } catch (error) {
            console.log(error);
            setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: [] }));
        }
    }, []);

    const apiGetOrderByBillId = useCallback(async (id: string) => {
        return await ApiUtils.fetch<any, any>('/api/client/order_cart/' + id);
    }, []);

    const handleCheckedOrder = useCallback((ids: number[]) => {
        setState(prev => ({ ...prev, checkedOrder: ids }))
    }, []);

    const handleDecraesePro = useCallback(async (item: any) => {
        setState(prev => {
            if (prev.apiCaling) {
                return prev;
            }
            let newPros = [];
            let itemHandle;
            if (item.quantity - 1 == 0) {
                newPros = prev.cartOrderPro.filter(i => i.product_detail_id !== item.product_detail_id);
                itemHandle = { id: item.id, isDel: true };
            } else {
                newPros = prev.cartOrderPro.map(i => i.product_detail_id == item.product_detail_id ? { ...i, quantity: i.quantity - 1 } : i);
                itemHandle = { id: item.id, quantity: item.quantity - 1, isUpdate: true };
            }
            return {
                ...prev,
                cartOrderPro: newPros,
                itemHandle
            }
        })
    }, []);

    const handleAddPro = useCallback(async (item: any) => {
        setState(prev => {
            if (prev.apiCaling) {
                return prev;
            }
            let newPros = [...prev.cartOrderPro];
            let pro = prev.cartOrderPro.filter(i => i.product_detail_id == (item.product_detail_id || item.id));
            if (pro.length > 0) {
                newPros = prev.cartOrderPro.map(i => i.product_detail_id == (item.product_detail_id || item.id) ? { ...i, quantity: i.quantity + 1, amount: (i?.amount || 0) + 1 } : i);
                pro[0].amount = (pro[0]?.amount || 0) + 1;
            } else {
                pro = [{
                    id: '1',
                    product_name: item.name,
                    product_thumbnail: item.image,
                    size_name: item.size.name,
                    price: +item.sale || item.price,
                    quantity: 1,
                    product_detail_id: item.id,
                    amount: 1
                }]
                newPros.push(pro[0]);
            }
            return {
                ...prev,
                cartOrderPro: newPros,
                itemHandle: { ...pro[0], isAdd: true }
            }
        });
    }, []);

    const handleDelCartPro = useCallback((id: number) => {
        setState(prev => {
            if (prev.apiCaling) {
                return prev;
            }
            return {
                ...prev,
                itemHandle: { id, isDel: true }
            }
        });
    }, []);

    const handleToggleCheckAllCart = useCallback(() => {
        setState(prev => {
            if (prev.cartOrderPro.length == 0) {
                return prev;
            }
            let newChecked = [];
            if (prev.cartOrderPro.length > prev.checkedOrder.length) {
                newChecked = prev.cartOrderPro.map(i => i.id);
            } else {
                newChecked = [];
            }
            return {
                ...prev,
                checkedOrder: newChecked
            }
        })
    }, []);

    const handleSumitOrderPros = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiOrderPros({ id_order_cart: state.checkedOrder, ma_bill: state?.billDetail?.ma_bill });
            toast.showSuccess('Đặt món thành công!');
            const newPros = state.cartOrderPro.filter(i => !state.checkedOrder.includes(i.id));
            setState(prev => ({ ...prev, loadingBtn: false, checkedOrder: [], cartOrderPro: [...newPros] }));
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
            setState(prev => ({ ...prev, loadingBtn: false }));
        }
    }, [state.checkedOrder, state.billDetail]);

    const handleShowManageOrder = useCallback(() => {
        showManageOrder(false);
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
            <Flex justify="space-between" align="center" className="px-4">
                <div>
                    <p className="text-lg font-semibold mb-4">Thông tin bàn</p>
                    <Space direction="vertical" align="start">
                        <Flex gap={8} justify="center" align="center">
                            <InfoCircleOutlined className="text-[#00813D]" />
                            <p className="font-bold">Số bàn:
                                {state.billDetail?.tables?.reduce((acc: any, curr: any, index: number, arr: any[]) => {
                                    if (arr.length == index + 1) {
                                        return acc + curr?.table;
                                    }
                                    return acc + curr?.table + ' - ';
                                }, '')}
                            </p>
                        </Flex>
                        {/* <Flex gap={8} justify="center" align="center">
                            <InfoCircleOutlined className="text-[#00813D]" />
                            <p className="font-bold">Tên khách hàng: {state.billDetail?.customerName}</p>
                        </Flex> */}
                        <Flex gap={8} justify="center" align="center">
                            <InfoCircleOutlined className="text-[#00813D]" />
                            <p className="font-bold">Tổng tiền: {convertPriceVNDNotSupfix(+state.billDetail?.totalAmount || 0)}vnđ</p>
                        </Flex>
                        <Flex gap={8} justify="center" align="center">
                            <InfoCircleOutlined className="text-[#00813D]" />
                            <p className="font-bold">Thời gian: {moment(state.billDetail?.order_date || undefined, "YYYY-MM-DD HH:mm:ss").format("hh:mm:ss A")}</p>
                        </Flex>
                    </Space>
                </div>
                <QRCode size={150} value={getUrlQrCheck(state?.billDetail?.ma_bill || '')} />
            </Flex>
            <Divider />
            <Segmented
                className="m-2"
                options={[
                    { label: 'Chưa lên', value: 1, icon: <PauseOutlined /> },
                    { label: 'Đã lên', value: 2, icon: <CheckOutlined /> },
                    { label: 'Giỏ hàng', value: 3, icon: <ShoppingCartOutlined /> },
                ]}
                value={option}
                onChange={handleChangeOption}
            />
            {
                option !== 3 && (
                    <Checkbox.Group className="w-full" value={state.checkedCofirm} onChange={handleCheckedPro}>
                        {
                            state?.data?.map((i: any) => {
                                return i?.product?.status == (option - 1) && (
                                    <Card key={i.id_bill_detail} className="m-2 px-2 basis-full" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
                                        {
                                            option == 1 && (
                                                <Checkbox className="ml-2 mr-4" value={i.id_bill_detail} />
                                            )
                                        }
                                        <Image src={i.product.thumbnail ? getImageUrl(i.product.thumbnail || '') : fallBackImg} preview={false} className="rounded max-w-[50px] min-h-[50px] object-cover object-center" />
                                        <div className="ml-2 flex flex-col gap-2 justify-between">
                                            <div className="text-primary text-sm font-semibold">{i.product.name}</div>
                                            <div className="text-primary text-sm font-semibold">{convertPriceVND(i.product.product_detail.price)}</div>
                                        </div>
                                        <div className="ml-auto mr-5 font-semibold">x{i.quantity}</div>
                                    </Card>
                                )
                            })
                        }
                    </Checkbox.Group>
                )
            }
            {
                state.data.length == 0 && !state.loading && option == 3 && (
                    <div className="text-center">
                        <SmileOutlined style={{ fontSize: 24 }} />
                        <p>Không có sản phẩm nào</p>
                    </div>
                )
            }
            {/*Btn choose all */}
            {
                option == 1 && (
                    <>
                        <Space align="center" className="mt-4 mx-2">
                            <Button onClick={handleToggleCheckAll}>{state.data.length != 0 && state.data.length == state.checkedCofirm.length ? 'Bỏ chọn' : 'Chọn tất cả'}</Button>
                            <span>{state.checkedCofirm.length} sản phẩm đang chọn</span>
                        </Space>
                        <Flex align="center" justify="center" className="mt-4">
                            <Button loading={state.loading} type="primary" onClick={() => handleActiveItem(state.checkedCofirm)} className="w-4/5 py-4 bg-[#00813D]">Xác nhận món</Button>
                        </Flex>
                    </>
                )
            }
            {
                option === 3 && (
                    <div className={`px-4`}>
                        <Checkbox.Group className="w-full" value={state.checkedOrder} onChange={handleCheckedOrder}>
                            <Space direction="vertical" size={'large'} className="w-full">
                                {
                                    state.loadingCart && (
                                        <Card loading={true} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
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
                                    )
                                }
                                {
                                    state.cartOrderPro.map(i => {
                                        return (
                                            <Card key={i.id} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                                                <Card.Meta title={
                                                    <Flex gap={4}>
                                                        <Checkbox value={i.id} />
                                                        <Flex flex={1} align="end" justify="space-between">
                                                            <Flex gap={8}>
                                                                <img className="rounded w-[50px] h-[50px] object-cover object-center" src={i.product_thumbnail ? getImageUrl(i.product_thumbnail) : fallBackImg} alt="Ảnh sản phẩm" />
                                                                <Space direction="vertical" align="start">
                                                                    <Tooltip title={`${i.product_name} - ${i.size_name}`} className="line-clamp-1 max-w-[160px]">{i.product_name} - {i.size_name}</Tooltip>
                                                                    <Flex gap={8} justify="center" align="center">
                                                                        <MinusCircleOutlined className="cursor-pointer" onClick={() => handleDecraesePro(i)} />
                                                                        <p className="text-ghost text-sm min-w-6 pointer-events-none">x{i.quantity || 0}</p>
                                                                        <PlusCircleOutlined onClick={() => handleAddPro(i)} className="cursor-pointer" />
                                                                    </Flex>
                                                                </Space>
                                                            </Flex>
                                                            <Flex gap={4} vertical={true} justify="space-between" align="end">
                                                                <DeleteOutlined onClick={() => handleDelCartPro(i.id)} className="cursor-pointer text-[#EB5757]" />
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
                                }
                                {
                                    state.cartOrderPro.length == 0 && !state.loadingCart && (
                                        <div className="text-center">
                                            <SmileOutlined style={{ fontSize: 24 }} />
                                            <p>Không có sản phẩm nào</p>
                                        </div>
                                    )
                                }
                            </Space>
                        </Checkbox.Group>
                        {/*Btn choose all */}
                        <Space align="center" className="mt-4">
                            <Button onClick={handleToggleCheckAllCart}>{state.cartOrderPro.length != 0 && state.cartOrderPro.length == state.checkedOrder.length ? 'Bỏ chọn' : 'Chọn tất cả'}</Button>
                            <span>{state.checkedOrder.length} sản phẩm đang chọn</span>
                        </Space>
                        <Divider />
                        <Space direction="vertical" size={'large'} className="w-full">
                            <Flex justify="space-between" align="center" >
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
                            </Flex>
                            <Flex align="center" justify="center" >
                                <Button loading={state.loadingBtn} onClick={handleSumitOrderPros} type="primary" className="w-[87%] py-4 bg-[#00813D]">Đặt ngay</Button>
                            </Flex>
                        </Space>
                    </div>
                )
            }
            <Flex align="center" justify="center" className="my-4">
                <Button onClick={handleShowManageOrder} icon={<PlusOutlined />} className="w-4/5 py-4">Thêm món vào bàn</Button>
            </Flex>
            <Flex align="center" justify="center" className="my-4">
                <Button icon={<PayCircleOutlined />} type="primary" danger className="w-4/5 py-4 mb-4">Thanh toán</Button>
            </Flex>
        </div>
    )
}