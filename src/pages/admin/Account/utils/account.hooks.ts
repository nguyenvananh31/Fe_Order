import { AutoCompleteProps } from "antd";
import { TableProps } from "antd/lib";
import { useCallback, useEffect, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import useDebounce from "../../../../hooks/useDeBounce";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import useToastMessage from "../../../../hooks/useToastMessage";
import { IUser } from "../../../../interFaces/common.types";
import { apiChangeLock, apiDelAccount, apiGetUsers } from "./account.service";


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
    loadingSearch: boolean;
    textSearch?: string;
    filtertatus?: boolean;
    filterDate?: string[];
    enterSearch: boolean;    
    filterSort?: string;
    filterOrderBy?: string;
    refreshSort?: boolean;
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
    search: false,
    loadingSearch: false,
    textSearch: '',
    filtertatus: undefined,
    filterDate: undefined,
    enterSearch: false,
}

const useAccount = () => {
    const { user } = useAuth();
    const [state, setState] = useState<ISate>(initState);
    const isMobile = useIsMobile();
    const { showToast, contextHolder } = useToastMessage();
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');

    useEffect(() => {
        //Lấy tất cả tài khoản
        const fetchData = async () => {
            try {
                if (state.search) {
                    setState(prev => ({ ...prev, loadingSearch: true }));
                } else {
                    setState(prev => ({ ...prev, loading: true }));
                }

                const conds: any = { page: state.pageIndex, per_page: state.pageSize };

                if (state.textSearch) {
                    // conds.name = debouncedSearch;
                    conds.email = debouncedSearch;
                }

                if (!state.textSearch && state.search && !state.enterSearch) {
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                    return;
                }

                if (state.filterOrderBy && state.filterSort) {
                    conds.sort_by = state.filterOrderBy;
                    conds.orderby = state.filterSort;
                }

                const res = await apiGetUsers(conds);

                if (state.search && !state.enterSearch) {
                    setOptions(res.data.map(i => ({ value: `${i.id}`, label: i.name || i.email })))
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                } else {
                    setState(prev => ({ ...prev, data: res.data || [], loading: false, total: res.meta.total, search: false, loadingSearch: false, enterSearch: false }));
                }
            } catch (error: any) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
                setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
            }
        }
        fetchData();
    }, [state.refresh, debouncedSearch]);

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
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !prev.refresh }));
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

    //Search
    /** Event KeyEnter */
    useEffect(() => {

        const keyDownListener = (event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
            }
        };
        document.addEventListener('keydown', keyDownListener);
        return () => {
            document.removeEventListener('keydown', keyDownListener);
        };
    }, []);

    //Search text
    const handleChangeTextSearch = (value: string) => {
        setOptions([]);
        setState(prev => ({ ...prev, textSearch: value, search: true }));
    }

    //Handle click btn search
    const handleSearchBtn = useCallback(() => {
        setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
    }, []);

    // làm mới data
    const refreshPage = useCallback(() => {
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    }, []);

    const handleTableChange: TableProps<any>['onChange'] = (_: any, __: any, sorter: any) => {
        if (sorter) {
            setState(prev => {
                let rePage = false;
                if (
                    prev.filterOrderBy !== sorter?.order?.slice(0, sorter.order.length-3) ||
                    prev.filterSort !== sorter.field
                ) {
                    rePage = true;
                }
                return { ...prev, filterOrderBy: sorter.order ? sorter.order.slice(0, sorter.order.length-3) : undefined,
                     filterSort: sorter.field, refresh: !state.refresh, pageIndex: rePage ? 1 : prev.pageIndex
                }
            })
        }
    }

    return {
        state,
        isMobile,
        contextHolder,
        options,
        refreshPage,
        handleDismissModal,
        handleOpenModal,
        handlePageChange,
        hashStringToColorIndex,
        colors,
        handleDelAccount,
        showToast,
        handleChangeLock,
        handleChangeTextSearch,
        handleSearchBtn,
        handleTableChange
    }
}

export default useAccount;