import { useCallback, useEffect, useState } from "react";
import { EStatusTable, PAGINATE_DEFAULT } from "../../../../constants/enum";
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
    showModalAdd: boolean;
}

const initState: IState = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    refresh: false,
    showModalAdd: false
}

export default function useTable() {

    const [state, setState] = useState<IState>(initState);
    const { contextHolder, showToast } = useToastMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGetTables();
                setState(prev => ({ ...prev, data: res.data }))
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, total: 0 }))
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchData();
    }, [state.refresh]);

    const handleRefreshPage = useCallback(() => {
        setState(prev => ({ ...initState, refresh: !prev.refresh }))
    }, []);

    const openModalTable = useCallback(async (id: number, type?: string) => {
        if (type && type !== EStatusTable.OPEN) {
            return;
        }
        showSideOder(true, id);
    }, []);

    const handleCloseModal = useCallback(() => {
        setState(prev => ({ ...prev, showModalAdd: false }));
    }, [])

    const handleShowModal = useCallback(() => {
        setState(prev => ({ ...prev, showModalAdd: true }));
    }, [])

    return {
        state,
        contextHolder,
        openModalTable,
        handleCloseModal,
        handleShowModal,
        handleRefreshPage
    }
}
