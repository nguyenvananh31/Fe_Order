import { useCallback, useEffect, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import useToastMessage from "../../../../hooks/useToastMessage";
import { showSideOder } from "../../../../utils/event-bus/event-bus.events";
import { apiGetTables } from "./rable.service";

interface IState {
    loadingSubmit: boolean;
    loading: boolean;
    data: [];
    pageSize: number;
    pageIndex: number;
    total: number;
    selectedItemId?: number;
    refresh: boolean;
}

const initState: IState = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    refresh: false
}

export default function useTable() {

    const [state, setState] = useState<IState>(initState);
    const { contextHolder, showToast } = useToastMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGetTables();
                setState(prev => ({...prev, data: res.data}))
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, total: 0 }))
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchData();
    }, [state.refresh]);

    const openModalTable = useCallback(async (id: number) => {
        showSideOder(true, id);
    }, []);

    return {
        state,
        contextHolder,
        openModalTable
    }
}
