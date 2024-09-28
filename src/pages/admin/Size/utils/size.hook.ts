import { AutoCompleteProps } from "antd/lib";
import { useCallback, useEffect, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import useDebounce from "../../../../hooks/useDeBounce";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import useToast from "../../../../hooks/useToast";
import { Isize } from "../../../../interFaces/size";
import { apiDeleteSize, apiGetSizes, apiUpdateStatusSize } from "./size.service";


interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: Isize[];
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
    enterSearch: false
}

const useSize = () => {
    const [state, setState] = useState<ISate>(initState);
    const isMobile = useIsMobile();
    const { showToast, contextHolder } = useToast();
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
                console.log(state.search, debouncedSearch);
                
                if (state.textSearch) {
                    conds.name = debouncedSearch;
                }

                if (!state.textSearch && state.search && !state.enterSearch) {
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                    return;
                }
                const res = await apiGetSizes(conds);

                if (state.search && !state.enterSearch) {
                    setOptions(res.data.map(i => ({ value: `${i.id}`, label: i.name })))
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

    // handle xoá kích thước
    const handleDeleteCate = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            await apiDeleteSize(id);
            showToast('success', 'Xoá kích thước thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    // handle thay đổi trạng thái 
    const handleChangeStatus = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            await apiUpdateStatusSize(id);
            showToast('success', 'Cập nhật thành công kích thước!');
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
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
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

    return {
        state,
        isMobile,
        contextHolder,
        options,
        refreshPage,
        handleDismissModal,
        handleOpenModal,
        handlePageChange,
        handleDeleteCate,
        showToast,
        handleChangeStatus,
        handleChangeTextSearch,
        handleSearchBtn
    }
}

export default useSize;