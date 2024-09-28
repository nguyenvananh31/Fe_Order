import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { RoutePath } from "../../../../constants/path";
import useToast from "../../../../hooks/useToast";
import { IProduct } from "../../../../interFaces/product";
import { apiDelePro, apiGetPros, apiUpdateStatusPro } from "./product.service";
import { AutoCompleteProps } from "antd";
import useDebounce from "../../../../hooks/useDeBounce";

interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: IProduct[];
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

export default function useProduct() {

    const [state, setState] = useState<ISate>(initState);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');
    const { contextHolder, showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.search) {
                    setState(prev => ({ ...prev, loadingSearch: true }));
                } else {
                    setState(prev => ({ ...prev, loading: true }));
                }

                const conds: any = { page: state.pageIndex, per_page: state.pageSize };

                if (state.textSearch) {
                    conds.name = debouncedSearch;
                }

                if (typeof state.filtertatus != 'undefined') {
                    conds.status = state.filtertatus;
                }

                if (state.filterDate) {
                    conds.start_date = state.filterDate[0];
                    conds.end_date = state.filterDate[1];
                }

                if (state.filterOrderBy && state.filterSort) {
                    conds.sort_by = state.filterSort;
                    conds.orderby = state.filterOrderBy;
                }

                if (!state.textSearch && state.search && !state.enterSearch) {
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                    return;
                }

                const res = await apiGetPros(conds);

                if (state.search && !state.enterSearch) {
                    setOptions(res.data.map(i => ({ value: `${i.id}`, label: i.name })))
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                } else {
                    setState(prev => ({ ...prev, data: res.data, loading: false, total: res.meta.total, search: false, loadingSearch: false, enterSearch: false }));
                }
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, search: false, total: 0 }))
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchData();
    }, [state.refresh, debouncedSearch]);

    //Handle chuyển trang add sản phẩm
    const handleToAdd = useCallback(() => {
        navigate(`/${RoutePath.ADMIN}/${RoutePath.ADMIN_ADD_PRODUCT}`);
    }, []);

    //Handle chuyển trang add sản phẩm
    const handleToEdit = useCallback((id: number) => {
        navigate(`/${RoutePath.ADMIN}/${RoutePath.ADMIN_EDIT_PRODUCT}/${id}`);
    }, []);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
    };

    // handle thay đổi trạng thái 
    const handleChangeStatus = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            const res = await apiUpdateStatusPro(id);
            showToast('success', (res.message == 'ẩn' ? 'Ẩn' : 'Hiện') + ' sản phẩm thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    const handleDelePro = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            await apiDelePro(id);
            showToast('success', 'Xoá sản phẩm thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

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
        setState(prev => ({ ...prev, textSearch: value, search: true }));
    }

    //Handle search sort and order by
    const handSortOrderBy = (sort?: string, orderBy?: string) => {
        if ((!sort || state.filterSort) || (!orderBy || state.filterOrderBy)) {
            setState(prev => ({...prev, filterSort: sort || prev.filterSort, filterOrderBy: orderBy || prev.filterOrderBy }));
            return;
        }

        setState(prev => ({...prev, filterSort: sort, filterOrderBy: orderBy, refresh: !prev.refresh, pageIndex: 1  }));
    }

    //Handle click btn search
    const handleSearchBtn = useCallback(() => {
        setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
    }, []);

    //Filter status
    const handleFilterStatus = (value: boolean) => {
        setState(prev => ({ ...prev, filtertatus: value, refresh: !prev.refresh, pageIndex: 1 }));
    }

    //Filter date
    const handleFilterDate = (_: any, dateStrings: [string, string]) => {
        if (!dateStrings[0] || !dateStrings[1]) {
            setState(prev => ({ ...prev, filterDate: undefined, refresh: !prev.refresh, pageIndex: 1 }))
            return;
        }

        const startDate = new Date(dateStrings[0]).toISOString();
        const endDate = new Date(dateStrings[1]).toISOString();

        setState(prev => ({ ...prev, filterDate: [startDate, endDate], refresh: !prev.refresh, pageIndex: 1 }))
    }

    // làm mới data
    const refreshPage = useCallback(() => {
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    }, []);

    return {
        state,
        contextHolder,
        handlePageChange,
        handleToAdd,
        handleToEdit,
        handleChangeStatus,
        handleDelePro,
        options,
        setOptions,
        handleChangeTextSearch,
        refreshPage,
        handleFilterStatus,
        handleFilterDate,
        handleSearchBtn,
        handSortOrderBy
    }
}