import { InputRef } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import useToast from "../../../../hooks/useToast";
import { Icustomer } from "../../../../interFaces/custommers";
import { apiGetCustomers } from "./customers.service";


interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: Icustomer[];
    pageSize: number;
    pageIndex: number;
    total: number;
    showModal: boolean;
    selectedItemId?: number;
    selectedStatus?: string;
    refresh: boolean;
    search: boolean;
}

const initState: ISate = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    showModal: false,
    refresh: false,
    search: false
}

const useCustomer = () => {
    const [state, setState] = useState<ISate>(initState);
    const [searchText, setSearchText] = useState<string>('');
    const inputSearchRef = useRef<InputRef>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const isMobile = useIsMobile();
    const { showToast, contextHolder } = useToast();

    useEffect(() => {
        //Lấy tất cả tài khoản
        const fetchData = async () => {
            setState({ ...state, loading: true });
            try {
                const res = await apiGetCustomers({ page: state.pageIndex, per_page: state.pageSize });
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
    const handleOpenModal = useCallback((itemId?: number) => {
        setState(prev => ({
            ...prev,
            showModal: true,
            selectedItemId: itemId || 0
        }))
    }, []);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
    };


    return {
        state,
        isMobile,
        contextHolder,
        refreshPage,
        handleDismissModal,
        handleOpenModal,
        handlePageChange,
        showToast,
    }
}

export default useCustomer;