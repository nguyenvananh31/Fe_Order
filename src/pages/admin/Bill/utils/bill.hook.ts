import { InputRef } from "antd";
import { RadioChangeEvent } from "antd/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import useToast from "../../../../hooks/useToast";
import { IBill } from "../../../../interFaces/bill";
import { apiGetBils, apiUpdateStatusBill } from "./bill.service";

interface IState {
    loadingSubmit: boolean;
    loading: boolean;
    data: IBill[];
    pageSize: number;
    pageIndex: number;
    total: number;
    showModal: boolean;
    selectedItemId?: number;
    selectedStatus?: string;
    refresh: boolean;
    search: boolean;
    bill?: IBill;
    showModalStatus: boolean;
}

const initState: IState = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    showModal: false,
    refresh: false,
    search: false,
    showModalStatus: false
}

export default function useBill() {

    const [state, setState] = useState<IState>(initState);
    const { showToast, contextHolder } = useToast();
    const [searchText, setSearchText] = useState<string>('');
    const inputSearchRef = useRef<InputRef>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [status, setStatus] = useState<any>();

    //Lấy bill
    useEffect(() => {
        //Lấy tất cả tài khoản
        const fetchData = async () => {
            setState({ ...state, loading: true });
            try {
                const res = await apiGetBils({ page: state.pageIndex, per_page: state.pageSize });
                if (res.data) {

                    setState({ ...state, data: res.data || [], loading: false, total: res.meta.total });
                }
            } catch (error: any) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
                setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
            }
        }
        fetchData();
    }, [state.refresh]);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
    };

    // làm mới data
    const refreshPage = useCallback(() => {
        setSearchText('');
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
        setSelectedStatus('');
    }, []);

    // Dismis Modal
    const handleDismissModal = useCallback(() => {
        setState((prev) => ({
            ...prev,
            showModal: false,
            selectedItemId: undefined,
        }));
    }, []);

    // Hiển thị model
    const handleOpenModal = useCallback((item?: IBill) => {
        setState(prev => ({
            ...prev,
            showModal: true,
            selectedItemId: item?.id || 0,
            bill: item
        }))
    }, []);

    // Dismis Modal
    const handleDismissModalStatus = useCallback(() => {
        setState((prev) => ({
            ...prev,
            showModalStatus: false,
        }));
    }, []);

    // Hiển thị model
    const handleOpenModalStatus = useCallback((id: number, type?: string) => {
        setState(prev => ({
            ...prev,
            showModalStatus: true,
        }))
        setStatus({id, type});
    }, []);

    const onChanegStatus = (e: RadioChangeEvent) => {
        setStatus((prev: any) => ({ ...prev, type: e.target.value }));
    };

    const handleChangeStatus = async () => {
        if (!status) return;
        setState({ ...state, loading: true });
        try {
            await apiUpdateStatusBill(status?.id, {status: status?.type});
            setState((prev) => ({ ...prev, refresh: !prev.refresh, showModalStatus: false }));
            showToast('success', 'Cập nhật trạng thái thành công!');
        } catch (error: any) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
            setState((prev) => ({ ...prev, loading: false }));
        }
    }

    return {
        state,
        contextHolder,
        status,
        showToast,
        handlePageChange,
        handleOpenModal,
        refreshPage,
        handleDismissModal,
        handleDismissModalStatus,
        handleOpenModalStatus,
        onChanegStatus,
        handleChangeStatus
    }
}