import { InputRef } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { IUser } from "../../../../interFaces/common.types";
import useToast from "../../../../hooks/useToast";
import { apiChangeLock, apiDelAccount, apiGetUsers } from "./account.service";
import useAuth from "../../../../hooks/redux/auth/useAuth";


interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: IUser[];
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

const useAccount = () => {
    const { user } = useAuth();
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
                const res = await apiGetUsers({ page: state.pageIndex, per_page: state.pageSize });
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

    // handle xoá tài khoản
    const handleDelAccount = async (id: number) => {
        if (user.id == id) {
            showToast('error', 'Không thể xoá tài khoản đang đăng nhập!');
            return;
        }
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            await apiDelAccount(id);
            showToast('success', 'Xoá tài khoản thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    // handle thay đổi trạng thái 
    const handleChangeLock = async (id: number) => {
        if (user.id == id) {
            showToast('error', 'Không thể khoá tài khoản đang đăng nhập!');
            return;
        }
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            const res = await apiChangeLock(id);
            showToast('success', res.message + '!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

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

    // Danh sách màu sắc cố định
    const colors = ['geekblue', 'green', 'volcano', 'cyan', 'purple', 'magenta', 'gold', 'lime'];

    // Hàm hash để chuyển đổi chuỗi thành chỉ số màu
    const hashStringToColorIndex = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash); // Tính toán hash dựa trên mã ASCII
        }
        // Chuyển đổi hash thành chỉ số của mảng màu
        return Math.abs(hash % colors.length);
    };

    return {
        state,
        isMobile,
        contextHolder,
        refreshPage,
        handleDismissModal,
        handleOpenModal,
        handlePageChange,
        hashStringToColorIndex,
        colors,
        handleDelAccount,
        showToast,
        handleChangeLock
    }
}

export default useAccount;