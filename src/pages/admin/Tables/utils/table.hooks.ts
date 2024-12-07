import { useCallback, useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { EStatusTable } from "../../../../constants/enum";
import useToast from "../../../../hooks/useToast";
import { BaseEventPayload, EventBusName } from "../../../../utils/event-bus";
import EventBus from "../../../../utils/event-bus/event-bus";
import { addProToTable, showSideOder } from "../../../../utils/event-bus/event-bus.events";
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
}

export default function useTable() {

    const [state, setState] = useState<IState>(initState);
    const [addPro, setAddPro] = useState<any>();
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
                if (data.type === EventBusName.ON_SHOW_MANAGE_ORDER) {
                    setState(prev => {
                        if (prev.showManageOrder) {
                            return prev;
                        }
                        return { ...prev, showManageOrder: true };
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
                setState(prev => ({ ...prev, data: res.data }))
            } catch (error: any) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, total: 0 }))
                toast.showError(error);
            }
        }
        fetchData();
        fetchApiPros();
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
        setState(prev => ({ ...prev, showModalAdd: false }));
    }, [])

    const handleShowModal = useCallback(() => {
        setState(prev => ({ ...prev, showModalAdd: true }));
    }, []);

    const handleScroll = useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 350) <= 1) {
            setState(prev => ({ ...prev, pageIndexPro: prev.pageIndexPro + 1 }))
            fetchApiPros();
        }
    }, []);

    const handleAddPro = useCallback((item: any) => () => {
        setAddPro((prev: any) => ({ ...item, sl: prev?.sl ? prev.sl + 1 : 1 }));
    }, []);

    return {
        state,
        openModalTable,
        handleCloseModal,
        handleShowModal,
        handleRefreshPage,
        handleScroll,
        handleAddPro
    }
}
