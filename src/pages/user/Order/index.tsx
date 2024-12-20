import { MenuFoldOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Input, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConfig } from "../../../constants/path";
import { useIsMobile } from "../../../hooks/useIsMobile";
import useOrder from "../../../hooks/useOrder";
import useToast from "../../../hooks/useToast";
import CateContent from "./components/CateContent";
import DrawerOrder from "./components/DrawerOrder";
import ModalConfirmPayment from "./components/ModalConfirmPayment";
import ModalPayment from "./components/ModalPayment";
import ProContent from "./components/ProContent";
import SiderOder from "./components/SiderOder";
import { apiAddOrderPro, apiDelOrderCart, apiGetbillDetailOnline, apiGetOrderByBillId, apiGetOrderCate, apiGetProByCateId, apiGetProForOrder, apiOrderPros, apiSaveBill, apiUpdateOrderCart } from "./utils/order.service";

interface IState {
    loading: boolean;
    loadingCate: boolean;
    loadingPro: boolean;
    loadingCart: boolean;
    loadingBtn: boolean;
    refresh: boolean;
    products: any[];
    cates: any[];
    showSider: boolean;
    checkedOrder: any[];
    cartOrderPro: any[];
    orderedPro: any[];
    itemHandle?: any;
    showModal: boolean;
    billOnlinePro: any[];
    loadingBill: boolean;
    apiCaling: boolean;
    billDetail: any;
    showConfirmPayment: boolean;
    showDrawer: boolean;
}

const initState: IState = {
    loading: false,
    loadingCate: false,
    loadingPro: false,
    loadingCart: false,
    loadingBtn: false,
    refresh: false,
    products: [],
    cates: [],
    showSider: false,
    checkedOrder: [],
    cartOrderPro: [],
    orderedPro: [],
    showModal: false,
    billOnlinePro: [],
    apiCaling: false,
    loadingBill: true,
    billDetail: {},
    showConfirmPayment: false,
    showDrawer: false,
}

interface IProps {
    isAdmin?: boolean;
}

