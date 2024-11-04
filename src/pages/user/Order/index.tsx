import { MenuFoldOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCallback, useEffect, useMemo, useState } from "react";
import CateContent from "./components/CateContent";
import ProContent from "./components/ProContent";
import SiderOder from "./components/SiderOder";
import { apiAddOrderPro, apiGetOrderCate, apiGetProByCateId, apiGetProForOrder } from "./utils/order.service";
import useToast from "../../../hooks/useToast";
import useDebounce from "../../../hooks/useDeBounce";

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
}

const OrderPage = () => {
    const [state, setState] = useState<IState>(initState);
    const toast = useToast();

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
                    return i.product_details.map((x: any) => ({ ...x, image: x.images.length > 0 ? x.images[0].name : '', name: i.name }));
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

    //Handle add pro to cart order
    // useEffect(() => {
    //     if (!state.itemHandle) {
    //         return;
    //     }

    //     const timeout = setTimeout(async () => {
    //         const body = {
    //             ma_bill: 111,
    //             product_detail_id: state.itemHandle.id,
    //             quantity: state.itemHandle.count
    //         }
    //         if (state.itemHandle.quantity < state.itemHandle.count) {
    //             toast.showError('Số lượng sản phẩm còn lại là ' + state.itemHandle.quantity);
    //             body.quantity = state.itemHandle.quantity;
    //         }
    //         try {
    //             const res = await apiAddOrderPro(body);

    //         } catch (error) {
    //             console.log(error);
    //             toast.showError('Thêm sản phẩm thất bại!');
    //         } finally {
    //             setState(prev => ({ ...prev, itemHandle: undefined }));
    //         }
    //     }, 300);

    //     return () => clearTimeout(timeout);
    // }, [state.itemHandle]);

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
            let isExist = false;
            const newPros = prev.cartOrderPro.map(i => {
                if (i.id !== item.id) {
                    return i;
                }
                isExist = true;
                return {
                    ...i,
                    amount: i.amount + 1,
                }
            });

            !isExist && newPros.push({ ...item, amount: 1 });

            return {
                ...prev,
                cartOrderPro: newPros,
                itemHandle: item
            }
        });
    }, []);

    const handleDecraesePro = useCallback(async (item: any) => {
        setState(prev => {
            let newPros = [];
            if (item.amount - 1 == 0) {
                newPros = prev.cartOrderPro.filter(i => i.id !== item.id);
            } else {
                newPros = prev.cartOrderPro.map(i => i.id == item.id ? { ...i, amount: i.amount - 1 } : i);
            }
            return {
                ...prev,
                cartOrderPro: newPros
            }
        })
    }, []);

    const handleDelCartPro = useCallback((id: number) => {
        setState(prev => {
            const newPros = prev.cartOrderPro.filter(i => i.id !== id);
            return {
                ...prev,
                cartOrderPro: newPros,
                checkedOrder: newPros.map(i => i.id)
            }
        });
        toast.showSuccess('Xoá sản phẩm thành công!')
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
                cart={state.cartOrderPro}
                loading={state.loadingCart}
                onToggle={handleToggleSider}
                onToggleCheckBox={handleToggleCheckAll}
                onDelCartPro={handleDelCartPro}
                checked={state.checkedOrder}
                onIncreaseCart={handleAddPro}
                onDecreaseCart={handleDecraesePro}
                onCheckedPro={handleCheckedPro}
            />
        </Layout>
    </>
}

export default OrderPage;