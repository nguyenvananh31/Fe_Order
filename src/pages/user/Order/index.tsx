import { MenuFoldOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCallback, useEffect, useMemo, useState } from "react";
import useToast from "../../../hooks/useToast";
import CateContent from "./components/CateContent";
import ModalPayment from "./components/ModalPayment";
import ProContent from "./components/ProContent";
import SiderOder from "./components/SiderOder";
import { apiAddOrderPro, apiDelOrderCart, apiGetbillDetailOnline, apiGetOrderByBillId, apiGetOrderCate, apiGetProByCateId, apiGetProForOrder, apiOrderPros, apiUpdateOrderCart } from "./utils/order.service";

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
    billDetail: {}
}

const OrderPage = () => {
    const [state, setState] = useState<IState>(initState);
    const toast = useToast();
    const cartOrderProMemo = useMemo(() => state.cartOrderPro, [state.cartOrderPro]);
    const checkedOrderMemo = useMemo(() => state.checkedOrder, [state.checkedOrder]);

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
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loadingCart: true }));
                const res = await apiGetOrderByBillId("BILL-67239AB7BACB3");
                setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: res.data.data }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loadingCart: false, cartOrderPro: [] }));
            }
        }
        fetchData();
    }, [state.refresh]);

    //Handle add pro to cart order
    useEffect(() => {
        if (!state.itemHandle) {
            return;
        }

        const timeout = setTimeout(async () => {
            setState(prev => ({ ...prev, apiCaling: true }));
            if (state.itemHandle.isAdd) {
                const body = {
                    ma_bill: "BILL-67239AB7BACB3",
                    product_detail_id: state.itemHandle.product_detail_id,
                    quantity: state.itemHandle.amount
                }
                try {
                    const res: any = await apiAddOrderPro(body);
                    const newPros = state.cartOrderPro.map(i => i.product_detail_id == state.itemHandle.product_detail_id ? { ...i, id: res.data.id, amount: 0 } : i);
                    setState(prev => {
                        return { ...prev, itemHandle: undefined, cartOrderPro: [...newPros] }
                    });
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

    useEffect(() => {
        fetchApiBillDetail();
    }, [state.refresh])

    const fetchApiBillDetail = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loadingBill: true }));
            const res: any = await apiGetbillDetailOnline({ ma_bill: "BILL-67239AB7BACB3" });
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
            setState(prev => ({ ...prev, loadingBill: false }));
        }
    }, []);

    const handleSumitOrderPros = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiOrderPros({ id_order_cart: state.checkedOrder, ma_bill: 'BILL-67239AB7BACB3' });
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

    const handleToggleSider = useCallback((e: boolean) => {
        setState(prev => ({ ...prev, showSider: e }));
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
            let pro = prev.cartOrderPro.filter(i => i.product_detail_id == item.id);
            if (pro.length > 0) {
                newPros = prev.cartOrderPro.map(i => i.product_detail_id == item.id ? { ...i, quantity: i.quantity + 1, amount: (i?.amount || 0) + 1 } : i);
                pro[0].amount = (pro[0]?.amount || 0) + 1;
            } else {
                pro = [{
                    id: '1',
                    product_name: item.name,
                    product_thumbnail: item.image,
                    size_name: item.size.name,
                    price: item.price,
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

    const handleShowModal = useCallback(() => {
        setState(prev => ({ ...prev, showModal: true }));
    }, []);

    const handleDismissModal = useCallback(() => {
        setState(prev => ({ ...prev, showModal: false }));
    }, []);

    return <>
        <Layout className="min-h-[100vh]">
            <Content className="bg-[#F5F5F5]">
                <Layout>
                    <Header className="bg-transparent mt-8 mb-2  max-sm:px-4">
                        <div className="flex items-center justify-between   ">
                            <div className="text-xl font-bold">YaGI ORDER</div>
                            <Input
                                prefix={<SearchOutlined className="text-[#F8B602]" />}
                                placeholder="Tìm kiếm món ăn tại đây"
                                className="w-[513px] max-md:hidden"
                                size="large"
                            />
                            <MenuFoldOutlined
                                hidden={!state.showSider}
                                className="text-2xl cursor-pointer"
                            />
                        </div>
                        <Input
                            prefix={<SearchOutlined className="text-[#F8B602]" />}
                            placeholder="Tìm kiếm món ăn tại đây"
                            className="w-full md:hidden"
                            size="large"
                        />
                    </Header>
                    <Content className="max-sm:px-4 sm:mx-[50px]">
                        {/* Danh mục */}
                        <CateContent data={state.cates} loading={state.loadingCate} onClickCate={handleClickCate} />
                        {/* Sản phẩm */}
                        <ProContent data={state.products} loading={state.loadingPro} onClickAdd={handleAddPro} />
                    </Content>
                </Layout>
            </Content>
            {/* Sider order */}
            <SiderOder
                cart={cartOrderProMemo}
                loading={state.loadingCart}
                onToggle={handleToggleSider}
                onToggleCheckBox={handleToggleCheckAll}
                onDelCartPro={handleDelCartPro}
                checked={checkedOrderMemo}
                onIncreaseCart={handleAddPro}
                onDecreaseCart={handleDecraesePro}
                onCheckedPro={handleCheckedPro}
                onShowPayment={handleShowModal}
                loadingBtn={state.loadingBtn}
                onOrderPro={handleSumitOrderPros}
                loadBill={state.loadingBill}
                billDetail={state.billDetail}
                billOnlinePro={state.billOnlinePro}
            />
        </Layout>
        {/* Modal thanh toán */}
        {state.showModal && <ModalPayment onCancel={handleDismissModal} onSubmit={() => { }} />}
    </>
}

export default OrderPage;