const OrderPage = ({ isAdmin }: IProps) => {
    const [state, setState] = useState<IState>(initState);
    const toast = useToast();
    const navigate = useNavigate();

    const isMobile = useIsMobile();

    const [form] = Form.useForm();

    const { orderId, clearOrder, isFisrtLoad } = useOrder();

    const cartOrderProMemo = useMemo(() => state.cartOrderPro, [state.cartOrderPro]);
    const checkedOrderMemo = useMemo(() => state.checkedOrder, [state.checkedOrder]);

    if (!orderId && isFisrtLoad) {
        toast.showError('Vui lòng quét mã Qr để đăng nhập!');
        (async () => {
            await navigate(RouteConfig.ERROR);
        })();
        return;
    }

    useEffect(() => {
        if (!orderId || !isFisrtLoad) return;
        fetchApiBillDetail();
    }, [state.refresh, isFisrtLoad])

    const fetchApiBillDetail = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loadingBill: true }));
            const res: any = await apiGetbillDetailOnline({ ma_bill: orderId });
            const billDetail = {
                tableNumber: res.data.table_number,
                customerName: res.data.khachhang?.name || 'Chưa có',
                totalAmount: res.data.total_amount,
                orderDate: res.data.order_date,
            }
            const newPros = res.data.bill_details.reduce((acc: any[], curr: any) =>
                acc.concat(curr.product.product_details.map((x: any) => ({ ...x, name: curr.product.name, thumbnail: curr.product.thumbnail }))),
                []);
            setState(prev => ({ ...prev, loadingBill: false, billDetail, billOnlinePro: newPros }));
        } catch (error) {
            console.log(error);
            clearOrder();
            toast.showError('Bàn đã được thanh toán hoặc huỷ!');
            navigate(RouteConfig.HOME);
            return;
        }
    }, [isFisrtLoad]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loadingPro: true }));
                const res = await apiGetProForOrder();
                let items = [];
                items = res.data.map((i: any) => {
                    if (i.product_details.length == 0) {
                        return [];
                    }
                    return i.product_details.map((x: any) => ({ ...x, image: i.thumbnail, name: i.name }));
                })

                setState(prev => ({ ...prev, loadingPro: false, products: items.flat() }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loadingPro: false }));
            }
        }
        fetchData();
    }, [state.refresh]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loadingCate: true }));
                const res = await apiGetOrderCate();
                setState(prev => ({ ...prev, loadingCate: false, cates: res?.data }));
            } catch (error) {
                console.log('error: ', error);
                setState(prev => ({ ...prev, loadingCate: false }));
            }
        }
        fetchData();
    }, [state.refresh]);

    useEffect(() => {
        if (!isFisrtLoad) return;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loadingCart: true }));
                const res = await apiGetOrderByBillId(orderId || '');
                setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: res.data.data }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: [] }));
            }
        }
        fetchData();
    }, [state.refresh, isFisrtLoad]);

    //Handle add pro to cart order
    useEffect(() => {
        if (!state.itemHandle) {
            return;
        }

        const timeout = setTimeout(async () => {
            setState(prev => ({ ...prev, apiCaling: true }));
            if (state.itemHandle.isAdd) {
                const body = {
                    ma_bill: orderId || '',
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
    }, [state.itemHandle]);

    const handleSumitOrderPros = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiOrderPros({ id_order_cart: state.checkedOrder, ma_bill: orderId });
            toast.showSuccess('Đặt món thành công!');
            const newPros = state.cartOrderPro.filter(i => !state.checkedOrder.includes(i.id));
            setState(prev => ({ ...prev, loadingBtn: false, checkedOrder: [], cartOrderPro: [...newPros] }));
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
            setState(prev => ({ ...prev, loadingBtn: false }));
        }
    }, [state.checkedOrder]);

    const getApiProByCateId = useCallback(async (id: number) => {
        try {
            setState((prev) => ({ ...prev, loadingPro: true }));
            const res = await apiGetProByCateId(id);
            let items = [];
            items = res.data.map((i: any) => {
                if (i.product_details.length == 0) {
                    return [];
                }
                return i.product_details.map((x: any) => ({ ...x, image: x.images.length > 0 ? x.images[0].name : '', name: i.name }));
            })

            setState(prev => ({ ...prev, loadingPro: false, products: items.flat() }));
        } catch (error) {
            console.log(error);
            setState((prev) => ({ ...prev, loadingPro: false, products: [] }));
        }
    }, []);

    const handleToggleCheckAll = useCallback(() => {
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

    const handleCheckedPro = useCallback((ids: number[]) => {
        setState(prev => ({ ...prev, checkedOrder: ids }))
    }, []);

    const handleToggleSider = useCallback((_: any) => {
        setState(prev => ({ ...prev, showSider: !prev.showSider, showDrawer: prev.showSider ? false : prev.showDrawer }));
    }, []);

    const handleToggleDrawer = useCallback(() => {
        setState(prev => ({ ...prev, showDrawer: !prev.showDrawer }));
    }, []);

    const handleClickCate = useCallback((id: number) => {
        getApiProByCateId(id);
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

    const handleShowModalConfirm = useCallback(() => {
        setState(prev => ({ ...prev, showConfirmPayment: true }));
    }, []);

    const handleDismissModal = useCallback(() => {
        setState(prev => ({ ...prev, showModal: false, showConfirmPayment: false }));
    }, []);

    const handleClickBill = useCallback(() => { fetchApiBillDetail() }, [isFisrtLoad]);

    const handleSubmitForm = useCallback(() => { form.submit() }, []);

    const handleSaveBill = useCallback(async (values: any) => {
        try {
            const body = {
                ma_bill: orderId,
                phone: values.phone || undefined,
                payment_id: values.payment,
                note: values.note || undefined,
                voucher: values.voucher || undefined
            }
            setState(prev => ({ ...prev, loadingBill: true }));
            await apiSaveBill(body);
            setState(prev => ({ ...prev, loadingBill: false, showConfirmPayment: false, showModal: true }));
        } catch (error: any) {
            console.log('error: ', error);
            toast.showError(error);
            setState(prev => ({ ...prev, loadingBill: false }));
        }
    }, [isFisrtLoad]);

    return <>
        <Layout className="min-h-[100vh]">
            <Content className="bg-[#F5F5F5]">
                <Layout>
                    <Header className={`bg-transparent max-sm:px-4 ${isMobile ? 'fixed top-0 right-0 left-0 bg-white min-h-[120px] z-50 py-4' : 'mt-8 mb-2 max-sm:px-4'}`}>
                        <div className="flex items-center justify-between   ">
                            <div className="text-xl font-bold">YaGI ORDER</div>
                            <Input
                                prefix={<SearchOutlined className="text-[#F8B602]" />}
                                placeholder="Tìm kiếm món ăn tại đây"
                                className="w-[513px] max-md:hidden"
                                size="large"
                            />
                            <MenuFoldOutlined
                                onClick={handleToggleDrawer}
                                className="text-2xl cursor-pointer xl:hidden"
                            />
                        </div>
                        <Input
                            prefix={<SearchOutlined className="text-[#F8B602]" />}
                            placeholder="Tìm kiếm món ăn tại đây"
                            className="w-full md:hidden"
                            size="large"
                        />
                    </Header>
                    <Content className={`max-sm:px-4 max-lg:pt-4 sm:mx-[50px] ${isMobile ? 'mt-[120px]' : ''}`}>
                        {/* Danh mục */}
                        <CateContent data={state.cates} loading={state.loadingCate} onClickCate={handleClickCate} isMobile={isMobile} />
                        {/* Sản phẩm */}
                        <ProContent data={state.products} loading={state.loadingPro} onClickAdd={handleAddPro} />
                    </Content>
                </Layout>
            </Content>
            {/* Sider order */}
            {
                !isMobile && !isAdmin && (
                    <SiderOder
                        onToggle={handleToggleSider}
                        cart={cartOrderProMemo}
                        loading={state.loadingCart}
                        onToggleCheckBox={handleToggleCheckAll}
                        onDelCartPro={handleDelCartPro}
                        checked={checkedOrderMemo}
                        onIncreaseCart={handleAddPro}
                        onDecreaseCart={handleDecraesePro}
                        onCheckedPro={handleCheckedPro}
                        onShowPayment={handleShowModalConfirm}
                        loadingBtn={state.loadingBtn}
                        onOrderPro={handleSumitOrderPros}
                        loadBill={state.loadingBill}
                        billDetail={state.billDetail}
                        billOnlinePro={state.billOnlinePro}
                        onFetchBill={handleClickBill}
                        orderId={orderId || ''}
                        isMobile={isMobile}
                    />
                )
            }
        </Layout>
        {/* Modal thông tin thanh toán */}
        {state.showModal && !isAdmin && <ModalPayment
            onCancel={handleDismissModal}
            billPros={state.billOnlinePro}
            billDetail={state.billDetail}
            isMobile={isMobile}
        />
        }
        {/* Modal xác nhận thanh toán */}
        {state.showConfirmPayment && !isAdmin && <ModalConfirmPayment
            onCancel={handleDismissModal}
            form={form}
            onSubmit={handleSubmitForm}
            onSaveBill={handleSaveBill}
            isMobile={isMobile}
        />
        }
        {/* Drawer sider */}
        {
            !isAdmin && (
                <DrawerOrder
                    open={state.showDrawer}
                    onToggleDrawer={handleToggleDrawer}
                    isMobile={isMobile}
                    cart={cartOrderProMemo}
                    loading={state.loadingCart}
                    onToggleCheckBox={handleToggleCheckAll}
                    onDelCartPro={handleDelCartPro}
                    checked={checkedOrderMemo}
                    onIncreaseCart={handleAddPro}
                    onDecreaseCart={handleDecraesePro}
                    onCheckedPro={handleCheckedPro}
                    onShowPayment={handleShowModalConfirm}
                    loadingBtn={state.loadingBtn}
                    onOrderPro={handleSumitOrderPros}
                    loadBill={state.loadingBill}
                    billDetail={state.billDetail}
                    billOnlinePro={state.billOnlinePro}
                    onFetchBill={handleClickBill}
                    orderId={orderId || ''}
                />
            )
        }
    </>
}

export default OrderPage;