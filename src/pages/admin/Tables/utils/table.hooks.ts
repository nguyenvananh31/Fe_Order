import { useCallback, useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { EStatusTable } from "../../../../constants/enum";
import useOrder from "../../../../hooks/useOrder";
import useToast from "../../../../hooks/useToast";
import { BaseEventPayload, EventBusName } from "../../../../utils/event-bus";
import EventBus from "../../../../utils/event-bus/event-bus";
import { addProToTable, showSideOder } from "../../../../utils/event-bus/event-bus.events";
import { apiOpenTables } from "../../../user/Table/utils/table.service";
import { apiGetAllProduct, apiGetTables } from "./rable.service";

interface IState {
    loadingSubmit: boolean;
    loading: boolean;
    data: [];
    pageSize: number;
    pageIndex: number;
    total: number;
    selectedItem?: any;
    refresh: boolean;
    showModalAdd: boolean;
    loadingPro: boolean;
    pros: any[];
    pageIndexPro: number;
    showManageOrder: boolean;
    showModalOpenTable: boolean;
}

const initState: IState = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: 8,
    pageIndex: 1,
    total: 0,
    refresh: false,
    showModalAdd: false,
    loadingPro: false,
    pros: [],
    pageIndexPro: 1,
    showManageOrder: false,
    showModalOpenTable: false,
}

export default function useTable() {

    const [state, setState] = useState<IState>(initState);
    const [addPro, setAddPro] = useState<any>();
    const [size, setSize] = useState<string>('45%');
    const toast = useToast();
    const { setOrderToLocal } = useOrder();
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
                if (data.type === EventBusName.ON_SHOW_MANAGE_ORDER) {
                    setState(prev => {
                        const refresh = data.payload ? !prev.refresh : prev.refresh;
                        if (prev.showManageOrder == !data.payload) {
                            return { ...prev, refresh };
                        }
                        if (!prev.showManageOrder) {
                            fetchApiPros();
                        }
                        return { ...prev, showManageOrder: !data.payload, refresh };
                    });
                }
            })
        );
    };

    useEffect(() => {
        if (!addPro) {
            return;
        }
        const timeout = setTimeout(() => {
            setAddPro(undefined);
            addProToTable(addPro);
        }, 300);

        return () => clearTimeout(timeout);
    }, [addPro]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const conds = {
                    page: state.pageIndex,
                    per_page: state.pageSize,
                }
                const res = await apiGetTables(conds);
                setState(prev => ({ ...prev, data: res.data, total: res?.meta?.total || 0 }))
            } catch (error: any) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, total: 0 }))
                toast.showError(error);
            }
        }
        fetchData();
    }, [state.refresh]);

    const fetchApiPros = useCallback(async () => {
        try {
            const conds = {
                page: state.pageIndexPro,
                per_page: 5,
            };
            setState(prev => ({ ...prev, loadingPro: true }));
            const res = await apiGetAllProduct(conds);
            const pros = res.data.reduce((acc: any[], curr: any) => {
                let pros = curr?.product_details.map((i: any) => ({
                    name: curr.name,
                    ...i,
                    image: i?.images[0] ? i?.images[0]?.name : '',
                }));
                return acc.concat(pros);
            }, []);
            setState(prev => ({ ...prev, loadingPro: false, pros: prev.pros.length > 0 ? prev.pros.concat(pros) : pros }));
        } catch (error: any) {
            setState(prev => ({ ...prev, loadingPro: false, pros: [] }));
            console.log(error);
            toast.showError(error);
        }
    }, [state.pageIndexPro]);

    const handleRefreshPage = useCallback(() => {
        setState(prev => ({ ...initState, refresh: !prev.refresh }));
    }, []);

    const openModalTable = useCallback(async (id: number, type?: string) => {
        if (type && type !== EStatusTable.OPEN) {
            return;
        }
        // setState(prev => ({ ...prev, selectedItemId: id }));
        showSideOder(true, id);
    }, []);

    const handleCloseModal = useCallback(() => {
        setState(prev => ({ ...prev, showModalAdd: false, showModalOpenTable: false }));
    }, [])

    const handleShowModal = useCallback(() => {
        setState(prev => ({ ...prev, showModalAdd: true }));
    }, []);

    const handleShowModalOpenTable = useCallback(() => {
        setState(prev => ({ ...prev, showModalOpenTable: true }));
    }, [])

    const handleScroll = useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 420) <= 1) {
            setState(prev => ({ ...prev, pageIndexPro: prev.pageIndexPro + 1 }))
            fetchApiPros();
        }
    }, []);

    const handleAddPro = useCallback((item: any) => () => {
        setAddPro((prev: any) => ({ ...item, sl: prev?.sl ? prev.sl + 1 : 1 }));
    }, []);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any) => {
        setState(prev => ({ ...prev, pageIndex: page, refresh: !prev.refresh }));
    };

    const handleResize = useCallback((sizes: any) => {
        if (!sizes[1]) {
            setSize('0');
        }
        if (sizes[0] == sizes[1]) {
            setSize('45%');
        }
    }, []);

    const handleOpenManyTable = useCallback((table_ids: any[]) => async () => {
        try {
            const res = await apiOpenTables({ table_ids, payment_id: 1 });
            if (res?.ma_bill) {
                showSideOder(true, table_ids[0]);
                setState(prev => ({ ...prev, refresh: !prev.refresh, showModalOpenTable: false }));
            }
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
        }
    }, []);

    return {
        state,
        size,
        setOrderToLocal,
        openModalTable,
        handleCloseModal,
        handleShowModal,
        handleRefreshPage,
        handleScroll,
        handleAddPro,
        handlePageChange,
        handleResize,
        handleShowModalOpenTable,
        handleOpenManyTable,
    }
}
